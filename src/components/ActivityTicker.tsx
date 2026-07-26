import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Truck, CheckCircle, ShieldAlert } from 'lucide-react';

const activities = [
  'تحميل ونقل شحنة حديد خردة بوزن ١٢.٥ طن من ورشة بتبوك الصناعية',
  'إتمام معاينة ميدانية وتسعير فوري لموقع أعمال إنشائية في ضباء',
  'تجميع وتوريد دفعة نحاس أحمر ممتاز (أقراص وأسلاك) بوزن ٣.٨ طن',
  'تنظيف وتأمين ساحة مخلفات معدنية تالفة تابعة لمشروع بنية تحتية في نيوم',
  'استلام شاحنة كابلات نحاسية معزولة وتفريغها بساحة الفرز بتبوك',
  'فرز وتصنيف شحنة ألومنيوم قطاعات بوزن ٥.٢ طن لإعادة تدويرها',
  'معاينة وتسعير هياكل سيارات ومعدات ثقيلة تالفة في تيماء وجدولة نقلها',
];

export function ActivityTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % activities.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#17251e] border-y border-white/5 py-4 overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Live Indicator */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#98c25f] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#98c25f]"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#98c25f] flex items-center gap-1.5">
            <Radio className="h-3.5 w-3.5" />
            تحديثات تشغيلية مباشرة
          </span>
        </div>

        {/* Sliding Activity Item */}
        <div className="flex-1 overflow-hidden h-6 relative flex items-center">
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="text-xs md:text-sm text-[#f4ecdf]/80 font-light flex items-center gap-3 w-full"
          >
            <Truck className="h-4 w-4 text-[#98c25f] shrink-0" />
            <span className="line-clamp-1">{activities[index]}</span>
          </motion.div>
        </div>

        {/* Static Quality Label */}
        <div className="hidden md:flex items-center gap-2 text-[10px] uppercase text-[#f4ecdf]/40 font-semibold tracking-wider">
          <CheckCircle className="h-3.5 w-3.5 text-[#98c25f]/50" />
          <span>تتبع كامل وحركة آمنة للمواد</span>
        </div>

      </div>
    </div>
  );
}
