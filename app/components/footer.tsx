"use client";

import React from "react";
import {
  FaXTwitter,
  FaGithub,
  FaInstagram,
  FaRss,
  FaLinkedinIn,
} from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import { socialLinks } from "app/config";

const YEAR = new Date().getFullYear();

const links = [
  { href: socialLinks.twitter, icon: FaXTwitter, label: "X" },
  { href: socialLinks.github, icon: FaGithub, label: "GitHub" },
  { href: socialLinks.instagram, icon: FaInstagram, label: "Instagram" },
  { href: socialLinks.linkedin, icon: FaLinkedinIn, label: "LinkedIn" },
  { href: socialLinks.email, icon: TbMailFilled, label: "Email" },
  { href: "/rss.xml", icon: FaRss, label: "RSS" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--rule)] mt-32">
      <div className="max-w-[1180px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          {/* Colophon */}
          <div className="md:col-span-7">
            <p className="kicker mb-3">Colophon</p>
            <p className="font-display text-2xl md:text-3xl text-paper leading-snug">
              Set in <em className="text-ember-soft">Newsreader</em>, Onest &amp; JetBrains Mono.{" "}
              Built quietly in Jakarta.
            </p>
          </div>

          {/* Socials */}
          <div className="md:col-span-5 md:text-right">
            <p className="kicker mb-3 md:text-right">Frequencies</p>
            <div className="flex md:justify-end gap-4 text-lg text-bone">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={l.label}
                  className="hover:text-ember transition-colors duration-300"
                >
                  <l.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="rule-line mt-10 mb-6" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="kicker text-ash">
            © {YEAR} · Yoel Andreas Manoppo · All transmissions reserved.
          </p>
          <p className="kicker text-ash">· end of dispatch ·</p>
        </div>
      </div>
    </footer>
  );
}
