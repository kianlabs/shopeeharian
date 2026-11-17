import Link from "next/link";
import { CATEGORIES } from "@/lib/config";

export function CategoryRow() {
  return (
    <section className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex overflow-x-auto gap-4 sm:gap-6 py-3 sm:py-4 scrollbar-hide">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="flex flex-col items-center gap-1.5 sm:gap-2 min-w-[56px] sm:min-w-[60px]"
            >
              <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-50 flex items-center justify-center text-xl sm:text-2xl hover:bg-orange-100 transition-colors border border-orange-100 cursor-pointer">
                {category.emoji}
              </span>
              <span className="text-[11px] text-gray-600 text-center">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
