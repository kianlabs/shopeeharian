import Link from "next/link";
import { CATEGORIES } from "@/lib/config";

export function CategoryRow() {
  return (
    <section className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-3 max-w-xs sm:max-w-none sm:flex sm:justify-center gap-2 sm:gap-8 mx-auto py-3 sm:py-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="flex flex-col items-center gap-1.5 sm:gap-2 active:scale-95 transition-transform"
            >
              <span className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl sm:rounded-full bg-gradient-to-b from-orange-50 to-orange-100/70 flex items-center justify-center text-2xl hover:bg-orange-100 transition-colors border border-orange-200/60 shadow-xs cursor-pointer">
                {category.emoji}
              </span>
              <span className="text-xs font-medium text-gray-700 text-center">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
