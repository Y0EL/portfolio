import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { ThemeProvider } from "./components/theme-switch";
import { metaData } from "./config";
<<<<<<< HEAD
import Logic from './components/logic'
=======
>>>>>>> 044d8e5fb93ca968ecf90d3aa902006ed59db000

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
    locale: "en_US",
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
  },
};

<<<<<<< HEAD
// Helper function for joining class names
const cx = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");
=======
const cx = (...classes) => classes.filter(Boolean).join(" ");
>>>>>>> 044d8e5fb93ca968ecf90d3aa902006ed59db000

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cx(GeistSans.variable, GeistMono.variable)}>
      <head>
<<<<<<< HEAD
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="RSS Feed" />
        <link rel="alternate" type="application/atom+xml" href="/atom.xml" title="Atom Feed" />
        <link rel="alternate" type="application/feed+json" href="/feed.json" title="JSON Feed" />
=======
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/rss.xml"
          title="RSS Feed"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          href="/atom.xml"
          title="Atom Feed"
        />
        <link
          rel="alternate"
          type="application/feed+json"
          href="/feed.json"
          title="JSON Feed"
        />
>>>>>>> 044d8e5fb93ca968ecf90d3aa902006ed59db000
      </head>
      <body className="antialiased flex flex-col items-center justify-center mx-auto mt-2 lg:mt-8 mb-20 lg:mb-40">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-auto min-w-0 mt-2 md:mt-6 flex flex-col px-6 sm:px-4 md:px-0 max-w-[640px] w-full">
            <Navbar />
            {children}
<<<<<<< HEAD
            <Logic /> 
=======
>>>>>>> 044d8e5fb93ca968ecf90d3aa902006ed59db000
            <Footer />
            <Analytics />
            <SpeedInsights />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
