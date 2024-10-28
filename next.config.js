/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  // Opsi tambahan untuk MDX bisa ditambahkan di sini jika diperlukan
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    serverActions: true,
  },
  async rewrites() {
    return [
      {
        source: "/rss.xml",
        destination: "/feed/rss.xml",
      },
      {
        source: "/atom.xml",
        destination: "/feed/atom.xml",
      },
      {
        source: "/feed.json",
        destination: "/feed/feed.json",
      },
      {
        source: "/rss",
        destination: "/feed/rss.xml",
      },
      {
        source: "/feed",
        destination: "/feed/rss.xml",
      },
      {
        source: "/atom",
        destination: "/feed/atom.xml",
      },
      {
        source: "/json",
        destination: "/feed/feed.json",
      },
    ];
  },
  images: {
    domains: ['dl.dropboxusercontent.com'], // domain ini untuk memuat gambar dari Dropbox
  },
};

// Ekspor konfigurasi dengan dukungan MDX
module.exports = withMDX(nextConfig);
