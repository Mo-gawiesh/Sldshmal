import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { MotionReveal } from '@/components/MotionReveal';
import { SectionKicker } from '../SectionKicker';

const whyPoints = [
  {
    title: 'استجابة سريعة',
    text: 'نقترب من الموقع بسرعة ونبدأ التقييم دون تعقيد.',
  },
  {
    title: 'تشغيل صناعي',
    text: 'نعمل بعقلية ميدانية واضحة تناسب متطلبات الساحات والمصانع والورش.',
  },
  {
    title: 'فهم للسوق السعودي',
    text: 'نقدّم حلولاً تراعي طبيعة المواقع، والوقت، ومتطلبات التنفيذ المحلية.',
  },
  {
    title: 'إعادة تدوير مسؤولة',
    text: 'نحوّل الخردة إلى مورد فعلي داخل دورة اقتصادية أكثر كفاءة.',
  },
];

export function WhyUsSection() {
  function scrollToId(id: string) {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section id="why" className="scroll-mt-32 bg-[#23372a] py-20 md:py-28 text-[#f4ecdf]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end mb-16">
          <div className="lg:col-span-5">
            <MotionReveal direction="up" delay={0.05}>
              <SectionKicker index="١١" label="لماذا صلد الشمال" english="Why Solid Scrap" />
            </MotionReveal>

            <MotionReveal direction="up" delay={0.1}>
              <h2 className="mt-4 max-w-2xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.4] tracking-normal">
                ثقة مبنية على <br />
                <span className="text-[#98c25f]">التنفيذ الميداني الموثوق.</span>
              </h2>
            </MotionReveal>
          </div>

          <div className="lg:col-span-7">
            <MotionReveal direction="up" delay={0.15}>
              <p className="max-w-2xl text-base md:text-lg lg:text-xl leading-[1.8] text-[#f4ecdf]/75 font-light">
                نرتب خدماتنا وعروضنا التشغيلية لضمان تقديم حلول مريحة واحترافية تلبي احتياجات المصانع والورش والساحات داخل السوق السعودي.
              </p>
            </MotionReveal>
          </div>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {whyPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.7, delay: index * 0.05 }}
              className="grid gap-4 py-6 lg:grid-cols-12 lg:items-start"
            >
              <div className="lg:col-span-2 text-3xl md:text-4xl font-black text-[#98c25f] tabular-nums">0{index + 1}</div>
              <div className="lg:col-span-4 text-xl md:text-2xl font-black leading-tight">{point.title}</div>
              <div className="lg:col-span-6 max-w-2xl text-base md:text-lg leading-relaxed text-[#f4ecdf]/75 font-light">{point.text}</div>
            </motion.div>
          ))}
        </div>

        {/* Primary CTA */}
        <MotionReveal direction="up" delay={0.2} className="mt-12 flex justify-center">
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
