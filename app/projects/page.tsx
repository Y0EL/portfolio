import type { Metadata } from "next";
import { showcase, archive } from "./project-data";
import { CaseList } from "app/components/caseList";
import { ArchiveRow } from "app/components/archiveRow";

export const metadata: Metadata = {
  title: "Karya",
  description:
    "Website dan produk digital karya Yoel Andreas Manoppo: Piranusa, YOTEXT, PT Dinamika Polimerindo, dan arsip proyek AI.",
};

export default function Projects() {
  return (
    <>
      <header className="pageHead">
        <span className="mono">Karya · {showcase.length + archive.length} proyek</span>
        <h1 className="pageTitle">
          Yang sudah <em>jadi.</em>
        </h1>
        <p className="pageLead">
          Website dan produk digital yang pernah saya kerjakan. Semua tampilan diambil langsung dari situs aslinya, dan
          setiap karya bisa kamu buka sendiri.
        </p>
      </header>

      <CaseList works={showcase} label="Website pilihan" />

      <section className="archive" aria-labelledby="judulArsip">
        <span className="mono headMeta">Arsip</span>
        <h2 className="sectionTitle" id="judulArsip">
          Proyek AI, blockchain, dan <em>alat kerja.</em>
        </h2>
        <ul className="archiveList">
          {archive.map((item) => (
            <li key={item.title}>
              <ArchiveRow item={item} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
