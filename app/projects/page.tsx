import type { Metadata } from "next";
import { showcase, archive } from "./project-data";
import { CaseList } from "app/components/caseList";
import { ArchiveRow } from "app/components/archiveRow";
import { withLiveVisibilityAll } from "app/lib/repoVisibility";

export const metadata: Metadata = {
  title: "Karya",
  description:
    "Produk AI karya Yoel Andreas Manoppo bersama PT Manoppo Teknologi Indonesia: Tiba (HRIS), Nada (pemutar musik), Catetin (pencatat keuangan), YOTEXT, EVIDNCE, dan arsip proyek AI.",
};

export default async function Projects() {
  const liveArchive = await withLiveVisibilityAll(archive);
  return (
    <>
      <header className="pageHead">
        <span className="mono">Karya · {showcase.length + archive.length} proyek</span>
        <h1 className="pageTitle">
          Yang sudah <em>jadi.</em>
        </h1>
        <p className="pageLead">
          Produk AI dan karya yang dikembangkan oleh PT Manoppo Teknologi Indonesia. Setiap tampilan adalah screenshot
          dari situs dan aplikasi yang sedang berjalan. Sebagian besar bisa kamu buka langsung.
        </p>
      </header>

      <CaseList works={showcase} label="Produk dan karya pilihan" />

      <section className="archive" aria-labelledby="judulArsip">
        <span className="mono headMeta">Arsip</span>
        <h2 className="sectionTitle" id="judulArsip">
          Proyek AI, otomasi, dan <em>alat kerja.</em>
        </h2>
        <ul className="archiveList">
          {liveArchive.map((item) => (
            <li key={item.title}>
              <ArchiveRow item={item} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
