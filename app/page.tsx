import Image from "next/image";
import Head from "next/head"; // Import Head
import { socialLinks } from "./config";

export default function Page() {
  return (
    <section className="max-w-3xl mx-auto">
      <Head>
        <title>Yoel Andreas Manoppo - Music Live!</title>
        <meta name="description" content="Seorang Spesialis AI dan produser musik yang inovatif, Yoel menggabungkan teknologi AI dengan seni kreatif." />
        <meta property="og:title" content="Yoel Andreas Manoppo - Empowering Innovation!" />
        <meta property="og:description" content="AI Specialist, Yoel menggabungkan teknologi AI dengan seni kreatif." />
        <meta property="og:image" content="/profile.png" />
        <meta property="og:url" content="https://yoel.pw" />
        <meta property="og:type" content="website" />
      </Head>

      <a href={socialLinks.instagram} target="_blank">
        <Image
          src="profile.png"
          alt="Profile photo"
          className="profile-image rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale"
          unoptimized
          width={160}
          height={160}
          priority
        />
      </a>

      <h1 className="section-header mb-8 text-2xl font-medium tracking-tight">
        Musician, AI Specialist & Tech Entrepreneur
      </h1>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Yoel Andreas Manoppo adalah seorang musisi, AI specialist, dan tech entrepreneur yang menggabungkan kreativitas musik dengan inovasi teknologi. Sebagai Co-founder dan CTO di Akupunyabuku.com, serta Web3 fullstack developer untuk ReUse dan VeScape, Yoel memimpin pengembangan solusi teknologi yang mengintegrasikan blockchain, AI, dan fintech. Dengan latar belakang musik yang kuat dan keahlian AI yang mendalam, Yoel menciptakan sinergi unik antara seni kreatif dan teknologi mutakhir.
        </p>

        <h2 className="section-header text-xl font-medium mt-8 mb-6">Featured Experience</h2>
        <div className="experience-grid">
          <div className="experience-item border-l-2 border-blue-500 pl-4 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent rounded-r-lg p-4">
            <h3 className="font-medium text-blue-700 dark:text-blue-300">Co-founder & CTO</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Akupunyabuku.com
            </p>
            <p className="mt-2 text-sm">
              Memimpin tim teknologi dan mengembangkan visi produk untuk platform edukasi digital. Bertanggung jawab atas arsitektur sistem, pengembangan fitur-fitur inovatif, dan integrasi teknologi AI untuk personalisasi pengalaman belajar. Mengelola pengembangan fullstack menggunakan React, Next.js, Supabase, dan OpenAI API. Memimpin strategi teknologi yang mendukung pertumbuhan bisnis dan skalabilitas platform.
            </p>
          </div>

          <div className="experience-item border-l-2 border-purple-500 pl-4 bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-900/20 dark:to-transparent rounded-r-lg p-4">
            <h3 className="font-medium text-purple-700 dark:text-purple-300">Web3 Fullstack Developer</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ReUse & VeScape
            </p>
            <p className="mt-2 text-sm">
              Mengembangkan smart contract VeScape.sol dengan fokus pada tokenomics dan sistem reward yang inovatif. Mengintegrasikan payment gateway QRIS dan virtual account untuk transaksi yang seamless. Menggunakan teknologi React, Next.js, Supabase, Heroku, dan Vercel untuk membangun platform Web3 yang scalable. Bertanggung jawab atas pengembangan frontend, backend, dan integrasi blockchain untuk ekosistem sustainability dan virtual reality.
            </p>
          </div>

          <div className="experience-item border-l-2 border-green-500 pl-4 bg-gradient-to-r from-green-50 to-transparent dark:from-green-900/20 dark:to-transparent rounded-r-lg p-4">
            <h3 className="font-medium text-green-700 dark:text-green-300">AI Engineer & Tech Lead</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              PT. ZANDO AGENCY
            </p>
            <p className="mt-2 text-sm">
              Memimpin tim dalam pengembangan dan implementasi solusi AI yang bertujuan untuk meningkatkan efisiensi operasional dan pengalaman pengguna. Mendesain algoritma pembelajaran mesin untuk analisis data besar dan pengolahan bahasa alami. Berkolaborasi dengan tim lintas fungsi untuk menerapkan teknologi AI dalam berbagai proyek, termasuk sistem rekomendasi dan personalisasi konten. Mengawasi pelatihan model AI dan evaluasi kinerjanya untuk memastikan hasil yang akurat dan relevan.
            </p>
          </div>

          <div className="experience-item border-l-2 border-orange-500 pl-4 bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-900/20 dark:to-transparent rounded-r-lg p-4">
            <h3 className="font-medium text-orange-700 dark:text-orange-300">Music Producer & Artist</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Independent • Cubicube Brand
            </p>
            <p className="mt-2 text-sm">
              Menghasilkan dan merilis musik original di berbagai genre, menjangkau audiens global melalui platform digital. Membangun merek musik 'Cubicube', yang menonjolkan karakter unik dan gaya kreatif. Mengelola proses produksi dari penulisan lagu, rekaman, hingga mixing dan mastering, serta memanfaatkan teknologi AI untuk menciptakan konten musik yang inovatif. Menjalin kemitraan dengan brand dan kreator lain untuk kolaborasi musik dan promosi.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="/career-timeline" className="inline-block">
            <button className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium py-3 px-6 rounded-lg transition-all duration-300 text-sm border border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-xl">
              View Full Career Timeline →
            </button>
          </a>
        </div>

        <h2 className="section-header text-xl font-medium mt-8 mb-4">Sertifikasi</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="certification-card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200 dark:border-blue-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200">CS50X</h3>
              <span className="text-xs bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">2023</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Introduction to Computer Science • Harvard University
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Sertifikasi ini meliputi dasar-dasar ilmu komputer, pemrograman, dan algoritma. Fokus pada pemecahan masalah dan membangun aplikasi web berbasis proyek nyata.
            </p>
            <a href="https://cs50.harvard.edu/certificates/3eaa4f95-45ef-4118-b630-e7dc7e27730f" target="_blank" className="inline-block">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                Lihat Sertifikat
              </button>
            </a>
          </div>

          <div className="certification-card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border border-purple-200 dark:border-purple-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-purple-800 dark:text-purple-200">CS50AI</h3>
              <span className="text-xs bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">2023</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Artificial Intelligence • Harvard University
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Sertifikasi CS50AI memberikan pemahaman mendalam tentang konsep dan teknik AI. Belajar algoritma pembelajaran mesin, pemrosesan bahasa alami, dan penerapan AI dalam berbagai proyek.
            </p>
            <a href="https://cs50.harvard.edu/certificates/1effa036-081a-4d40-bc36-0dcd61b93a96" target="_blank" className="inline-block">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                Lihat Sertifikat
              </button>
            </a>
          </div>

          <div className="certification-card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border border-green-200 dark:border-green-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-green-800 dark:text-green-200">EFSET</h3>
              <span className="text-xs bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">2023</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              English First Standard English Test • Intermediate Level
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Sertifikasi ini menunjukkan kemampuan bahasa Inggris tingkat Profesional, dengan fokus pada komunikasi lisan dan tulisan dalam konteks profesional.
            </p>
            <a href="https://cert.efset.org/m9B1rv" target="_blank" className="inline-block">
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                Lihat Sertifikat
              </button>
            </a>
          </div>
        </div>


        <h2 className="section-header text-xl font-medium mt-8 mb-4">Technology Stack</h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div className="tech-stack-card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200 dark:border-blue-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Frontend & Fullstack</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              React, Next.js, TypeScript, Tailwind CSS, Vercel
            </p>
          </div>
          <div className="tech-stack-card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border border-purple-200 dark:border-purple-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">Backend & Database</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Supabase, Heroku, PostgreSQL, REST APIs
            </p>
          </div>
          <div className="tech-stack-card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border border-green-200 dark:border-green-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-3">AI & Machine Learning</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              OpenAI GPT-4, Claude API, AI Integration
            </p>
          </div>
          <div className="tech-stack-card bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border border-orange-200 dark:border-orange-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-3">Web3 & Blockchain</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Smart Contracts, Solidity, Tokenomics, VeScape.sol
            </p>
          </div>
        </div>

        <h2 className="section-header text-xl font-medium mt-8 mb-4">Keahlian Tambahan</h2>
        <ul>
          <li><span className="skill-tag"><strong>Payment Integration:</strong></span> QRIS, Virtual Account, Payment Gateway Development</li>
          <li><span className="skill-tag"><strong>Team Leadership:</strong></span> Memimpin tim teknologi dan mengembangkan visi produk</li>
          <li><span className="skill-tag"><strong>Product Strategy:</strong></span> Mengembangkan roadmap produk dan strategi teknologi</li>
          <li><span className="skill-tag"><strong>SEO dan Pemasaran Digital:</strong></span> Mengoptimalkan visibilitas online untuk proyek-proyek kreatif dan komersial</li>
          <li><span className="skill-tag"><strong>Analitik dan Data Insight:</strong></span> Memanfaatkan data untuk meningkatkan performa dan strategi</li>
        </ul>
        
        <p>
          Saya berkomitmen untuk memimpin inovasi teknologi yang menggabungkan AI, Web3, dan kreativitas musik. Sebagai tech entrepreneur, saya fokus pada pengembangan solusi yang scalable dan berdampak, sambil terus mengeksplorasi cara baru untuk berkreasi dan berkolaborasi dalam ekosistem teknologi yang berkembang pesat.
        </p>

        <p className="mt-8">
          <a href="mailto:yoelandreasmanoppo@gmail.com" target="_blank">
            <button className="hire-button border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
              Hire Saya!
            </button>
          </a>
        </p>
      </div>
    </section>
  );
}
