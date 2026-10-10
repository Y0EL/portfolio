import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import profile from "data/yoel/profile.json";

export const metadata: Metadata = {
  title: "Perjalanan",
  description: "Perjalanan kerja, pendidikan, dan sertifikasi Yoel Andreas Manoppo, dari agensi digital sampai AI Specialist di Piranusa.",
};

const ECOSYSTEM = [
  {
    period: "2024",
    title: "Builder yang didanai dan terverifikasi",
    org: "VeBetterDAO",
    body: "Membangun sistem reward otomatis untuk aksi ramah lingkungan yang diverifikasi lewat blockchain.",
  },
  {
    period: "2024 · 2026",
    title: "Partisipan governance",
    org: "B3TR dan VOT3",
    body: "Ikut diskusi proposal Dynamic Base Allocation dan pengambilan keputusan komunitas.",
  },
];

export default function CareerTimeline() {
  return (
    <>
      <header className="pageHead">
        <Link href="/" className="backLink">
          <ArrowLeft aria-hidden="true" />
          Beranda
        </Link>
        <span className="mono headMeta">
          Perjalanan · {profile.pengalaman_label} bekerja
        </span>
        <h1 className="pageTitle">
          Sampai mana <em>sejauh ini.</em>
        </h1>
        <p className="pageLead">
          Dari alat AI di agensi digital, dApp di ekosistem VeChain, sistem multi agent untuk pemerintahan, sampai
          sekarang AI Specialist di Piranusa dan founder YOTEXT.
        </p>
      </header>

      <section className="pageSection">
        <div className="sectionHeadRow">
          <span className="sideLabel mono">Kerja</span>
          <h2 className="sectionTitle">Tempat saya bekerja.</h2>
        </div>
        <ol className="pathList">
          {profile.pengalaman_kerja.map((job) => (
            <li key={job.id} className="pathItem" data-now={job.periode.includes("Sekarang")}>
              <time>{job.periode}</time>
              <h3>
                {job.perusahaan}
                <span>{job.posisi}</span>
              </h3>
              <p>
                {job.ringkas}
                <small>
                  {job.bidang} · {job.lokasi}
                </small>
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="pageSection">
        <div className="sectionHeadRow">
          <span className="sideLabel mono">Belajar</span>
          <h2 className="sectionTitle">Pendidikan dan sertifikat.</h2>
        </div>
        <ol className="pathList">
          {profile.pendidikan.map((e) => (
            <li key={e.institusi} className="pathItem">
              <time>{e.status}</time>
              <h3>{e.institusi}</h3>
              <p>{e.gelar}</p>
            </li>
          ))}
        </ol>
        <div className="certGrid">
          {profile.sertifikasi.map((c) => (
            <a key={c.kode} href={c.url} target="_blank" rel="noopener noreferrer" className="certCard">
              <span className="mono">
                {c.kode} · {c.tahun}
              </span>
              <h3>{c.judul}</h3>
              <p>
                {c.issuer} <ArrowUpRight className="iconInline" aria-hidden="true" />
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="sectionHeadRow">
          <span className="sideLabel mono">Ekosistem</span>
          <h2 className="sectionTitle">Di luar kantor.</h2>
        </div>
        <ol className="pathList">
          {ECOSYSTEM.map((e) => (
            <li key={e.title} className="pathItem">
              <time>{e.period}</time>
              <h3>
                {e.org}
                <span>{e.title}</span>
              </h3>
              <p>{e.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="pageSection">
        <div className="sectionHeadRow">
          <span className="sideLabel mono">Bahasa</span>
          <h2 className="sectionTitle">Bahasa yang saya gunakan.</h2>
        </div>
        <div className="languageRow">
          {profile.bahasa.map((b) => (
            <div key={b.nama}>
              <strong>{b.nama}</strong>
              <span>{b.level}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
