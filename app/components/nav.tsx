"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Today" },
  { href: "/projects", label: "Specimens" },
  { href: "/blog", label: "Wire" },
  { href: "/photos", label: "Plates" },
  { href: "/career-timeline", label: "Ledger" },
];

export function Navbar() {
  const pathname = usePathname() || "/";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-ink/75 border-b border-[color:var(--rule)]">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between gap-6">
        {/* Brand mark */}
        <Link href="/" className="group flex items-center gap-3">
          <span className="signal-dot" aria-hidden="true" />
          <span className="kicker">
            <span className="text-paper">Field Dispatch</span>
            <span className="mx-2 text-ash">/</span>
            <span className="text-ash">№017</span>
          </span>
        </Link>

        {/* Chip-style nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "kicker px-3 py-1.5 rounded-full transition-all duration-300",
                  active
                    ? "bg-paper/95 text-ink"
                    : "text-ash hover:text-paper hover:bg-white/[0.04]",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: live timestamp */}
        <div className="hidden lg:flex items-center gap-3 kicker text-ash">
          <DateTicker />
        </div>

        {/* Mobile menu */}
        <details className="md:hidden">
          <summary className="kicker px-3 py-1.5 rounded-full border border-[color:var(--rule)] text-bone cursor-pointer list-none select-none">
            Menu
          </summary>
          <div className="absolute right-6 mt-3 bg-ink-2 border border-[color:var(--rule)] rounded-card p-2 min-w-[180px] shadow-2xl">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block kicker px-3 py-2 rounded-md text-bone hover:text-paper hover:bg-white/[0.04]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}

function DateTicker() {
  const d = new Date();
  const formatted = d
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
  return (
    <>
      <span className="text-paper">Jakarta</span>
      <span className="text-ash">·</span>
      <span>{formatted}</span>
    </>
  );
}
