export const metaData = {
  baseUrl: "https://yoel.online",
  title: "Yoel Andreas Manoppo · Website dan AI untuk bisnis",
  name: "Yoel Andreas Manoppo",
  ogImage: "/og/home.jpg",
  ogAlt: "Yoel Andreas Manoppo. I build websites people get. Jendela browser dari kertas di yoel.online.",
  description:
    "Portfolio Yoel Andreas Manoppo, AI Specialist di Piranusa dan founder YOTEXT. Website perusahaan dan produk digital yang mudah dipahami, seperti Piranusa, YOTEXT, dan PT Dinamika Polimerindo.",
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
  url: "https://yoel.online",
  image: "https://yoel.online/yoel.jpg",
  jobTitle: "AI Specialist",
  description: "AI Specialist di Piranusa dan founder YOTEXT. Membuat website perusahaan dan produk digital di Jakarta.",
  worksFor: [
    {
      "@type": "Organization",
      name: "Piranusa",
      url: "https://www.piranusa.com/",
    },
  ],
  founder: {
    "@type": "Organization",
    name: "YOTEXT",
    url: "https://yotext.app/",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressCountry: "ID",
  },
  knowsAbout: [
    "Pembuatan website perusahaan",
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
  url: "https://yoel.online",
  inLanguage: "id-ID",
  author: { "@type": "Person", name: "Yoel Andreas Manoppo" },
  publisher: { "@type": "Person", name: "Yoel Andreas Manoppo" },
};
