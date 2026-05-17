"use client";

import React, { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string; fresh?: boolean };
type Stored = { messages: Msg[]; essentials: string; v: number };

const STORAGE_KEY = "yoel-wire-v1";
const STORAGE_VERSION = 1;

const SUGGESTIONS = [
  "Lo lagi ngerjain apa di PT. GSP?",
  "Ceritain Autocrawl dong",
  "Stack apa yang lo pakai sehari-hari?",
  "Berapa expected salary lo?",
];

const GREETING: Msg = {
  role: "assistant",
  content:
    "Yo, ini gue Yoel. Tanya apa aja · kerjaan, project, musik, atau random. Gue jawab as honest as i can.",
};

function loadStored(): Stored {
  if (typeof window === "undefined") {
    return { messages: [GREETING], essentials: "", v: STORAGE_VERSION };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { messages: [GREETING], essentials: "", v: STORAGE_VERSION };
    const parsed = JSON.parse(raw) as Stored;
    if (parsed.v !== STORAGE_VERSION || !Array.isArray(parsed.messages)) {
      return { messages: [GREETING], essentials: "", v: STORAGE_VERSION };
    }
    if (parsed.messages.length === 0) parsed.messages = [GREETING];
    return parsed;
  } catch {
    return { messages: [GREETING], essentials: "", v: STORAGE_VERSION };
  }
}

function saveStored(s: Stored) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* quota or disabled · ignore */
  }
}

export default function TalkativeYoel() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [essentials, setEssentials] = useState<string>("");
  const [hydrated, setHydrated] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  /* Load from localStorage on mount */
  useEffect(() => {
    const s = loadStored();
    setMsgs(s.messages.map((m) => ({ ...m, fresh: false })));
    setEssentials(s.essentials || "");
    setHydrated(true);
  }, []);

  /* Persist on change */
  useEffect(() => {
    if (!hydrated) return;
    const stripped = msgs.map(({ role, content }) => ({ role, content }));
    saveStored({ messages: stripped as Msg[], essentials, v: STORAGE_VERSION });
  }, [msgs, essentials, hydrated]);

  /* Autoscroll */
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs, loading]);

  /* ESC to close */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function send(text?: string) {
    const payload = (text ?? input).trim();
    if (!payload || loading) return;

    const userMsg: Msg = { role: "user", content: payload };
    const next: Msg[] = [...msgs.map((m) => ({ ...m, fresh: false })), userMsg];
    setMsgs(next);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = next.map(({ role, content }) => ({ role, content }));
      const res = await fetch("/api/talk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, essentials }),
      });
      const data = await res.json();

      const reply =
        (data?.reply as string) ||
        (data?.error as string) ||
        "Wah, sinyalnya putus bro. Coba lagi sebentar ya.";

      setMsgs((current) => {
        let base = current.map((m) => ({ ...m, fresh: false }));
        // If server signals memory was compacted, trim to last N
        if (typeof data?.trimTo === "number" && base.length > data.trimTo) {
          base = base.slice(-data.trimTo);
        }
        return [...base, { role: "assistant", content: reply, fresh: true }];
      });

      if (typeof data?.essentialsUpdate === "string") {
        setEssentials(data.essentialsUpdate);
      }

      /* Clear "fresh" flag after reveal animation finishes */
      setTimeout(() => {
        setMsgs((current) =>
          current.map((m, i, arr) =>
            i === arr.length - 1 ? { ...m, fresh: false } : m
          )
        );
      }, 1200);
    } catch {
      setMsgs((current) => [
        ...current.map((m) => ({ ...m, fresh: false })),
        {
          role: "assistant",
          content: "Sinyal putus. Cek koneksi lo bro.",
          fresh: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearMemory() {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
    setMsgs([GREETING]);
    setEssentials("");
  }

  const showSuggestions = msgs.length <= 1;

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Tutup chat dengan Yoel" : "Buka chat dengan Yoel"}
        className="fixed bottom-6 right-6 z-[70] group flex items-center gap-3 pl-3 pr-5 py-3 rounded-full bg-paper text-ink hover:bg-ember hover:text-ink transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-ember opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ember" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] font-semibold">
          {open ? "Close" : "Tune in · Talk to Yoel"}
        </span>
      </button>

      {/* Drawer */}
      <div
        className={[
          "fixed inset-0 z-[65] transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        <button
          aria-label="Tutup"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        />

        <aside
          className={[
            "absolute right-0 top-0 h-full w-full sm:w-[440px] bg-ink-2 border-l border-[color:var(--rule)]",
            "flex flex-col transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
          role="dialog"
          aria-label="Chat with Yoel"
        >
          {/* Header */}
          <header className="px-6 pt-6 pb-4 border-b border-[color:var(--rule)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="signal-dot" aria-hidden="true" />
                <span className="kicker">Live · The Wire</span>
              </div>
              <div className="flex items-center gap-3">
                {msgs.length > 1 && (
                  <button
                    onClick={clearMemory}
                    aria-label="Clear memory"
                    className="kicker text-ash hover:text-ember transition-colors"
                    title="Hapus history obrolan di browser ini"
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="kicker text-ash hover:text-paper transition-colors"
                >
                  ESC
                </button>
              </div>
            </div>
            <h3 className="font-display italic text-4xl leading-none mt-3">
              Talk to Yoel<span className="text-ember">.</span>
            </h3>
            <p className="text-bone text-sm mt-2 font-sans">
              AI persona yang ngomong as Yoel, grounded di pengalamannya. Bukan official, bukan
              resmi · just a candid simulacrum.
            </p>
          </header>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
            {msgs.map((m, i) => (
              <MessageBubble key={`${i}-${m.role}`} msg={m} />
            ))}
            {loading && (
              <div className="flex items-center gap-2 kicker text-ash msg-reveal">
                <span className="signal-dot" />
                <span>Yoel lagi mikir…</span>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {showSuggestions && (
            <div className="px-6 pb-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-[color:var(--rule)] text-bone hover:border-ember hover:text-ember transition-all duration-300"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="px-6 pb-6 pt-3 border-t border-[color:var(--rule)]"
          >
            <div className="flex items-end gap-2 bg-ink rounded-card border border-[color:var(--rule)] focus-within:border-ember/60 transition-colors">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Tulis pertanyaan lo…"
                rows={1}
                className="flex-1 bg-transparent text-paper placeholder:text-ash text-sm px-4 py-3 resize-none outline-none max-h-32"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="m-1.5 px-4 py-2 rounded-md bg-paper text-ink kicker disabled:opacity-30 hover:bg-ember transition-colors"
              >
                Send
              </button>
            </div>
            <p className="kicker text-ash mt-3 flex items-center gap-2">
              <span className="signal-dot" aria-hidden="true" />
              Memory aktif · stored locally in your browser
            </p>
          </form>
        </aside>
      </div>
    </>
  );
}

function MessageBubble({ msg }: { msg: Msg }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end msg-reveal">
        <div className="max-w-[80%] bg-paper text-ink rounded-card rounded-br-sm px-4 py-3 text-sm leading-relaxed">
          {msg.content}
        </div>
      </div>
    );
  }
  return (
    <div className={["flex", msg.fresh ? "msg-reveal-slow" : ""].join(" ")}>
      <div className="max-w-[88%] bg-ink rounded-card rounded-bl-sm px-4 py-3 text-sm leading-relaxed text-paper border border-[color:var(--rule)] whitespace-pre-wrap">
        {msg.content}
      </div>
    </div>
  );
}
