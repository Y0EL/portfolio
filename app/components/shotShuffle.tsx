"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function between(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function ShotShuffle() {
  const pathname = usePathname();

  useEffect(() => {
    const shots = Array.from(document.querySelectorAll<HTMLElement>(".scrollShot"));
    const order = shots.map((_, i) => i).sort(() => Math.random() - 0.5);
    order.forEach((index, rank) => {
      const shot = shots[index];
      shot.style.setProperty("--shotDelay", `${(rank * between(0.8, 2) + between(0.2, 1.2)).toFixed(2)}s`);
      shot.style.setProperty("--shotDuration", `${between(13, 21).toFixed(2)}s`);
    });
  }, [pathname]);

  return null;
}
