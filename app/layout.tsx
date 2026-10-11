import "./global.css";
import type { Metadata, Viewport } from "next";
import { Syne, Manrope, Fraunces, DM_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "./components/nav";
import Footer from "./components/footer";
import TalkativeYoel from "./components/talkative-yoel";
import { ScrollJump } from "./components/scrollJump";
import { ShotShuffle } from "./components/shotShuffle";
import { TextMotion, MOTION_BOOT } from "./components/textMotion";
import { ThemeProvider } from "./components/theme-switch";
import { metaData, personJsonLd, websiteJsonLd } from "./config";

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--fontSyne",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--fontManrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--fontFraunces",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--fontDmMono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(metaData.baseUrl),
  title: {
    default: metaData.title,
    template: `%s | ${metaData.name}`,
  },
  description: metaData.description,
  openGraph: {
    images: [{ url: metaData.ogImage, width: 1200, height: 630, alt: metaData.ogAlt, type: "image/jpeg" }],
    title: metaData.title,
    description: metaData.description,
    url: metaData.baseUrl,
    siteName: metaData.name,
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: metaData.title,
    description: metaData.description,
    card: "summary_large_image",
    creator: "@vehunt",
    images: [{ url: metaData.ogImage, alt: metaData.ogAlt }],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  keywords: [
    "Yoel Andreas Manoppo",
    "Yoel Manoppo",
    "Jasa pembuatan website",
    "Jasa website perusahaan",
    "Website company profile",
    "AI Specialist Piranusa",
    "Founder YOTEXT",
    "Pembuat website Jakarta",
  ],
  authors: [{ name: "Yoel Andreas Manoppo", url: metaData.baseUrl }],
  creator: "Yoel Andreas Manoppo",
  publisher: "Yoel Andreas Manoppo",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9e8e2" },
    { media: "(prefers-color-scheme: dark)", color: "#131513" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={[syne.variable, manrope.variable, fraunces.variable, dmMono.variable].join(" ")}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT }} />
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="RSS Feed" />
        <link rel="alternate" type="application/atom+xml" href="/atom.xml" title="Atom Feed" />
        <link rel="alternate" type="application/feed+json" href="/feed.json" title="JSON Feed" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <a href="#isi" className="skipLink">
            Lompat ke isi
          </a>
          <Navbar />
          <main id="isi">{children}</main>
          <Footer />
          <ScrollJump />
          <ShotShuffle />
          <TextMotion />
          <TalkativeYoel />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
