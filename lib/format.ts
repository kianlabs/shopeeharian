const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

/** 45000 -> "Rp45.000" */
export function formatRupiah(value: number): string {
  return rupiah.format(value).replace(/\s/g, "");
}

/** 12500 -> "12rb", 6200 -> "6.2rb", 890 -> "890" */
export function formatSold(sold: number): string {
  if (sold < 1000) return String(sold);
  return `${(sold / 1000).toFixed(1).replace(/\.0$/, "")}rb`;
}

/** Persentase diskon 0–99. Mengembalikan 0 bila tidak ada diskon valid. */
export function discountPercent(price: number, originalPrice: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  const percent = Math.round((1 - price / originalPrice) * 100);
  return Math.min(99, Math.max(0, percent));
}

/** 4.85 -> "4.9" */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/** 1234 -> "1.234" */
export function formatCount(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}
