import type { MetadataRoute } from "next";
import { CATEGORIES, site } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  // `lastModified` sengaja tidak dipakai: `new Date()` membuat route ini
  // dirender saat request, padahal halaman hanya berubah saat deploy baru.
  return [
    {
      url: `${site.url}/`,
      changeFrequency: "daily",
      priority: 1,
    },
    ...CATEGORIES.map((category) => ({
      url: `${site.url}${category.href}`,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  ];
}
