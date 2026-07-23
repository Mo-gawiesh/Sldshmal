import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { MotionReveal } from '@/components/MotionReveal';
import { SectionKicker } from '../SectionKicker';

const workflow = [
  { title: 'المعاينة', desc: 'معاينة ميدانية أولية لتقدير نوعية وحجم المواد بدقة.' },
  { title: 'التقييم', desc: 'تقديم تقييم عادل يعكس أسعار السوق الحالية بجداول واضحة.' },
  { title: 'الجمع', desc: 'تجميع الخردة بطرق آمنة ومنظمة داخل الموقع الجغرافي.' },
  { title: 'النقل', desc: 'نقل المواد باستخدام أسطول نقل مجهز وآمن لساحة الفرز.' },
  { title: 'الفرز', desc: 'فرز دقيق وتصنيف شامل للمعادن لرفع جودة المواد المستردة.' },
  { title: 'إعادة التدوير', desc: 'إدخال المواد المجهزة في العملية الصناعية لدعم الاقتصاد الدائري.' },
];

export function ProcessSection() {
  function scrollToId(id: string) {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section id="process" className="scroll-mt-32 bg-[#111612] py-20 md:py-28 text-[#f4ecdf]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">

          {/* Left Column: Heading and description */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <MotionReveal direction="up" delay={0.05}>
              <SectionKicker index="٠٦" label="آلية العمل" english="Process narrative" />
            </MotionReveal>

            <MotionReveal direction="up" delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-[1.4] tracking-normal mt-4">
                مسار تشغيل <br />
                <span className="text-[#98c25f]">واضح ومنسق.</span>
              </h2>
            </MotionReveal>

            <MotionReveal direction="up" delay={0.15}>
              <p className="mt-6 text-base md:text-lg leading-[1.8] text-[#f4ecdf]/75 font-light">
                نعرض العملية كخطوات واضحة ومتتالية، لأن القيمة الحقيقية في هذا القطاع تكمن في سلاسة التنفيذ من المعاينة الأولى وحتى التوريد النهائي.
              </p>
            </MotionReveal>

            {/* Secondary Exploration CTA */}
            <MotionReveal direction="up" delay={0.2}>
              <button
                onClick={() => scrollToId('contact')}
                className="inline-flex h-12 items-center justify-between rounded-full border border-[#98c25f]/20 pl-1 pr-4 text-xs font-bold text-[#98c25f] hover:bg-[#98c25f]/5 transition-all cursor-pointer gap-3 group"
              >
                <span>تعرف على آلية العمل</span>
                <span className="h-9 w-9 rounded-full bg-[#98c25f]/10 flex items-center justify-center text-[#98c25f] shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                </span>
              </button>
            </MotionReveal>
          </div>

          {/* Right Column: Visual Steps Grid (Unified/Rebalanced) */}
          <div className="lg:col-span-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {workflow.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.7, delay: index * 0.05 }}
                  className="border border-white/5 bg-[#17201a]/40 p-6 md:p-8 hover:border-[#98c25f]/30 hover:bg-[#1a251e]/50 transition-all duration-300 flex flex-col justify-between min-h-[180px] rounded-xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-[0.25em] text-[#98c25f] font-bold">الخطوة 0{index + 1}</span>
                    <span className="h-2 w-2 rounded-full bg-[#98c25f]/50" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black mb-3 text-[#f4ecdf]">{item.title}</h3>
                    <p className="text-sm md:text-base leading-relaxed text-[#f4ecdf]/65 font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
