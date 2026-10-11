"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react";

type Word = [string, number, number, number];
type Track = { audio: string; words: string; duration: number };

const SPEEDS = [1, 1.25, 1.5, 0.85];
const FOLLOW_PAUSE_MS = 4500;

function norm(text: string) {
  return text.toLowerCase().normalize("NFKD").replace(/[^0-9a-z]/g, "");
}

function clock(t: number) {
  const safe = Math.max(0, t || 0);
  return `${Math.floor(safe / 60)}:${String(Math.floor(safe % 60)).padStart(2, "0")}`;
}

function wrapWords(root: HTMLElement) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest("pre, code, .katex, script, style, .readWord")) return NodeFilter.FILTER_REJECT;
      return node.nodeValue && node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  const spans: HTMLSpanElement[] = [];
  for (const node of nodes) {
    const frag = document.createDocumentFragment();
    for (const part of node.nodeValue!.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part) || !norm(part)) {
        frag.appendChild(document.createTextNode(part));
        continue;
      }
      const span = document.createElement("span");
      span.className = "readWord";
      span.textContent = part;
      frag.appendChild(span);
      spans.push(span);
    }
    node.parentNode!.replaceChild(frag, node);
  }
  return spans;
}

function align(words: Word[], spans: HTMLSpanElement[]) {
  const keys = spans.map((s) => norm(s.textContent || ""));
  const map: (HTMLSpanElement | null)[] = new Array(words.length).fill(null);
  let ptr = 0;
  for (let i = 0; i < words.length; i++) {
    const key = norm(words[i][0]);
    const next = i + 1 < words.length ? norm(words[i + 1][0]) : null;
    let hit = -1;
    for (let j = ptr; j < Math.min(keys.length, ptr + 8); j++) {
      if (keys[j] === key) {
        hit = j;
        break;
      }
    }
    if (hit < 0) {
      for (let j = ptr; j < Math.min(keys.length, ptr + 600); j++) {
        if (keys[j] === key && (next === null || keys[j + 1] === next)) {
          hit = j;
          break;
        }
      }
    }
    if (hit < 0) continue;
    map[i] = spans[hit];
    spans[hit].dataset.at = String(words[i][1]);
    ptr = hit + 1;
  }
  return map;
}

function sentences(words: Word[]) {
  const ids: number[] = [];
  let id = 0;
  for (let i = 0; i < words.length; i++) {
    ids.push(id);
    if (/[.!?…]["”')]*$/.test(words[i][0]) || words[i][3] > 0) id++;
  }
  return ids;
}

function Reel({ amount }: { amount: number }) {
  const r = 15 + amount * 17;
  return (
    <svg className="reel" viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r={r} className="reelTape" />
      <g className="reelHub">
        <circle cx="40" cy="40" r="13" className="reelCore" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <rect key={deg} x="38.5" y="27" width="3" height="6" rx="1" transform={`rotate(${deg} 40 40)`} className="reelTooth" />
        ))}
        <circle cx="40" cy="40" r="4" className="reelPin" />
      </g>
    </svg>
  );
}

export function CassettePlayer({ track, title, cover }: { track: Track; title: string; cover?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const shellRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<Word[] | null>(null);
  const mapRef = useRef<(HTMLSpanElement | null)[]>([]);
  const sentenceRef = useRef<number[]>([]);
  const activeRef = useRef({ word: -1, sentence: -1 });
  const followRef = useRef(0);
  const frameRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [docked, setDocked] = useState(false);
  const [started, setStarted] = useState(false);

  const body = () => document.querySelector<HTMLElement>(".articleBody");

  const clearActive = useCallback(() => {
    const { word, sentence } = activeRef.current;
    if (word >= 0) mapRef.current[word]?.classList.remove("isNow");
    if (sentence >= 0) {
      sentenceRef.current.forEach((id, i) => {
        if (id === sentence) mapRef.current[i]?.classList.remove("inSentence");
      });
    }
    activeRef.current = { word: -1, sentence: -1 };
  }, []);

  const follow = useCallback((span: HTMLElement) => {
    if (Date.now() < followRef.current) return;
    const rect = span.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.top > vh * 0.2 && rect.bottom < vh * 0.66) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: window.scrollY + rect.top - vh * 0.36, behavior: reduce ? "auto" : "smooth" });
  }, []);

  const paint = useCallback(() => {
    const audio = audioRef.current;
    const words = wordsRef.current;
    if (!audio || !words) return;
    const t = audio.currentTime;
    setTime(t);
    let lo = 0;
    let hi = words.length - 1;
    let idx = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (words[mid][1] <= t) {
        idx = mid;
        lo = mid + 1;
      } else hi = mid - 1;
    }
    while (idx > 0 && !mapRef.current[idx]) idx--;
    const span = idx >= 0 ? mapRef.current[idx] : null;
    const prev = activeRef.current;
    if (idx !== prev.word) {
      if (prev.word >= 0) mapRef.current[prev.word]?.classList.remove("isNow");
      span?.classList.add("isNow");
      const sentence = idx >= 0 ? sentenceRef.current[idx] : -1;
      if (sentence !== prev.sentence) {
        sentenceRef.current.forEach((id, i) => {
          const s = mapRef.current[i];
          if (!s) return;
          if (id === prev.sentence) s.classList.remove("inSentence");
          if (id === sentence) s.classList.add("inSentence");
        });
      }
      activeRef.current = { word: idx, sentence };
      if (span) follow(span);
    }
    if (span) {
      const [, s, e] = words[idx];
      const p = e > s ? Math.min(1, Math.max(0, (t - s) / (e - s))) : 1;
      span.style.setProperty("--p", `${Math.round(p * 100)}%`);
    }
  }, [follow]);

  const loop = useCallback(() => {
    paint();
    frameRef.current = requestAnimationFrame(loop);
  }, [paint]);

  const prepare = useCallback(async () => {
    if (wordsRef.current) return true;
    const root = body();
    if (!root) return false;
    setLoading(true);
    try {
      const res = await fetch(track.words);
      const data = (await res.json()) as { words: Word[] };
      wordsRef.current = data.words;
      mapRef.current = align(data.words, wrapWords(root));
      sentenceRef.current = sentences(data.words);
      setReady(true);
      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  }, [track.words]);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    await prepare();
    followRef.current = 0;
    setStarted(true);
    audio.play().catch(() => setPlaying(false));
  }, [prepare]);

  const seek = useCallback(
    (to: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = Math.min(Math.max(0, to), track.duration);
      followRef.current = 0;
      setTime(audio.currentTime);
      paint();
    },
    [paint, track.duration]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => {
      setPlaying(true);
      body()?.setAttribute("data-reading", "on");
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(loop);
    };
    const onPause = () => {
      setPlaying(false);
      body()?.removeAttribute("data-reading");
      cancelAnimationFrame(frameRef.current);
      paint();
    };
    const onEnd = () => {
      onPause();
      clearActive();
      audio.currentTime = 0;
      setTime(0);
      setStarted(false);
      window.dispatchEvent(new Event("narrationEnd"));
    };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnd);
      cancelAnimationFrame(frameRef.current);
      body()?.removeAttribute("data-reading");
    };
  }, [loop, paint, clearActive]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = SPEEDS[speed];
  }, [speed]);

  useEffect(() => {
    const hold = () => {
      followRef.current = Date.now() + FOLLOW_PAUSE_MS;
    };
    const keys = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) hold();
    };
    window.addEventListener("wheel", hold, { passive: true });
    window.addEventListener("touchmove", hold, { passive: true });
    window.addEventListener("keydown", keys);
    return () => {
      window.removeEventListener("wheel", hold);
      window.removeEventListener("touchmove", hold);
      window.removeEventListener("keydown", keys);
    };
  }, []);

  useEffect(() => {
    const root = body();
    if (!root || !ready) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a")) return;
      const word = target.closest<HTMLElement>(".readWord");
      if (!word?.dataset.at) return;
      seek(Number(word.dataset.at));
      if (audioRef.current?.paused) audioRef.current.play().catch(() => {});
    };
    root.addEventListener("click", onClick);
    root.setAttribute("data-seekable", "on");
    return () => {
      root.removeEventListener("click", onClick);
      root.removeAttribute("data-seekable");
    };
  }, [ready, seek]);

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setDocked(!entry.isIntersecting && entry.boundingClientRect.top < 0), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!("mediaSession" in navigator) || !started) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist: "Yoel Andreas Manoppo",
      album: "Tulisan yoel.online",
      artwork: cover ? [{ src: cover, sizes: "1664x928", type: "image/webp" }] : [],
    });
    navigator.mediaSession.setActionHandler("play", () => audioRef.current?.play());
    navigator.mediaSession.setActionHandler("pause", () => audioRef.current?.pause());
    navigator.mediaSession.setActionHandler("seekbackward", () => seek((audioRef.current?.currentTime || 0) - 10));
    navigator.mediaSession.setActionHandler("seekforward", () => seek((audioRef.current?.currentTime || 0) + 10));
    navigator.mediaSession.setActionHandler("seekto", (d) => d.seekTime !== undefined && seek(d.seekTime));
  }, [started, title, cover, seek]);

  const progress = track.duration ? time / track.duration : 0;
  const pct = `${(progress * 100).toFixed(2)}%`;
  const PlayIcon = playing ? Pause : Play;
  const playLabel = playing ? "Jeda" : loading ? "Menyiapkan" : time > 0 ? "Lanjutkan" : "Putar";

  return (
    <>
      <section ref={shellRef} className="cassette" data-playing={playing ? "on" : "off"} aria-label="Dengarkan tulisan ini">
        <div className="cassetteShell" style={{ ["--spin" as string]: `${2.6 / SPEEDS[speed]}s` }}>
          <div className="cassetteLabel">
            <span className="mono">Sisi A · {clock(track.duration)}</span>
            <strong>{title}</strong>
            <span className="cassetteVoice">Dibacakan dengan suara AI saya</span>
          </div>
          <div className="cassetteWindow">
            <Reel amount={1 - progress} />
            <span className="cassetteTape" />
            <Reel amount={progress} />
          </div>
          <span className="cassetteScrew" data-pos="tl" />
          <span className="cassetteScrew" data-pos="tr" />
          <span className="cassetteScrew" data-pos="bl" />
          <span className="cassetteScrew" data-pos="br" />
        </div>

        <div className="deck">
          <button type="button" className="deckPlay" onClick={toggle} aria-label={playLabel} disabled={loading}>
            <PlayIcon aria-hidden="true" />
            <span>{playLabel}</span>
          </button>
          <div className="deckMain">
            <input
              type="range"
              className="deckSeek"
              min={0}
              max={track.duration}
              step={0.1}
              value={time}
              style={{ ["--p" as string]: pct }}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Posisi audio"
            />
            <div className="deckRow">
              <span className="mono deckTime">
                {clock(time)} / {clock(track.duration)}
              </span>
              <div className="deckTools">
                <button type="button" onClick={() => seek(time - 10)} aria-label="Mundur 10 detik">
                  <RotateCcw aria-hidden="true" />
                </button>
                <button type="button" onClick={() => seek(time + 10)} aria-label="Maju 10 detik">
                  <RotateCw aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="mono deckSpeed"
                  onClick={() => setSpeed((s) => (s + 1) % SPEEDS.length)}
                  aria-label="Ubah kecepatan"
                >
                  {SPEEDS[speed]}x
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className="deckHint">Teks akan menyala dan bergulir mengikuti suara. Klik kata mana pun untuk lompat ke bagian itu.</p>
        <audio ref={audioRef} src={track.audio} preload="none" />
      </section>

      <div className="miniDeck" data-show={docked && started ? "on" : "off"} aria-hidden={!(docked && started)}>
        <button type="button" className="miniPlay" onClick={toggle} aria-label={playLabel} tabIndex={docked && started ? 0 : -1}>
          <PlayIcon aria-hidden="true" />
        </button>
        <div className="miniInfo">
          <strong>{title}</strong>
          <span className="mono">
            {clock(time)} / {clock(track.duration)}
          </span>
        </div>
        <button
          type="button"
          className="mono deckSpeed"
          onClick={() => setSpeed((s) => (s + 1) % SPEEDS.length)}
          aria-label="Ubah kecepatan"
          tabIndex={docked && started ? 0 : -1}
        >
          {SPEEDS[speed]}x
        </button>
        <span className="miniBar" style={{ ["--p" as string]: pct }} />
      </div>
    </>
  );
}
