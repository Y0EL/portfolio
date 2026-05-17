import Link from "next/link";
import type { Metadata } from "next";
import profile from "data/yoel/profile.json";

export const metadata: Metadata = {
  title: "Ledger · Career Timeline",
  description: "Catatan lengkap perjalanan kerja, pendidikan, dan pencapaian Yoel Andreas Manoppo.",
};

type Entry = {
  no: string;
  period: string;
  title: string;
  org: string;
  tag?: string;
  body: string;
};

const ACHIEVEMENTS: Entry[] = [
  {
    no: "VBR-01",
    period: "2024",
    title: "Funded & Verified Builder",
    org: "VeBetterDAO Ecosystem",
    tag: "Sustainability",
    body: "Funded and verified builder on VeBetterDAO untuk sustainable dApps. Bangun automated reward systems untuk eco-actions verified via blockchain. Multiple real-user communities dengan verifiable engagement dan transparency.",
  },
  {
    no: "VBR-02",
    period: "2024 · Present",
    title: "Active Governance Participant",
    org: "B3TR · VOT3 Tokens",
    tag: "Governance",
    body: "Active di VeBetterDAO governance pakai B3TR & VOT3 tokens. Kontributor diskusi Dynamic Base Allocation proposal dan community decision-making.",
  },
];

export default function CareerTimeline() {
  return (
    <section className="max-w-[1180px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
      {/* Header */}
      <header className="max-w-3xl">
        <Link
          href="/"
          className="kicker text-ash hover:text-ember inline-flex items-center gap-2 transition-colors mb-8"
        >
          <span aria-hidden="true">←</span> Back to today
        </Link>
        <div className="flex items-center gap-3 mb-5">
          <span className="signal-dot" aria-hidden="true" />
          <span className="kicker">Ledger · Complete record</span>
        </div>
        <h1 className="display-roman text-6xl md:text-8xl leading-[0.95]">
          The <span className="display-italic text-ember">ledger</span>
          <span className="text-ember">.</span>
        </h1>
        <p className="font-sans text-bone text-lg leading-relaxed mt-6 max-w-[58ch]">
          Catatan lengkap kerja, pendidikan, dan capaian. Disusun seperti buku
          besar · terbaru di atas, sumber di bawah.
        </p>
      </header>

      {/* №01 Work */}
      <SectionBlock
        no="01"
        kicker="Work · Service record"
        title="Where I've shown up."
      >
        <Ledger
          entries={profile.pengalaman_kerja.map((j) => ({
            no: `№${String(j.id).padStart(2, "0")}`,
            period: j.periode,
            title: j.posisi,
            org: j.perusahaan,
            tag: j.bidang,
            body: j.ringkas,
          }))}
        />
      </SectionBlock>

      {/* №02 Education */}
      <SectionBlock no="02" kicker="Education · Certifications" title="What I studied.">
        <Ledger
          entries={profile.pendidikan.map((e, i) => ({
            no: `EDU-${String(i + 1).padStart(2, "0")}`,
            period: e.status || "·",
            title: e.gelar,
            org: e.institusi,
            body: "",
          }))}
        />
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {profile.sertifikasi.map((c) => (
            <a
              key={c.kode}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-[color:var(--rule)] rounded-card p-6 hover:border-[color:var(--rule-strong)] transition-colors block"
            >
              <p className="kicker text-ember">{c.kode}</p>
              <h4 className="font-display italic text-2xl mt-2 text-paper">{c.judul}</h4>
              <p className="font-sans text-bone text-sm mt-3">{c.issuer}</p>
              <p className="kicker mt-3 text-ash group-hover:text-paper transition-colors">
                {c.tahun} · View certificate ↗
              </p>
            </a>
          ))}
        </div>
      </SectionBlock>

      {/* №03 Achievements */}
      <SectionBlock no="03" kicker="Ecosystem · Achievements" title="On-chain & off.">
        <Ledger entries={ACHIEVEMENTS} />
      </SectionBlock>

      {/* №04 Languages */}
      <SectionBlock no="04" kicker="Languages · Spoken" title="How I communicate.">
        <div className="grid sm:grid-cols-3 gap-px bg-[color:var(--rule)] border border-[color:var(--rule)] rounded-card overflow-hidden">
          {profile.bahasa.map((b) => (
            <div key={b.nama} className="bg-ink-2 p-7">
              <p className="kicker text-ember">{b.level}</p>
              <h4 className="font-display text-3xl text-paper mt-3">{b.nama}</h4>
            </div>
          ))}
        </div>
      </SectionBlock>

      <div className="rule-line my-16" />

      <div className="max-w-2xl">
        <p className="font-display italic text-3xl md:text-4xl text-paper leading-tight">
          "A career isn't a straight line · it's a record of <span className="text-ember">attempts</span>."
        </p>
        <p className="kicker mt-5 text-ash">· Y. A. Manoppo, Jakarta</p>
      </div>

      <div className="mt-12">
        <Link
          href="/"
          className="kicker inline-flex items-center gap-2 bg-paper text-ink px-5 py-3 rounded-md hover:bg-ember transition-colors duration-300"
        >
          ← Back to today
        </Link>
      </div>
    </section>
  );
}

function SectionBlock({
  no,
  kicker,
  title,
  children,
}: {
  no: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-24">
      <header>
        <div className="flex items-baseline gap-5">
          <span className="font-display italic text-5xl text-ember leading-none">
            №{no}
          </span>
          <span className="kicker text-ash">{kicker}</span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl leading-[0.98] mt-4 text-paper">
          {title.split(".")[0]}
          <span className="text-ember">.</span>
        </h2>
      </header>
      <div className="mt-10">{children}</div>
    </div>
  );
}

function Ledger({ entries }: { entries: Entry[] }) {
  return (
    <div className="space-y-px bg-[color:var(--rule)] border border-[color:var(--rule)] rounded-card overflow-hidden">
      {entries.map((e) => (
        <article
          key={`${e.no}-${e.title}`}
          className="group bg-ink p-6 md:p-8 grid md:grid-cols-12 gap-4 items-baseline hover:bg-ink-2 transition-colors duration-300"
        >
          <div className="md:col-span-2">
            <span className="font-display italic text-2xl text-ash group-hover:text-ember transition-colors">
              {e.no}
            </span>
          </div>
          <div className="md:col-span-4">
            <p className="kicker text-ash mb-1">{e.period}</p>
            <h4 className="font-display text-2xl md:text-3xl text-paper leading-tight">
              {e.org}
            </h4>
          </div>
          <div className="md:col-span-6">
            <p className="font-sans text-bone leading-relaxed">
              <span className="text-paper">{e.title}.</span>{" "}
              {e.body}
            </p>
            {e.tag && <p className="kicker mt-3 text-ash">{e.tag}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}
