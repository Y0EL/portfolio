import React from "react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plates · Photos",
  description: "Plates dari mata yang melihat.",
};

const PLATES = [
  {
    no: "I",
    caption: "Roman columns",
    src: "/photos/photo1.jpg",
    href: "https://unsplash.com/photos/people-walking-near-building-during-daytime-dFLBDQQeffU",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    no: "II",
    caption: "Big Ben",
    src: "/photos/photo2.jpg",
    href: "https://unsplash.com/photos/big-ben-london-MdJq0zFUwrw",
    span: "",
  },
  {
    no: "III",
    caption: "Sacré-Cœur Basilica",
    src: "/photos/photo3.jpg",
    href: "https://unsplash.com/photos/a-view-of-the-inside-of-a-building-through-a-circular-window-Tp-3hrx88J4",
    span: "",
  },
  {
    no: "IV",
    caption: "Eiffel Tower",
    src: "/photos/photo4.jpg",
    href: "https://unsplash.com/photos/the-eiffel-tower-towering-over-the-city-of-paris-OgPuPvPsHLM",
    span: "",
  },
  {
    no: "V",
    caption: "Taj Mahal",
    src: "/photos/photo5.jpg",
    href: "https://unsplash.com/photos/taj-mahal-india-IPlPkWPJ2fo",
    span: "",
  },
  {
    no: "VI",
    caption: "Colosseum",
    src: "/photos/photo6.jpg",
    href: "https://unsplash.com/photos/brown-concrete-building-under-blue-sky-during-daytime-3cyBR1rIJmA",
    span: "md:col-span-2",
  },
];

export default function Photos() {
  return (
    <section className="max-w-[1180px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
      {/* Header */}
      <header className="max-w-3xl">
        <div className="flex items-center gap-3 mb-5">
          <span className="signal-dot" aria-hidden="true" />
          <span className="kicker">Plates · A photographic record</span>
        </div>
        <h1 className="display-roman text-6xl md:text-8xl leading-[0.95]">
          Things <span className="display-italic text-ember">I saw</span>
          <span className="text-ember">.</span>
        </h1>
        <p className="font-sans text-bone text-lg leading-relaxed mt-6 max-w-[58ch]">
          Plates dikumpulkan dari perjalanan dan jeda di tengah pekerjaan. Tap untuk
          melihat di sumber aslinya.
        </p>
      </header>

      {/* Editorial mosaic */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[180px] md:auto-rows-[260px]">
        {PLATES.map((p) => (
          <a
            key={p.no}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "group relative rounded-card overflow-hidden border border-[color:var(--rule)] bg-ink-2",
              p.span,
            ].join(" ")}
          >
            <Image
              src={p.src}
              alt={p.caption}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            {/* Top plate label */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
              <span className="kicker bg-ink/70 backdrop-blur-md text-paper px-2 py-1 rounded">
                Plate {p.no}
              </span>
            </div>
            {/* Bottom caption */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink via-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p className="font-display italic text-xl text-paper leading-tight">
                {p.caption}
              </p>
              <p className="kicker text-bone mt-1">Open source ↗</p>
            </div>
          </a>
        ))}
      </div>

      <div className="rule-line my-16" />

      <p className="font-display italic text-2xl md:text-3xl text-bone max-w-3xl">
        "Setiap foto adalah jeda · kesempatan untuk lihat tanpa harus bilang
        apa-apa."
      </p>
      <p className="kicker text-ash mt-3">· Y. A. Manoppo</p>
    </section>
  );
}
