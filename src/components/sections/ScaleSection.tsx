import React from 'react';
import { motion } from 'framer-motion';
import { MotionReveal } from '@/components/MotionReveal';
import { SectionKicker } from '../SectionKicker';

const stats = [
  { value: '٠٠', label: 'الرقم الفعلي', note: 'قيد التحديث' },
  { value: '٠٠', label: 'الرقم الفعلي', note: 'قيد التحديث' },
  { value: '٠٠', label: 'الرقم الفعلي', note: 'قيد التحديث' },
  { value: '٠٠', label: 'الرقم الفعلي', note: 'قيد التحديث' },
];

export function ScaleSection() {
  return (
    <section id="scale" className="scroll-mt-32 border-y border-[#101610]/10 bg-[#f4ecdf] py-16 md:py-24 text-[#101610]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <MotionReveal direction="up" delay={0.05}>
              <SectionKicker index="٠٥" label="الأرقام" english="Placeholder until final data is confirmed" theme="light" />
            </MotionReveal>

            <MotionReveal direction="up" delay={0.1}>
              <h2 className="mt-4 max-w-2xl text-2xl sm:text-3xl md:text-4xl font-black leading-[1.4] tracking-normal">
                أرقامنا التشغيلية <br />
                <span className="text-[#3c6b43]">ستُعرض فور تأكيدها.</span>
              </h2>
            </MotionReveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px bg-[#101610]/10 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="bg-[#f4ecdf] p-6 lg:p-8"
                >
                  <div className="text-5xl font-black leading-none tracking-tight text-[#3c6b43] md:text-6xl">{item.value}</div>
                  <div className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#101610]/55">{item.label}</div>
                  <div className="mt-2 text-sm text-[#101610]/45">{item.note}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
