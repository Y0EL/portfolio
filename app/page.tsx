import Image from "next/image";
import Link from "next/link";
import profile from "data/yoel/profile.json";
import { featuredProjects } from "./projects/project-data";
import { ProjectSigil } from "./components/project-sigil";
import { socialLinks } from "./config";

const TICKER_ITEMS = [
  "AI Forward Deployed Engineer",
  "Multi-agent systems",
  "LangGraph · LangChain",
  "Vue 3 tactical frontends",
  "VeChain · Solidity",
  "Government AI infrastructure",
  "Jakarta, ID",
  "Open to opportunities",
];

const STATS = [
  { value: "03", label: "Years shipping" },
  { value: "12", label: "Specimens shipped" },
  { value: "40+", label: "Public repos" },
  { value: "929", label: "Vendors / 1 night" },
];

const FREQUENCIES = [
  {
    label: "Music",
    title: "Cubicube",
    detail: "Producing on Spotify since 2020 · human craft fused with AI-assisted production.",
    href: `https://open.spotify.com/artist/${profile.musik.spotify_artist_id}`,
  },
  {
    label: "Writing",
    title: "Field notes & essays",
    detail: "Career, AI, workplace, music · written in Bahasa Indonesia from the ground.",
    href: "/blog",
  },
  {
    label: "Photos",
    title: "Plates from Jakarta",
    detail: "A slow-burn record of light, streets and quiet moments.",
    href: "/photos",
  },
];

export default function Page() {
  return (
    <div className="relative vignette">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative max-w-[1180px] mx-auto px-6 lg:px-10 pt-12 lg:pt-20 pb-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end stagger">
          {/* Left: type-driven hero */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-8">
              <span className="signal-dot" aria-hidden="true" />
              <span className="kicker">
                Live · Jakarta · No. {profile.pengalaman_kerja[0].periode}
              </span>
            </div>

            <h1 className="display-roman text-[clamp(56px,9.5vw,148px)]">
              Building agents
              <br />
              <span className="display-italic text-paper">for the </span>
              <span className="display-italic text-ember">state</span>
              <span className="display-italic text-ember">.</span>
            </h1>

            <p className="font-sans text-bone text-lg md:text-xl leading-relaxed mt-8 max-w-[58ch]">
              Saya <span className="text-paper">Yoel Andreas Manoppo</span> ·{" "}
              <span className="text-paper">AI Forward Deployed Engineer</span> di tim inti 4 orang
              yang membangun infrastruktur multi-agent skala nasional untuk operasi intelijen di
              Indonesia. Sebelumnya: blockchain, eCommerce, agency. Selalu: musisi di samping.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="#wire"
                className="kicker inline-flex items-center gap-2 bg-paper text-ink px-5 py-3 rounded-md hover:bg-ember transition-colors duration-300"
              >
                Tune in · Talk to me
                <ArrowRight />
              </Link>
              <Link
                href={socialLinks.email}
                className="kicker inline-flex items-center gap-2 text-bone hover:text-paper px-5 py-3 rounded-md border border-[color:var(--rule)] hover:border-[color:var(--rule-strong)] transition-colors duration-300"
              >
                Engage · Email
              </Link>
            </div>
          </div>

          {/* Right: portrait + nameplate */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative">
              {/* Portrait */}
              <div className="relative overflow-hidden rounded-portrait aspect-[4/5] bg-ink-2 border border-[color:var(--rule)]">
                <Image
                  src="/yoel.jpg"
                  alt="Yoel Andreas Manoppo"
                  fill
                  priority
                  className="object-cover grayscale-[0.15] contrast-[1.04]"
                  sizes="(max-width: 1024px) 80vw, 420px"
                />
                {/* Top inset corner mark */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <span className="signal-dot" aria-hidden="true" />
                  <span className="kicker text-paper drop-shadow-lg">On the record</span>
                </div>
                {/* Bottom plate */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-ink via-ink/85 to-transparent">
                  <p className="kicker text-ash mb-1">№ 017 · {dateStamp()}</p>
                  <p className="font-display italic text-3xl leading-none">
                    Yoel Andreas Manoppo<span className="text-ember">.</span>
                  </p>
                </div>
              </div>

              {/* Floating chips */}
              <div className="absolute -bottom-5 -left-3 lg:-left-6 hidden md:flex gap-2 z-20">
                <Chip>AI Engineer</Chip>
                <Chip>UI Specialist</Chip>
              </div>
            </div>
          </div>
        </div>

        {/* Stat ledger */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-[color:var(--rule)] border border-[color:var(--rule)] rounded-card overflow-hidden">
          {STATS.map((s) => (
            <div key={s.label} className="bg-ink-2 px-6 py-7">
              <div className="mono-stat text-paper text-3xl md:text-4xl tabular-nums">
                {s.value}
              </div>
              <p className="kicker mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TICKER ──────────────────────────────────────────── */}
      <section
        aria-hidden="true"
        className="overflow-hidden border-y border-[color:var(--rule)] py-5 bg-ink"
      >
        <div className="marquee-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <span key={i} className="kicker text-bone flex items-center gap-12 whitespace-nowrap">
              {t}
              <span className="text-ember">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ─── №01 · NOW ───────────────────────────────────────── */}
      <section className="relative max-w-[1180px] mx-auto px-6 lg:px-10 py-24">
        <SectionHeader no="01" kicker="Now · The Pursuit" title="What I'm building." />
        <div className="grid lg:grid-cols-12 gap-10 mt-12">
          <div className="lg:col-span-5">
            <p className="kicker text-bone mb-3">{profile.pengalaman_kerja[0].periode}</p>
            <h3 className="font-display italic text-4xl md:text-5xl leading-[1.05]">
              {profile.pengalaman_kerja[0].posisi}
            </h3>
            <p className="kicker mt-3 text-ember">@ {profile.pengalaman_kerja[0].perusahaan}</p>
          </div>
          <div className="lg:col-span-7">
            <p className="font-sans text-bone text-lg leading-relaxed">
              {profile.ringkasan}
            </p>
            <div className="rule-line my-7" />
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-bone font-sans">
              <li className="flex gap-3">
                <span className="text-ember">→</span> LangGraph state machines + multi-tier search pipelines
              </li>
              <li className="flex gap-3">
                <span className="text-ember">→</span> Vue 3 tactical frontends · MapLibre · ECharts
              </li>
              <li className="flex gap-3">
                <span className="text-ember">→</span> Full observability stack · Langfuse · Prometheus · Grafana
              </li>
              <li className="flex gap-3">
                <span className="text-ember">→</span> Self-hosted Ollama · CUDA 12.x · Whisper · Granite · NLLB
              </li>
            </ul>
          </div>
        </div>
      </section>

      <DispatchRule />

      {/* ─── №02 · SERVICE RECORD ────────────────────────────── */}
      <section className="relative max-w-[1180px] mx-auto px-6 lg:px-10 py-24">
        <SectionHeader no="02" kicker="Service Record" title="The ledger so far." />
        <div className="mt-12 space-y-px bg-[color:var(--rule)] border border-[color:var(--rule)] rounded-card overflow-hidden">
          {profile.pengalaman_kerja.map((job, i) => (
            <article
              key={`${job.perusahaan}-${i}`}
              className="group bg-ink p-6 md:p-8 grid md:grid-cols-12 gap-4 items-baseline hover:bg-ink-2 transition-colors duration-300"
            >
              <div className="md:col-span-1">
                <span className="font-display italic text-3xl text-ash group-hover:text-ember transition-colors">
                  №{String(job.id).padStart(2, "0")}
                </span>
              </div>
              <div className="md:col-span-4">
                <p className="kicker text-ash mb-1">{job.periode}</p>
                <h4 className="font-display text-2xl md:text-3xl text-paper leading-tight">
                  {job.perusahaan}
                </h4>
              </div>
              <div className="md:col-span-7">
                <p className="font-sans text-bone leading-relaxed">
                  <span className="text-paper">{job.posisi}.</span> {job.ringkas}
                </p>
                <p className="kicker mt-3 text-ash">{job.bidang}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <DispatchRule />

      {/* ─── №03 · SPECIMENS ─────────────────────────────────── */}
      <section className="relative max-w-[1180px] mx-auto px-6 lg:px-10 py-24">
        <SectionHeader no="03" kicker="Specimens · Featured work" title="Things I shipped." />

        <div className="mt-12 grid md:grid-cols-2 gap-px bg-[color:var(--rule)] border border-[color:var(--rule)] rounded-card overflow-hidden">
          {featuredProjects.map((p) => (
            <a
              key={p.no}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-ink-2 p-8 md:p-10 hover:bg-ink-3 transition-colors duration-500 flex flex-col"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="text-ash group-hover:text-ember transition-colors duration-500">
                  <ProjectSigil name={p.sigil} size={72} />
                </div>
                <div className="text-right">
                  <p className="font-display italic text-4xl text-ash leading-none">
                    №{p.no}
                  </p>
                  <p className="kicker text-ash mt-2">{p.year}</p>
                </div>
              </div>
              <h4 className="font-display text-4xl md:text-5xl text-paper leading-[0.95]">
                {p.title}
                <span className="text-ember">.</span>
              </h4>
              <p className="kicker mt-3 text-bone">{p.subtitle}</p>
              <p
                className="font-sans text-bone leading-relaxed mt-5 flex-1 text-[15px]"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {p.description}
              </p>
              {p.highlights && p.highlights.length > 0 && (
                <ul className="mt-5 grid gap-1.5">
                  {p.highlights.slice(0, 3).map((h) => (
                    <li
                      key={h}
                      className="text-sm text-paper font-sans flex gap-2"
                    >
                      <span className="text-ember shrink-0">→</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-1.5 mt-6">
                {p.stack.slice(0, 5).map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
              <div className="mt-7 flex items-center justify-between border-t border-[color:var(--rule)] pt-5">
                <span className="kicker text-ash truncate">{p.source}</span>
                <span className="kicker text-paper group-hover:text-ember transition-colors inline-flex items-center gap-2">
                  Visit ↗
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="font-sans text-bone max-w-[58ch] leading-relaxed">
            Itu yang highlight. Ada{" "}
            <span className="text-paper font-medium">8 specimen lagi</span> di halaman
            full · OSINT geolocator, AntiFraud heuristics, blockchain validation, sustainability
            dApps, dan AI tooling.
          </p>
          <Link
            href="/projects"
            className="kicker inline-flex items-center gap-2 bg-paper text-ink px-5 py-3 rounded-md hover:bg-ember transition-colors duration-300"
          >
            See full specimens ↗
          </Link>
        </div>
      </section>

      <DispatchRule />

      {/* ─── №04 · STACK ─────────────────────────────────────── */}
      <section className="relative max-w-[1180px] mx-auto px-6 lg:px-10 py-24">
        <SectionHeader no="04" kicker="The Stack" title="Tools I reach for." />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(profile.keahlian).map(([group, items]) => (
            <div
              key={group}
              className="border border-[color:var(--rule)] rounded-card p-7 hover:border-[color:var(--rule-strong)] transition-colors duration-500"
            >
              <p className="kicker text-ember">{group}</p>
              <div className="flex flex-wrap gap-x-3 gap-y-2 mt-5">
                {(items as string[]).map((it, i) => (
                  <span
                    key={it}
                    className="font-display text-xl md:text-2xl text-paper hover:italic transition-all"
                  >
                    {it}
                    {i < (items as string[]).length - 1 && (
                      <span className="text-ash mx-1">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <DispatchRule />

      {/* ─── №05 · FREQUENCIES ───────────────────────────────── */}
      <section className="relative max-w-[1180px] mx-auto px-6 lg:px-10 py-24">
        <SectionHeader no="05" kicker="Other Frequencies" title="Off the dispatch beat." />
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {FREQUENCIES.map((f) => (
            <a
              key={f.title}
              href={f.href}
              target={f.href.startsWith("http") ? "_blank" : undefined}
              rel={f.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group border border-[color:var(--rule)] rounded-card p-7 hover:border-[color:var(--rule-strong)] flex flex-col bg-ink-2 hover:bg-ink-3 transition-all duration-500"
            >
              <p className="kicker text-ember">{f.label}</p>
              <h5 className="font-display italic text-3xl text-paper mt-3 leading-tight">
                {f.title}
              </h5>
              <p className="font-sans text-bone mt-3 flex-1 text-[15px] leading-relaxed">
                {f.detail}
              </p>
              <span className="kicker mt-6 text-paper group-hover:text-ember transition-colors inline-flex items-center gap-2">
                Open <ArrowRight />
              </span>
            </a>
          ))}
        </div>
      </section>

      <DispatchRule />

      {/* ─── №06 · THE WIRE (CHAT CTA) ───────────────────────── */}
      <section
        id="wire"
        className="relative max-w-[1180px] mx-auto px-6 lg:px-10 py-24"
      >
        <SectionHeader no="06" kicker="The Wire · Live" title="Talk to Yoel directly." />
        <div className="mt-12 relative rounded-card overflow-hidden border border-[color:var(--rule)] bg-ink-2">
          <div className="grid lg:grid-cols-12 gap-8 p-8 md:p-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="signal-dot" aria-hidden="true" />
                <span className="kicker">Channel open</span>
              </div>
              <h3 className="font-display text-4xl md:text-6xl leading-[0.96]">
                Bukan FAQ.
                <br />
                <span className="display-italic text-ember">A frequency.</span>
              </h3>
              <p className="font-sans text-bone mt-6 max-w-[52ch] leading-relaxed">
                AI persona yang grounded di pengalamannya · bukan bot resmi. Tanya soal kerjaan,
                project, salary, opinion teknis, sampai musik. Gue jawab as honest as i can.
              </p>
              <p className="kicker mt-7 text-ash">
                <span className="signal-dot inline-block mr-2 align-middle" aria-hidden="true" />
                Live channel · Memory aktif per browser · Data lo tetep di device lo
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-end gap-3">
              <ExampleQ q="Lo lagi ngerjain apa di PT. GSP?" />
              <ExampleQ q="Stack apa yang lo pakai sehari-hari?" />
              <ExampleQ q="Berapa expected salary lo?" />
              <p className="kicker text-ash mt-2">
                Klik tombol <span className="text-paper">"Tune in"</span> di kanan-bawah untuk buka
                channel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <DispatchRule />

      {/* ─── №07 · ENDNOTES ──────────────────────────────────── */}
      <section className="relative max-w-[1180px] mx-auto px-6 lg:px-10 py-24">
        <SectionHeader no="07" kicker="Engage" title="Get in touch." />
        <div className="mt-12 grid md:grid-cols-2 gap-10">
          <div>
            <p className="kicker text-ember mb-3">Direct lines</p>
            <ul className="space-y-3 font-sans text-lg">
              <li>
                <a
                  href={socialLinks.email}
                  className="link-underline text-paper hover:text-ember"
                >
                  yoelandreasmanoppo@gmail.com
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${profile.telepon.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-paper hover:text-ember"
                >
                  {profile.telepon}
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-paper hover:text-ember"
                >
                  linkedin.com/in/yoelmanoppo
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="kicker text-ember mb-3">Off the record</p>
            <ul className="space-y-3 font-sans text-lg">
              <li>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-paper hover:text-ember"
                >
                  github.com/Y0EL
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-paper hover:text-ember"
                >
                  @vehunt on X
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-paper hover:text-ember"
                >
                  @yoelmanoppo on IG
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 max-w-3xl">
          <p className="font-display italic text-3xl md:text-4xl leading-[1.15] text-paper">
            "If you're building something at the intersection of{" "}
            <span className="text-ember">agents</span>, ground-truth data, and{" "}
            <span className="text-ember">tactical UI</span> · let's talk."
          </p>
          <p className="kicker mt-5">· Y. A. Manoppo, Jakarta</p>
        </div>
      </section>
    </div>
  );
}

/* ─── Components ─────────────────────────────────────────── */

function SectionHeader({
  no,
  kicker,
  title,
}: {
  no: string;
  kicker: string;
  title: string;
}) {
  return (
    <header>
      <div className="flex items-baseline gap-5">
        <span className="font-display italic text-5xl md:text-6xl text-ember leading-none">
          №{no}
        </span>
        <span className="kicker text-ash">{kicker}</span>
      </div>
      <h2 className="font-display text-5xl md:text-7xl leading-[0.98] mt-4 text-paper">
        {title.split(".")[0]}
        <span className="text-ember">.</span>
      </h2>
    </header>
  );
}

function DispatchRule() {
  return (
    <div className="max-w-[1180px] mx-auto px-6 lg:px-10">
      <div className="flex items-center gap-4">
        <div className="rule-line flex-1" />
        <span className="kicker text-ash">· · ·</span>
        <div className="rule-line flex-1" />
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="kicker px-3 py-1.5 rounded-full border border-[color:var(--rule)] text-bone bg-ink/40 backdrop-blur-sm">
      {children}
    </span>
  );
}

function ExampleQ({ q }: { q: string }) {
  return (
    <div className="font-sans text-paper bg-ink rounded-card px-5 py-4 border border-[color:var(--rule)]">
      <span className="kicker text-ash mr-2">Q.</span>
      {q}
    </div>
  );
}

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="transition-transform group-hover:translate-x-0.5"
    >
      <path
        d="M1 7h12M8 2l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function dateStamp() {
  return new Date()
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase();
}
