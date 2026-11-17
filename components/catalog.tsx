import type { Category, Product } from "@/lib/types";
import { CategoryFilterSidebar, SubCategorySidebar } from "./category-sidebar";
import { ProductExplorer } from "./product-explorer";

/**
 * Tata letak katalog referensi: sidebar kiri (lebar tetap 208px) + grid
 * produk. `category` diisi hanya di halaman kategori, sehingga sidebar
 * berubah menjadi "Sub Kategori" persis seperti jagonya.my.id.
 */
export function Catalog({
  products,
  category,
}: {
  products: Product[];
  category?: Category;
}) {
  return (
    <div
      id="produk"
      className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 scroll-mt-16"
    >
      <div className="flex gap-4">
        {category ? (
          <SubCategorySidebar category={category} />
        ) : (
          <CategoryFilterSidebar />
        )}

        <div className="flex-1 min-w-0">
          <ProductExplorer products={products} category={category} />
        </div>
      </div>
    </div>
  );
}
