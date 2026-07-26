'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111612] text-[#f4ecdf] p-6 text-center">
      <div className="max-w-md space-y-8 select-none">
        {/* Error Visual Element */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-red-950/30 border border-red-500/30 animate-pulse">
          <span className="text-4xl text-red-500">⚠️</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold text-red-500 md:text-4xl">حدث خطأ غير متوقع</h1>
          <p className="text-[#f4ecdf]/70 text-base md:text-lg font-light leading-relaxed">
            نأسف للإزعاج، واجه خادم صلد الشمال خطأً تقنياً أثناء تحميل هذه الصفحة.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-full bg-[#98c25f] text-[#101610] px-8 text-base font-bold hover:bg-[#b3d37f] transition-all cursor-pointer shadow-md"
          >
            إعادة المحاولة 🔄
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-full border border-white/10 text-[#f4ecdf] px-8 text-base font-semibold hover:bg-white/5 transition-all cursor-pointer"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
