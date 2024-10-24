"use client"; // Menjadikan komponen ini client-side

import type { Metadata } from "next";
import { useRouter } from "next/navigation"; // Menggunakan useRouter dari next/navigation
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "404 - Halaman tidak ditemukan",
  description: "Halaman yang kamu cari tidak ada.",
};

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(8); // Mulai dari 8 detik

  useEffect(() => {
    // Update countdown setiap detik
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Redirect ke halaman beranda setelah countdown habis
    if (countdown === 0) {
      router.push("/");
    }

    // Bersihkan interval ketika countdown selesai atau komponen dilepas
    return () => clearInterval(interval);
  }, [countdown, router]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        404
      </h1>
      <p className="text-xl mb-8 text-gray-700 dark:text-gray-400">
        Halaman yang kamu cari tidak ditemukan.
      </p>
      <button
        className="underline text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
        onClick={() => router.push("/")}
      >
        Kembali ke Beranda
      </button>
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Akan kembali ke beranda dalam {countdown} detik...
      </p>
    </section>
  );
}
