export const metaData = {
  baseUrl: "https://yoel.online/",
  title: "Yoel Andreas Manoppo · AI Forward Deployed Engineer",
  name: "Yoel Andreas Manoppo",
  ogImage: "/og",
  description:
    "Field Dispatch · Yoel Andreas Manoppo. AI Forward Deployed Engineer di Jakarta. Multi-agent AI, LangGraph, Vue 3 tactical frontends, sustainability dApps, dan musik di samping sebagai Cubicube.",
};

export const socialLinks = {
  twitter: "https://x.com/vehunt",
  github: "https://github.com/Y0EL",
  instagram: "https://www.instagram.com/yoelmanoppo",
  linkedin: "https://www.linkedin.com/in/yoelmanoppo",
  spotify: "https://open.spotify.com/artist/2ztUmew6tgNQ8JtRRep4Td",
  email: "mailto:yoelandreasmanoppo@gmail.com",
};

/* Person JSON-LD payload reused across pages. This feeds Google's Knowledge
 * Graph and is the single biggest lever for "Yoel Andreas Manoppo" name search
 * visibility. Keep `sameAs` profiles aligned with socialLinks above.
 */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yoel Andreas Manoppo",
  alternateName: ["Yoel Manoppo", "Y0EL", "Cubicube"],
  url: "https://yoel.online",
  image: "https://yoel.online/yoel.jpg",
  jobTitle: "AI Forward Deployed Engineer",
  description:
    "AI Forward Deployed Engineer di Jakarta. Membangun multi agent AI skala nasional dengan LangGraph dan Vue 3 tactical frontends. Co founder ReUse, musisi Cubicube.",
  worksFor: [
    {
      "@type": "Organization",
      name: "PT. GSP",
    },
    {
      "@type": "Organization",
      name: "PT. Decision Tree Indonesia",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressCountry: "ID",
  },
  knowsAbout: [
    "Multi Agent AI",
    "LangGraph",
    "LangChain",
    "Agentic Architecture",
    "Forward Deployed Engineering",
    "Vue 3",
    "Next.js",
    "FastAPI",
    "Whisper",
    "VeChain",
    "Solidity",
    "OSINT",
  ],
  sameAs: [
    "https://www.linkedin.com/in/yoelmanoppo",
    "https://github.com/Y0EL",
    "https://x.com/vehunt",
    "https://www.instagram.com/yoelmanoppo",
    "https://open.spotify.com/artist/2ztUmew6tgNQ8JtRRep4Td",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Yoel Andreas Manoppo · Field Dispatch",
  alternateName: "yoel.online",
  url: "https://yoel.online",
  inLanguage: "id-ID",
  author: { "@type": "Person", name: "Yoel Andreas Manoppo" },
  publisher: { "@type": "Person", name: "Yoel Andreas Manoppo" },
};
