import "./global.css";
import type { Metadata, Viewport } from "next";
import { Newsreader, Onest, JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "./components/nav";
import Footer from "./components/footer";
import TalkativeYoel from "./components/talkative-yoel";
import { ThemeProvider } from "./components/theme-switch";
import { metaData, personJsonLd, websiteJsonLd } from "./config";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-onest",
  display: "swap",
});

const jbm = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jbm",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(metaData.baseUrl),
  title: {
    default: metaData.title,
    template: `%s | ${metaData.title}`,
  },
  description: metaData.description,
  openGraph: {
    images: metaData.ogImage,
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
    title: metaData.name,
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: metaData.baseUrl,
  },
  keywords: [
    "Yoel Andreas Manoppo",
    "Yoel Manoppo",
    "AI Forward Deployed Engineer",
    "Multi Agent AI Indonesia",
    "LangGraph Indonesia",
    "Agentic Architecture",
    "AI Engineer Jakarta",
    "Cubicube",
    "ReUse VeBetterDAO",
  ],
  authors: [{ name: "Yoel Andreas Manoppo", url: metaData.baseUrl }],
  creator: "Yoel Andreas Manoppo",
  publisher: "Yoel Andreas Manoppo",
};

export const viewport: Viewport = {
  themeColor: "#0c0c0b",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

const cx = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={cx(
        newsreader.variable,
        onest.variable,
        jbm.variable,
        GeistSans.variable,
        GeistMono.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="RSS Feed" />
        <link rel="alternate" type="application/atom+xml" href="/atom.xml" title="Atom Feed" />
        <link rel="alternate" type="application/feed+json" href="/feed.json" title="JSON Feed" />
        <meta name="theme-color" content="#0c0c0b" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="bg-ink text-paper antialiased min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <div className="grain" aria-hidden="true" />
          <Navbar />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <TalkativeYoel />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
