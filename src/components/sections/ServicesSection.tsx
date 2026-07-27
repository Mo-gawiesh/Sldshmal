import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Factory, Truck, ScanSearch, Recycle, ShieldCheck } from 'lucide-react';
import { MotionReveal } from '@/components/MotionReveal';
import { SectionKicker } from '../SectionKicker';

import servicesImg from '@assets/generated_images/services.webp';
import processImg from '@assets/generated_images/process.webp';
import aboutImg from '@assets/generated_images/about.webp';
import sustainabilityImg from '@assets/generated_images/sustainability.webp';
import equipmentImg from '@assets/generated_images/equipment.webp';

const serviceRows = [
  {
    title: 'شراء المعادن والخردة',
    text: 'شراء منظم وشفاف لمختلف أنواع المعادن مع معاينة ميدانية وتقييم سريع يراعي الجودة والسوق.',
    image: servicesImg,
    position: 'center',
    icon: Factory,
  },
  {
    title: 'جمع ونقل الخردة',
    text: 'جمع ونقل منضبط من الموقع إلى مركز المعالجة بأسطول عملي يراعي السلامة وسرعة الاستجابة.',
    image: processImg,
    position: 'center',
    icon: Truck,
  },
  {
    title: 'فرز وتصنيف المعادن',
    text: 'فصل دقيق للمواد يرفع كفاءة الاسترداد ويزيد القيمة التشغيلية لكل دفعة تصل إلى الساحة.',
    image: aboutImg,
    position: 'center top',
    icon: ScanSearch,
  },
  {
    title: 'إعادة تدوير المعادن',
    text: 'معالجة مسؤولة تعيد المواد إلى الدورة الصناعية وتدعم تقليل الهدر والاعتماد على الموارد الأولية.',
    image: sustainabilityImg,
    position: 'center',
    icon: Recycle,
  },
  {
    title: 'التعامل مع المخلفات الصناعية',
    text: 'حلول تشغيلية للمخلفات الصناعية في المواقع والورش والمصانع مع نهج يتلاءم مع متطلبات السعودية.',
    image: equipmentImg,
    position: 'center',
    icon: ShieldCheck,
  },
];

export function ServicesSection() {
  function scrollToId(id: string) {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section id="services" className="scroll-mt-32 bg-[#23372a] py-20 md:py-28 text-[#f4ecdf]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-4xl mb-16">
          <MotionReveal direction="up" delay={0.05}>
            <SectionKicker index="٠٣" label="الخدمات" english="Immersive service storytelling" />
          </MotionReveal>

          <MotionReveal direction="up" delay={0.1}>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.4] tracking-normal">
              خدمات صناعية <br />
              <span className="text-[#98c25f]">تُقدم بمسؤولية وخبرة.</span>
            </h2>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.15}>
            <p className="mt-6 max-w-2xl text-base md:text-lg lg:text-xl leading-[1.75] text-[#f4ecdf]/80">
              لا نعتمد شبكة بطاقات متشابهة. كل خدمة هنا تُقدَّم كمشهد تشغيلي مستقل يوضح قيمته ومكانه داخل رحلة العمل.
            </p>
          </MotionReveal>
        </div>

        <div className="space-y-12">
          {serviceRows.map((service, index) => {
            const Icon = service.icon;
            const reversed = index % 2 === 1;

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className={`flex flex-col gap-6 border border-white/5 bg-[#17251e] p-4 md:p-6 lg:items-stretch lg:gap-8 rounded-xl overflow-hidden ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                {/* Service Image Container */}
                <div className="w-full lg:w-[45%] overflow-hidden border border-white/5 bg-[#111612] relative rounded-lg" style={{ minHeight: '260px' }}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 hover:scale-105"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    quality={80}
                    style={{ objectPosition: service.position }}
                  />
                </div>

                {/* Service Details with High Contrast */}
                <div className="flex flex-1 flex-col justify-between p-4 md:p-6">
                  <div>
                    <div className="flex items-center justify-between gap-4 text-[#98c25f] mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold tabular-nums">0{index + 1}</span>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs uppercase tracking-[0.25em] text-[#f4ecdf]/60 font-semibold">{service.title}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-black leading-[1.4] mb-4 text-[#f4ecdf]">
                      {service.title}
                    </h3>

                    <p className="text-base md:text-lg leading-[1.8] text-[#f4ecdf]/90 font-light">
                      {service.text}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-xs uppercase tracking-[0.25em] text-[#f4ecdf]/60 font-medium">
                    <span>Industrial Workflow</span>
                    <ArrowLeft className="h-4 w-4 text-[#98c25f]" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Primary CTA */}
        <MotionReveal direction="up" delay={0.2} className="mt-16 flex justify-center">
          <button
            onClick={() => scrollToId('contact')}
            className="inline-flex h-14 items-center justify-between rounded-full bg-[#98c25f] pl-1.5 pr-6 text-base font-bold text-[#101610] hover:bg-[#b3d37f] transition-all shadow-lg cursor-pointer gap-4 group"
          >
            <span>اطلب خدمتك الآن</span>
            <span className="h-11 w-11 rounded-full bg-white flex items-center justify-center text-[#101610] shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            </span>
          </button>
        </MotionReveal>
      </div>
    </section>
  );
}
