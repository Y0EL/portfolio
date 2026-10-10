import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="emptyState">
      <span className="mono headMeta">Halaman tidak ditemukan</span>
      <h1 className="pageTitle">
        404. Halaman ini <em>tidak ada.</em>
      </h1>
      <p className="pageLead">Mungkin sudah dipindah, dihapus, atau alamatnya salah ketik.</p>
      <div className="emptyActions">
        <Link href="/" className="inkButton">
          <ArrowLeft aria-hidden="true" />
          Kembali ke beranda
        </Link>
        <Link href="/projects" className="textCta">
          Lihat karya
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
