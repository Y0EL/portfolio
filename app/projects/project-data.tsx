export interface Project {
  title: string;
  year: number;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    title: "Sekripter",
    year: 2021,
    description:
      "Sekripter adalah Skrip Generator untuk konten kreator yang diadaptasi dari AI Gemini, semuanya gue implementasikan pake AI GAK NGODING SAMA SEKALI! INI SUDAH RUNNING dan Sukses hingga menjadi mutakhir pada Tahun 2024",
    url: "https://sekripter.streamlit.app/",
  },
  {
    title: "Deskriptor",
    year: 2024,
    description:
      "Serupa namun Tak Sama, deskriptor adalah AI generative Chat yang bertugas untuk memberikan Judul dan Deskripsi, gue buat AI ini sewaktu kerja di Herun, dan gue pake buat bikin judul dan deskripsi yang udah pasti sesuai dengan fiks dengan algoritma dan tren pasar kali ini, gue pakai logika dan pemahaman AI Termutakhir dan Terbaru",
    url: "https://deskriptor.streamlit.app/",
  },
  {
    title: "Portfolio",
    year: 2024,
    description:
      "Website yang sekarang ini kalian lihat dan nikmati, ini adalah proyek ketiga, berbasis forums ini akan menjadi platform publik dimana publik bebas mengemukakan pendapatnya.",
    url: "https://yoel.pw/",
  },
];
