import { BENEFITS, site } from "@/lib/config";

export function Benefits() {
  return (
    <section className="bg-white border-t border-b mt-4">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          Kenapa Belanja di {site.name}?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-100"
            >
              <div
                aria-hidden
                className={`w-12 h-12 sm:w-14 sm:h-14 ${benefit.tone} rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 text-xl sm:text-2xl`}
              >
                {benefit.emoji}
              </div>
              <h3 className="font-bold text-gray-800 text-sm">
                {benefit.title}
              </h3>
              <p className="text-[11px] text-gray-500 mt-1">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
