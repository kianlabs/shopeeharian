import { hero } from "@/lib/config";

export function HeroBanner() {
  return (
    <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 shadow-inner">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-5">
        <div className="text-center">
          <h1
            className="text-base sm:text-2xl md:text-3xl font-black text-white tracking-wide mb-0.5 sm:mb-1"
            style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.3)" }}
          >
            {hero.title}
          </h1>
          <p className="text-[11px] sm:text-xs text-white/90 max-w-xl mx-auto line-clamp-1 sm:line-clamp-none">
            {hero.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
