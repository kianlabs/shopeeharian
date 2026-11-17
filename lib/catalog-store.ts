import type { Category } from "./types";

export type TabKey = "rekomendasi" | "terlaris" | "terbaru";

export interface CatalogState {
  /** Kata kunci dari kolom pencarian di header. */
  query: string;
  /** Filter sidebar di beranda ("semua" = tanpa filter). */
  category: Category | "semua";
  /** Sub kategori per kategori halaman ("" = semua), jadi tidak bocor antar halaman. */
  subs: Record<Category, string>;
  tab: TabKey;
}

const INITIAL: CatalogState = {
  query: "",
  category: "semua",
  subs: { dapur: "", organizer: "", kebersihan: "" },
  tab: "rekomendasi",
};

/**
 * State katalog disimpan di modul, bukan di URL/`useSearchParams()`.
 * Alasannya: `useSearchParams()` di Next.js membuat boundary ini dirender
 * di klien saja, sehingga HTML statis hanya berisi skeleton. Dengan store
 * kecil ini seluruh grid tetap ikut ter-prerender untuk crawler dan
 * pengguna tanpa JS.
 */
let state: CatalogState = INITIAL;
const listeners = new Set<() => void>();

export function subscribeToCatalog(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getCatalogState() {
  return state;
}

/** Snapshot server = kondisi awal, supaya HTML & hidrasi identik. */
export function getServerCatalogState() {
  return INITIAL;
}

function patch(next: Partial<CatalogState>) {
  if (
    next.query === undefined &&
    next.category === undefined &&
    next.subs === undefined &&
    next.tab === undefined
  ) {
    return;
  }

  const merged: CatalogState = { ...state, ...next };
  if (
    merged.query === state.query &&
    merged.category === state.category &&
    merged.subs === state.subs &&
    merged.tab === state.tab
  ) {
    return;
  }

  state = merged;
  for (const listener of listeners) listener();
}

/** Sub kategori aktif untuk satu kategori halaman. */
export function getSub(state: CatalogState, category: Category) {
  return state.subs[category] ?? "";
}

export function setQuery(query: string) {
  if (query === state.query) return;
  patch({ query });
}

export function setCategory(category: Category | "semua") {
  if (category === state.category) return;
  patch({ category });
}

export function setSub(category: Category, sub: string) {
  if (getSub(state, category) === sub) return;
  patch({ subs: { ...state.subs, [category]: sub } });
}

export function setTab(tab: TabKey) {
  if (tab === state.tab) return;
  patch({ tab });
}
