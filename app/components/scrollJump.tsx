"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

export function ScrollJump() {
  const [dir, setDir] = useState<"up" | "down">("down");
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setHidden(max < 400);
      setDir(window.scrollY > max / 2 ? "up" : "down");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  const label = dir === "up" ? "Kembali ke atas" : "Langsung ke bawah";

  return (
    <button
      type="button"
      className="scrollJump"
      data-dir={dir}
      data-hidden={hidden}
      aria-label={label}
      title={label}
      tabIndex={hidden ? -1 : 0}
      onClick={() =>
        window.scrollTo({ top: dir === "up" ? 0 : document.documentElement.scrollHeight, behavior: "smooth" })
      }
    >
      <ArrowDown aria-hidden="true" />
    </button>
  );
}
