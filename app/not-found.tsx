"use client"; // Menjadikan komponen ini client-side

import type { Metadata } from "next";
import { useRouter } from "next/navigation"; // Menggunakan useRouter dari next/navigation
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
    <section className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <h1 className="font-bold text-6xl mb-4 text-gray-800 dark:text-gray-100 transition-opacity duration-1000 ease-out opacity-100">
        404
      </h1>
      <p className="font-medium text-xl mb-8 text-gray-600 dark:text-gray-400">
        Halaman yang kamu cari tidak ditemukan.
      </p>
      <button
        className="px-6 py-3 bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900 rounded-lg hover:scale-105 transition-transform duration-300"
        onClick={() => router.push("/")}
      >
        Kembali ke Beranda
      </button>
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Kamu akan diarahkan dalam 5 detik...
      </p>
    </section>
  );
}
