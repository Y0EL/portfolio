"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown === 0) router.push("/");
  }, [countdown, router]);

  return (
    <section className="max-w-[1180px] mx-auto px-6 lg:px-10 py-24 min-h-[60vh] flex items-center">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="signal-dot" aria-hidden="true" />
          <span className="kicker">Signal lost · Dispatch 404</span>
        </div>
        <h1 className="display-roman text-7xl md:text-[160px] leading-[0.85]">
          404<span className="text-ember">.</span>
        </h1>
        <p className="font-display italic text-3xl md:text-4xl text-bone mt-6 leading-tight">
          The page you were looking for is{" "}
          <span className="text-paper">no longer on the wire</span>.
        </p>
        <p className="font-sans text-bone text-lg mt-6">
          Mungkin sudah dipindahkan, dihapus, atau memang tidak pernah ada.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="kicker inline-flex items-center gap-2 bg-paper text-ink px-5 py-3 rounded-md hover:bg-ember transition-colors duration-300"
          >
            ← Back to today
          </Link>
          <Link
            href="/blog"
            className="kicker inline-flex items-center gap-2 text-bone hover:text-paper px-5 py-3 rounded-md border border-[color:var(--rule)] hover:border-[color:var(--rule-strong)] transition-colors duration-300"
          >
            Read the archive instead →
          </Link>
        </div>

        <p className="kicker text-ash mt-10">
          Auto-rerouting ke beranda dalam{" "}
          <span className="text-paper tabular-nums">{countdown}</span>s…
        </p>
      </div>
    </section>
  );
}
