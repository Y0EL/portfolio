import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt, shouldRecallMemory, TRUSTED_SOURCES } from "data/yoel/persona";

export const runtime = "edge";

type ToolCall = { id: string; type: "function"; function: { name: string; arguments: string } };
type Msg =
  | { role: "system" | "user"; content: string }
  | { role: "assistant"; content: string; tool_calls?: ToolCall[] }
  | { role: "tool"; content: string; tool_call_id: string };

const COMPACT_THRESHOLD = 8;
const KEEP_RECENT = 4;
const MAX_TOOL_ROUNDS = 2;
const DEFAULT_BASE_URL = "https://dashscope-intl.aliyuncs.com/compatible-mode/v1";
const DEFAULT_MODEL = "qwen3.8-flash";
const FALLBACK_REPLY =
  "Maaf, saya lagi susah menjawab sekarang. Coba kirim lagi sebentar, atau langsung hubungi saya lewat email atau WhatsApp.";

const TOOLS = [
  {
    type: "function",
    function: {
      name: "fetch_page",
      description:
        "Membuka satu halaman web publik dan mengembalikan isinya dalam bentuk teks, untuk mengecek fakta. Sumber utama tentang Yoel: " +
        TRUSTED_SOURCES.join(", "),
      parameters: {
        type: "object",
        properties: {
          url: { type: "string", description: "URL lengkap yang ingin dibuka, diawali https." },
        },
        required: ["url"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "web_search",
      description:
        "Mencari informasi di web untuk mengecek fakta atau menjawab pertanyaan yang tidak ada di DATA. Mengembalikan daftar judul, URL, dan cuplikan.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Kata kunci pencarian yang spesifik." },
        },
        required: ["query"],
      },
    },
  },
];

const PRIVATE_HOST = /^(localhost|0\.0\.0\.0|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|\[?::1\]?$|\[?f[cd]|.*\.local$|.*\.internal$)/i;

const encoder = new TextEncoder();

function packet(obj: Record<string, unknown>) {
  return encoder.encode(JSON.stringify(obj) + "\n");
}

const CJK = /[　-〿぀-ヿ㐀-䶿一-鿿豈-﫿＀-￯]+/g;

function tidy(text: string, allowCjk: boolean) {
  const cleaned = text.replace(/\s*[—–]\s*/g, ", ");
  return allowCjk ? cleaned : cleaned.replace(CJK, "");
}

function nowInJakarta() {
  const now = new Date();
  const date = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);
  const time = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
  return `${date}, pukul ${time} WIB`;
}

function isAllowed(raw: string): URL | null {
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (url.username || url.password) return null;
    if (PRIVATE_HOST.test(url.hostname)) return null;
    if (url.port && !["80", "443"].includes(url.port)) return null;
    return url;
  } catch {
    return null;
  }
}

async function timedFetch(input: string, init: RequestInit = {}, ms = 9000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function webSearch(query: string): Promise<string> {
  const q = query.trim().slice(0, 200);
  if (!q) return "GAGAL: kata kunci kosong.";
  const jinaKey = process.env.JINA_API_KEY;
  try {
    if (jinaKey) {
      const res = await timedFetch(
        `https://s.jina.ai/?q=${encodeURIComponent(q)}`,
        {
          headers: {
            Authorization: `Bearer ${jinaKey}`,
            Accept: "application/json",
            "X-Respond-With": "no-content",
          },
        },
        15000
      );
      if (res.ok) {
        const data = await res.json();
        const rows = (data?.data || [])
          .slice(0, 5)
          .map((r: { title?: string; url?: string; description?: string }, i: number) =>
            `${i + 1}. ${r.title || ""}\n${r.url || ""}\n${String(r.description || "").slice(0, 400)}`
          );
        if (rows.length) return `HASIL PENCARIAN "${q}" (pakai fetch_page untuk membaca detail):\n${rows.join("\n\n")}`;
      }
    }
    const rows: string[] = [];
    for (const lang of ["id", "en"]) {
      const res = await timedFetch(
        `https://${lang}.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=3&utf8=1&srsearch=${encodeURIComponent(q)}`,
        { headers: { "User-Agent": "YoelPortfolioAssistant/1.0 (https://yoel.online)" } },
        7000
      );
      if (!res.ok) continue;
      const data = await res.json();
      for (const r of data?.query?.search || []) {
        const snippet = String(r.snippet || "").replace(/<[^>]+>/g, "");
        rows.push(`${r.title}\nhttps://${lang}.wikipedia.org/wiki/${encodeURIComponent(String(r.title).replace(/ /g, "_"))}\n${snippet}`);
      }
      if (rows.length >= 3) break;
    }
    if (!rows.length) return `TIDAK ADA HASIL untuk "${q}". Coba buka situs resmi yang relevan dengan fetch_page.`;
    return `HASIL PENCARIAN WIKIPEDIA "${q}" (pakai fetch_page untuk membaca detail):\n${rows.map((r, i) => `${i + 1}. ${r}`).join("\n\n")}`;
  } catch {
    return "GAGAL: pencarian tidak bisa dijalankan sekarang.";
  }
}

function htmlToText(html: string) {
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "").trim();
  const description = (html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] || "").trim();
  const body = html
    .replace(/<(script|style|noscript|svg|iframe)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6]|section|article|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
  return { title, description, body };
}

async function fetchPage(raw: string): Promise<string> {
  const url = isAllowed(raw);
  if (!url) return `DITOLAK: ${raw} bukan alamat web publik yang valid.`;
  let direct = "";
  try {
    const res = await timedFetch(
      url.toString(),
      {
        headers: { "User-Agent": "YoelPortfolioAssistant/1.0 (+https://yoel.online)", Accept: "text/html,application/json,text/plain" },
        redirect: "follow",
      },
      7000
    );
    const type = res.headers.get("content-type") || "";
    if (res.ok && /text|json|xml/.test(type)) {
      const text = (await res.text()).slice(0, 600000);
      if (!/html/.test(type)) {
        direct = `SUMBER: ${url.toString()}\nISI:\n${text.slice(0, 6000)}`;
      } else {
        const { title, description, body } = htmlToText(text);
        if (body.length > 400) {
          direct = `SUMBER: ${url.toString()}\nJUDUL: ${title}\nDESKRIPSI: ${description}\nISI:\n${body.slice(0, 6000)}`;
        }
      }
    }
  } catch {}
  if (direct) return direct;

  try {
    const jinaKey = process.env.JINA_API_KEY;
    const res = await timedFetch(
      `https://r.jina.ai/${url.toString()}`,
      {
        headers: {
          Accept: "text/plain",
          "X-Retain-Images": "none",
          "X-Timeout": "15",
          ...(jinaKey ? { Authorization: `Bearer ${jinaKey}` } : {}),
        },
      },
      20000
    );
    if (!res.ok) return `GAGAL: ${url.hostname} tidak bisa dibaca (status ${res.status}).`;
    const text = (await res.text()).replace(/\]\([^)]*\)/g, "]").replace(/\n{3,}/g, "\n\n");
    return `SUMBER: ${url.toString()}\n${text.slice(0, 6000)}`;
  } catch {
    return `GAGAL: ${url.hostname} tidak bisa dibuka sekarang.`;
  }
}

async function callQwen(
  messages: Msg[],
  opts: {
    key: string;
    baseUrl: string;
    model: string;
    stream: boolean;
    temperature: number;
    maxTokens: number;
    tools?: "auto" | "none";
  }
) {
  return fetch(`${opts.baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${opts.key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: opts.model,
      messages,
      stream: opts.stream,
      temperature: opts.temperature,
      top_p: 0.9,
      max_tokens: opts.maxTokens,
      enable_thinking: false,
      ...(opts.tools ? { tools: TOOLS, tool_choice: opts.tools } : {}),
    }),
  });
}

async function* readSse(res: Response) {
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (data === "[DONE]") return;
      try {
        yield JSON.parse(data);
      } catch {}
    }
  }
}

async function summarize(older: Msg[], existing: string, opts: { key: string; baseUrl: string; model: string }) {
  const text = older
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => `${m.role === "user" ? "Pengunjung" : "Yoel"}: ${m.content}`)
    .join("\n");
  try {
    const res = await callQwen(
      [
        {
          role: "system",
          content: `Rangkum potongan obrolan antara pengunjung dan Yoel dalam Bahasa Indonesia, maksimal 3 kalimat narasi. Catat topik, kebutuhan pengunjung, gaya bahasa pengunjung, dan data yang sudah dia berikan (nama, perusahaan, kebutuhan). Tanpa bullet dan tanpa kalimat pembuka.\n\nRingkasan sebelumnya: ${existing || "belum ada"}\n\nObrolan:\n${text}`,
        },
        { role: "user", content: "Tulis ringkasannya." },
      ],
      { ...opts, stream: false, temperature: 0.3, maxTokens: 220 }
    );
    if (!res.ok) return "";
    const data = await res.json();
    const out = String(data?.choices?.[0]?.message?.content || "").trim();
    return out.length >= 20 && out.length <= 1200 ? out : "";
  } catch {
    return "";
  }
}

export async function POST(req: NextRequest) {
  const key = process.env.QWEN_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Asisten belum dikonfigurasi. Isi QWEN_API_KEY di environment." }, { status: 500 });
  }
  const opts = {
    key,
    baseUrl: process.env.QWEN_BASE_URL || DEFAULT_BASE_URL,
    model: process.env.QWEN_MODEL || DEFAULT_MODEL,
  };

  let body: { messages?: { role: string; content: string }[]; essentials?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Format permintaan tidak valid." }, { status: 400 });
  }

  const incoming: Msg[] = (body.messages || [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content.slice(0, 4000) }));
  if (!incoming.length) {
    return NextResponse.json({ error: "Pesan kosong." }, { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: Record<string, unknown>) => controller.enqueue(packet(obj));
      try {
        let essentials = (body.essentials || "").slice(0, 1200);
        let recent = incoming.slice(-6);

        if (incoming.length > COMPACT_THRESHOLD) {
          const older = incoming.slice(0, incoming.length - KEEP_RECENT);
          const summary = await summarize(older, essentials, opts);
          if (summary) {
            essentials = summary;
            recent = incoming.slice(-KEEP_RECENT);
            send({ t: "meta", essentialsUpdate: summary, trimTo: KEEP_RECENT + 1 });
          }
        }

        const lastUser = [...recent].reverse().find((m) => m.role === "user")?.content || "";
        const casual = /\b(gue|gua|gw|lo|lu|loe|elo|bro|bray|cuy|wkwk+|anjir|anjay|gan|bang)\b/i.test(lastUser);
        const english = /^[\x00-\x7F]*$/.test(lastUser) && /\b(the|you|your|what|how|can|is|are|do|i)\b/i.test(lastUser);
        const register = english
          ? "Pengunjung menulis dalam bahasa Inggris. Balas dalam bahasa Inggris."
          : casual
            ? "MODE SANTAI: pakai gue dan lo untuk seluruh jawaban ini."
            : "MODE SOPAN: pakai saya dan kamu untuk seluruh jawaban ini, jangan pakai gue, lo, atau bro.";
        const allowCjk =/[一-鿿]/.test(lastUser);
        let system = `${buildSystemPrompt()}\n\nWAKTU SEKARANG: ${nowInJakarta()}. Gunakan ini jika pengunjung bertanya jam, hari, atau tanggal, dan untuk menilai seberapa baru sebuah informasi.\n\nGAYA BAHASA UNTUK JAWABAN INI: ${register}`;
        if (essentials && (shouldRecallMemory(lastUser) || incoming.length > COMPACT_THRESHOLD)) {
          system += `\n\nRINGKASAN OBROLAN SEBELUMNYA:\n${essentials}`;
        }

        const messages: Msg[] = [{ role: "system", content: system }, ...recent];
        const research: string[] = [];
        let produced = "";

        for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
          const finalRound = round === MAX_TOOL_ROUNDS;
          const payload: Msg[] = finalRound
            ? [
                {
                  role: "system",
                  content: `${system}\n\nHASIL RISET YANG SUDAH KAMU LAKUKAN:\n${research.join("\n\n---\n\n").slice(0, 14000)}\n\nSekarang jawab pesan terakhir pengunjung berdasarkan riset di atas. Alat sudah tidak tersedia. Jika riset belum cukup, katakan terus terang apa yang sudah kamu temukan.`,
                },
                ...recent,
              ]
            : messages;
          const res = await callQwen(payload, {
            ...opts,
            stream: true,
            temperature: 0.7,
            maxTokens: 700,
            tools: finalRound ? undefined : "auto",
          });
          if (!res.ok || !res.body) {
            if (process.env.NODE_ENV !== "production") {
              console.error("qwen error", res.status, (await res.text().catch(() => "")).slice(0, 500));
            }
            break;
          }

          let content = "";
          const calls: ToolCall[] = [];
          for await (const chunk of readSse(res)) {
            const delta = chunk?.choices?.[0]?.delta;
            if (!delta) continue;
            if (typeof delta.content === "string" && delta.content) {
              const piece = tidy(delta.content, allowCjk);
              content += piece;
              produced += piece;
              send({ t: "delta", v: piece });
            }
            for (const tc of delta.tool_calls || []) {
              const i = typeof tc.index === "number" ? tc.index : 0;
              calls[i] = calls[i] || { id: "", type: "function", function: { name: "", arguments: "" } };
              if (tc.id) calls[i].id = tc.id;
              if (tc.function?.name) calls[i].function.name += tc.function.name;
              if (tc.function?.arguments) calls[i].function.arguments += tc.function.arguments;
            }
          }

          const toolCalls = calls
            .filter(Boolean)
            .slice(0, 3)
            .map((c, i) => ({ ...c, id: c.id || `call_${round}_${i}` }));
          if (finalRound || !toolCalls.length) break;

          messages.push({ role: "assistant", content, tool_calls: toolCalls });
          for (const call of toolCalls) {
            let args: { url?: string; query?: string } = {};
            try {
              args = JSON.parse(call.function.arguments || "{}");
            } catch {}
            let result = "Alat tidak dikenal.";
            if (call.function.name === "web_search" && !String(args.query || "").trim()) {
              result = "GAGAL: kata kunci kosong.";
            } else if (call.function.name === "fetch_page") {
              const url = String(args.url || "");
              let host = url;
              try {
                host = new URL(url).hostname.replace(/^www\./, "");
              } catch {}
              send({ t: "status", v: `Membuka ${host || "halaman"}` });
              result = await fetchPage(url);
            } else if (call.function.name === "web_search") {
              const query = String(args.query || "");
              send({ t: "status", v: `Mencari "${query.slice(0, 40)}"` });
              result = await webSearch(query);
            }
            messages.push({ role: "tool", tool_call_id: call.id, content: result });
            research.push(`${call.function.name}(${call.function.arguments})\n${result}`);
          }
          send({ t: "status", v: "" });
        }

        if (!produced.trim()) send({ t: "delta", v: FALLBACK_REPLY });
      } catch {
        send({ t: "delta", v: FALLBACK_REPLY });
      } finally {
        send({ t: "done" });
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
