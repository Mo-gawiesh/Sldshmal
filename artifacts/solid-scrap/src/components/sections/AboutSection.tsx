import React from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowUpLeft } from 'lucide-react';
import { MotionReveal } from '@/components/MotionReveal';
import { SectionKicker } from '../SectionKicker';
import aboutImg from '@assets/generated_images/about.webp';

export function AboutSection() {
  function scrollToId(id: string) {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section id="about" className="scroll-mt-32 bg-[#f4ecdf] py-20 md:py-28 text-[#101610]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <MotionReveal direction="up" delay={0.05}>
              <SectionKicker index="٠٢" label="عن الشركة" english="Editorial introduction" />
            </MotionReveal>

            <MotionReveal direction="up" delay={0.1}>
              <h2 className="mt-4 max-w-3xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.4] tracking-normal">
                فهم صناعي. <br />
                <span className="text-[#3c6b43]">تنفيذ موثوق.</span> <br />
                حضور سعودي.
              </h2>
            </MotionReveal>

            <MotionReveal direction="up" delay={0.15}>
              <div className="mt-8 max-w-2xl space-y-6 text-base md:text-lg lg:text-xl leading-[1.8] text-[#101610]/85 font-light">
                <p>
                  نُقدم في <strong>مؤسسة صلد الشمال</strong> حلولاً احترافية في شراء المعادن والخردة وإعادة تدويرها، مع التزام كامل بالشفافية المطلقة والكفاءة التشغيلية العالية لخدمة الأفراد والشركات والمصانع بمختلف القطاعات.
                </p>
                <p>
                  ونعتمد على الخبرة والالتزام وسرعة التنفيذ لتقديم خدمات موثوقة تسهم في دعم الاقتصاد الدائري وحماية البيئة، بما يتماشى مع مستهدفات <strong>رؤية السعودية 2030</strong> في الاستدامة وإعادة التدوير.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                {/* Executive Signature */}
                <div className="flex flex-col gap-1 border-r-2 border-[#3c6b43] pr-4">
                  <span className="text-lg font-black text-[#3c6b43]">أحمد السحيمي</span>
                  <span className="text-xs font-bold text-[#101610]/50 tracking-wider">المدير التنفيذي</span>
                </div>

                {/* Secondary CTA */}
                <button
                  onClick={() => scrollToId('why')}
                  className="mr-auto inline-flex h-12 items-center justify-between rounded-full border border-[#3c6b43]/20 pl-1 pr-4 text-xs font-bold text-[#3c6b43] hover:bg-[#3c6b43]/5 transition-all cursor-pointer gap-3 group"
                >
                  <span>اعرف المزيد عنا</span>
                  <span className="h-9 w-9 rounded-full bg-[#3c6b43]/10 flex items-center justify-center text-[#3c6b43] shrink-0 transition-transform duration-300 group-hover:scale-105">
                    <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                  </span>
                </button>
              </div>
            </MotionReveal>

            <MotionReveal direction="up" delay={0.2}>
              <div className="mt-10 grid gap-5 border-t border-[#101610]/10 pt-8 sm:grid-cols-3">
                {[
                  'شراء المعادن والخردة',
                  'جمع ونقل السكراب',
                  'إعادة التدوير المعتمدة',
                ].map((item) => (
                  <div key={item} className="text-sm font-bold uppercase tracking-[0.2em] text-[#3c6b43]">
                    {item}
                  </div>
                ))}
              </div>
            </MotionReveal>
          </div>

          <div className="lg:col-span-5">
            <MotionReveal direction="left" delay={0.1}>
              <div className="relative overflow-hidden border border-[#101610]/10 bg-[#101610] shadow-2xl aspect-[4/5] rounded-xl">
                <Image
                  src={aboutImg}
                  alt="فريق صناعي داخل منشأة إعادة تدوير المعادن"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  quality={80}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,22,18,0.05)_0%,rgba(17,22,18,0.4)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-[#f4ecdf]">
                  <div>
                    <div className="text-xs uppercase tracking-[0.3em] text-[#f4ecdf]/60">Saudi Industrial Site</div>
                    <div className="mt-2 text-xl font-bold leading-snug">نقرأ الموقع بدقة قبل كل خطوة.</div>
                  </div>
                  <ArrowUpLeft className="h-8 w-8 text-[#98c25f] shrink-0" />
                </div>
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
