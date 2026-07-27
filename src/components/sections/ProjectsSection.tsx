import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpLeft } from 'lucide-react';
import { MotionReveal } from '@/components/MotionReveal';
import { SectionKicker } from '../SectionKicker';

import projectsImg from '@assets/generated_images/projects.webp';
import equipmentImg from '@assets/generated_images/equipment.webp';
import aboutImg from '@assets/generated_images/about.webp';

const projectStories = [
  {
    title: 'ساحات استقبال كبيرة',
    text: 'ترتيب تشغيلي يضمن استقبال الشحنات وتوجيهها إلى مسارها الصحيح من لحظة الوصول.',
    image: projectsImg,
    span: 'lg:col-span-7',
  },
  {
    title: 'نقاط تحميل ونقل',
    text: 'حركة ميدانية واضحة ومؤمنة للمواد الثقيلة والدفعات الصناعية المتنوعة.',
    image: equipmentImg,
    span: 'lg:col-span-5',
  },
  {
    title: 'إشارات هوية وموقع',
    text: 'حضور مؤسسي يعكس الثقة ويجعل الموقع الصناعي جزءاً من هوية الشركة لا مجرد منشأة.',
    image: aboutImg,
    span: 'lg:col-span-12',
  },
];

export function ProjectsSection() {
  function scrollToId(id: string) {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section id="projects" className="scroll-mt-32 bg-[#111612] py-20 md:py-28 text-[#f4ecdf]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <MotionReveal direction="up" delay={0.05}>
          <SectionKicker index="٠٩" label="العمليات" english="Editorial showcase" />
        </MotionReveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <MotionReveal direction="up" delay={0.1}>
              <h2 className="max-w-2xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.4] tracking-normal">
                واجهات تشغيل <br />
                <span className="text-[#98c25f]">تعكس قدراتنا الفعلية.</span>
              </h2>
            </MotionReveal>

            <MotionReveal direction="up" delay={0.15}>
              <p className="mt-6 max-w-xl text-base md:text-lg lg:text-xl leading-[1.8] text-[#f4ecdf]/75 font-light">
                نعرض الساحات والحركة الداخلية والإشارات الميدانية كما لو كانت صفحات من ملف معماري صناعي؛ كل صورة تؤكد أن وراءها منظومة عمل حقيقية.
              </p>
            </MotionReveal>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-6 sm:grid-cols-12">
              {projectStories.map((story, index) => (
                <motion.article
                  key={story.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                  className={`${story.span} group overflow-hidden border border-white/10 bg-[#0c100d] sm:col-span-12 rounded-xl`}
                >
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <Image
                      src={story.image}
                      alt={story.title}
                      className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={80}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,22,18,0.02)_0%,rgba(17,22,18,0.46)_100%)]" />
                  </div>
                  <div className="flex items-end justify-between gap-6 p-6 lg:p-8">
                    <div>
                      <div className="text-xs uppercase tracking-[0.3em] text-[#98c25f]/70">0{index + 1}</div>
                      <h3 className="mt-3 text-xl md:text-2xl font-black leading-tight">{story.title}</h3>
                      <p className="mt-3 max-w-md text-sm md:text-base leading-relaxed text-[#f4ecdf]/65 font-light">{story.text}</p>
                    </div>
                    <ArrowUpLeft className="h-7 w-7 shrink-0 text-[#98c25f] transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Secondary Exploration CTA */}
            <MotionReveal direction="up" delay={0.2} className="mt-12 flex justify-center">
              <button
                onClick={() => scrollToId('contact')}
                className="inline-flex h-14 items-center justify-between rounded-full border border-[#f4ecdf]/20 pl-1.5 pr-6 text-base font-medium text-[#f4ecdf] hover:bg-[#f4ecdf]/5 transition-all cursor-pointer gap-4 group"
              >
                <span>شاهد أعمالنا</span>
                <span className="h-11 w-11 rounded-full bg-[#f4ecdf]/10 flex items-center justify-center text-[#f4ecdf] shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                </span>
              </button>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
