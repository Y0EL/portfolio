"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, Check, Copy, Mail, MessageCircle, Send, X } from "lucide-react";
import { SiGmail } from "react-icons/si";
import { socialLinks } from "app/config";

const OWNER_EMAIL = socialLinks.email.replace(/^mailto:/, "");

type Msg = { role: "user" | "assistant"; content: string; streaming?: boolean };
type Stored = { messages: Msg[]; essentials: string; v: number };
type Draft = { subject: string; body: string };

const STORAGE_KEY = "yoel-wire-v1";
const STORAGE_VERSION = 3;
const OPEN_TAG = "<email_draft>";
const CLOSE_TAG = "</email_draft>";

const SUGGESTIONS = [
  "Bisa buatkan website untuk bisnis saya?",
  "Bantu saya menulis email ke kamu",
  "Kerjaan lo di Piranusa ngapain sih?",
  "YOTEXT itu apa?",
];

const GREETING: Msg = {
  role: "assistant",
  content:
    "Halo, saya Yoel. Mau diskusi soal website, tanya tentang karya saya, atau perlu bantuan menulis email ke saya? Silakan, ngobrolnya santai saja.",
};

function loadStored(): Stored {
  const empty = { messages: [GREETING], essentials: "", v: STORAGE_VERSION };
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Stored;
    if (parsed.v !== STORAGE_VERSION || !Array.isArray(parsed.messages)) return empty;
    if (parsed.messages.length === 0) parsed.messages = [GREETING];
    return parsed;
  } catch {
    return empty;
  }
}

function saveStored(s: Stored) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {}
}

function parseDraftJson(raw: string): Draft | null {
  const startBrace = raw.indexOf("{");
  const endBrace = raw.lastIndexOf("}");
  if (startBrace === -1 || endBrace <= startBrace) return null;
  try {
    const parsed = JSON.parse(raw.slice(startBrace, endBrace + 1));
    const subject = String(parsed.subject || "").trim();
    const body = String(parsed.body || "").trim();
    return subject || body ? { subject, body } : null;
  } catch {
    return null;
  }
}

function splitDraft(content: string, streaming = false): { text: string; draft: Draft | null; pending: boolean } {
  const start = content.indexOf(OPEN_TAG);
  if (start === -1) {
    let text = content;
    for (let i = OPEN_TAG.length - 1; i > 0; i--) {
      if (text.endsWith(OPEN_TAG.slice(0, i))) {
        text = text.slice(0, text.length - i);
        break;
      }
    }
    return { text: text.trim(), draft: null, pending: false };
  }
  const before = content.slice(0, start).trim();
  const end = content.indexOf(CLOSE_TAG, start);
  if (end === -1) {
    if (streaming) return { text: before, draft: null, pending: true };
    return { text: before, draft: parseDraftJson(content.slice(start + OPEN_TAG.length)), pending: false };
  }
  const after = content.slice(end + CLOSE_TAG.length).trim();
  const draft = parseDraftJson(content.slice(start + OPEN_TAG.length, end));
  return { text: [before, after].filter(Boolean).join("\n\n"), draft, pending: false };
}

function EmailDraftCard({ draft }: { draft: Draft }) {
  const [subject, setSubject] = useState(draft.subject);
  const [body, setBody] = useState(draft.body);
  const [copied, setCopied] = useState(false);

  const to = OWNER_EMAIL;
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  const mailtoHref = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(`Kepada: ${to}\nSubjek: ${subject}\n\n${body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <div className="draftCard">
      <div className="draftHead">
        <Mail aria-hidden="true" />
        <span>Draf email untuk {to}</span>
      </div>
      <label className="draftField">
        <span>Subjek</span>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} />
      </label>
      <label className="draftField">
        <span>Isi</span>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={7} />
      </label>
      <p className="draftNote">
        Email belum terkirim. Periksa dan ubah dulu kalau perlu, lalu tekan Kirim di aplikasi email kamu.
      </p>
      <div className="draftActions">
        <a href={gmailHref} target="_blank" rel="noopener noreferrer" className="draftPrimary">
          <SiGmail aria-hidden="true" />
          Buka di Gmail
        </a>
        <a href={mailtoHref} className="draftSecondary">
          <Send aria-hidden="true" />
          Aplikasi email
        </a>
        <button type="button" onClick={copy} className="draftSecondary" aria-label="Salin draf">
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          {copied ? "Tersalin" : "Salin"}
        </button>
      </div>
    </div>
  );
}

function AssistantMessage({ msg, status }: { msg: Msg; status: string }) {
  const { text, draft, pending } = splitDraft(msg.content, msg.streaming);
  const waiting = msg.streaming && !text && !pending;
  return (
    <div className="botTurn">
      {waiting ? (
        <div className="chatThinking">{status || "Sedang mengetik"}</div>
      ) : (
        text && (
          <div className={["bubble", "bubbleBot", msg.streaming && !pending ? "isStreaming" : ""].join(" ")}>
            {text}
          </div>
        )
      )}
      {msg.streaming && status && text && <div className="chatThinking">{status}</div>}
      {pending && <div className="chatThinking">Menyiapkan draf email</div>}
      {draft && !msg.streaming && <EmailDraftCard draft={draft} />}
    </div>
  );
}

export default function TalkativeYoel() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [essentials, setEssentials] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [atBottom, setAtBottom] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const stickRef = useRef(true);

  useEffect(() => {
    const s = loadStored();
    setMsgs(s.messages.map((m) => ({ role: m.role, content: m.content })));
    setEssentials(s.essentials || "");
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || loading) return;
    saveStored({
      messages: msgs.map(({ role, content }) => ({ role, content })),
      essentials,
      v: STORAGE_VERSION,
    });
  }, [msgs, essentials, hydrated, loading]);

  const scrollToBottom = useCallback((smooth = true) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  }, []);

  useEffect(() => {
    if (stickRef.current) scrollToBottom(!loading);
  }, [msgs, status, loading, scrollToBottom]);

  useEffect(() => {
    if (open) {
      stickRef.current = true;
      requestAnimationFrame(() => scrollToBottom(false));
    }
  }, [open, scrollToBottom]);

  function onLogScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const near = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    stickRef.current = near;
    setAtBottom(near);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [input, open]);

  function updateLast(content: string, streaming: boolean) {
    setMsgs((cur) => {
      const next = cur.slice();
      next[next.length - 1] = { role: "assistant", content, streaming };
      return next;
    });
  }

  async function send(text?: string) {
    const payload = (text ?? input).trim();
    if (!payload || loading) return;

    const history: Msg[] = [...msgs.map(({ role, content }) => ({ role, content })), { role: "user", content: payload }];
    setMsgs([...history, { role: "assistant", content: "", streaming: true }]);
    setInput("");
    setLoading(true);
    setStatus("");
    stickRef.current = true;

    let acc = "";
    let trimTo: number | undefined;

    try {
      const res = await fetch("/api/talk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, essentials }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        acc = data?.error || "Maaf, koneksinya terputus. Coba kirim lagi sebentar.";
      } else {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            if (!line.trim()) continue;
            let evt: { t: string; v?: string; essentialsUpdate?: string; trimTo?: number };
            try {
              evt = JSON.parse(line);
            } catch {
              continue;
            }
            if (evt.t === "delta" && evt.v) {
              acc += evt.v;
              setStatus("");
              updateLast(acc, true);
            } else if (evt.t === "status") {
              setStatus(evt.v || "");
            } else if (evt.t === "meta") {
              if (typeof evt.essentialsUpdate === "string") setEssentials(evt.essentialsUpdate);
              if (typeof evt.trimTo === "number") trimTo = evt.trimTo;
            }
          }
        }
      }
    } catch {
      if (!acc) acc = "Maaf, koneksinya terputus. Periksa internet kamu, lalu kirim lagi.";
    } finally {
      const finalText = acc.trim() || "Maaf, saya belum bisa menjawab sekarang. Coba kirim lagi sebentar.";
      setMsgs((cur) => {
        const next = cur.slice();
        next[next.length - 1] = { role: "assistant", content: finalText };
        return trimTo && next.length > trimTo + 1 ? next.slice(-(trimTo + 1)) : next;
      });
      setStatus("");
      setLoading(false);
    }
  }

  function clearMemory() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setMsgs([GREETING]);
    setEssentials("");
  }

  return (
    <>
      {!open && (
        <button type="button" onClick={() => setOpen(true)} aria-label="Buka obrolan dengan Yoel" className="chatTrigger">
          <MessageCircle aria-hidden="true" className="chatTriggerIcon" />
          <span>
            <span className="chatTriggerLong">Ngobrol dengan </span>Yoel
          </span>
        </button>
      )}

      <div className="chatLayer" data-open={open} aria-hidden={!open}>
        <button type="button" aria-label="Tutup obrolan" onClick={() => setOpen(false)} className="chatScrim" tabIndex={-1} />
        <aside className="chatPanel" role="dialog" aria-modal="true" aria-label="Obrolan dengan Yoel">
          <header className="chatHead">
            <div className="chatHeadRow">
              <span className="mono">Yoel Andreas Manoppo</span>
              <div className="chatHeadButtons">
                {msgs.length > 1 && !loading && (
                  <button type="button" onClick={clearMemory} className="chatGhost" title="Hapus riwayat obrolan di browser ini">
                    Mulai ulang
                  </button>
                )}
                <button type="button" onClick={() => setOpen(false)} className="chatGhost" aria-label="Tutup">
                  <X className="iconInline" aria-hidden="true" />
                </button>
              </div>
            </div>
            <h2 className="chatTitle">
              Ngobrol dengan <em>saya.</em>
            </h2>
            <p className="chatNote">
              Balasan di sini dibantu AI yang belajar dari pengalaman dan karya saya. Saya juga bisa bantu menyusun draf
              email ke saya.
            </p>
          </header>

          <div className="chatLogWrap">
            <div ref={scrollRef} className="chatLog" aria-live="polite" onScroll={onLogScroll}>
              {msgs.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="bubble bubbleUser">
                    {m.content}
                  </div>
                ) : (
                  <AssistantMessage key={i} msg={m} status={i === msgs.length - 1 ? status : ""} />
                )
              )}
            </div>
            {!atBottom && (
              <button
                type="button"
                className="jumpLatest"
                onClick={() => {
                  stickRef.current = true;
                  scrollToBottom();
                }}
                aria-label="Ke pesan terbaru"
              >
                <ArrowDown aria-hidden="true" />
              </button>
            )}
          </div>

          {msgs.length <= 1 && (
            <div className="chatSuggestions">
              {SUGGESTIONS.map((s) => (
                <button type="button" key={s} onClick={() => send(s)} className="chatSuggestion">
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="chatForm"
          >
            <div className="chatInputRow">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Tulis pesan"
                aria-label="Pesan"
                rows={1}
                className="chatInput"
              />
              <button type="submit" disabled={!input.trim() || loading} className="chatSend">
                Kirim
              </button>
            </div>
            <p className="chatFine">Riwayat obrolan hanya disimpan di browser kamu.</p>
          </form>
        </aside>
      </div>
    </>
  );
}
