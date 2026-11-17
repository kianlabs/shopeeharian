import Image from "next/image";
import {
  discountPercent,
  formatCount,
  formatRating,
  formatRupiah,
  formatSold,
} from "@/lib/format";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  /** Hanya untuk kartu yang tampil di atas lipatan. */
  priority?: boolean;
  /** Kartu sempit (strip flash sale): sembunyikan detail sekunder. */
  dense?: boolean;
}

export function ProductCard({
  product,
  priority = false,
  dense = false,
}: ProductCardProps) {
  // Konstanta lokal supaya TypeScript mempersempit `| undefined`.
  const price = product.price;
  const originalPrice = product.originalPrice;
  const rating = product.rating;
  const sold = product.sold;
  const reviews = product.reviews;

  const discount =
    price !== undefined && originalPrice !== undefined
      ? discountPercent(price, originalPrice)
      : 0;
  const filledStars =
    rating !== undefined
      ? Math.min(5, Math.max(0, Math.floor(rating)))
      : 0;

  return (
    <a
      href={product.affiliateUrl}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className="product-card bg-white rounded-sm overflow-hidden flex flex-col h-full border border-gray-100 shadow-xs hover:shadow-md active:scale-[0.98] transition-all"
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden shrink-0">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 220px"
            className="object-cover"
            priority={priority}
            loading={priority ? undefined : "lazy"}
          />
        ) : (
          <PlaceholderImage />
        )}

        {discount > 0 ? (
          <span className="absolute top-0 left-0 bg-shopee-orange text-white text-[10px] px-1.5 py-0.5 font-bold rounded-br-xs shadow-xs">
            -{discount}%
          </span>
        ) : null}

        <span
          aria-hidden
          className="absolute top-0 right-0 bg-red-600 text-white text-[10px] px-1.5 py-0.5 font-bold flash-pulse"
        >
          ⚡
        </span>
      </div>

      <div className="p-2 sm:p-2.5 flex-1 flex flex-col justify-between">
        <div>
          <h3
            className="text-xs text-gray-800 line-clamp-2 min-h-[34px] leading-snug font-normal"
            title={product.name}
          >
            {product.name}
          </h3>

          {price !== undefined ? (
            <div className="mt-1.5 sm:mt-2 whitespace-nowrap overflow-hidden flex items-baseline gap-1">
              <span
                className={`text-shopee-orange font-bold tabular-nums ${dense ? "text-xs" : "text-sm sm:text-base"}`}
              >
                {formatRupiah(price)}
              </span>
              {discount > 0 && originalPrice !== undefined ? (
                <span
                  className={`text-gray-400 line-through tabular-nums ${dense ? "text-[9px]" : "text-[10px] sm:text-xs"}`}
                >
                  {formatRupiah(originalPrice)}
                </span>
              ) : null}
            </div>
          ) : (
            <div className="mt-1.5 sm:mt-2 whitespace-nowrap overflow-hidden">
              <span
                className={`text-shopee-orange font-bold ${dense ? "text-xs" : "text-sm"}`}
              >
                Cek Harga di Shopee
              </span>
            </div>
          )}

          <div className="mt-1 flex items-center justify-between text-[11px]">
            {rating !== undefined ? (
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    aria-hidden
                    className={
                      index < filledStars ? "text-orange-400" : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
                <span className="text-gray-500 ml-0.5 tabular-nums text-[10px]">
                  {dense ? null : formatRating(rating)}
                </span>
                <span className="sr-only">
                  Rating {formatRating(rating)} dari 5.
                </span>
              </div>
            ) : (
              <span className="text-gray-400 text-[10px]">Belum ada rating</span>
            )}
            {sold !== undefined ? (
              <span className="text-gray-500 tabular-nums whitespace-nowrap text-[10px]">
                Terjual {formatSold(sold)}
              </span>
            ) : reviews !== undefined ? (
              <span className="text-gray-500 tabular-nums whitespace-nowrap text-[10px]">
                {formatCount(reviews)} ulasan
              </span>
            ) : null}
          </div>
        </div>

        {!dense && (
          <div className="mt-2.5 pt-1.5 border-t border-gray-100">
            <div className="w-full bg-shopee-orange hover:bg-shopee-darkorange text-white text-[11px] font-semibold py-1.5 px-2 rounded-xs text-center flex items-center justify-center gap-1 shadow-xs transition-colors">
              <span>Beli di Shopee</span>
              <span className="text-[10px]" aria-hidden>
                ↗
              </span>
            </div>
          </div>
        )}
      </div>
    </a>
  );
}

/**
 * Placeholder netral selama foto produk belum diisi di data/products.json.
 * Dibuat inline supaya tidak ada request gambar tambahan saat prerender.
 */
function PlaceholderImage() {
  return (
    <span
      className="absolute inset-0 grid place-items-center bg-gray-100 select-none"
      aria-hidden
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-12 h-12 text-gray-300"
      >
        <rect x="10" y="14" width="44" height="36" rx="3" />
        <circle cx="23" cy="27" r="4" />
        <path d="M12 46l12-12 9 9 6-5 13 12" />
      </svg>
    </span>
  );
}
