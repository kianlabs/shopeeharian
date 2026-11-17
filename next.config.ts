import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Foto produk berasal dari CDN Shopee (field image_url di export), jadi
  // host-nya harus diizinkan di sini (sesuai docs Next.js: images.remotePatterns).
  // Foto lokal tetap bisa dipakai dari public/products/ tanpa konfigurasi ini.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "down-id.img.susercontent.com",
      },
    ],
  },
};

export default nextConfig;
