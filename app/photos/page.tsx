import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Foto",
  description: "Kumpulan foto tempat yang disukai Yoel Andreas Manoppo.",
};

const PLATES = [
  {
    caption: "Roman columns",
    src: "/photos/photo1.jpg",
    href: "https://unsplash.com/photos/people-walking-near-building-during-daytime-dFLBDQQeffU",
    size: "large",
  },
  { caption: "Big Ben", src: "/photos/photo2.jpg", href: "https://unsplash.com/photos/big-ben-london-MdJq0zFUwrw", size: "normal" },
  {
    caption: "Sacré Cœur",
    src: "/photos/photo3.jpg",
    href: "https://unsplash.com/photos/a-view-of-the-inside-of-a-building-through-a-circular-window-Tp-3hrx88J4",
    size: "normal",
  },
  {
    caption: "Eiffel Tower",
    src: "/photos/photo4.jpg",
    href: "https://unsplash.com/photos/the-eiffel-tower-towering-over-the-city-of-paris-OgPuPvPsHLM",
    size: "normal",
  },
  { caption: "Taj Mahal", src: "/photos/photo5.jpg", href: "https://unsplash.com/photos/taj-mahal-india-IPlPkWPJ2fo", size: "normal" },
  {
    caption: "Colosseum",
    src: "/photos/photo6.jpg",
    href: "https://unsplash.com/photos/brown-concrete-building-under-blue-sky-during-daytime-3cyBR1rIJmA",
    size: "wide",
  },
];

export default function Photos() {
  return (
    <>
      <header className="pageHead">
        <span className="mono">Foto · {PLATES.length} tempat</span>
        <h1 className="pageTitle">
          Tempat yang membuat saya <em>berhenti.</em>
        </h1>
        <p className="pageLead">Kumpulan tempat yang saya suka. Klik fotonya untuk melihat sumber aslinya.</p>
      </header>
      <div className="plateGrid">
        {PLATES.map((p) => (
          <a key={p.src} href={p.href} target="_blank" rel="noopener noreferrer" className="plate" data-size={p.size}>
            <Image
              src={p.src}
              alt={p.caption}
              fill
              sizes="(max-width: 650px) 92vw, (max-width: 900px) 46vw, 30vw"
              style={{ objectFit: "cover" }}
            />
            <span className="plateCaption">
              {p.caption}
              <ArrowUpRight aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    </>
  );
}
