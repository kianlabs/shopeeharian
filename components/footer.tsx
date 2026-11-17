import Link from "next/link";
import { CATEGORIES, footerColumns, site } from "@/lib/config";

/**
 * Footer referensi punya dua varian kolom:
 * - beranda: Bantuan, Kebijakan, Ikuti Kami
 * - halaman kategori: Kategori, Bantuan, Ikuti Kami
 */
export function Footer({
  variant = "home",
}: {
  variant?: "home" | "category";
}) {
  const columns =
    variant === "category"
      ? [footerColumns[0]]
      : [footerColumns[0], footerColumns[1]];

  return (
    <footer
      className={`bg-shopee-darkorange text-white ${variant === "category" ? "mt-8" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="block h-10 mb-3">
              <span className="text-white font-black text-lg tracking-tight">
                SHOPEE<span className="text-orange-200"> HARIAN</span>
              </span>
            </Link>
            <p className="text-xs text-orange-200">
              Rekomendasi Produk Terbaik
            </p>
          </div>

          {variant === "category" ? (
            <div>
              <h4 className="font-bold text-sm mb-3">Kategori</h4>
              <ul className="space-y-2 text-xs text-orange-200">
                {CATEGORIES.map((category) => (
                  <li key={category.id}>
                    <Link href={category.href} className="hover:text-white">
                      {category.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="font-bold text-sm mb-3">{column.title}</h4>
              <ul className="space-y-2 text-xs text-orange-200">
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-bold text-sm mb-3">Ikuti Kami</h4>
            {variant === "home" ? (
              <p className="text-xs text-orange-200 mb-2">
                Follow kami untuk update!
              </p>
            ) : null}
            <p className="text-sm font-medium">📱 {site.social}</p>
          </div>
        </div>

        <div className="border-t border-orange-600 mt-6 pt-6 text-center">
          <p className="text-[11px] text-orange-300">
            © {site.copyrightYear} {site.name}. Semua hak dilindungi. 🧡
          </p>
        </div>
      </div>
    </footer>
  );
}
