import React from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { MotionReveal } from '@/components/MotionReveal';
import { SectionKicker } from '../SectionKicker';
import equipmentImg from '@assets/generated_images/equipment.webp';

export function EquipmentSection() {
  return (
    <section id="equipment" className="scroll-mt-32 bg-[#23372a] py-20 md:py-28 text-[#f4ecdf]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <MotionReveal direction="up" delay={0.05}>
          <SectionKicker index="٠٧" label="المعدات والعمليات" english="Operations and capability" />
        </MotionReveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <MotionReveal direction="up" delay={0.1}>
                <h2 className="max-w-2xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.4] tracking-normal">
                  معداتنا صلبة. <br />
                  <span className="text-[#98c25f]">هي جوهر وعدنا الميداني.</span>
                </h2>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.15}>
                <p className="mt-6 max-w-xl text-base md:text-lg lg:text-xl leading-[1.8] text-[#f4ecdf]/75 font-light">
                  من المناولة إلى النقل والتحميل، نُظهر قدرة تشغيلية تشبه ما تراه في موقع عمل حقيقي: منظم، صلب، وقابل للتوسع.
                </p>
              </MotionReveal>
            </div>

            <MotionReveal direction="up" delay={0.2} className="mt-8 space-y-4 border-t border-white/10 pt-8">
              {[
                'مناولة المواد الثقيلة والكبيرة',
                'أسطول نقل حديث وعملي',
                'ساحات تخزين وفرز آمنة ومجهزة',
              ].map((item) => (
                <div key={item} className="flex items-center justify-between border-b border-white/10 pb-4 text-base md:text-lg">
                  <span className="font-light">{item}</span>
                  <ArrowLeft className="h-4 w-4 text-[#98c25f]" />
                </div>
              ))}
            </MotionReveal>
          </div>

          <div className="lg:col-span-7">
            <MotionReveal direction="left" delay={0.1}>
              <div className="relative overflow-hidden border border-white/10 aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[350px] rounded-xl">
                <Image
                  src={equipmentImg}
                  alt="معدات مناولة ومواقع تشغيل للخردة"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  quality={80}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(35,55,42,0.72)_0%,rgba(35,55,42,0.22)_60%,rgba(35,55,42,0.36)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-[#111612]/90 p-4 sm:p-6 backdrop-blur-sm">
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 text-center sm:text-right">
                    {[
                      'جاهزية ميدانية',
                      'تنفيذ آمن',
                      'قدرة تشغيلية',
                    ].map((item) => (
                      <div
                        key={item}
                        className="text-xs md:text-sm font-bold uppercase tracking-[0.1em] text-[#f4ecdf]/80 border-b border-white/5 pb-2 last:border-0 sm:border-0 sm:pb-0"
                      >
                        {item}
                      </div>
                    ))}
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
