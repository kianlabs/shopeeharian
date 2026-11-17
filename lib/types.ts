/**
 * Niche aktif: HOME LIVING (dapur / organizer / kebersihan).
 * Kategori beauty (skincare, makeup, parfum, haircare) DIPARKIR untuk fase 2 —
 * kodenya masih ada di backup ~/Projects/affiliatelandingpage.bak-20261117.
 */
export type Category = "dapur" | "organizer" | "kebersihan";

export type SortKey = "rekomendasi" | "rating" | "harga";

export interface Product {
  /** Identifier unik dari sumber data (product_id export, mis. P-28007581-1702781107). */
  id: string;
  name: string;
  category: Category;
  subcategory?: string;
  affiliateUrl: string;
  productUrl?: string;
  /** Harga numerik terverifikasi (price_min export); tidak tersedia berarti harga disembunyikan. */
  price?: number;
  /** Teks harga/rentang persis dari sumber — disimpan, TIDAK ditampilkan mentah di kartu. */
  priceDisplay?: string;
  /** Tidak ada di export — hanya diisi bila sumber memberi harga coret terverifikasi. */
  originalPrice?: number;
  /** Persen diskon terverifikasi; kartu menghitung ulang dari harga vs harga coret (harus sama). */
  discountPct?: number;
  rating?: number;
  /** Jumlah ulasan terverifikasi. Export tidak punya kolom "terjual". */
  reviews?: number;
  /** Jumlah terjual — tidak ada di export, dibiarkan kosong (jangan isi dari reviews). */
  sold?: number;
  /** Path lokal atau URL HTTPS dari host gambar yang diizinkan (CDN Shopee). */
  image?: string;
  imageAlt?: string;
  promoLabel?: string;
  promotionStart?: string;
  promotionEnd?: string;
  verifiedAt?: string;
  priceSource?: string;
}
