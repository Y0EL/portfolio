"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="max-w-[1180px] mx-auto px-6 lg:px-10 py-24 min-h-[60vh] flex items-center">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="signal-dot" aria-hidden="true" />
          <span className="kicker">Transmission error · Frequency interrupted</span>
        </div>
        <h1 className="display-roman text-6xl md:text-8xl leading-[0.95]">
          Something <span className="display-italic text-ember">broke</span>
          <span className="text-ember">.</span>
        </h1>
        <p className="font-sans text-bone text-lg mt-6 max-w-[58ch] leading-relaxed">
          Sinyal kepotong di tengah jalan. Kalau lo bersedia, klik retry · atau
          balik aja ke beranda dulu.
        </p>
        {error?.message && (
          <pre className="mt-6 p-4 bg-ink-2 border border-[color:var(--rule)] rounded-card text-bone text-sm font-mono overflow-x-auto max-w-full">
            {error.message}
          </pre>
        )}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button
            onClick={() => reset()}
            className="kicker inline-flex items-center gap-2 bg-paper text-ink px-5 py-3 rounded-md hover:bg-ember transition-colors duration-300"
          >
            Retry transmission
          </button>
          <Link
            href="/"
            className="kicker inline-flex items-center gap-2 text-bone hover:text-paper px-5 py-3 rounded-md border border-[color:var(--rule)] hover:border-[color:var(--rule-strong)] transition-colors duration-300"
          >
            ← Back to today
          </Link>
        </div>
      </div>
    </section>
  );
}
