import type { Metadata } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "404 - Halaman tidak ditemukan",
  description: "Halaman yang kamu cari tidak ada.",
};

export default function NotFound() {
  const router = useRouter();

  // Auto-redirect setelah beberapa detik
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/"); // Arahkan ke homepage setelah 5 detik
    }, 5000);

    return () => clearTimeout(timeout); // Hapus timeout ketika komponen dilepas
  }, [router]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center">
      <div className="animate-bounce">
        <h1 className="font-bold text-5xl mb-4 text-red-500">404</h1>
        <p className="font-medium text-2xl mb-8 tracking-tight">
          Oops! Halaman tidak ditemukan
        </p>
      </div>
      <p className="mb-4 text-lg">
        Maaf, halaman yang kamu cari tidak ada. <br />
        Jangan khawatir, kami akan membawamu kembali.
      </p>
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
        onClick={() => router.push("/")}
      >
        Kembali ke Beranda
      </button>
      <p className="mt-6 text-sm text-gray-500">
        Mengarahkan dalam 5 detik...
      </p>
    </section>
  );
}
