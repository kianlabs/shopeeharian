"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { CATEGORIES, CATEGORY_PAGES, TABS } from "@/lib/config";
import {
  getCatalogState,
  getServerCatalogState,
  getSub,
  setCategory,
  setQuery,
  setSub,
  setTab,
  subscribeToCatalog,
} from "@/lib/catalog-store";
import type { Category, Product } from "@/lib/types";
import { ProductCard } from "./product-card";

const GRID =
  "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3";

function matchesSub(product: Product, keywords: string[]) {
  const name = product.name.toLowerCase();
  return keywords.some((keyword) => name.includes(keyword));
}

/**
 * Kolom pencarian tidak hanya nama produk: placeholder di header menjanjikan
 * "dapur, organizer, kebersihan", jadi kategori ikut dicari.
 */
function searchableText(product: Product) {
  const page = CATEGORY_PAGES[product.category];
  return [product.name, product.category, page.title].join(" ").toLowerCase();
}

/**
 * Menyelaraskan state pencarian dengan `?q=` di URL supaya hasil bisa
 * dibagikan/di-bookmark dan `SearchAction` pada JSON-LD benar-benar jalan.
 * Dibaca dari `location` (bukan `useSearchParams`) agar HTML tetap statis.
 */
function useQueryFromUrl() {
  useEffect(() => {
    const apply = () => {
      const value = new URLSearchParams(window.location.search).get("q") ?? "";
      setQuery(value);
    };

    apply();
    window.addEventListener("popstate", apply);
    return () => window.removeEventListener("popstate", apply);
  }, []);
}

export function ProductExplorer({
  products,
  category,
}: {
  products: Product[];
  category?: Category;
}) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const state = useSyncExternalStore(
    subscribeToCatalog,
    getCatalogState,
    getServerCatalogState,
  );
  const { query, category: filter, tab } = state;

  useQueryFromUrl();

  const activeCategory = category ?? filter;
  const sub = category ? getSub(state, category) : "";
  const needle = query.trim().toLowerCase();

  const subKeywords = category
    ? CATEGORY_PAGES[category].subcategories.find((item) => item.label === sub)
        ?.keywords
    : undefined;

  const filtered = products.filter((product) => {
    if (activeCategory !== "semua" && product.category !== activeCategory) {
      return false;
    }
    if (subKeywords && !matchesSub(product, subKeywords)) return false;
    if (needle !== "" && !searchableText(product).includes(needle)) {
      return false;
    }
    return true;
  });

  // "Terlaris" diurutkan dari jumlah terjual; export tidak punya kolom
  // terjual, jadi jumlah ulasan dipakai sebagai pengganti.
  const list =
    tab === "terlaris"
      ? [...filtered].sort(
          (a, b) => (b.sold ?? b.reviews ?? 0) - (a.sold ?? a.reviews ?? 0),
        )
      : tab === "terbaru"
        ? [...filtered].reverse()
        : filtered;

  // Sidebar disembunyikan di layar kecil, jadi filter yang sama disajikan
  // sebagai chip horizontal — pola mobile-first.
  const chips = category
    ? [
        { id: "", label: "Semua" },
        ...CATEGORY_PAGES[category].subcategories.map((item) => ({
          id: item.label,
          label: item.label,
        })),
      ]
    : [
        { id: "semua", label: "Semua" },
        ...CATEGORIES.map((item) => ({ id: item.id, label: item.label })),
      ];

  return (
    <>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-3 lg:hidden py-0.5 overscroll-x-contain touch-pan-x">
        {chips.map((chip) => {
          const isActive = category ? chip.id === sub : chip.id === filter;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() =>
                category
                  ? setSub(category, chip.id)
                  : setCategory(chip.id as Category | "semua")
              }
              aria-pressed={isActive}
              className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium active:scale-95 transition-all ${
                isActive
                  ? "bg-shopee-orange text-white shadow-xs"
                  : "bg-white text-gray-700 border border-gray-200 active:bg-gray-50"
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Tab bar — sama seperti referensi. */}
      <div className="bg-white rounded-sm shadow-xs mb-3 sm:mb-4 overflow-x-auto scrollbar-hide overscroll-x-contain touch-pan-x">
        <div className="flex border-b border-gray-100 w-max min-w-full">
          {TABS.map((entry) => {
            const isActive = entry.id === tab;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => setTab(entry.id)}
                aria-pressed={isActive}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap active:bg-gray-50 ${
                  isActive
                    ? "text-shopee-orange font-bold"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {entry.label}
                {isActive ? (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-shopee-orange" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {list.length === 0 ? (
        <div className="bg-white rounded-sm shadow-xs px-4 py-12 text-center">
          <p className="text-2xl" aria-hidden>
            🔍
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Produk tidak ditemukan. Coba kata kunci lain.
          </p>
        </div>
      ) : (
        <div className={GRID}>
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Floating Kembali ke Atas (khusus mobile) */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Kembali ke atas"
          className="fixed bottom-5 right-4 z-40 bg-white/95 text-shopee-orange border border-orange-200 shadow-md rounded-full w-10 h-10 flex items-center justify-center text-base font-bold active:scale-90 transition-transform sm:hidden"
        >
          ↑
        </button>
      )}
    </>
  );
}
