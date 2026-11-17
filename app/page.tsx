import type { Metadata } from "next";
import { Benefits } from "@/components/benefits";
import { Catalog } from "@/components/catalog";
import { CategoryRow } from "@/components/category-row";
import { FlashSale } from "@/components/flash-sale";
import { Footer } from "@/components/footer";
import { HeroBanner } from "@/components/hero-banner";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/config";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description: site.description,
  potentialAction: {
    "@type": "SearchAction",
    target: `${site.url}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Rekomendasi produk ${site.name}`,
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

export default function Home() {
  return (
    <>
      {/* Header & footer di luar <main> supaya tetap jadi landmark
          banner/contentinfo untuk screen reader. */}
      <SiteHeader />

      <main className="min-h-screen bg-gray-100">
        <HeroBanner />
        <CategoryRow />
        <FlashSale />
        <Catalog products={products} />
        <Benefits />
      </main>

      <Footer />

      {/* Data berasal dari data/products.json (dipercaya); `<` di-escape supaya
          nilai string tidak bisa menutup tag script. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
