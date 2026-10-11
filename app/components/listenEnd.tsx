"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Pick = { slug: string; title: string };

export function ListenEnd({ picks, whatsapp }: { picks: Pick[]; whatsapp: string }) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onEnd = () => {
      setOpen(true);
      requestAnimationFrame(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        ref.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      });
    };
    window.addEventListener("narrationEnd", onEnd);
    return () => window.removeEventListener("narrationEnd", onEnd);
  }, []);

  if (!open) return null;

  return (
    <section ref={ref} className="listenEnd" aria-live="polite">
      <span className="mono">Selesai didengerin</span>
      <h2>
        Thanks udah dengerin <em>sampai habis.</em>
      </h2>
      <p>
        Kalau lo enjoy sama cara gue cerita, masih ada beberapa tulisan lain yang worth it buat dibaca atau
        didengerin. Dan kalau bisnis lo lagi butuh website atau domain yang proper, let&apos;s talk. Gue bantu dari
        ngobrolin ide sampai website lo live.
      </p>
      <div className="listenEndActions">
        <Link href="/blog" className="pillButton pillPrimary">
          Baca tulisan gue yang lain
          <ArrowRight aria-hidden="true" />
        </Link>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="pillButton pillGhost">
          Let&apos;s build your website
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      {picks.length > 0 && (
        <ul className="listenEndPicks">
          {picks.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`}>
                <span className="mono">Up next</span>
                <strong>{p.title}</strong>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
