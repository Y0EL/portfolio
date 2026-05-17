/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  async rewrites() {
    return [
      { source: "/rss.xml", destination: "/feed/rss.xml" },
      { source: "/atom.xml", destination: "/feed/atom.xml" },
      { source: "/feed.json", destination: "/feed/feed.json" },
      { source: "/rss", destination: "/feed/rss.xml" },
      { source: "/feed", destination: "/feed/rss.xml" },
      { source: "/atom", destination: "/feed/atom.xml" },
      { source: "/json", destination: "/feed/feed.json" },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "dl.dropboxusercontent.com" },
      { protocol: "https", hostname: "media.licdn.com" },
    ],
  },
};

module.exports = nextConfig;
