"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ThemeSwitch } from "./theme-switch";
import { socialLinks } from "app/config";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/projects", label: "Karya" },
  { href: "/career-timeline", label: "Perjalanan" },
  { href: "/blog", label: "Tulisan" },
  { href: "/photos", label: "Foto" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="siteNav">
      <div className="siteNavInner">
        <Link href="/" className="siteLogo" aria-label="Yoel Andreas Manoppo, ke beranda">
          Yoel Andreas
          <br />
          Manoppo<sup>®</sup>
        </Link>

        <nav className="siteNavLinks" aria-label="Navigasi utama">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="navLink"
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="navTools">
          <span className="navMeta">
            Website dan AI
            <br />
            Jakarta, Indonesia
          </span>
          <a href={socialLinks.email} className="navCta">
            Hubungi saya
          </a>
          <ThemeSwitch />
          <button
            type="button"
            className="menuToggle"
            aria-expanded={open}
            aria-controls="menuPonsel"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav id="menuPonsel" className="mobileMenu" data-open={open} aria-label="Navigasi ponsel">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(pathname, item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
        <a href={socialLinks.email}>
          Hubungi saya
          <ArrowUpRight aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
