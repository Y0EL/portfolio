import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import profile from "data/yoel/profile.json";
import { showcase, archive } from "./projects/project-data";
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
    title: "Website perusahaan",
    body: "Halaman yang menjelaskan bisnis kamu kepada calon pelanggan: apa yang dijual, untuk siapa, mengapa layak dipercaya, dan bagaimana menghubungi.",
    example: "Seperti Piranusa dan Polimerindo",
  },
  {
    title: "Landing page produk",
    body: "Satu halaman yang fokus menjelaskan satu produk sampai pengunjung tahu langkah berikutnya.",
    example: "Seperti YOTEXT",
  },
  {
    title: "Domain, hosting, dan SEO dasar",
    body: "Saya bantu mengurus domain, hosting, struktur halaman, dan metadata agar website rapi di mata mesin pencari. SEO saya perlakukan sebagai cara kerja, bukan janji peringkat.",
    example: "Termasuk sitemap, robots, dan data terstruktur",
  },
  {
    title: "AI yang benar benar dipakai",
    body: "Asisten tanya jawab, otomasi formulir, atau alat internal berbasis AI, hanya jika memang membantu pengunjung atau tim kamu.",
    example: "Contohnya asisten di pojok kanan bawah halaman ini",
  },
];

const PROCESS = [
  { title: "Diskusi awal", body: "Siapa pengunjungnya, apa yang mereka cari, dan apa yang perlu terjadi setelah mereka membaca." },
  { title: "Susun isi", body: "Struktur halaman dan tulisan disusun lebih dulu sebelum tampilan dibuat." },
  { title: "Desain dan bangun", body: "Tampilan dibuat untuk desktop dan ponsel sekaligus, lalu dibangun dengan kode yang cepat." },
  { title: "Rilis dan rawat", body: "Domain, analitik, dan perbaikan setelah website digunakan oleh pengunjung sungguhan." },
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
            <b>Menerima proyek website</b>
            <span>Jakarta, Indonesia</span>
          </p>
          <h1 className="introTitle" id="judulUtama">
            <span className="titleLine">I build websites</span>
            <span className="titleLine">
              people <em>get.</em>
            </span>
          </h1>
        </div>
        <div className="introAside">
          <p className="introLead">
            Saya Yoel, AI Specialist di Piranusa dan founder YOTEXT. Saya membantu bisnis tampil jelas di internet,
            mulai dari domain sampai halaman yang langsung dipahami calon pelanggan.
          </p>
          <p className="introLead">Semua karya di bawah bisa kamu buka langsung. Gambarnya diambil dari situs aslinya.</p>
          <a className="textCta isDown" href="#karya">
            Lihat karya pilihan
            <ArrowDown aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="feature" id="karya" aria-label="Karya utama">
        <a
          href={lead.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`stage featureStage ${toneClass[lead.tone]}`}
          aria-label={`Buka ${lead.domain} di tab baru`}
        >
          <span className="stageLabel mono">
            <span>Karya utama</span>
            <span>{lead.domain}</span>
          </span>
          <span className="stageWord">
            PIRANUSA
            <span className="stageAside">
              Mitra teknologi
              <br />
              CAD, BIM, dan 3D.
            </span>
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
          <a href={lead.url} target="_blank" rel="noopener noreferrer" className="infoLink">
            Lihat situs
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="workGrid" aria-label="Karya lain">
        {rest.map((work) => (
          <a key={work.slug} href={work.url} target="_blank" rel="noopener noreferrer" className="workTile">
            <div className={`stage tileStage ${toneClass[work.tone]}`}>
              <span className="stageLabel mono">
                <span>{work.kind}</span>
                <span>{work.domain}</span>
              </span>
              <span className="stageWord">
                {work.slug === "yotext" ? (
                  <>
                    YOTEXT<span className="stageAccent">.</span>
                  </>
                ) : (
                  <>
                    PLASTIC
                    <br />
                    PARTS.
                  </>
                )}
              </span>
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
      </section>

      <section className="statement">
        <span className="mono">Lebih dari halaman cantik</span>
        <h2 className="sectionTitle">
          Setiap bisnis perlu cara bercerita yang <em>berbeda.</em>
        </h2>
        <p>
          Perusahaan software, produk AI, dan pabrik manufaktur memiliki pengunjung dan pertanyaan yang berbeda. Ada yang
          membandingkan lisensi, ada yang ingin tahu apa yang terjadi setelah meeting, ada pula yang memeriksa kapasitas
          mesin. Website yang baik menjawab pertanyaan itu lebih dulu.
        </p>
      </section>

      <CaseList works={showcase} label="Rincian karya" />

      <section className="services" id="layanan" aria-labelledby="judulLayanan">
        <span className="sideLabel mono">Yang bisa saya kerjakan</span>
        <div>
          <div className="servicesHead">
            <h2 className="sectionTitle" id="judulLayanan">
              Dari domain sampai halaman yang <em>dipahami.</em>
            </h2>
            <p>
              Kamu tidak perlu memahami istilah teknis. Ceritakan bisnis kamu, saya yang menerjemahkannya menjadi
              website yang jelas, cepat, dan mudah dikelola.
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
              Sebelum website, ada <em>ini.</em>
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
            Saya bekerja sebagai AI Specialist di Piranusa dan mendirikan YOTEXT. Sebelumnya saya membangun sistem multi
            agent AI untuk pemerintahan, dApp di ekosistem VeChain, dan alat AI di agensi digital.
          </p>
          <p>
            Dalam setiap proyek website, saya memperhatikan bagian yang sering terlewat: apakah pengunjung langsung
            memahami bisnis kamu setelah melihat halaman pertama?
          </p>
          <div className="aboutLinks">
            <a href={socialLinks.email} className="textCta">
              Ceritakan proyek kamu
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
