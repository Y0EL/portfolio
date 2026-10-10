import { ArrowUpRight, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import profile from "data/yoel/profile.json";
import { socialLinks } from "app/config";

const YEAR = new Date().getFullYear();

const links = [
  { href: socialLinks.linkedin, label: "LinkedIn" },
  { href: socialLinks.github, label: "GitHub" },
  { href: socialLinks.instagram, label: "Instagram" },
  { href: socialLinks.twitter, label: "X" },
  { href: "/rss.xml", label: "RSS" },
];

export const whatsappHref = `https://wa.me/${profile.telepon.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Halo Yoel, saya ingin berdiskusi tentang proyek website."
)}`;

export default function Footer() {
  return (
    <footer className="siteFooter" id="kontak">
      <div className="footerCta">
        <div>
          <span className="mono">Terbuka untuk proyek website</span>
          <h2>
            Punya rencana
            <br />
            <em>website?</em>
          </h2>
        </div>
        <div className="footerActions">
          <a href={socialLinks.email} className="pillButton pillPrimary">
            <Mail aria-hidden="true" />
            Kirim email
          </a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="pillButton pillGhost">
            <FaWhatsapp aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
      <div className="footerBase">
        <span>
          © {YEAR} Yoel Andreas Manoppo · {profile.email}
        </span>
        <nav className="footerLinks" aria-label="Profil lain">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {l.label}
              {l.href.startsWith("http") && <ArrowUpRight className="iconInline" aria-hidden="true" />}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
