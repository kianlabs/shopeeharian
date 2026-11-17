import { flashSale } from "@/lib/config";
import { featuredProducts } from "@/lib/products";
import { Countdown } from "./countdown";
import { ProductCard } from "./product-card";

export function FlashSale() {
  if (featuredProducts.length === 0) return null;

  return (
    <section id="flash-sale" className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-shopee-orange flex items-center gap-1 whitespace-nowrap">
              <span className="flash-pulse">⚡</span> {flashSale.title}
            </h2>
            <span className="hidden sm:inline text-xs text-gray-500 whitespace-nowrap">
              {flashSale.countdownLabel}
            </span>
            <Countdown />
          </div>
          <a
            href="#produk"
            className="text-shopee-orange text-xs hover:underline whitespace-nowrap ml-auto"
          >
            {flashSale.cta}
          </a>
        </div>

        <div className="flex overflow-x-auto gap-2.5 sm:gap-3 py-2.5 sm:py-3 scrollbar-hide snap-x snap-mandatory">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="flex-shrink-0 w-[132px] sm:w-36 snap-start">
              <ProductCard product={product} priority={index < 4} dense />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
