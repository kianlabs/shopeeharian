import type { Metadata } from "next";
import Link from "next/link";
import { Catalog } from "@/components/catalog";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { CATEGORY_PAGES, site } from "@/lib/config";
import { getProductsByCategory } from "@/lib/products";
import type { Category } from "@/lib/types";

/** Metadata per kategori, dipakai oleh masing-masing `app/<kategori>/page.tsx`. */
export function categoryMetadata(id: Category): Metadata {
  const page = CATEGORY_PAGES[id];

  return {
    title: `${page.title} Terbaik & Termurah - ${site.name}`,
    description: `${page.description}. Diskon s/d 80%, gratis ongkir, COD tersedia.`,
    alternates: { canonical: `/${id}` },
  };
}

/**
 * Isi halaman kategori. Dipakai oleh route statis (bukan segmen dinamis)
 * supaya slug yang tidak dikenal langsung 404 dari router, bukan dari
 * render yang sudah terlanjur mengirim status 200 pada permintaan pertama.
 */
export function CategoryView({ id }: { id: Category }) {
  const page = CATEGORY_PAGES[id];
  const products = getProductsByCategory(id);

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Rekomendasi ${page.title} - ${site.name}`,
    numberOfItems: Math.min(products.length, 20),
    itemListElement: products.slice(0, 20).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        category: product.category,
        // URL gambar absolut dipakai apa adanya; path lokal diawali site.url.
        ...(product.image
          ? {
              image: product.image.startsWith("http")
                ? product.image
                : `${site.url}${product.image}`,
            }
          : {}),
        offers: {
          "@type": "Offer",
          // Harga tidak selalu terverifikasi — tanpa harga, tawarkan tanpa price.
          ...(product.price !== undefined
            ? { price: product.price, priceCurrency: "IDR" }
            : {}),
          availability: "https://schema.org/InStock",
          url: product.affiliateUrl,
        },
      },
    })),
  };

  return (
    <>
      {/* Header & footer di luar <main> supaya tetap jadi landmark
          banner/contentinfo untuk screen reader. */}
      <SiteHeader placeholder={page.searchPlaceholder} />

      <main className="min-h-screen bg-gray-100 w-full overflow-x-hidden">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
            <nav className="text-xs sm:text-sm text-gray-500">
              <Link href="/" className="hover:text-shopee-orange">
                Beranda
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-800">{page.title}</span>
            </nav>
          </div>
        </div>

        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
              <span aria-hidden className="text-3xl sm:text-4xl">
                {page.emoji}
              </span>
              {page.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5 sm:mt-2">
              {page.description}
            </p>
          </div>
        </div>

        <Catalog products={products} category={id} />
      </main>

      <Footer variant="category" />

      {/* `<` di-escape supaya nilai string tidak bisa menutup tag script. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
