export interface Project {
  no: string;
  sigil:
    | "autocrawl"
    | "atlas"
    | "geocek"
    | "sentinel"
    | "juscat"
    | "yota"
    | "reuse"
    | "soapy"
    | "deskriptor"
    | "sekriptor"
    | "scope"
    | "portfolio";
  category: "Production · Defense AI" | "AI · Tooling" | "Web3 · Sustainability" | "Apps · Side";
  title: string;
  subtitle: string;
  year: string;
  role: string;
  type: string;
  description: string;
  highlights?: string[];
  stack: string[];
  infra?: string;
  url: string;
  source?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    no: "01",
    sigil: "autocrawl",
    category: "Production · Defense AI",
    title: "Autocrawl",
    subtitle: "Autonomous intelligence crawler",
    year: "2025 · 2026",
    role: "Lead Architect & Builder",
    type: "Agentic 24hr crawler / Defense & security intelligence",
    description:
      "LangGraph state machine fanning out ke 50 parallel workers, ngecrawl security & defense expo vendors lewat open web. Multi-tier search: Wikipedia REST, DuckDuckGo, Google News RSS, plus OpenSERP yang ngejalanin Google, Bing, Yandex, Baidu simultaneously via headless Chromium. PDF brosur discovery + OCR pake Ollama vision (gemma4:e4b). Vendor identity resolution lewat schema.org + anchor link analysis + LLM tiebreak. Chroma vector store buat dedup cosine similarity. NLLB-200 translate semua data ke Bahasa Indonesia secara lokal. Vue 3 tactical dashboard dengan 2.5D world map, fly arcs antar intelligence hubs, live LangGraph canvas. Full observability: Prometheus, Grafana, Langfuse, structlog.",
    highlights: [
      "929 vendors indexed in one overnight run",
      "12x original throughput estimate",
      "150 vendors per hour at peak",
      "104 fully enriched / 497 translated to ID",
    ],
    stack: [
      "LangGraph",
      "LangChain",
      "Playwright",
      "Crawl4AI",
      "Ollama",
      "IBM Granite",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "ChromaDB",
      "Vue 3",
      "ECharts",
      "MapLibre",
    ],
    infra: "12 Docker services / GPU overlay optional / Zero cloud default",
    url: "https://github.com/Y0EL/autocrawl",
    source: "github.com/Y0EL/autocrawl",
    featured: true,
  },
  {
    no: "02",
    sigil: "atlas",
    category: "Production · Defense AI",
    title: "Atlas",
    subtitle: "Local AI voice intelligence",
    year: "2025 · 2026",
    role: "Architect & Builder",
    type: "Full local voice AI pipeline / UIX intelligence system",
    description:
      "End-to-end local voice AI. Whisper handle speech-to-text dengan GPU acceleration via CUDA 12.x, support Blackwell RTX 50xx via nightly PyTorch. LLM inference bisa route ke Ollama (local), Groq (cloud speed), atau OpenRouter (fleksibilitas). edge-TTS convert response ke natural speech. WebSocket live mode buat real-time conversation. Persistent memory layer cross-session. Designed jalan dengan zero network dependency.",
    highlights: [
      "WebSocket live conversation mode",
      "GPU-accelerated ASR (CUDA 12.x)",
      "3 LLM backends · benchmarkable",
      "Fully offline capable",
    ],
    stack: ["Whisper", "Ollama", "Groq", "OpenRouter", "edge-TTS", "FastAPI", "WebSocket", "CUDA"],
    infra: "Runs entirely on device / GPU resident / Zero cloud required",
    url: "https://github.com/Y0EL?tab=repositories",
    source: "github.com/Y0EL",
    featured: true,
  },
  {
    no: "03",
    sigil: "geocek",
    category: "Production · Defense AI",
    title: "Geocek",
    subtitle: "OSINT geolocation engine",
    year: "2025",
    role: "Builder",
    type: "Visual signal to coordinate geolocation system",
    description:
      "Geolocate gambar cuma dari visual cues. Gak butuh GPS metadata. License plate prefix mapping narrowin search ke regional bounding box. Road classification, lane count, dan median presence filter candidates dari Overpass API. Fuzzy landmark normalization handle misspelled atau partial POI mentions. Constraint intersection logic progressively eliminate candidates yang fail multiple criteria. Weighted confidence scoring estimate paling likely location plus radius of error.",
    highlights: [
      "100% free APIs · no paid services",
      "Signal extraction → area refinement → constraint filter",
      "Outputs: text report, GeoJSON, interactive Folium map",
    ],
    stack: ["Python", "OSM Nominatim", "Overpass", "GPT-4o", "LangChain", "Mapbox"],
    infra: "100 percent free APIs / No paid services required",
    url: "https://github.com/Y0EL/geocek",
    source: "github.com/Y0EL/geocek",
    featured: true,
  },
  {
    no: "04",
    sigil: "sentinel",
    category: "Production · Defense AI",
    title: "Sentinel",
    subtitle: "AntiFraud heuristics",
    year: "2024 · 2025",
    role: "Builder",
    type: "Behavioral signal analysis for fraud detection",
    description:
      "Detect inauthentic activity lewat behavioral pattern analysis. Scoring system examine transaction patterns dan interaction data buat variance signatures yang bedain organic human behavior dari synthetic atau bot-generated activity. Built dari first principles understanding cara algorithmic platforms detect dan respond ke inauthentic signals.",
    highlights: ["Heuristic scoring engine", "Pattern variance analysis", "From-scratch first principles"],
    stack: ["Python", "Heuristic scoring", "Pattern variance"],
    url: "https://github.com/Y0EL/Sentinel",
    source: "github.com/Y0EL/Sentinel",
  },
  {
    no: "05",
    sigil: "juscat",
    category: "Web3 · Sustainability",
    title: "Juscat",
    subtitle: "Blockchain AI validation",
    year: "2024",
    role: "Builder",
    type: "VeChain dApp dengan AI image validation",
    description:
      "Reward user dengan token kalau upload foto healthy juice drinks. GPT-4o validate keaslian image sebelum trigger smart contract reward. Solidity contracts di-deploy di VeChain Thor. Full monorepo: React frontend, Express TypeScript backend, Hardhat contract tooling.",
    highlights: ["AI image authenticity check", "On-chain reward via Solidity", "VeWorld exclusive"],
    stack: ["React", "VeChain SDK", "Solidity", "Hardhat", "GPT-4o", "Express"],
    infra: "VeWorld exclusive / Thor blockchain network",
    url: "https://github.com/Y0EL/Juscat",
    source: "github.com/Y0EL/Juscat",
  },
  {
    no: "06",
    sigil: "yota",
    category: "AI · Tooling",
    title: "YOTA",
    subtitle: "AI minutes-of-meeting generator",
    year: "2025",
    role: "Builder",
    type: "Full-stack web app · Multi-agent AI workflow",
    description:
      "Asisten Rapat AI Cerdas. Convert meeting recording jadi structured documents: executive summary, discussion points, action items. Whisper handle transcription dengan automatic chunking buat meeting 3+ jam. Speaker diarization otomatis labelin speaker. CrewAI multi-agent system bikin professional document structure. Real-time progress monitoring. Export ke PDF, DOCX, Markdown, plain text. Action items langsung sync ke task database.",
    highlights: [
      "Long-form audio (3+ hours) dengan smart chunking",
      "Multi-agent CrewAI workflow",
      "PDF / DOCX / Markdown export",
      "Speaker diarization",
    ],
    stack: ["Next.js 15", "React 19", "FastAPI", "Whisper", "GPT-4o", "CrewAI", "SQLite"],
    url: "https://github.com/Y0EL/MoM",
    source: "github.com/Y0EL/MoM",
    featured: true,
  },
  {
    no: "07",
    sigil: "reuse",
    category: "Web3 · Sustainability",
    title: "ReUse",
    subtitle: "Decentralized photo-verified reuse rewards",
    year: "2023 · Now",
    role: "Co-Founder & Developer",
    type: "VeBetterDAO sustainability dApp",
    description:
      "dApp yang ngasih reward ke user yang reusing barang dengan verifikasi foto, AI detection, on-chain reward distribution, dan community governance voting. Didanai dan di-endorse VeBetterDAO di bawah sustainability initiative.",
    highlights: [
      "VeBetterDAO funded & verified",
      "AI-detected reuse verification",
      "Community governance voting",
    ],
    stack: ["Next.js", "NestJS", "Supabase", "VeChain", "Solidity"],
    url: "https://reuse.vet/",
    source: "reuse.vet",
  },
  {
    no: "08",
    sigil: "soapy",
    category: "Web3 · Sustainability",
    title: "SoapyWorld",
    subtitle: "Gamified sustainability dApp",
    year: "2024 · Now",
    role: "Founder & Developer",
    type: "VeBetterDAO eco-action dApp",
    description:
      "Gamified dApp yang ngajak orang nyuci piring manual sebagai alternatif hemat energi. 800+ confirmed activities, 200+ verified, 100+ minted actions di testnet via EcoEarn.sol. Part of VeBetterDAO ecosystem.",
    highlights: [
      "800+ confirmed activities",
      "200+ verified · 100+ minted on testnet",
      "EcoEarn.sol smart contract",
    ],
    stack: ["Next.js", "NestJS", "Supabase", "VeChain", "EcoEarn.sol"],
    url: "https://soapy.world/",
    source: "soapy.world",
  },
  {
    no: "09",
    sigil: "deskriptor",
    category: "AI · Tooling",
    title: "AI Deskriptor",
    subtitle: "E-commerce content generator",
    year: "2024",
    role: "Creator @ ZANDO Agency",
    type: "AI-powered text generation tool",
    description:
      "AI-powered text generation buat product titles & descriptions e-commerce. Optimized buat market trends + trending keyword integration. Otomatisasi content creation buat product listings.",
    highlights: ["Built during ZANDO Agency tenure", "Market-optimized output"],
    stack: ["OpenAI", "Prompt Engineering", "Next.js"],
    url: "https://deskriptor.yoel.online/",
    source: "deskriptor.yoel.online",
  },
  {
    no: "10",
    sigil: "sekriptor",
    category: "AI · Tooling",
    title: "Sekriptor",
    subtitle: "AI script generator untuk content creator",
    year: "2021 · 2024",
    role: "Creator",
    type: "Zero-code AI automation",
    description:
      "AI-powered script generator buat content creators, adapted dari Gemini. Implemented dengan zero-code AI automation. Running & updated through 2024.",
    stack: ["Gemini", "Next.js"],
    url: "https://sekriptor.yoel.online/",
    source: "sekriptor.yoel.online",
  },
  {
    no: "11",
    sigil: "scope",
    category: "Apps · Side",
    title: "Scope of Work",
    subtitle: "Documentation platform",
    year: "2024",
    role: "Documentation Specialist & IT Dev",
    type: "Collaborative documentation workflow",
    description:
      "Collaborative documentation platform buat PT. HERUN INTERNATIONAL BRAND. UI development plus content management. Modern web stack buat seamless documentation workflow.",
    stack: ["React", "Tailwind", "Netlify"],
    url: "https://scoopwork.netlify.app/",
    source: "scoopwork.netlify.app",
  },
  {
    no: "12",
    sigil: "portfolio",
    category: "Apps · Side",
    title: "Field Dispatch",
    subtitle: "This portfolio you're reading",
    year: "2026",
    role: "Design & Build",
    type: "Editorial monochrome portfolio",
    description:
      "Modern portfolio dengan Newsreader serif plus Onest sans plus JetBrains Mono. Dark editorial monochrome dengan crimson signal accent. MDX blog, AI persona chat (Talkative Yoel via Groq Llama 3.3 70B), responsive design, deployed on Vercel.",
    stack: ["Next.js 14", "TypeScript", "Tailwind", "Groq", "MDX"],
    url: "https://yoel.online/",
    source: "yoel.online",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
