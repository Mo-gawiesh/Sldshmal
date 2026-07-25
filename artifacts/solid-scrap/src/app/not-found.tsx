import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#111612] text-[#f4ecdf] p-6 text-center select-none font-sans">
      <div className="max-w-lg space-y-8 bg-[#171d18]/40 border border-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-sm shadow-2xl">
        
        {/* Glow Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#98c25f]/20 bg-[#98c25f]/10 px-4 py-1.5 text-xs font-semibold text-[#98c25f] tracking-wide">
          <span>🔍</span>
          <span>مسار غير متاح حالياً</span>
        </div>

        {/* 404 Title */}
        <div className="relative">
          <h1 className="text-8xl md:text-9xl font-black text-[#98c25f] tracking-wider leading-none select-none drop-shadow-[0_0_30px_rgba(152,194,95,0.1)]">
            ٤٠٤
          </h1>
        </div>

        {/* Messaging */}
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#f4ecdf]">
            يبدو أن هذه الصفحة أُرسلت لإعادة التدوير! ♻️
          </h2>
          <p className="text-[#f4ecdf]/60 text-sm md:text-base font-light leading-relaxed max-w-sm mx-auto">
            عذراً، لم نجد ما تبحث عنه في ساحتنا البرمجية. ربما تم فرز هذه الصفحة أو تم نقلها لمسار آخر.
          </p>
        </div>

        {/* Button */}
        <div className="pt-4 flex justify-center">
          <Link
            href="/"
            className="inline-flex h-14 items-center justify-center rounded-full bg-[#98c25f] text-[#101610] px-8 text-base font-bold hover:bg-[#b3d37f] transition-all duration-300 shadow-md cursor-pointer hover:scale-[1.03]"
          >
            العودة للموقع الرئيسي ↩️
          </Link>
        </div>
      </div>
    </div>
  );
}
