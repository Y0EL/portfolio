"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { Moon, Sun } from "lucide-react";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

function applyClass(next: "light" | "dark") {
  const root = document.documentElement;
  root.classList.toggle("dark", next === "dark");
  root.classList.toggle("light", next === "light");
  root.style.colorScheme = next;
}

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  function toggle() {
    const next = isDark ? "light" : "dark";
    const doc = document as ViewTransitionDocument;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduced) {
      const root = document.documentElement;
      if (!reduced) root.classList.add("themeFading");
      applyClass(next);
      setTheme(next);
      window.setTimeout(() => root.classList.remove("themeFading"), 500);
      return;
    }

    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth;
    const y = rect ? rect.top + rect.height / 2 : 0;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = doc.startViewTransition(() => {
      applyClass(next);
      setTheme(next);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.2, 0.75, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className="themeButton"
      onClick={toggle}
      aria-label={isDark ? "Pakai tampilan terang" : "Pakai tampilan gelap"}
      title={isDark ? "Tampilan terang" : "Tampilan gelap"}
    >
      {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </button>
  );
}
