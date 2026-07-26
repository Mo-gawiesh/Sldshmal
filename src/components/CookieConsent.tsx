'use client';

import { useState, useEffect } from 'react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomise, setShowCustomise] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie_consent');
    let timer: NodeJS.Timeout | undefined;
    
    if (!consent) {
      // Smooth appearance delay
      timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie_consent', 'accepted_all');
    localStorage.setItem('cookie_preferences', JSON.stringify({ essential: true, analytics: true, marketing: true }));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookie_consent', 'rejected_all');
    localStorage.setItem('cookie_preferences', JSON.stringify({ essential: true, analytics: false, marketing: false }));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie_consent', 'custom');
    localStorage.setItem('cookie_preferences', JSON.stringify(preferences));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[999] mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#111612]/95 p-6 shadow-2xl backdrop-blur-md transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 md:bottom-8 md:left-8 md:right-auto md:mx-0">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-base font-bold text-[#98c25f] md:text-lg">نحن نقدر خصوصيتك</h3>
          <span className="text-xl">🍪</span>
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed text-[#f4ecdf]/80 md:text-sm">
          نحن نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربة التصفح الخاصة بك، وتقديم إعلانات أو محتوى مخصص، وتحليل حركة المرور لدينا. بالنقر على "قبول الكل"، فإنك توافق على استخدامنا لملفات تعريف الارتباط.
        </p>

        {/* Customise Section */}
        {showCustomise && (
          <div className="mt-2 rounded-xl border border-white/5 bg-[#171d18]/60 p-4 transition-all duration-300">
            <h4 className="mb-3 text-xs font-semibold text-[#98c25f]">إعدادات ملفات تعريف الارتباط:</h4>
            <div className="space-y-3">
              {/* Essential */}
              <label className="flex items-center justify-between gap-4 cursor-not-allowed">
                <span className="flex flex-col gap-0.5">
                  <span className="text-xs font-medium text-[#f4ecdf]">ملفات أساسية (إلزامية)</span>
                  <span className="text-[10px] text-[#f4ecdf]/40">مطلوبة لتشغيل وظائف الموقع الأساسية بأمان.</span>
                </span>
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="h-4 w-4 rounded border-white/10 bg-white/5 text-[#98c25f] focus:ring-0 cursor-not-allowed"
                />
              </label>

              {/* Analytics */}
              <label className="flex items-center justify-between gap-4 cursor-pointer">
                <span className="flex flex-col gap-0.5">
                  <span className="text-xs font-medium text-[#f4ecdf]">التحليلات والأداء</span>
                  <span className="text-[10px] text-[#f4ecdf]/40">تساعدنا على فهم كيفية استخدام الزوار لموقعنا وتطويره.</span>
                </span>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="h-4 w-4 rounded border-white/10 bg-white/5 text-[#98c25f] focus:ring-0 accent-[#98c25f] cursor-pointer"
                />
              </label>

              {/* Marketing */}
              <label className="flex items-center justify-between gap-4 cursor-pointer">
                <span className="flex flex-col gap-0.5">
                  <span className="text-xs font-medium text-[#f4ecdf]">التسويق والمحتوى المخصص</span>
                  <span className="text-[10px] text-[#f4ecdf]/40">تستخدم لتقديم إعلانات ومقترحات تناسب اهتماماتك.</span>
                </span>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="h-4 w-4 rounded border-white/10 bg-white/5 text-[#98c25f] focus:ring-0 accent-[#98c25f] cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {/* Buttons / Actions */}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => setShowCustomise(!showCustomise)}
            className="text-xs text-[#98c25f]/90 underline transition-colors hover:text-[#98c25f] cursor-pointer"
          >
            {showCustomise ? 'إخفاء الخيارات التخصيصية' : 'تخصيص الخيارات'}
          </button>

          <div className="flex items-center gap-2">
            {showCustomise ? (
              <button
                onClick={handleSavePreferences}
                className="rounded-full bg-[#98c25f] px-5 py-2 text-xs font-bold text-[#101610] hover:bg-[#b3d37f] transition-all cursor-pointer shadow-md"
              >
                حفظ الإعدادات
              </button>
            ) : (
              <>
                <button
                  onClick={handleRejectAll}
                  className="rounded-full border border-white/10 px-5 py-2 text-xs font-semibold text-[#f4ecdf]/80 hover:bg-white/5 transition-all cursor-pointer"
                >
                  رفض الكل
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="rounded-full bg-[#98c25f] px-5 py-2 text-xs font-bold text-[#101610] hover:bg-[#b3d37f] transition-all cursor-pointer shadow-md"
                >
                  قبول الكل
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
