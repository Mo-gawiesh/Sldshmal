import React from 'react';
import Image from 'next/image';
import { Recycle, Leaf } from 'lucide-react';
import { MotionReveal } from '@/components/MotionReveal';
import { SectionKicker } from '../SectionKicker';
import sustainabilityImg from '@assets/generated_images/sustainability.webp';

const principles = [
  { text: 'استرداد الموارد من المواد غير المستخدمة', icon: Recycle },
  { text: 'تقليل الأثر الناتج عن الهدر الصناعي', icon: Leaf },
];

export function SustainabilitySection() {
  return (
    <section id="sustainability" className="scroll-mt-32 bg-[#f4ecdf] py-20 md:py-28 text-[#101610]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <MotionReveal direction="up" delay={0.05}>
              <SectionKicker index="٠٨" label="الاستدامة" english="Circular economy perspective" theme="light" />
            </MotionReveal>

            <MotionReveal direction="up" delay={0.1}>
              <h2 className="mt-4 max-w-2xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.4] tracking-normal">
                الاستدامة لغة <br />
                <span className="text-[#3c6b43]">تشغيلية وفعلية.</span>
              </h2>
            </MotionReveal>

            <MotionReveal direction="up" delay={0.15}>
              <p className="mt-6 max-w-xl text-base md:text-lg lg:text-xl leading-[1.8] text-[#101610]/75 font-light">
                نربط إعادة تدوير المعادن باسترداد الموارد وتقليل الهدر وتعزيز دورة صناعية أكثر كفاءة وموثوقية داخل السوق السعودي.
              </p>
            </MotionReveal>

            <MotionReveal direction="up" delay={0.2} className="mt-10 divide-y divide-[#101610]/10 border-y border-[#101610]/10">
              {principles.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center justify-between gap-6 py-4 text-base md:text-lg leading-relaxed">
                    <span>{item.text}</span>
                    <Icon className="h-5 w-5 shrink-0 text-[#3c6b43]" />
                  </div>
                );
              })}
            </MotionReveal>
          </div>

          <div className="lg:col-span-7">
            <MotionReveal direction="left" delay={0.1}>
              <div className="relative overflow-hidden border border-[#101610]/10 aspect-[4/3] lg:aspect-[16/10] rounded-xl">
                <Image
                  src={sustainabilityImg}
                  alt="مشهد يعكس إعادة التدوير والاسترداد الصناعي"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  quality={80}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,236,223,0.18)_0%,rgba(244,236,223,0.02)_52%,rgba(17,22,18,0.34)_100%)]" />
                <div className="absolute left-0 top-0 h-full w-[1px] bg-[#3c6b43]/25" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-[#f4ecdf] lg:p-8">
                  <div className="max-w-xl text-xl md:text-2xl lg:text-3xl font-black leading-tight">
                    تحويل المادة إلى دورة جديدة، دون فقدان للجودة أو الدقة.
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
