import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1f1a] text-[#f0e4cd] p-6 text-center">
      <div className="max-w-md space-y-8">
        <h1 className="text-8xl font-black text-[#3c6b43]">٤٠٤</h1>
        <h2 className="text-3xl font-bold">الصفحة غير موجودة</h2>
        <p className="text-[#f0e4cd]/70 text-xl font-light">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="pt-8">
          <Link href="/" className="inline-flex h-14 items-center justify-center bg-[#98c25f] text-[#1a1f1a] px-8 text-lg font-bold hover:bg-[#98c25f]/90 transition-colors cursor-pointer">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
