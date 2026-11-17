"use client";

import Link from "next/link";
import { useSyncExternalStore, type FormEvent } from "react";
import { site } from "@/lib/config";
import {
  getCatalogState,
  getServerCatalogState,
  setQuery,
  subscribeToCatalog,
} from "@/lib/catalog-store";

export function SiteHeader({
  placeholder = site.searchPlaceholder,
}: {
  placeholder?: string;
}) {
  const { query } = useSyncExternalStore(
    subscribeToCatalog,
    getCatalogState,
    getServerCatalogState,
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Tulis kata kunci ke URL supaya hasil pencarian bisa dibagikan dan
    // `potentialAction` (SearchAction) di JSON-LD tidak jadi janji kosong.
    const params = new URLSearchParams(window.location.search);
    const value = query.trim();
    if (value === "") params.delete("q");
    else params.set("q", value);

    const search = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${search ? `?${search}` : ""}`,
    );
  }

  return (
    <header className="bg-shopee-orange sticky top-0 z-50 shadow-md w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 w-full">
        <div className="flex items-center gap-2 sm:gap-4 h-14">
          <Link href="/" className="flex-shrink-0 flex items-center h-9">
            <span className="text-white font-black text-sm sm:text-base tracking-tight whitespace-nowrap">
              SHOPEE
              <span className="font-medium text-orange-100 ml-1">HARIAN</span>
            </span>
          </Link>

          {/* `min-w-0` wajib: input punya lebar intrinsik (`size`) yang
              membuat header melebar di layar 360–390px. */}
          <form
            role="search"
            onSubmit={handleSubmit}
            className="flex-1 min-w-0 max-w-2xl"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
                aria-label="Cari produk"
                className="flex-1 min-w-0 px-3 sm:px-4 py-2 pr-8 sm:pr-9 rounded-l-sm text-xs sm:text-sm bg-white placeholder:text-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              />
              {query !== "" && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Hapus pencarian"
                  className="absolute right-12 sm:right-16 text-gray-400 hover:text-gray-600 px-1 text-xs active:scale-90"
                >
                  ✕
                </button>
              )}
              <button
                type="submit"
                aria-label="Cari"
                className="shrink-0 bg-shopee-darkorange hover:bg-red-600 px-3 sm:px-5 py-2 rounded-r-sm text-white font-medium text-xs sm:text-sm"
              >
                🔍
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}
