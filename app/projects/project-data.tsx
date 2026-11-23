export interface ShowcaseWork {
  slug: string;
  title: string;
  domain: string;
  url?: string;
  article?: string;
  year: string;
  kind: string;
  summary: string;
  story: string;
  points: string[];
  tone: "piranusa" | "yotext" | "polimerindo" | "scanner" | "evidnce" | "tiba" | "nada" | "catetin";
  shots?: {
    desktop: string;
    long: string;
    longHeight: number;
    mobile: string;
  };
  coded?: "evidnce";
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

export const workHref = (work: ShowcaseWork) => work.url ?? work.article ?? `/projects#${work.slug}`;

export const showcase: ShowcaseWork[] = [
  {
    slug: "tiba",
    title: "Tiba",
    domain: "tiba.ai.id",
    url: "https://tiba.ai.id/",
    article: "/blog/tiba-aplikasi-hris-absensi-offline",
    year: "2026",
    kind: "Produk AI · HRIS",
    summary: "Aplikasi HR untuk perusahaan Indonesia yang tetap mencatat absen, bahkan saat sinyal putus.",
    story:
      "Tiba merapikan absensi, jadwal shift, cuti, data karyawan, rekrutmen, dan siklus karyawan dalam satu produk untuk web, Android, dan desktop. Absen tersimpan di HP walau tidak ada sinyal, lalu terkirim sendiri dengan jam aslinya begitu online. HR tidak perlu memeriksa ratusan baris absen, cukup yang ditandai janggal: di luar radius kantor, perangkat berbeda, atau jam HP yang tidak cocok. Tanda itu sinyal untuk diperiksa manusia, bukan vonis.",
    points: [
      "Masalah: HR menghabiskan waktu memeriksa absen yang sebenarnya wajar",
      "Arsitektur: satu kode React untuk web, Android, dan desktop, data setiap perusahaan dipisah di tingkat database",
      "Yang bisa dilihat: dasbor HR dan layar absen karyawan dari akun demo, semua datanya contoh",
    ],
    tone: "tiba",
    shots: {
      desktop: "/work/tibaDesktop.webp",
      long: "/work/tibaLong.webp",
      longHeight: 1342,
      mobile: "/work/tibaMobile.webp",
    },
  },
  {
    slug: "nada",
    article: "/blog/nada-pemutar-musik-pribadi-dengan-rekomendasi-ai",
    title: "Nada",
    domain: "Android dan web",
    year: "2026",
    kind: "Produk AI · Musik",
    summary: "Pemutar musik pribadi dengan rekomendasi AI, lirik yang tersinkron, dan mesin pencari yang berjalan penuh di HP.",
    story:
      "Nada dibuat untuk dipakai setiap hari: saat berangkat kerja, sambil ngoding, atau larut malam. Nada belajar dari lagu yang benar benar diputar dan dilewati, lalu meminta model AI menyusun beranda di sekitar selera itu. Setiap rekomendasi dicek dulu ke katalog asli sebelum ditampilkan, jadi tidak ada lagu karangan AI yang lolos. Versi Android tidak butuh server sama sekali, karena seluruh mesinnya berjalan di dalam HP.",
    points: [
      "Produk: pemutar musik pribadi untuk Android dan web, tidak dijual",
      "Arsitektur: satu mesin TypeScript yang sama berjalan di server dan di dalam HP",
      "Yang bisa dilihat: beranda yang disusun AI, diambil dari emulator Android dan versi web",
    ],
    tone: "nada",
    shots: {
      desktop: "/work/nadaHomeDesktop.webp",
      long: "/work/nadaHomeLong.webp",
      longHeight: 1606,
      mobile: "/work/nadaMobile.webp",
    },
  },
  {
    slug: "catetin",
    title: "Catetin",
    domain: "Android dan iOS",
    article: "/blog/catetin-aplikasi-pencatat-keuangan-pribadi-dengan-ai",
    year: "2026",
    kind: "Produk AI · Keuangan pribadi",
    summary: "Aplikasi pencatat keuangan pribadi: catat pengeluaran lewat chat Telegram, scan struk belanja dengan AI, dan pantau budget bulanan.",
    story:
      "Catetin dibuat untuk orang yang jarang membuka aplikasi keuangan. Pengeluaran cukup diketik seperti pesan chat, misalnya \"makan 35rb\", lalu Catetin mengisi jumlah Rp35.000 dan kategori makanan secara otomatis. Struk belanja cukup difoto, lalu AI memecahnya per item. Kat, asisten suara di dalam aplikasi, menjawab pertanyaan seperti \"bulan ini aku boros di mana\" berdasarkan transaksi milik pengguna sendiri.",
    points: [
      "Produk: aplikasi Android dan iOS untuk mencatat pemasukan, pengeluaran, budget, dan tagihan bersama",
      "Arsitektur: Expo React Native, API Hono, PostgreSQL di Neon, bot Telegram, dan Gemini untuk scan struk serta asisten suara",
      "Yang bisa dilihat: delapan layar aplikasi yang dijalankan di lokal dengan data contoh",
    ],
    tone: "catetin",
    shots: {
      desktop: "/work/catetinDesktop.webp",
      long: "/work/catetinLong.webp",
      longHeight: 1518,
      mobile: "/work/catetinMobile.webp",
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
      "YOTEXT merekam Google Meet lewat ekstensi Chrome, lalu menyimpan transkrip, ringkasan, keputusan, dan tugas di workspace yang bisa dicari. Produknya dirancang dari tiga momen: saat meeting berlangsung, sesudah meeting selesai, dan saat konteks itu dibutuhkan lagi minggu depan.",
    points: [
      "Produk: aplikasi catatan meeting berbasis AI",
      "Pengguna: profesional dan tim yang sering meeting online",
      "Arsitektur: ekstensi Chrome, workspace tim, dan landing page yang menjelaskan manfaatnya tanpa istilah teknis",
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
    slug: "evidnce",
    title: "EVIDNCE",
    domain: "evidnce.tech",
    url: "https://evidnce.tech/",
    article: "/blog/evidnce-riset-perusahaan-dengan-ai-dan-sumber",
    year: "2026",
    kind: "Produk riset",
    summary: "Mesin riset perusahaan yang menyimpan sumber di balik setiap klaim, bukan sekadar daftar nama.",
    story:
      "EVIDNCE menjawab pertanyaan tim sales seperti siapa saja distributor CAD di Indonesia, lalu memeriksa sendiri jawabannya ke halaman mitra dan situs perusahaan. Setiap hubungan diberi status Confirmed, Claimed, atau Possible beserta kutipan halaman yang mendukungnya. Tampilannya sengaja berupa satu jendela aplikasi tanpa gulir, karena ini alat kerja yang dipakai sambil mengetik, bukan halaman yang dibaca sambil menggulir.",
    points: [
      "Produk: mesin riset perusahaan yang menyimpan buktinya",
      "Pengunjung: tim sales dan riset pasar",
      "Yang bisa dilihat: satu layar kerja, setiap klaim membawa sumbernya",
    ],
    tone: "evidnce",
    coded: "evidnce",
  },
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
    slug: "scanner",
    title: "3D Scanner Indonesia",
    domain: "3dscanner.id",
    url: "https://3dscanner.id/",
    year: "2026",
    kind: "Website produk",
    summary: "Website distributor resmi SHINING 3D di Indonesia untuk 3D scanner pengukuran, inspeksi, dan reverse engineering.",
    story:
      "3dscanner.id adalah etalase PIRANUSA untuk lini 3D scanner SHINING 3D, dari handheld scanner sampai sistem inspeksi otomatis. Pengunjungnya tim manufaktur dan quality control yang perlu tahu scanner mana yang cocok dengan ukuran benda kerja dan tingkat presisi mereka. Halamannya mengajak pengunjung memilih berdasarkan kebutuhan dulu, baru masuk ke katalog produk.",
    points: [
      "Bisnis: distributor resmi 3D scanner SHINING 3D",
      "Pengunjung: tim manufaktur, quality control, dan engineering",
      "Yang bisa dilihat: alur memilih scanner dari kebutuhan pekerjaan sampai katalog produk",
    ],
    tone: "scanner",
    shots: {
      desktop: "/work/scannerDesktop.webp",
      long: "/work/scannerLong.webp",
      longHeight: 3990,
      mobile: "/work/scannerMobile.webp",
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
