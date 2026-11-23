import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import profile from "data/yoel/profile.json";
import { showcase, archive, workHref, type ShowcaseWork } from "./projects/project-data";
import { BrowserFrame, PhoneFrame, toneClass } from "./components/workFrames";
import { ArchiveRow } from "./components/archiveRow";
import { CaseList } from "./components/caseList";
import { socialLinks } from "./config";
import { withLiveVisibilityAll } from "./lib/repoVisibility";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.yoel.online",
  },
};

const SERVICES = [
  {
    title: "Arsitektur produk AI",
    body: "Memetakan masalah menjadi alur, data, peran AI, dan batasnya. Termasuk kapan AI boleh bertindak sendiri dan kapan harus menunggu persetujuan manusia.",
    example: "Seperti penanda absen janggal di Tiba",
  },
  {
    title: "Produk dari nol sampai rilis",
    body: "Web, Android, dan desktop dari satu kode, lengkap dengan login, peran pengguna, notifikasi, dan proses rilis yang berjalan otomatis.",
    example: "Seperti Tiba, Nada, dan Catetin",
  },
  {
    title: "AI yang bisa diperiksa",
    body: "Jawaban AI disertai sumber dan riwayat yang bisa ditelusuri, supaya tim berani memakainya untuk keputusan sungguhan.",
    example: "Seperti EVIDNCE dan YOTEXT",
  },
  {
    title: "Peluncuran dan website produk",
    body: "Landing page, domain, SEO dasar, dan cerita produk yang membuat calon pengguna paham dalam satu layar.",
    example: "Seperti tiba.ai.id, yotext.app, dan Piranusa",
  },
];

const TILE_WORDS: Record<string, ReactNode> = {
  tiba: (
    <>
      TIBA<span className="stageAccent">.</span>
    </>
  ),
  nada: (
    <>
      NADA<span className="stageAccent">.</span>
    </>
  ),
  catetin: (
    <>
      CATETIN<span className="stageAccent">.</span>
    </>
  ),
  yotext: (
    <>
      YOTEXT<span className="stageAccent">.</span>
    </>
  ),
  evidnce: (
    <>
      EVIDNCE<span className="stageAccent">.</span>
    </>
  ),
  piranusa: (
    <>
      CAD
      <br />
      BIM 3D.
    </>
  ),
  scanner: (
    <>
      3D
      <br />
      SCAN<span className="stageAccent">.</span>
    </>
  ),
  polimerindo: (
    <>
      PLASTIC
      <br />
      PARTS.
    </>
  ),
};

const FEATURE_ASIDE: Record<string, ReactNode> = {
  tiba: (
    <>
      HRIS yang tetap mencatat
      <br />
      saat sinyal putus.
    </>
  ),
};

function linkProps(work: ShowcaseWork) {
  return work.url ? { href: work.url, target: "_blank", rel: "noopener noreferrer" } : { href: workHref(work) };
}

const PROCESS = [
  { title: "Petakan masalah", body: "Siapa penggunanya, keputusan apa yang mereka ambil, dan di bagian mana AI benar benar membantu." },
  { title: "Rancang arsitektur", body: "Alur, data, model, dan batas AI disusun lebih dulu sebelum kode ditulis." },
  { title: "Bangun dan uji", body: "Prototipe dipakai orang sungguhan sejak awal, lalu diperbaiki dari cara mereka memakainya." },
  { title: "Rilis dan rawat", body: "Rilis bertahap, pantau pemakaian, dan rawat produk setelah dipakai setiap hari." },
];

export default async function Page() {
  const liveArchive = await withLiveVisibilityAll(archive.slice(0, 6));
  const [lead, ...rest] = showcase;
  const pathItems = profile.pengalaman_kerja.slice(0, 5);

  return (
    <>
      <section className="intro" aria-labelledby="judulUtama">
        <div>
          <p className="introIndex mono">
            <b>AI Product Architect</b>
            <span>Jakarta, Indonesia</span>
          </p>
          <h1 className="introTitle" id="judulUtama">
            <span className="titleLine">I build</span>
            <span className="titleLine">AI products</span>
            <span className="titleLine">
              people <em>use.</em>
            </span>
          </h1>
        </div>
        <div className="introAside">
          <p className="introLead">
            Saya Yoel, AI Product Architect dan founder PT Manoppo Teknologi Indonesia. Saya merancang produk AI dari
            masalah sampai rilis: alurnya, datanya, batas kerja AI, sampai aplikasi yang dipakai orang setiap hari.
          </p>
          <p className="introLead">
            Tiba, Nada, Catetin, YOTEXT, dan EVIDNCE dikembangkan oleh PT Manoppo Teknologi Indonesia. Setiap
            tampilan di bawah adalah screenshot dari aplikasi yang sedang berjalan.
          </p>
          <a className="textCta isDown" href="#karya">
            Lihat produknya
            <ArrowDown aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="feature" id="karya" aria-label="Produk utama">
        <a
          {...linkProps(lead)}
          className={`stage featureStage ${toneClass[lead.tone]}`}
          aria-label={lead.url ? `Buka ${lead.domain} di tab baru` : `Rincian ${lead.title}`}
        >
          <span className="stageLabel mono">
            <span>Produk utama</span>
            <span>{lead.domain}</span>
          </span>
          <span className="stageWord">
            {TILE_WORDS[lead.slug]}
            {FEATURE_ASIDE[lead.slug] && <span className="stageAside">{FEATURE_ASIDE[lead.slug]}</span>}
          </span>
          <BrowserFrame work={lead} className="featureFrame" priority />
          <PhoneFrame work={lead} />
        </a>
        <div className="featureInfo">
          <div>
            <div className="metaRow mono">
              <span>{lead.year}</span>
              <span>{lead.kind}</span>
            </div>
            <h2>{lead.title}</h2>
            <p>{lead.summary}</p>
          </div>
          <a {...linkProps(lead)} className="infoLink">
            {lead.url ? "Lihat situs" : "Lihat rincian"}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="workGrid" aria-label="Produk dan karya lain">
        {rest.map((work) => (
          <a key={work.slug} {...linkProps(work)} className="workTile">
            <div className={`stage tileStage ${toneClass[work.tone]}`}>
              <span className="stageLabel mono">
                <span>{work.kind}</span>
                <span>{work.domain}</span>
              </span>
              <span className="stageWord">{TILE_WORDS[work.slug]}</span>
              <BrowserFrame work={work} hint={false} />
              <PhoneFrame work={work} />
            </div>
            <div className="tileInfo">
              <div>
                <span className="mono headMeta">{work.year}</span>
                <h3>{work.title}</h3>
                <p>{work.summary}</p>
              </div>
              <span className="tileArrow" aria-hidden="true">
                <ArrowUpRight />
              </span>
            </div>
          </a>
        ))}
        <a href={socialLinks.email} className="workTile">
          <div className="stage tileStage toneOpen">
            <span className="stageLabel mono">
              <span>Slot terbuka</span>
              <span>produk berikutnya</span>
            </span>
            <span className="stageWord">
              YOUR
              <br />
              PRODUCT
              <br />
              NEXT<span className="stageAccent">.</span>
            </span>
            <span className="openFrame" aria-hidden="true">
              <span className="browserBar">
                <span className="browserDots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="browserUrl">produkkamu.id</span>
              </span>
            </span>
          </div>
          <div className="tileInfo">
            <div>
              <span className="mono headMeta">Berikutnya</span>
              <h3>Produk kamu</h3>
              <p>Ruang ini sengaja dikosongkan. Ceritakan masalah yang ingin kamu selesaikan, kita rancang produknya bersama.</p>
            </div>
            <span className="tileArrow" aria-hidden="true">
              <ArrowUpRight />
            </span>
          </div>
        </a>
      </section>

      <section className="statement">
        <span className="mono">Lebih dari demo AI</span>
        <h2 className="sectionTitle">
          AI baru berguna kalau masuk ke cara kerja <em>sehari hari.</em>
        </h2>
        <p>
          Demo AI mudah dibuat. Yang sulit adalah membuatnya tetap jalan saat sinyal putus, tetap jujur saat datanya
          kurang, dan tetap bisa diperiksa manusia sebelum dipakai mengambil keputusan. Di Tiba, sistem menandai absen
          yang janggal tapi HR yang memutuskan. Di Nada, setiap rekomendasi AI dicek ke katalog asli. Di EVIDNCE, setiap
          klaim membawa sumbernya.
        </p>
      </section>

      <CaseList works={showcase} label="Rincian produk dan karya" />

      <section className="services" id="layanan" aria-labelledby="judulLayanan">
        <span className="sideLabel mono">Yang bisa saya kerjakan</span>
        <div>
          <div className="servicesHead">
            <h2 className="sectionTitle" id="judulLayanan">
              Dari masalah sampai produk yang <em>dipakai.</em>
            </h2>
            <p>
              Saya bekerja di antara bisnis, desain, dan teknik. Ceritakan masalahnya, saya bantu menerjemahkannya
              menjadi produk AI yang jelas batasnya, bisa diuji, dan siap dirilis.
            </p>
          </div>
          <ul className="serviceList">
            {SERVICES.map((s) => (
              <li key={s.title} className="serviceItem">
                <h3>{s.title}</h3>
                <p>
                  {s.body}
                  <small className="mono">{s.example}</small>
                </p>
              </li>
            ))}
          </ul>
          <ol className="process" aria-label="Cara kerja">
            {PROCESS.map((p) => (
              <li key={p.title} className="processStep">
                <h4>{p.title}</h4>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pathSection" aria-labelledby="judulPerjalanan">
        <div className="pathHead">
          <h2 className="sectionTitle" id="judulPerjalanan">
            Jalur kerja <em>sejauh ini.</em>
          </h2>
          <Link href="/career-timeline" className="textCta">
            Perjalanan lengkap
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <ol className="pathList">
          {pathItems.map((job) => (
            <li key={job.id} className="pathItem" data-now={job.periode.includes("Sekarang")}>
              <time>{job.periode}</time>
              <h3>
                {job.perusahaan}
                <span>{job.posisi}</span>
              </h3>
              <p>{job.ringkas}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="archive" aria-labelledby="judulArsip">
        <div className="pathHead">
          <div>
            <span className="mono headMeta">Jam terbang</span>
            <h2 className="sectionTitle" id="judulArsip">
              Sebelum produk ini, ada <em>ini.</em>
            </h2>
          </div>
          <Link href="/projects" className="textCta">
            Semua karya
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="archiveList">
          {liveArchive.map((item) => (
            <li key={item.title}>
              <ArchiveRow item={item} />
            </li>
          ))}
        </ul>
      </section>

      <section className="about" aria-labelledby="judulTentang">
        <div>
          <span className="mono">Tentang saya</span>
          <h2 className="aboutName" id="judulTentang">
            Yoel Andreas Manoppo.
          </h2>
          <p>
            Saya AI Product Architect dan founder PT Manoppo Teknologi Indonesia, perusahaan yang mengembangkan Tiba,
            Nada, Catetin, YOTEXT, dan EVIDNCE. Sebelumnya saya membangun sistem multi agent AI untuk pemerintahan, dApp di ekosistem
            VeChain, dan alat AI di agensi digital.
          </p>
          <p>
            Di setiap produk, saya memperhatikan bagian yang sering terlewat: apakah orang yang memakainya setiap hari
            benar benar terbantu, bukan hanya terkesan saat demo?
          </p>
          <div className="aboutLinks">
            <a href={socialLinks.email} className="textCta">
              Ceritakan produk kamu
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="textCta">
              LinkedIn
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="aboutPhoto">
          <Image
            src="/yoel.jpg"
            alt="Foto Yoel Andreas Manoppo"
            fill
            sizes="(max-width: 900px) 340px, 30vw"
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>
      </section>

      <section className="elsewhere" aria-label="Di luar pekerjaan">
        <Link href="/blog" className="elsewhereItem">
          <span className="mono">Tulisan</span>
          <strong>
            Catatan lapangan
            <ArrowUpRight aria-hidden="true" />
          </strong>
          <p>Tentang karier, AI, dan dunia kerja, ditulis dalam Bahasa Indonesia.</p>
        </Link>
        <Link href="/photos" className="elsewhereItem">
          <span className="mono">Foto</span>
          <strong>
            Tempat yang saya suka
            <ArrowUpRight aria-hidden="true" />
          </strong>
          <p>Kumpulan foto tempat yang membuat saya berhenti sejenak.</p>
        </Link>
      </section>
    </>
  );
}
