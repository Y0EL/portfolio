import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt, shouldRecallMemory } from "data/yoel/persona";

export const runtime = "edge";

type Msg = { role: "user" | "assistant" | "system"; content: string };

const GIBBERISH_HINTS = [
  /[A-Za-z]{2,}(?:yur|wan|iku|kari|kroniki|tendas)\b/i,
  /pergram|pwandu|kroniki|tendas|sablekari/i,
];

function looksGibberish(text: string): boolean {
  return GIBBERISH_HINTS.some((r) => r.test(text));
}

function looksTooThin(text: string, lastUser: string): boolean {
  const t = text.trim();
  if (t.length < 25) return true;
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

function isValidReply(text: string, lastUser: string): boolean {
  if (!text || text.length < 10) return false;
  if (looksGibberish(text)) return false;
  if (looksTooThin(text, lastUser)) return false;
  return true;
}

/* Returns a 0-1 score of how much new text overlaps prior assistant text.
 * Uses normalized word-bag jaccard. High overlap (>0.5) means model is
 * just regurgitating earlier answers and should be regenerated. */
function overlapScore(newText: string, priorTexts: string[]): number {
  if (!priorTexts.length || newText.length < 30) return 0;
  const tokens = (s: string): string[] => {
    const seen: { [k: string]: true } = {};
    const out: string[] = [];
    const words = s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/);
    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      if (w.length > 3 && !seen[w]) {
        seen[w] = true;
        out.push(w);
      }
    }
    return out;
  };
  const a = tokens(newText);
  if (a.length === 0) return 0;
  let maxJacc = 0;
  for (let i = 0; i < priorTexts.length; i++) {
    const b = tokens(priorTexts[i]);
    if (b.length === 0) continue;
    const bSet: { [k: string]: true } = {};
    for (let j = 0; j < b.length; j++) bSet[b[j]] = true;
    let inter = 0;
    for (let j = 0; j < a.length; j++) if (bSet[a[j]]) inter++;
    const union = a.length + b.length - inter;
    const jacc = union > 0 ? inter / union : 0;
    if (jacc > maxJacc) maxJacc = jacc;
  }
  return maxJacc;
}

const COMPACT_THRESHOLD = 6;
const KEEP_RECENT = 3;

/* ─── Groq backend ───────────────────────────────────────────── */
async function callGroq(
  messages: Msg[],
  temp: number,
  maxTokens: number,
  key: string,
  model: string
) {
  return fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
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

async function groqReply(
  messages: Msg[],
  temp: number,
  maxTokens: number,
  key: string,
  model: string
): Promise<string> {
  const res = await callGroq(messages, temp, maxTokens, key, model);
  if (!res.ok) return "";
  const data = await res.json();
  return cleanReply(data?.choices?.[0]?.message?.content || "");
}

/* ─── Gemini backend (fallback) ──────────────────────────────── */
async function callGemini(
  systemContent: string,
  messages: Msg[],
  temp: number,
  maxTokens: number,
  key: string,
  model: string
) {
  /* Gemini uses role "model" for assistant, system goes in systemInstruction */
  const contents = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": key,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemContent }] },
        contents,
        generationConfig: {
          temperature: temp,
          maxOutputTokens: maxTokens,
          topP: 0.9,
          /* Disable thinking tokens — they silently consume the maxOutputTokens
           * budget on gemini-2.5-flash and leave the visible reply truncated. */
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    }
  );
}

async function geminiReply(
  systemContent: string,
  messages: Msg[],
  temp: number,
  maxTokens: number,
  key: string,
  model: string
): Promise<string> {
  const res = await callGemini(systemContent, messages, temp, maxTokens, key, model);
  if (!res.ok) return "";
  const data = await res.json();
  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p?.text || "")
      .join("") || "";
  return cleanReply(text);
}

export async function POST(req: NextRequest) {
  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GOOGLE_API_KEY;

  if (!groqKey && !geminiKey) {
    return NextResponse.json(
      {
        error:
          "Belum ada API key. Isi GROQ_API_KEY (primary) atau GOOGLE_API_KEY (fallback) di .env.local.",
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
  const groqModel = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
  const geminiModel = process.env.GEMINI_MODEL || "gemini-flash-latest";

  /* ─── Compaction ─────────────────────────────────────────── */
  let essentials = existingEssentials;
  let trimTo: number | undefined;
  let essentialsUpdate: string | undefined;

  if (incoming.length > COMPACT_THRESHOLD) {
    const olderSlice = incoming.slice(0, incoming.length - KEEP_RECENT);
    const conversationText = olderSlice
      .map((m) => `${m.role === "user" ? "User" : "Yoel"}: ${m.content}`)
      .join("\n");

    const sumSystem = `Lo adalah summarizer. Tugas lo: rangkum potongan obrolan antara visitor dan Yoel (AI persona) dalam Bahasa Indonesia casual, MAX 3 kalimat pendek. Fokus ke:
1. Topik utama yang udah dibahas
2. Apa yang user keliatannya cari/peduliin
3. Info penting yang udah dijelasin Yoel (angka, nama project, keputusan)

JANGAN: pake bullet, heading, atau format laporan. Cuma 1-3 kalimat narasi singkat.
JANGAN: bilang "berikut rangkuman" atau kata pembuka basa-basi.
Output langsung ringkasan-nya aja.

RINGKASAN SEBELUMNYA (kalau ada, gabungkan):
${existingEssentials || "(belum ada)"}

POTONGAN OBROLAN:
${conversationText}`;

    let llmSummary = "";
    try {
      if (groqKey) {
        llmSummary = await groqReply(
          [
            { role: "system", content: sumSystem },
            { role: "user", content: "Rangkum jadi 1-3 kalimat narasi singkat." },
          ],
          0.3,
          180,
          groqKey,
          groqModel
        );
      }
      if (!llmSummary && geminiKey) {
        llmSummary = await geminiReply(
          sumSystem,
          [{ role: "user", content: "Rangkum jadi 1-3 kalimat narasi singkat." }],
          0.3,
          180,
          geminiKey,
          geminiModel
        );
      }
      if (llmSummary && (llmSummary.length < 20 || llmSummary.length > 1200 || looksGibberish(llmSummary))) {
        llmSummary = "";
      }
    } catch {
      /* swallow */
    }
    const finalSummary = llmSummary || heuristicCompact(olderSlice, existingEssentials);
    if (finalSummary) {
      essentials = finalSummary;
      essentialsUpdate = finalSummary;
      trimTo = KEEP_RECENT + 1;
    }
  }

  /* ─── Main inference with fallback chain ─────────────────── */
  let systemPrompt = buildSystemPrompt();

  const recent = trimTo ? incoming.slice(-KEEP_RECENT) : incoming.slice(-6);
  const lastUserMsg =
    [...recent].reverse().find((m) => m.role === "user")?.content || "";

  /* Only inject essentials into the system prompt when the user message
   * actually references past conversation (recall triggers). This stops
   * old topics from bleeding into off-topic answers and keeps responses
   * grounded in the current question. */
  if (essentials && shouldRecallMemory(lastUserMsg)) {
    systemPrompt += `\n\nRINGKASAN OBROLAN SEBELUMNYA (user lagi nanya tentang ini):\n${essentials}\n\nJawab pertanyaan user sekarang dengan referensi ringkasan di atas. JANGAN copy paste jawaban lama.`;
  }

  /* Anti-repetition: collect last 2 assistant responses for overlap check */
  const lastAssistant = incoming
    .filter((m) => m.role === "assistant")
    .slice(-2)
    .map((m) => m.content);

  let reply = "";
  let usedFallback = false;
  const debug: string[] = [];

  const isBad = (r: string) =>
    !isValidReply(r, lastUserMsg) || overlapScore(r, lastAssistant) > 0.5;

  try {
    /* Attempt 1: Groq primary */
    if (groqKey) {
      reply = await groqReply(
        [{ role: "system", content: systemPrompt }, ...recent],
        0.55,
        300,
        groqKey,
        groqModel
      );
      debug.push(
        `groq#1 len=${reply.length} overlap=${overlapScore(reply, lastAssistant).toFixed(2)}`
      );

      /* Retry Groq once with different temp if bad or too repetitive */
      if (isBad(reply)) {
        const second = await groqReply(
          [{ role: "system", content: systemPrompt }, ...recent],
          0.8,
          350,
          groqKey,
          groqModel
        );
        debug.push(
          `groq#2 len=${second.length} overlap=${overlapScore(second, lastAssistant).toFixed(2)}`
        );
        if (!isBad(second)) reply = second;
      }
    }

    /* Attempt 2: Gemini fallback */
    if (isBad(reply) && geminiKey) {
      const gem = await geminiReply(
        systemPrompt,
        recent,
        0.7,
        400,
        geminiKey,
        geminiModel
      );
      debug.push(
        `gemini len=${gem.length} overlap=${overlapScore(gem, lastAssistant).toFixed(2)}`
      );
      if (!isBad(gem)) {
        reply = gem;
        usedFallback = true;
      } else if (gem && gem.length > 0 && !looksGibberish(gem)) {
        /* Last-resort: even if Gemini reply is "thin", use it as long as it's
         * not gibberish and doesn't dupe earlier answer. */
        if (overlapScore(gem, lastAssistant) < 0.6) {
          reply = gem;
          usedFallback = true;
        }
      }
    }

    if (!isValidReply(reply, lastUserMsg)) {
      reply =
        "Wah, koneksi gue lagi flaky bro. Coba refresh atau tanya lagi 5 detik lagi ya.";
    }

    return NextResponse.json({
      reply,
      ...(essentialsUpdate ? { essentialsUpdate } : {}),
      ...(trimTo ? { trimTo } : {}),
      ...(usedFallback ? { backend: "fallback" } : {}),
      ...(process.env.NODE_ENV !== "production" ? { debug } : {}),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Network: ${err?.message || "unknown"}`, debug },
      { status: 502 }
    );
  }
}
