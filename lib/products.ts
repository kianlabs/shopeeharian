import document from "@/data/products.json";
import { discountPercent } from "./format";
import type { Category, Product } from "./types";

/**
 * Skema sumber: export tools/export_landing_page.py
 * (~/workspace/threads-affiliate-system/data/landing-page-products.json).
 * Field export -> field Product:
 *   product_id -> id | name -> name | category -> category
 *   affiliate_link -> affiliateUrl | product_url -> productUrl
 *   price_min -> price | price_display -> priceDisplay (disimpan, tidak
 *   ditampilkan mentah di kartu karena bisa berisi catatan panjang)
 *   rating -> rating | reviews -> reviews | image_url -> image
 *   original_price -> originalPrice | discount_pct -> discountPct
 *   (HANYA untuk 14/50 produk dengan harga coret terverifikasi 17 Nov 2026)
 * Export TIDAK punya: sold, featured, tag — jangan dikarang.
 */

const CATEGORY_IDS: Category[] = ["dapur", "organizer", "kebersihan"];

function isCategory(value: unknown): value is Category {
  return (
    typeof value === "string" && (CATEGORY_IDS as string[]).includes(value)
  );
}

function toPositiveNumber(value: unknown): number | null {
  const parsed = typeof value === "string" ? Number(value) : value;
  return typeof parsed === "number" && Number.isFinite(parsed) && parsed > 0
    ? parsed
    : null;
}

function toHttpsUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

/**
 * Satu entri rusak hanya dilewati dengan warning — `next build` tidak boleh
 * gagal gara-gara salah ketik di data/products.json.
 */
function normalize(row: unknown, index: number): Product | null {
  if (!row || typeof row !== "object") return null;

  const entry = row as Record<string, unknown>;
  const id =
    typeof entry.product_id === "string" ? entry.product_id.trim() : "";
  const name = typeof entry.name === "string" ? entry.name.trim() : "";
  const affiliateUrl = toHttpsUrl(entry.affiliate_link);

  if (!id || !name || !affiliateUrl) {
    console.warn(
      `[products] entri #${index} dilewati: butuh product_id, name, dan affiliate_link (https).`,
    );
    return null;
  }

  if (!isCategory(entry.category)) {
    console.warn(
      `[products] entri #${index} ("${id}") punya kategori tidak dikenal ("${String(entry.category)}"), dilewati.`,
    );
    return null;
  }

  const price = toPositiveNumber(entry.price_min);
  const rating = toPositiveNumber(entry.rating);
  const reviews = toPositiveNumber(entry.reviews);

  const product: Product = {
    id,
    name,
    category: entry.category,
    affiliateUrl,
  };

  if (price !== null) product.price = Math.round(price);
  // Harga coret HANYA dari export (terverifikasi 17 Nov 2026). Fail-closed:
  // coret harus lebih besar dari harga, kalau tidak diskon diabaikan total.
  const originalPrice = toPositiveNumber(entry.original_price);
  if (originalPrice !== null && price !== null && originalPrice > price) {
    product.originalPrice = Math.round(originalPrice);
    const computedPct = discountPercent(price, originalPrice);
    const storedPct = toPositiveNumber(entry.discount_pct);
    if (storedPct !== null && Math.round(storedPct) !== computedPct) {
      console.warn(
        `[products] entri "${id}" discount_pct tersimpan (${storedPct}) != hitungan (${computedPct}); dipakai hitungan.`,
      );
    }
    product.discountPct = computedPct;
  } else if (originalPrice !== null) {
    console.warn(
      `[products] entri "${id}" original_price tidak lebih besar dari harga, diskon diabaikan.`,
    );
  }
  if (
    typeof entry.price_display === "string" &&
    entry.price_display.trim() !== ""
  ) {
    product.priceDisplay = entry.price_display.trim();
  }
  if (typeof entry.product_url === "string") {
    const productUrl = toHttpsUrl(entry.product_url);
    if (productUrl) product.productUrl = productUrl;
  }
  if (rating !== null) {
    product.rating = Math.min(5, Math.round(rating * 10) / 10);
  }
  if (reviews !== null) product.reviews = Math.round(reviews);
  if (
    typeof entry.price_source === "string" &&
    entry.price_source.trim() !== ""
  ) {
    product.priceSource = entry.price_source.trim();
  }

  if (typeof entry.image_url === "string") {
    // Path lokal atau URL https (CDN Shopee, diizinkan via
    // images.remotePatterns di next.config.ts). Nilai lain dilewati.
    const image = entry.image_url.trim();
    if (image.startsWith("/")) {
      product.image = image;
    } else if (image !== "") {
      const remote = toHttpsUrl(image);
      if (remote) {
        product.image = remote;
      } else {
        console.warn(
          `[products] entri "${id}" punya image_url bukan URL https ("${image}"), dilewati.`,
        );
      }
    }
  }

  return product;
}

const rows: unknown[] = Array.isArray(document)
  ? document
  : Array.isArray((document as { products?: unknown }).products)
    ? (document as { products: unknown[] }).products
    : [];

const seen = new Set<string>();

export const products: Product[] = rows.flatMap((row, index) => {
  const product = normalize(row, index);
  if (!product) return [];
  if (seen.has(product.id)) {
    console.warn(`[products] id duplikat dilewati: "${product.id}"`);
    return [];
  }
  seen.add(product.id);
  return [product];
});

/**
 * Flash sale: produk BERDISKON dulu (persen diskon terbesar, lalu rating),
 * sisanya diisi produk rating tertinggi. Hanya 14/50 produk yang punya
 * harga coret terverifikasi 17 Nov 2026 — sisanya tidak boleh dikarang.
 */
const isDiscounted = (p: Product): boolean =>
  p.price !== undefined &&
  p.originalPrice !== undefined &&
  p.originalPrice > p.price;

export const featuredProducts: Product[] = [
  ...[...products]
    .filter(isDiscounted)
    .sort(
      (a, b) =>
        discountPercent(b.price!, b.originalPrice!) -
          discountPercent(a.price!, a.originalPrice!) ||
        (b.rating ?? 0) - (a.rating ?? 0),
    ),
  ...[...products]
    .filter((p) => !isDiscounted(p))
    .sort(
      (a, b) =>
        (b.rating ?? 0) - (a.rating ?? 0) ||
        (b.reviews ?? 0) - (a.reviews ?? 0),
    ),
].slice(0, 8);

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((product) => product.category === category);
}
