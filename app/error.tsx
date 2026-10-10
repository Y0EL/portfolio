"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="emptyState">
      <span className="mono headMeta">Terjadi kesalahan</span>
      <h1 className="pageTitle">
        Halaman ini gagal <em>dimuat.</em>
      </h1>
      <p className="pageLead">Silakan muat ulang. Jika masih gagal, kembali ke beranda terlebih dahulu.</p>
      {error?.message && <pre className="errorDetail">{error.message}</pre>}
      <div className="emptyActions">
        <button type="button" onClick={() => reset()} className="inkButton">
          <RotateCcw aria-hidden="true" />
          Muat ulang
        </button>
        <Link href="/" className="textCta">
          Kembali ke beranda
        </Link>
      </div>
    </section>
  );
}
