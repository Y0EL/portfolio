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
        <meta property="og:description" content="Ai Specialist, Yoel menggabungkan teknologi AI dengan seni kreatif." />
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
        Musician and AI Specialist at the Same Time!
      </h1>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Yoel Andreas Manoppo atau yang lebih akrab dikenal dengan Yoel adalah Seorang Spesialis AI dan produser musik yang inovatif, Yoel menggabungkan teknologi AI mutakhir dengan seni kreatif. Berpengalaman dalam pengembangan Next.js dan integrasi AI, Yoel juga membangun merek musik bernama Cubicube dengan jangkauan global. Dengan keahlian di bidang e-commerce, Yoel berkomitmen untuk memberikan solusi yang efektif dan inovatif dalam setiap proyek yang dikerjakan.
        </p>

        <h2 className="section-header text-xl font-medium mt-8 mb-6">Pengalaman Kerja</h2>
        <div className="experience-grid">
          <div className="experience-item border-l-2 border-gray-200 pl-4">
            <h3 className="font-medium">E-Commerce Specialist</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              PT. HERUN INTERNATIONAL BRAND • 2024 - Present
            </p>
            <p className="mt-2 text-sm">
              Mengembangkan dan mengelola strategi e-commerce yang inovatif untuk meningkatkan visibilitas produk dan penjualan. Bertanggung jawab untuk mengintegrasikan layanan iklan, voucher, dan acara dalam platform TikTok dan Shopee. Menganalisis perilaku pengguna untuk mengoptimalkan pengalaman belanja dan menggunakan data analitik untuk meningkatkan kinerja penjualan serta efektivitas kampanye pemasaran. Berkolaborasi dengan tim kreatif untuk merancang konten pemasaran yang menarik dan relevan, serta memantau tren pasar untuk memastikan relevansi produk.
            </p>
          </div>

          <div className="experience-item border-l-2 border-gray-200 pl-4">
            <h3 className="font-medium">AI Engineer & Tech Lead</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              PT. ZANDO AGENCY •  2024
            </p>
            <p className="mt-2 text-sm">
              Memimpin tim dalam pengembangan dan implementasi solusi AI yang bertujuan untuk meningkatkan efisiensi operasional dan pengalaman pengguna. Mendesain algoritma pembelajaran mesin untuk analisis data besar dan pengolahan bahasa alami. Berkolaborasi dengan tim lintas fungsi untuk menerapkan teknologi AI dalam berbagai proyek, termasuk sistem rekomendasi dan personalisasi konten. Mengawasi pelatihan model AI dan evaluasi kinerjanya untuk memastikan hasil yang akurat dan relevan. Menyampaikan laporan hasil analisis kepada manajemen dan memberikan rekomendasi untuk pengembangan produk di masa depan.
            </p>
          </div>

          <div className="experience-item border-l-2 border-gray-200 pl-4">
            <h3 className="font-medium">Music Producer & Artist</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Independent • 2020 - Present
            </p>
            <p className="mt-2 text-sm">
              Menghasilkan dan merilis musik original di berbagai genre, menjangkau audiens global melalui platform digital. Membangun merek musik 'Cubicube', yang menonjolkan karakter unik dan gaya kreatif. Mengelola proses produksi dari penulisan lagu, rekaman, hingga mixing dan mastering, serta memanfaatkan teknologi AI untuk menciptakan konten musik yang inovatif. Menjalin kemitraan dengan brand dan kreator lain untuk kolaborasi musik dan promosi, serta aktif dalam pemasaran digital untuk memperluas jangkauan dan dampak dari karya musik yang dihasilkan.
            </p>
          </div>

          <div className="experience-item border-l-2 border-gray-200 pl-4">
            <h3 className="font-medium">Frontend Developer</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              GhibranTravel • 2020 - 2022
            </p>
            <p className="mt-2 text-sm">
              Mengembangkan dan mengoptimalkan antarmuka pengguna yang responsif dan intuitif menggunakan Next.js dan React. Bekerja sama dengan tim desain untuk menerjemahkan wireframes dan mockups menjadi pengalaman pengguna yang menarik dan fungsional. Mengimplementasikan praktik pengembangan yang terbaik untuk meningkatkan kecepatan dan kinerja aplikasi, serta memperbaiki bug dan masalah yang ada untuk meningkatkan pengalaman pengguna secara keseluruhan. Memanfaatkan analitik pengguna untuk memahami interaksi pengguna dan memberikan rekomendasi untuk perbaikan lebih lanjut.
            </p>
          </div>
        </div>

        <h2 className="section-header text-xl font-medium mt-8 mb-4">Sertifikasi</h2>
<div className="grid sm:grid-cols-2 gap-4">
  <div className="certification-card border border-gray-200 rounded-lg p-4">
    <h3 className="font-medium">CS50X</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Introduction to Computer Science • 2023
    </p>
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Sertifikasi ini meliputi dasar-dasar ilmu komputer, pemrograman, dan algoritma. Fokus pada pemecahan masalah dan membangun aplikasi web berbasis proyek nyata. yang dipersembahkan oleh Harvard University
    </p>
    <a href="https://cs50.harvard.edu/certificates/3eaa4f95-45ef-4118-b630-e7dc7e27730f" target="_blank">
      <button className="mt-2 border border-gray-300 text-gray-700 font-bold py-1 px-3 rounded">
        Lihat Sertifikat
      </button>
    </a>
  </div>

  <div className="certification-card border border-gray-200 rounded-lg p-4">
    <h3 className="font-medium">CS50AI</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Artificial Intelligence • 2023
    </p>
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Sertifikasi CS50AI dari Harvard University memberikan pemahaman mendalam tentang konsep dan teknik AI. Dalam kursus ini, peserta belajar tentang algoritma pembelajaran mesin, pemrosesan bahasa alami, dan penerapan AI dalam berbagai proyek. Dengan pendekatan praktis, sertifikasi ini membekali peserta dengan keterampilan untuk mengembangkan solusi berbasis AI yang inovatif.
    </p>
    <a href="https://cs50.harvard.edu/certificates/1effa036-081a-4d40-bc36-0dcd61b93a96" target="_blank">
      <button className="mt-2 border border-gray-300 text-gray-700 font-bold py-1 px-3 rounded">
        Lihat Sertifikat
      </button>
    </a>
  </div>

  <div className="certification-card border border-gray-200 rounded-lg p-4">
    <h3 className="font-medium">EFSET (English First Standard English Test)</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Level: Intermediate • 2023
    </p>
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Sertifikasi ini menunjukkan kemampuan bahasa Inggris tingkat Profesional, dengan fokus pada komunikasi lisan dan tulisan dalam konteks profesional.
    </p>
    <a href="https://cert.efset.org/m9B1rv" target="_blank">
      <button className="mt-2 border border-gray-300 text-gray-700 font-bold py-1 px-3 rounded">
        Lihat Sertifikat
      </button>
    </a>
  </div>
</div>


        <p className="mt-8">
          Saya juga membawa keahlian tambahan dalam:
        </p>
        <ul>
          <li><span className="skill-tag"><strong>SEO dan Pemasaran Digital:</strong></span> Mengoptimalkan visibilitas online untuk proyek-proyek kreatif dan komersial.</li>
          <li><span className="skill-tag"><strong>MDX Support:</strong></span> Mengelola konten dinamis dan interaktif untuk pengalaman pengguna yang lebih baik.</li>
          <li><span className="skill-tag"><strong>Analitik dan Data Insight:</strong></span> Memanfaatkan data untuk meningkatkan performa dan strategi.</li>
          <li><span className="skill-tag"><strong>Integrasi Media Sosial:</strong></span> Menghubungkan konten dengan platform seperti Twitter dan YouTube untuk interaksi yang lebih luas.</li>
          <li><span className="skill-tag"><strong>Kolaborasi Kreatif:</strong></span> Membangun sinergi dengan berbagai brand dan kreator untuk memperluas jaringan dan dampak.</li>
        </ul>
        
        <p>
          Saya berkomitmen untuk memberikan solusi yang efektif dan inovatif dalam setiap proyek yang dikerjakan, serta terus mengeksplorasi cara baru untuk berkreasi dan berkolaborasi.
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
