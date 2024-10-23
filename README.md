# Yoel's Portfolio

Selamat datang di portfolio gue! Ini adalah template clean, cepat, dan ringan yang gue bangun pake [Next.js](https://nextjs.org/), [Vercel](https://vercel.com/), dan [Tailwind CSS](https://tailwindcss.com/) untuk performa maksimal.

Deploy portfolio ini di Vercel cuma dalam hitungan menit!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F1msirius%2FNextfolio)

## Teknologi yang Gue Gunakan

- Framework: [Next.js](https://nextjs.org/)
- Tipografi: [Vercel Geist Font](https://vercel.com/font)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- Analytics: [Vercel Web Analytics](https://vercel.com/docs/speed-insights) dan [Speed Insights](https://vercel.com/docs/speed-insights)
- Deployment: [Vercel](https://vercel.com/)

## Fitur

- **[MDX](https://mdxjs.com/) Support**: Pake Markdown bareng komponen JSX buat blog post.
- **Light dan Dark Mode Toggle**: Lo bisa ganti tema buat kenyamanan baca.
- **Dynamic [OG Images](https://vercel.com/docs/functions/og-image-generation)**: Auto-generate Open Graph images biar keren pas dibagiin.
- **SEO Optimization**: Tingkatkan visibilitas search dengan sitemap, robots.txt, dan JSON-LD schema.
- **Dynamic Feed Generation**: Auto-generate feed dinamis buat [RSS](https://nextfolio-template.vercel.app/rss.xml), [Atom](https://nextfolio-template.vercel.app/atom.xml), dan [JSON](https://nextfolio-template.vercel.app/feed.json).
- **[KaTeX](https://katex.org/) Integration**: Buat render ekspresi matematika dengan smooth.
- **Performance Tracking**: Pantau performa web dengan [Vercel Web Analytics](https://vercel.com/docs/speed-insights) dan [Speed Insights](https://vercel.com/docs/speed-insights).
- **Interactive Embeds**: Embed tweet dan video YouTube secara interaktif.
- **Captions**: Tambah caption deskriptif ke foto, tweet, atau video.
- **Image Grid**: Tampilkan galeri foto atau gambar dengan mudah.

## Instalasi

Gue pake [pnpm](https://pnpm.io/installation) buat dependency management, jadi pastiin lo udah install di sistem lo.

Jalankan [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) dengan [pnpm](https://pnpm.io/installation) buat bootstrap portfolio lo:

```
pnpm create next-app --example https://github.com/1msirius/Nextfolio my-portfolio
```

Mulai server development:

```
pnpm dev
```

Server bakal jalan di [http://localhost:3000](http://localhost:3000).

## Konfigurasi

1. Update metadata situs dan link sosial di `app/config.ts` buat setup SEO, feed, social links, dan Open Graph settings.
2. Update routes lo di `app/sitemap.ts` buat optimisasi SEO.
3. Update blog post lo di folder `/content`.

Buat info lebih lanjut tentang konfigurasi, cek [Getting Started](https://nextfolio-template.vercel.app/blog/getting-started#configuration).

## Kontribusi

Kontribusi sangat diterima! Lo bisa push kode lo ke repo gue. Apakah lo mau ningkatin fitur yang ada atau nambah yang baru, semua usaha lo sangat gue apresiasi!

## Lisensi

Portfolio gue ini open-source dan rilis di bawah MIT License.
