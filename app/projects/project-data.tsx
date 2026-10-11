export interface ShowcaseWork {
  slug: string;
  title: string;
  domain: string;
  url: string;
  year: string;
  kind: string;
  summary: string;
  story: string;
  points: string[];
  tone: "piranusa" | "yotext" | "polimerindo";
  shots: {
    desktop: string;
    long: string;
    longHeight: number;
    mobile: string;
  };
}

export interface ArchiveWork {
  slug: string;
  title: string;
  year: string;
  kind: string;
  summary: string;
  stack: string[];
  url?: string;
  source: string;
  status: "live" | "code" | "offline";
  repo?: string;
  visibility?: "private" | "public";
}

export const showcase: ShowcaseWork[] = [
  {
    slug: "piranusa",
    title: "Piranusa",
    domain: "piranusa.com",
    url: "https://www.piranusa.com/",
    year: "2026",
    kind: "Website perusahaan",
    summary: "Website untuk mitra teknologi CAD, BIM, dan 3D bagi industri di Indonesia.",
    story:
      "Piranusa menjual lisensi resmi ZWCAD, ZW3D, Archicad, SketchUp, dan Enscape, lalu mendampingi migrasi sampai training. Pengunjungnya arsitek, kontraktor, dan tim manufaktur yang sedang membandingkan biaya lisensi. Halaman pertama langsung menjawab kekhawatiran mereka sebelum masuk ke daftar produk.",
    points: [
      "Bisnis: distributor resmi software desain dan BIM",
      "Pengunjung: arsitek, kontraktor, dan tim manufaktur",
      "Yang bisa dilihat: alur dari masalah pengunjung, solusi per industri, sampai katalog produk",
    ],
    tone: "piranusa",
    shots: {
      desktop: "/work/piranusaDesktop.webp",
      long: "/work/piranusaLong.webp",
      longHeight: 2860,
      mobile: "/work/piranusaMobile.webp",
    },
  },
  {
    slug: "yotext",
    title: "YOTEXT",
    domain: "yotext.app",
    url: "https://yotext.app/",
    year: "2026",
    kind: "Produk AI",
    summary: "Meeting jadi transkrip, ringkasan, keputusan, dan tugas yang bisa dibuka lagi kapan saja.",
    story:
      "YOTEXT merekam Google Meet lewat ekstensi Chrome, lalu menyimpan hasilnya di workspace yang bisa dicari. Websitenya menjelaskan produk baru dalam satu layar: apa yang terjadi saat meeting, sesudah meeting, dan saat konteks itu dibutuhkan lagi.",
    points: [
      "Produk: aplikasi catatan meeting berbasis AI",
      "Pengunjung: profesional dan tim yang sering meeting online",
      "Yang bisa dilihat: cara produk menjelaskan manfaatnya tanpa istilah teknis",
    ],
    tone: "yotext",
    shots: {
      desktop: "/work/yotextDesktop.webp",
      long: "/work/yotextLong.webp",
      longHeight: 3700,
      mobile: "/work/yotextMobile.webp",
    },
  },
  {
    slug: "polimerindo",
    title: "Dinamika Polimerindo",
    domain: "polimerindo.com",
    url: "https://www.polimerindo.com/",
    year: "2026",
    kind: "Website manufaktur",
    summary: "Website perusahaan plastic injection molding, dari pembuatan mold sampai produksi massal.",
    story:
      "PT Dinamika Polimerindo melayani industri otomotif sampai FMCG. Calon pelanggannya pembeli industri yang perlu yakin soal kapasitas mesin, sertifikasi, dan konsistensi kualitas sebelum menghubungi tim sales.",
    points: [
      "Bisnis: plastic injection molding",
      "Pengunjung: pembeli dan tim pengadaan industri",
      "Yang bisa dilihat: penjelasan kapabilitas untuk calon pelanggan industri",
    ],
    tone: "polimerindo",
    shots: {
      desktop: "/work/polimerindoDesktop.webp",
      long: "/work/polimerindoLong.webp",
      longHeight: 4200,
      mobile: "/work/polimerindoMobile.webp",
    },
  },
];

export const archive: ArchiveWork[] = [
  {
    slug: "autocrawl",
    title: "Autocrawl",
    year: "2025 · 2026",
    kind: "Agen AI",
    summary:
      "Crawler otonom yang berjalan semalaman dengan 50 worker paralel. Satu kali jalan mengindeks 929 vendor pameran pertahanan.",
    stack: ["LangGraph", "Playwright", "Ollama", "FastAPI", "Vue 3"],
    url: "https://github.com/Y0EL/autocrawl",
    source: "github.com/Y0EL/autocrawl",
    status: "code",
    repo: "autocrawl",
    visibility: "public",
  },
  {
    slug: "alto",
    title: "ALTO",
    year: "2025",
    kind: "Aplikasi transkripsi",
    summary:
      "Platform transkripsi rapat untuk tim. Rekaman sampai 9,5 jam menjadi transkrip berlabel pembicara beserta ringkasan.",
    stack: ["React", "Hono", "Gemini", "Neon Postgres"],
    source: "Repository privat",
    status: "code",
    repo: "ALTO",
    visibility: "private",
  },
  {
    slug: "yota",
    title: "YOTA",
    year: "2025",
    kind: "Generator notulen",
    summary: "Rekaman rapat menjadi ringkasan, poin diskusi, dan action item. Cikal bakal cara berpikir di balik YOTEXT.",
    stack: ["Next.js", "FastAPI", "Whisper", "CrewAI"],
    source: "Repository privat",
    status: "code",
    repo: "MoM",
    visibility: "private",
  },
  {
    slug: "atlas",
    title: "Atlas",
    year: "2025 · 2026",
    kind: "Asisten suara lokal",
    summary: "Asisten suara yang berjalan penuh di perangkat sendiri, dengan memori lintas sesi dan mode percakapan langsung.",
    stack: ["Whisper", "Ollama", "FastAPI", "CUDA"],
    source: "Repository privat",
    status: "code",
    repo: "ATLAS",
    visibility: "private",
  },
  {
    slug: "geocek",
    title: "Geocek",
    year: "2025",
    kind: "Geolokasi OSINT",
    summary:
      "Menebak lokasi foto hanya dari petunjuk visual seperti plat nomor, jenis jalan, dan landmark. Seluruhnya memakai API gratis.",
    stack: ["Python", "Overpass", "GPT 4o"],
    url: "https://github.com/Y0EL/geocek",
    source: "github.com/Y0EL/geocek",
    status: "code",
    repo: "geocek",
    visibility: "public",
  },
  {
    slug: "scopeOfWork",
    title: "Scope of Work",
    year: "2024",
    kind: "Platform dokumentasi",
    summary: "Platform dokumentasi kolaboratif untuk PT Herun International Brand.",
    stack: ["React", "Tailwind", "Netlify"],
    url: "https://scoopwork.netlify.app/",
    source: "scoopwork.netlify.app",
    status: "live",
  },
  {
    slug: "reuse",
    title: "ReUse",
    year: "2023 · 2026",
    kind: "dApp keberlanjutan",
    summary: "Reward untuk orang yang memakai ulang barang, diverifikasi lewat foto dan AI. Didanai VeBetterDAO.",
    stack: ["Next.js", "NestJS", "VeChain", "Solidity"],
    source: "reuse.vet",
    status: "offline",
  },
  {
    slug: "soapyWorld",
    title: "SoapyWorld",
    year: "2024 · 2026",
    kind: "dApp keberlanjutan",
    summary:
      "Mengajak orang mencuci piring manual sebagai aksi hemat energi. Lebih dari 800 aktivitas terkonfirmasi di testnet.",
    stack: ["Next.js", "Supabase", "VeChain"],
    source: "soapy.world",
    status: "offline",
  },
  {
    slug: "juscat",
    title: "Juscat",
    year: "2024",
    kind: "dApp dengan validasi AI",
    summary: "Foto jus sehat divalidasi AI sebelum smart contract mengirim reward token.",
    stack: ["React", "Solidity", "GPT 4o"],
    source: "Repository privat",
    status: "code",
    repo: "juscat",
    visibility: "private",
  },
  {
    slug: "sentinel",
    title: "Sentinel",
    year: "2024 · 2025",
    kind: "Deteksi fraud",
    summary: "Mesin skor yang membedakan perilaku manusia dari aktivitas bot lewat pola variasi.",
    stack: ["Python"],
    url: "https://github.com/Y0EL/Sentinel",
    source: "github.com/Y0EL/Sentinel",
    status: "code",
    repo: "Sentinel",
    visibility: "public",
  },
  {
    slug: "aiDeskriptor",
    title: "AI Deskriptor",
    year: "2024",
    kind: "Alat konten ecommerce",
    summary: "Judul dan deskripsi produk marketplace dibuat otomatis mengikuti kata kunci yang sedang ramai.",
    stack: ["OpenAI", "Next.js"],
    url: "https://github.com/Y0EL/deskriptor",
    source: "deskriptor.yoel.online",
    status: "offline",
    repo: "deskriptor",
    visibility: "public",
  },
];
