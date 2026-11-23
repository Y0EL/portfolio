export const metaData = {
  baseUrl: "https://www.yoel.online",
  title: "Yoel Andreas Manoppo · AI Product Architect",
  name: "Yoel Andreas Manoppo",
  ogImage: "/og/home.jpg",
  ogAlt: "Yoel Andreas Manoppo, AI Product Architect. I build AI products people use. Jendela browser dari kertas di yoel.online.",
  description:
    "Portfolio Yoel Andreas Manoppo, AI Product Architect dan founder PT Manoppo Teknologi Indonesia. Produk AI yang dipakai setiap hari, seperti Tiba, Nada, Catetin, YOTEXT, dan EVIDNCE.",
};

export const socialLinks = {
  twitter: "https://x.com/vehunt",
  github: "https://github.com/Y0EL",
  instagram: "https://www.instagram.com/yoelmanoppo",
  linkedin: "https://www.linkedin.com/in/y0el",
  email: "mailto:yoelandreasmanoppo@gmail.com",
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yoel Andreas Manoppo",
  alternateName: ["Yoel Manoppo", "Y0EL"],
  url: "https://www.yoel.online",
  image: "https://www.yoel.online/yoel.jpg",
  jobTitle: "AI Product Architect",
  description: "AI Product Architect dan founder PT Manoppo Teknologi Indonesia. Merancang dan membangun produk AI seperti Tiba, Nada, Catetin, YOTEXT, dan EVIDNCE di Jakarta.",
  worksFor: [
    {
      "@type": "Organization",
      name: "Piranusa",
      url: "https://www.piranusa.com/",
    },
  ],
  founder: [
    {
      "@type": "Organization",
      name: "PT Manoppo Teknologi Indonesia",
    },
    {
      "@type": "Organization",
      name: "YOTEXT",
      url: "https://yotext.app/",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressCountry: "ID",
  },
  knowsAbout: [
    "AI product architecture",
    "Product engineering",
    "HRIS",
    "Capacitor",
    "React",
    "SEO",
    "Multi Agent AI",
    "LangGraph",
    "Next.js",
    "FastAPI",
    "Vue 3",
    "Whisper",
    "VeChain",
    "Solidity",
  ],
  sameAs: [socialLinks.linkedin, socialLinks.github, socialLinks.twitter, socialLinks.instagram],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Yoel Andreas Manoppo",
  alternateName: "yoel.online",
  url: "https://www.yoel.online",
  inLanguage: "id-ID",
  author: { "@type": "Person", name: "Yoel Andreas Manoppo" },
  publisher: { "@type": "Person", name: "Yoel Andreas Manoppo" },
};
