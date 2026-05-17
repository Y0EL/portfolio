import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "data/yoel/persona";

export const runtime = "edge";

type Msg = { role: "user" | "assistant" | "system"; content: string };

const GIBBERISH_HINTS = [
  /[A-Za-z]{2,}(?:yur|wan|iku|kari|kroniki|tendas)\b/i,
  /pergram|pwandu|kroniki|tendas|sablekari/i,
];

function looksGibberish(text: string): boolean {
  return GIBBERISH_HINTS.some((r) => r.test(text));
}

/* Too short + non-answer (e.g. "Aha, biar cerita ini biasa!") */
function looksTooThin(text: string, lastUser: string): boolean {
  const t = text.trim();
  if (t.length < 25) return true;
  /* If user mentioned a project/tech and reply doesn't echo any of it, it's likely a dud */
  const techMentions = (lastUser.match(
    /\b(autocrawl|atlas|geocek|sentinel|juscat|yota|reuse|soapy|deskriptor|sekriptor|langgraph|vue|next\.?js|fastapi|stack|gaji|salary|project|kerjaan|pengalaman)\b/gi
  ) || []).map((s) => s.toLowerCase());
  if (techMentions.length === 0) return false;
  const hay = t.toLowerCase();
  const matched = techMentions.filter((kw) => hay.includes(kw)).length;
  return matched === 0 && t.length < 80;
}

function heuristicCompact(slice: Msg[], existing: string): string {
  const userQs = slice
    .filter((m) => m.role === "user")
    .slice(-3)
    .map((m) => m.content.slice(0, 120).trim());
  const yoelAs = slice
    .filter((m) => m.role === "assistant")
    .slice(-2)
    .map((m) => m.content.split(/[.!?]\s/)[0].slice(0, 180).trim());
  const parts: string[] = [];
  if (existing) parts.push(existing);
  if (userQs.length) parts.push(`User udah nanya: ${userQs.join(" / ")}.`);
  if (yoelAs.length) parts.push(`Yoel udah jelasin: ${yoelAs.join(". ")}.`);
  return parts.join(" ").slice(0, 1000);
}

function cleanReply(raw: string): string {
  return raw
    .replace(/^\s*(yoel\s*[:.\-]?\s*)/i, "")
    .replace(/[`~*_#>]+/g, "")
    .replace(/—|–/g, "·")
    .trim();
}

const COMPACT_THRESHOLD = 8; /* compact when total messages exceed this */
const KEEP_RECENT = 4; /* keep last N messages verbatim */

export async function POST(req: NextRequest) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    return NextResponse.json(
      {
        error:
          "OPENROUTER_API_KEY belum diisi. Tambahin di .env.local. Lihat .env.local.example buat referensi.",
      },
      { status: 500 }
    );
  }

  let body: { messages?: Msg[]; essentials?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body bukan JSON." }, { status: 400 });
  }

  const incoming = (body.messages || []).filter(
    (m) =>
      m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
  );
  if (!incoming.length) {
    return NextResponse.json({ error: "Pesan kosong." }, { status: 400 });
  }

  const existingEssentials = (body.essentials || "").slice(0, 1200);
  const model = process.env.OPENROUTER_MODEL || "openrouter/free";

  async function callOR(messages: Msg[], temp: number, maxTokens: number) {
    return fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "https://yoel.pw",
        "X-Title": process.env.OPENROUTER_SITE_NAME || "yoel.pw",
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: temp,
        max_tokens: maxTokens,
        top_p: 0.9,
      }),
    });
  }

  /* ─── Compaction step: if history is long, summarize the older slice ── */
  let essentials = existingEssentials;
  let trimTo: number | undefined;
  let essentialsUpdate: string | undefined;

  if (incoming.length > COMPACT_THRESHOLD) {
    const olderSlice = incoming.slice(0, incoming.length - KEEP_RECENT);
    const conversationText = olderSlice
      .map((m) => `${m.role === "user" ? "User" : "Yoel"}: ${m.content}`)
      .join("\n");

    const compactionPrompt = [
      {
        role: "system" as const,
        content: `Lo adalah summarizer. Tugas lo: rangkum potongan obrolan antara visitor dan Yoel (AI persona) dalam Bahasa Indonesia casual, MAX 3 kalimat pendek. Fokus ke:
1. Topik utama yang udah dibahas
2. Apa yang user keliatannya cari/peduliin
3. Info penting yang udah dijelasin Yoel (angka, nama project, keputusan)

JANGAN: pake bullet, heading, atau format laporan. Cuma 1-3 kalimat narasi singkat.
JANGAN: bilang "berikut rangkuman" atau kata pembuka basa-basi.
Output langsung ringkasan-nya aja.

RINGKASAN SEBELUMNYA (kalau ada, gabungkan):
${existingEssentials || "(belum ada)"}

POTONGAN OBROLAN:
${conversationText}`,
      },
      { role: "user" as const, content: "Rangkum jadi 1-3 kalimat narasi singkat." },
    ];

    let llmSummary = "";
    try {
      const sumRes = await callOR(compactionPrompt, 0.3, 180);
      if (sumRes.ok) {
        const sumData = await sumRes.json();
        const raw = cleanReply(sumData?.choices?.[0]?.message?.content || "");
        if (raw && raw.length > 20 && raw.length < 1200 && !looksGibberish(raw)) {
          llmSummary = raw;
        }
      }
    } catch {
      /* swallow, fall through to heuristic */
    }
    const finalSummary = llmSummary || heuristicCompact(olderSlice, existingEssentials);
    if (finalSummary) {
      essentials = finalSummary;
      essentialsUpdate = finalSummary;
      trimTo = KEEP_RECENT + 1;
    }
  }

  /* ─── Build the main prompt with essentials injected ───────────────── */
  let systemPrompt = buildSystemPrompt();
  if (essentials) {
    systemPrompt += `\n\nCATATAN OBROLAN SEBELUMNYA dengan user yang sama (gunakan untuk continuity, jangan diulang verbatim):\n${essentials}`;
  }

  /* If we compacted, only send recent messages. Else send full history (capped). */
  const recent = trimTo ? incoming.slice(-KEEP_RECENT) : incoming.slice(-10);

  try {
    let upstream = await callOR(
      [{ role: "system", content: systemPrompt }, ...recent],
      0.55,
      500
    );

    if (!upstream.ok) {
      const text = await upstream.text();
      return NextResponse.json(
        { error: `Upstream ${upstream.status}: ${text.slice(0, 240)}` },
        { status: 502 }
      );
    }

    let data = await upstream.json();
    let rawContent: string = data?.choices?.[0]?.message?.content || "";
    let reply = cleanReply(rawContent);

    const lastUserMsg =
      [...recent].reverse().find((m) => m.role === "user")?.content || "";

    /* Retry up to twice if empty / garbled / too thin */
    let attempts = 0;
    while (
      attempts < 2 &&
      (!reply ||
        reply.length < 10 ||
        looksGibberish(reply) ||
        looksTooThin(reply, lastUserMsg))
    ) {
      attempts++;
      const retry = await callOR(
        [{ role: "system", content: systemPrompt }, ...recent],
        attempts === 1 ? 0.4 : 0.7,
        600
      );
      if (!retry.ok) break;
      const retryData = await retry.json();
      const second = cleanReply(retryData?.choices?.[0]?.message?.content || "");
      if (
        second &&
        second.length >= 10 &&
        !looksGibberish(second) &&
        !looksTooThin(second, lastUserMsg)
      ) {
        reply = second;
        break;
      }
    }

    if (!reply || reply.length < 5) {
      reply =
        "Wah lagi rada kebanyakan request bro, coba lagi sebentar atau ganti pertanyaan ya.";
    }

    return NextResponse.json({
      reply,
      ...(essentialsUpdate ? { essentialsUpdate } : {}),
      ...(trimTo ? { trimTo } : {}),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Network: ${err?.message || "unknown"}` },
      { status: 502 }
    );
  }
}
