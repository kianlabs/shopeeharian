import { hero } from "@/lib/config";

export function HeroBanner() {
  return (
    <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="text-center">
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-wider mb-1"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
          >
            {hero.title}
          </h1>
          <p className="text-[11px] sm:text-xs text-white/80">
            {hero.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
