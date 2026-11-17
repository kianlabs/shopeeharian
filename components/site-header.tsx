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
  showAccount = true,
}: {
  placeholder?: string;
  showAccount?: boolean;
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
    <header className="bg-shopee-orange sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
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
            <div className="relative flex">
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
                aria-label="Cari produk"
                className="flex-1 min-w-0 px-3 sm:px-4 py-2 rounded-l-sm text-sm bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              />
              <button
                type="submit"
                aria-label="Cari"
                className="shrink-0 bg-shopee-darkorange hover:bg-red-600 px-3 sm:px-5 rounded-r-sm text-white font-medium text-sm"
              >
                🔍
              </button>
            </div>
          </form>

          <div className="hidden md:flex items-center gap-4 text-white">
            <a
              href={site.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center cursor-pointer"
            >
              <span aria-hidden className="text-lg">
                🛒
              </span>
              <span className="text-[9px]">Keranjang</span>
            </a>
            {showAccount ? (
              <a
                href={site.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center cursor-pointer"
              >
                <span aria-hidden className="text-lg">
                  👤
                </span>
                <span className="text-[9px]">Akun</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
      {/* Bar disclosure afiliasi — selalu terlihat di semua halaman. */}
      <div className="bg-orange-800/70 text-orange-100 text-center text-[10px] leading-tight px-3 py-1">
        Tautan afiliasi Shopee — kami dapat memperoleh komisi dari pembelianmu,
        tanpa biaya tambahan untuk kamu.
      </div>
    </header>
  );
}
