import type { Category } from "./types";

/**
 * Semua teks & konfigurasi tampilan ada di sini supaya paritas layout dengan
 * referensi mudah dijaga dan rebranding cukup ubah satu file.
 *
 * Niche aktif: HOME LIVING (dapur / organizer / kebersihan).
 * Beauty (skincare, makeup, parfum, haircare) diparkir untuk fase 2 —
 * kodenya masih ada di backup ~/Projects/affiliatelandingpage.bak-20261117.
 */

export const site = {
  name: "Shopee Harian",
  tagline: "Peralatan dapur, organizer & kebersihan rumah pilihan",
  description:
    "Temukan rekomendasi peralatan dapur, organizer, dan kebersihan rumah terlaris di Shopee — pilihan untuk dapur rapi dan kos-kosan nyaman. Harga mulai belasan ribu, produk pilihan dengan ribuan ulasan.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopeeharian.vercel.app",
  shopeeUrl: "https://shopee.co.id",
  searchPlaceholder: "Cari produk rumah & kos...",
  social: "@shopeharian",
  copyrightYear: 2026, // perbarui manual setiap tahun baru
} as const;

export const hero = {
  title: "SHOPEE HARIAN, BELANJA LEBIH HEMAT! 🧡",
  subtitle: site.tagline,
} as const;

/**
 * Tiap `id` punya route statis sendiri di `app/<id>/page.tsx`. Saat menambah
 * kategori baru, buat juga file route-nya (plus entri `CATEGORY_PAGES`).
 */
export const CATEGORIES: {
  id: Category;
  label: string;
  emoji: string;
  href: string;
}[] = [
  { id: "dapur", label: "Dapur", emoji: "🍳", href: "/dapur" },
  { id: "organizer", label: "Organizer", emoji: "🗄️", href: "/organizer" },
  { id: "kebersihan", label: "Kebersihan", emoji: "🧹", href: "/kebersihan" },
];

export const BENEFITS = [
  {
    emoji: "🚚",
    title: "Gratis Ongkir",
    description: "Promo setiap hari",
    tone: "bg-orange-100",
  },
  {
    emoji: "✅",
    title: "Produk Original",
    description: "100% asli",
    tone: "bg-green-100",
  },
  {
    emoji: "💰",
    title: "Harga Terbaik",
    description: "Termurah dijamin",
    tone: "bg-blue-100",
  },
  {
    emoji: "🔄",
    title: "Garansi 7 Hari",
    description: "Mudah dikembalikan",
    tone: "bg-purple-100",
  },
] as const;

export const flashSale = {
  title: "FLASH SALE",
  countdownLabel: "Berakhir dalam:",
  cta: "Lihat Semua →",
} as const;

export const sidebar = {
  title: "📂 Kategori",
  promoTitle: "🎁 GRATIS ONGKIR",
  promoDescription: "Minimal belanja Rp50.000",
} as const;

export const TABS = [
  { id: "rekomendasi", label: "Rekomendasi" },
  { id: "terlaris", label: "Terlaris" },
  { id: "terbaru", label: "Terbaru" },
] as const;

/**
 * Isi halaman kategori (/dapur, /organizer, /kebersihan) persis seperti
 * referensi: breadcrumb, judul, deskripsi, dan daftar sub kategori di
 * sidebar. Sub kategori dicocokkan ke nama produk (keyword, lowercase).
 */
export const CATEGORY_PAGES: Record<
  Category,
  {
    emoji: string;
    title: string;
    description: string;
    searchPlaceholder: string;
    subcategories: { label: string; keywords: string[] }[];
  }
> = {
  dapur: {
    emoji: "🍳",
    title: "Dapur",
    description:
      "Pisau, talenan, wadah penyimpanan, rak dapur, dan peralatan masak terlaris untuk dapur rapi",
    searchPlaceholder: "Cari peralatan dapur...",
    subcategories: [
      {
        label: "Pisau & Talenan",
        keywords: ["pisau", "talenan", "pengasah", "cutting"],
      },
      {
        label: "Wadah & Rak",
        keywords: ["kotak", "wadah", "keranjang", "rak", "jar", "dispenser", "tudung"],
      },
      {
        label: "Alat Dapur",
        keywords: ["timbangan", "pompa", "waffle", "fryer", "gelas", "mat"],
      },
      {
        label: "Pembersih Dapur",
        keywords: ["spons", "sikat", "cleaner", "keset"],
      },
      {
        label: "Karpet & Cermin",
        keywords: ["karpet", "cermin", "mirror"],
      },
    ],
  },
  organizer: {
    emoji: "🗄️",
    title: "Organizer",
    description:
      "Gantungan, kotak penyimpanan, dan rak dokumen untuk rumah dan kos yang rapi",
    searchPlaceholder: "Cari organizer...",
    subcategories: [
      {
        label: "Gantungan & Rak",
        keywords: ["gantungan", "holder", "rak"],
      },
      {
        label: "Kotak & Box",
        keywords: ["kotak", "box", "storage", "medicine"],
      },
      {
        label: "Dokumen & Arsip",
        keywords: ["dokumen", "map", "folder"],
      },
      {
        label: "Kamar Mandi",
        keywords: ["toothbrush", "tisu", "sikat gigi"],
      },
    ],
  },
  kebersihan: {
    emoji: "🧹",
    title: "Kebersihan",
    description:
      "Pel, sapu, sikat, lap microfiber, dan cairan pembersih rumah terlaris",
    searchPlaceholder: "Cari alat kebersihan...",
    subcategories: [
      {
        label: "Pel & Sapu",
        keywords: ["pel", "mop", "sapu", "pengki"],
      },
      { label: "Sikat", keywords: ["sikat"] },
      {
        label: "Lap & Kain",
        keywords: ["lap", "microfiber", "kain"],
      },
      {
        label: "Cairan Pembersih",
        keywords: ["spray", "sabun", "cleaner"],
      },
    ],
  },
};

export const footerColumns = [
  {
    title: "Bantuan",
    items: ["Hubungi Kami", "Cara Belanja", "Cara Pembayaran"],
  },
  {
    title: "Kebijakan",
    items: ["Kebijakan Pengembalian", "Kebijakan Privasi"],
  },
] as const;
