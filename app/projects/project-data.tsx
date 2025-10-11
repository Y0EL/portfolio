export interface Project {
  title: string;
  year: number;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    title: "ReUse - VeBetterDAO Sustainability Platform",
    year: 2025,
    description:
      "Created decentralized app rewarding users for reusing items through photo-verified submissions. Designed and deployed on VeBetterDAO, integrating AI detection, on-chain reward distribution, and community governance voting. Gained funding and endorsement under VeBetterDAO's sustainability initiative. Built using Next.js, NestJS, Supabase, and VeChain blockchain.",
    url: "https://reuse.vet/",
  },
  {
    title: "SoapyWorld - Gamified Sustainability dApp",
    year: 2025,
    description:
      "Developed a gamified dApp encouraging manual dishwashing as an energy-saving alternative to machines. Built fullstack using Next.js, NestJS, Supabase, and VeChain's smart contract framework (EcoEarn.sol). Currently with 800+ confirmed activities, 200+ verified, and 100+ minted actions across testnet. Part of VeBetterDAO ecosystem.",
    url: "https://soapy.world/",
  },
  {
    title: "AI Deskriptor - E-commerce Content Generator",
    year: 2024,
    description:
      "AI-powered text generation tool for e-commerce product titles and descriptions. Built during tenure at ZANDO Agency, utilizing OpenAI API and advanced prompt engineering. Automates content creation for product listings with market-optimized algorithms and trending keyword integration.",
    url: "https://deskriptor.yoel.pw/",
  },
  {
    title: "Sekriptor - AI Content Creator",
    year: 2021,
    description:
      "AI-powered script generator for content creators, adapted from AI Gemini. Implemented with zero coding using AI automation. Successfully running and updated through 2024, providing automated content generation for creators across various platforms.",
    url: "https://sekriptor.yoel.pw/",
  },
  {
    title: "SCOPE OF WORK - Documentation Platform",
    year: 2024,
    description:
      "Collaborative documentation platform developed for PT. HERUN INTERNATIONAL BRAND. Served as Documentation Specialist and IT Developer, responsible for UI development and content management. Built using modern web technologies for seamless documentation workflow.",
    url: "https://scoopwork.netlify.app/",
  },
  {
    title: "Portfolio Website",
    year: 2024,
    description:
      "Modern portfolio website showcasing AI & Web3 development expertise. Built with Next.js, TypeScript, and Tailwind CSS. Features dark/light mode, MDX blog support, and responsive design. Deployed on Vercel with optimized performance and SEO.",
    url: "https://yoel.pw/",
  },
];
