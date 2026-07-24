import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

/* ── Animated counter hook ─────────────────────────────────────────── */
function useCountUp(target: number, duration = 1.8) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let animFrame: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      // ease-out
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    // Defer animation loop to yield main thread for first paint
    const timeoutId = setTimeout(() => {
      animFrame = requestAnimationFrame(step);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [inView, target, duration]);

  return { count, ref };
}

const statsData = [
  { value: 10, suffix: '+', label: 'سنوات خبرة في السوق' },
  { value: 500, suffix: '+', label: 'عميل وشريك تجاري' },
  { value: 1200, suffix: '+', label: 'طن تمت معالجته شهرياً' },
  { value: 50, suffix: '+', label: 'نوع معدن مقبول' },
];

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div className="flex flex-col items-center gap-2 py-8 md:py-10">
      <span className="text-4xl md:text-5xl font-black tabular-nums text-[#98c25f] leading-none">
        <span ref={ref}>{count.toLocaleString('ar-EG')}</span>
        <span>{suffix}</span>
      </span>
      <span className="text-xs md:text-sm text-[#f4ecdf]/60 tracking-wide text-center">{label}</span>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="bg-[#0d1410] border-y border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 divide-x divide-x-reverse divide-white/5 lg:grid-cols-4 lg:divide-x lg:divide-x-reverse">
          {statsData.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
