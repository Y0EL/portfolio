type Milestone = { year: string; title: string; tag: string; turn?: "big" | "small" };

const MILESTONES: Milestone[] = [
  { year: "2020", title: "Cubicube debut", tag: "Spotify · musik mulai" },
  { year: "2020", title: "GhibranTravel", tag: "Frontend developer · React" },
  { year: "2021", title: "Sekriptor", tag: "Zero code AI script tool" },
  { year: "2022", title: "ZANDO Agency", tag: "AI specialist · internal tools" },
  { year: "2023", title: "Harvard CS50X · CS50AI", tag: "Sekolah mandiri · CS fundamentals" },
  { year: "2023", title: "EFSET C2", tag: "English proficient level" },
  { year: "2024", title: "AI Deskriptor", tag: "Ecommerce content at scale" },
  { year: "2024", title: "ReUse · founded", tag: "VeBetterDAO funded · co founder · CTO", turn: "small" },
  { year: "2024", title: "SoapyWorld", tag: "Gamified sustainability dApp · 800+ actions" },
  { year: "2024", title: "PT. HERUN · Scope of Work", tag: "Documentation platform" },
  { year: "Mei 2025", title: "PT. GSP", tag: "AI forward deployed engineer · 4 orang tim inti · BNPT", turn: "big" },
  { year: "2025", title: "Autocrawl", tag: "929 vendors / 1 night · 12x throughput" },
  { year: "2025", title: "Atlas · Geocek · Sentinel", tag: "Voice AI · OSINT · antifraud" },
  { year: "2026", title: "YOTA · Field Dispatch · 164 lamaran", tag: "Meeting AI · portfolio · job automation" },
];

export function Roadmap() {
  return (
    <figure className="roadmap" aria-label="Roadmap 2020 sampai 2026">
      <figcaption className="roadmapHead">
        <span className="mono">Roadmap · 2020 sampai 2026</span>
        <strong>
          <em>The ledger,</em> year by year.
        </strong>
      </figcaption>
      <ol className="roadmapList">
        {MILESTONES.map((m) => (
          <li key={m.title} className="roadmapItem" data-turn={m.turn || "none"}>
            <span className="mono roadmapYear">{m.year}</span>
            <span className="roadmapDot" aria-hidden="true" />
            <div>
              <h4>{m.title}</h4>
              <span className="mono roadmapTag">{m.tag}</span>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
