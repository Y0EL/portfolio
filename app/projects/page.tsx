import React from "react";
import type { Metadata } from "next";
import { projects, Project } from "./project-data";
import { ProjectSigil } from "app/components/project-sigil";

export const metadata: Metadata = {
  title: "Specimens · Projects",
  description: "Catatan lengkap project Yoel: agentic AI, OSINT, blockchain, dan tools.",
};

const CATEGORIES = [
  "Production · Defense AI",
  "AI · Tooling",
  "Web3 · Sustainability",
  "Apps · Side",
] as const;

export default function Projects() {
  const grouped = CATEGORIES.map((cat) => ({
    cat,
    items: projects.filter((p) => p.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <section className="max-w-[1180px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
      {/* Header */}
      <header className="max-w-3xl">
        <div className="flex items-center gap-3 mb-5">
          <span className="signal-dot" aria-hidden="true" />
          <span className="kicker">Specimens · The full record</span>
        </div>
        <h1 className="display-roman text-6xl md:text-8xl leading-[0.95]">
          Things <span className="display-italic text-ember">I shipped</span>
          <span className="text-ember">.</span>
        </h1>
        <p className="font-sans text-bone text-lg leading-relaxed mt-6 max-w-[58ch]">
          Dari national-scale AI infrastructure sampai sustainability dApp. Setiap entry punya sigil
          sendiri. Tap any card to visit the source.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {grouped.map((g) => (
            <a
              key={g.cat}
              href={`#${slug(g.cat)}`}
              className="kicker px-3 py-1.5 rounded-full border border-[color:var(--rule)] text-bone hover:text-ember hover:border-ember/40 transition-colors"
            >
              {g.cat}{" "}
              <span className="text-ash">({String(g.items.length).padStart(2, "0")})</span>
            </a>
          ))}
        </div>
      </header>

      {/* Grouped sections */}
      {grouped.map((group, gi) => (
        <section
          id={slug(group.cat)}
          key={group.cat}
          className="mt-24 scroll-mt-24"
        >
          <header className="flex items-baseline gap-5 mb-8">
            <span className="font-display italic text-4xl md:text-5xl text-ember leading-none">
              §{String(gi + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="kicker text-ash">Category</p>
              <h2 className="font-display text-3xl md:text-5xl leading-tight">
                {group.cat}
                <span className="text-ember">.</span>
              </h2>
            </div>
          </header>

          <div className="grid md:grid-cols-2 gap-px bg-[color:var(--rule)] border border-[color:var(--rule)] rounded-card overflow-hidden">
            {group.items.map((p) => (
              <ProjectCard key={p.no} project={p} />
            ))}
          </div>
        </section>
      ))}

      {/* Sign-off */}
      <div className="rule-line my-20" />
      <p className="font-display italic text-2xl md:text-3xl text-bone max-w-3xl leading-snug">
        "Engineering bukan soal banyaknya repository.{" "}
        <span className="text-paper">Tapi konsistensi nge-ship yang bener.</span>"
      </p>
      <p className="kicker mt-4 text-ash">/ end of specimens /</p>
    </section>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-ink-2 p-8 md:p-10 hover:bg-ink-3 transition-colors duration-500 flex flex-col"
    >
      {/* Top row: sigil + No + year */}
      <div className="flex items-start justify-between mb-6">
        <div className="text-ash group-hover:text-ember transition-colors duration-500">
          <ProjectSigil name={p.sigil} size={72} />
        </div>
        <div className="text-right">
          <p className="font-display italic text-4xl text-ash leading-none">№{p.no}</p>
          <p className="kicker text-ash mt-2">{p.year}</p>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display text-4xl md:text-5xl text-paper leading-[0.95]">
        {p.title}
        <span className="text-ember">.</span>
      </h3>
      <p className="kicker mt-3 text-bone">{p.subtitle}</p>
      <p className="kicker mt-1 text-ash">{p.role}</p>
      <p className="kicker mt-1 text-ash italic normal-case tracking-normal text-[12px]">{p.type}</p>

      {/* Description */}
      <p className="font-sans text-bone leading-relaxed mt-5 text-[15px]">{p.description}</p>

      {/* Highlights */}
      {p.highlights && p.highlights.length > 0 && (
        <ul className="mt-5 grid gap-1.5">
          {p.highlights.map((h) => (
            <li key={h} className="text-sm text-paper font-sans flex gap-2">
              <span className="text-ember shrink-0">→</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Infra */}
      {p.infra && (
        <p className="kicker text-ember/80 mt-5 normal-case tracking-wide font-mono text-[11px]">
          infra · {p.infra}
        </p>
      )}

      {/* Stack chips */}
      <div className="flex flex-wrap gap-1.5 mt-6">
        {p.stack.map((s) => (
          <span
            key={s}
            className="kicker px-2.5 py-1 rounded-full border border-[color:var(--rule)] text-bone bg-ink/40 text-[10px]"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Visit footer */}
      <div className="mt-7 flex items-center justify-between border-t border-[color:var(--rule)] pt-5">
        <span className="kicker text-ash truncate">{p.source}</span>
        <span className="kicker text-paper group-hover:text-ember transition-colors inline-flex items-center gap-2">
          Visit ↗
        </span>
      </div>
    </a>
  );
}

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
