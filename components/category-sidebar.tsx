"use client";

import { useSyncExternalStore } from "react";
import { CATEGORIES, CATEGORY_PAGES, sidebar } from "@/lib/config";
import {
  getCatalogState,
  getServerCatalogState,
  getSub,
  setCategory,
  setSub,
  subscribeToCatalog,
} from "@/lib/catalog-store";
import type { Category } from "@/lib/types";

const ITEM_BASE =
  "w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2";
const ITEM_ACTIVE =
  "bg-orange-50 text-shopee-orange font-medium border-l-2 border-shopee-orange";
const ITEM_IDLE = "text-gray-600 hover:bg-gray-50";

function Aside({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="hidden lg:block w-52 flex-shrink-0">
      <div className="bg-white rounded-sm shadow-sm sticky top-20 overflow-hidden">
        <div className="bg-shopee-orange text-white px-4 py-2.5 font-bold text-sm">
          {title}
        </div>
        <nav className="py-2">{children}</nav>
      </div>
    </aside>
  );
}

/** Sidebar beranda: "📂 Kategori" + kotak promo gratis ongkir. */
export function CategoryFilterSidebar() {
  const { category } = useSyncExternalStore(
    subscribeToCatalog,
    getCatalogState,
    getServerCatalogState,
  );

  const items = [
    { id: "semua" as const, label: "Semua", emoji: "🏷️" },
    ...CATEGORIES.map((entry) => ({
      id: entry.id,
      label: entry.label,
      emoji: entry.emoji,
    })),
  ];

  return (
    <aside className="hidden lg:block w-52 flex-shrink-0">
      <div className="bg-white rounded-sm shadow-sm sticky top-20 overflow-hidden">
        <div className="bg-shopee-orange text-white px-4 py-2.5 font-bold text-sm">
          {sidebar.title}
        </div>

        <nav className="py-2">
          {items.map((item) => {
            const isActive = item.id === category;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                aria-pressed={isActive}
                className={`${ITEM_BASE} ${isActive ? ITEM_ACTIVE : ITEM_IDLE}`}
              >
                <span aria-hidden>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mx-3 mb-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-sm p-3 border border-orange-100">
          <p className="text-[11px] font-bold text-shopee-orange mb-1">
            {sidebar.promoTitle}
          </p>
          <p className="text-[10px] text-gray-500">
            {sidebar.promoDescription}
          </p>
        </div>
      </div>
    </aside>
  );
}

/** Sidebar halaman kategori: "📂 Sub Kategori" (tanpa kotak promo). */
export function SubCategorySidebar({ category }: { category: Category }) {
  const state = useSyncExternalStore(
    subscribeToCatalog,
    getCatalogState,
    getServerCatalogState,
  );
  const sub = getSub(state, category);

  const { subcategories } = CATEGORY_PAGES[category];

  return (
    <Aside title="📂 Sub Kategori">
      <button
        type="button"
        onClick={() => setSub(category, "")}
        aria-pressed={sub === ""}
        className={`${ITEM_BASE} ${sub === "" ? ITEM_ACTIVE : ITEM_IDLE}`}
      >
        <span aria-hidden>🏷️</span>
        <span>Semua</span>
      </button>

      {subcategories.map((subcategory) => {
        const isActive = subcategory.label === sub;
        return (
          <button
            key={subcategory.label}
            type="button"
            onClick={() => setSub(category, subcategory.label)}
            aria-pressed={isActive}
            className={`${ITEM_BASE} ${isActive ? ITEM_ACTIVE : ITEM_IDLE}`}
          >
            {subcategory.label}
          </button>
        );
      })}
    </Aside>
  );
}
