"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, ArrowUpLeft } from 'lucide-react';

import { Navbar } from '@/components/navbar';
import { MotionReveal } from '@/components/MotionReveal';
import { ReadingProgress } from '@/components/ReadingProgress';
import { ActivityTicker } from '@/components/ActivityTicker';
import { SectionKicker } from '@/components/SectionKicker';

// SEO-friendly Dynamic Client Components (SSR enabled)
const ContactForm = dynamic(() => import('@/components/ContactForm').then(m => m.ContactForm), { ssr: false });
const FAQSection = dynamic(() => import('@/components/FAQSection').then(m => m.FAQSection), { ssr: true });
const CoverageSection = dynamic(() => import('@/components/CoverageSection').then(m => m.CoverageSection), { ssr: true });
const ScrapGuide = dynamic(() => import('@/components/ScrapGuide').then(m => m.ScrapGuide), { ssr: true });

// Dynamically imported page sections below the fold
const AboutSection = dynamic(() => import('@/components/sections/AboutSection').then(m => m.AboutSection), { ssr: true });
const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection').then(m => m.ServicesSection), { ssr: true });
const ScaleSection = dynamic(() => import('@/components/sections/ScaleSection').then(m => m.ScaleSection), { ssr: true });
const ProcessSection = dynamic(() => import('@/components/sections/ProcessSection').then(m => m.ProcessSection), { ssr: true });
const EquipmentSection = dynamic(() => import('@/components/sections/EquipmentSection').then(m => m.EquipmentSection), { ssr: true });
const SustainabilitySection = dynamic(() => import('@/components/sections/SustainabilitySection').then(m => m.SustainabilitySection), { ssr: true });
const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection').then(m => m.ProjectsSection), { ssr: true });
const GallerySection = dynamic(() => import('@/components/sections/GallerySection').then(m => m.GallerySection), { ssr: false });
const WhyUsSection = dynamic(() => import('@/components/sections/WhyUsSection').then(m => m.WhyUsSection), { ssr: true });
const FooterSection = dynamic(() => import('@/components/sections/FooterSection').then(m => m.FooterSection), { ssr: true });

// Browser-only Dynamic Client Components (SSR disabled)
const WhatsAppFloating = dynamic(() => import('@/components/WhatsAppFloating').then(m => m.WhatsAppFloating), { ssr: false });
const BackToTop = dynamic(() => import('@/components/BackToTop').then(m => m.BackToTop), { ssr: false });

import loaderImg from '@assets/generated_images/loader.webp';
import heroImg from '@assets/generated_images/hero.webp';


function scrollToId(id: string) {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}



/* ── Animated counter hook ─────────────────────────────────────────── */
function useCountUp(target: number, duration = 1.8) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      // ease-out
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return { count, ref };
}

/* ── Stats strip ─────────────────────────────────────────────────── */
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

function StatsSection() {
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

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#111612] text-[#f4ecdf]">
      {/* Background Image Container with Parallax */}
      <div className="absolute inset-0">
        <motion.div style={{ y: imgY }} className="absolute inset-0 scale-[1.15]">
          <Image
            src={heroImg}
            alt="ساحة خردة ومعادن في المملكة العربية السعودية"
            className="h-full w-full object-cover object-center"
            priority
            fill
            sizes="100vw"
            quality={85}
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,22,18,0.92)_0%,rgba(17,22,18,0.72)_45%,rgba(17,22,18,0.35)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,22,18,0.2)_0%,rgba(17,22,18,0.55)_100%)]" />
        <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_top_right,rgba(152,194,95,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(240,228,205,0.08),transparent_24%)]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto flex flex-1 flex-col justify-end w-full max-w-7xl px-6 pt-32 pb-16 lg:px-10">
        <div className="max-w-4xl">
          <MotionReveal direction="up" delay={0.05}>
            <SectionKicker index="٠١" label="المملكة العربية السعودية" english="Solid Scrap Of The North" />
          </MotionReveal>

          <MotionReveal direction="up" delay={0.1} duration={0.9}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.4] md:leading-[1.35] tracking-normal">
              <span className="block">نحوّل الخردة</span>
              <span className="block text-[#98c25f]">إلى قيمة</span>
              <span className="block">صناعية</span>
            </h1>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.15}>
            <p className="mt-8 max-w-2xl text-base md:text-lg lg:text-xl leading-[1.8] text-[#f4ecdf]/80">
              شركة سعودية متخصصة في شراء المعادن والخردة، وجمعها، وفرزها، وإعادة تدويرها ضمن تجربة صناعية موثوقة ومهيأة للنمو.
            </p>
          </MotionReveal>

          <MotionReveal direction="up" delay={0.2}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="https://wa.me/966543019329?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D9%84%D8%AF%D9%8A%20%D8%B3%D9%83%D8%B1%D8%A7%D8%A8%20%D9%88%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D9%85%D8%B9%D8%B1%D9%81%D8%A9%20%D8%A7%D9%84%D8%AA%D9%81%D8%A7%D8%B5%D9%8A%D9%84%20%D9%88%D8%A7%D9%84%D8%AD%D8%B5%D9%88%D9%84%20%D8%B9%D9%84%D9%89%20%D8%B9%D8%B1%D8%B6%20%D8%B3%D8%B9%D8%B1."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-between rounded-full bg-[#98c25f] pl-1.5 pr-6 text-base font-bold text-[#101610] hover:bg-[#b3d37f] transition-all shadow-lg cursor-pointer gap-4 group"
              >
                <span>بيع سكرابك الآن</span>
                <span className="h-11 w-11 rounded-full bg-white flex items-center justify-center text-[#101610] shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <ArrowUpLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5" />
                </span>
              </a>
              <button
                type="button"
                onClick={() => scrollToId('services')}
                className="inline-flex h-14 items-center justify-between rounded-full border border-[#f4ecdf]/20 pl-1.5 pr-6 text-base font-medium text-[#f4ecdf] hover:bg-[#f4ecdf]/5 transition-all cursor-pointer gap-4 group"
              >
                <span>استكشف خدماتنا</span>
                <span className="h-11 w-11 rounded-full bg-[#f4ecdf]/10 flex items-center justify-center text-[#f4ecdf] shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                </span>
              </button>
            </div>
          </MotionReveal>
        </div>
      </div>

      {/* Sticky Bottom Strip */}
      <div className="relative z-10 grid gap-px border-t border-white/10 bg-white/10 md:grid-cols-3">
        {[
          'شراء المعادن والخردة',
          'الجمع والنقل الميداني',
          'الفرز وإعادة التدوير المتقدمة',
        ].map((item) => (
          <div key={item} className="bg-[#111612]/75 px-6 py-5 text-sm uppercase tracking-[0.25em] text-[#f4ecdf]/85 backdrop-blur-sm sm:text-base">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

const MotionImage = motion(Image);

export default function HomePage() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pathname && pathname !== '/') {
      const sectionId = pathname.substring(1); // e.g. 'about', 'services', 'projects', 'contact'
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#111612] text-[#f4ecdf] select-none"
          >
            <div className="relative flex flex-col items-center gap-6">
              {/* Spinning Loader Image Container */}
              <div className="relative">
                {/* Outer glowing pulsing ring */}
                <div className="absolute inset-0 rounded-full border-2 border-[#98c25f]/25 animate-pulse scale-110" />

                {/* Rotating loader image representing recycle/reprocess */}
                <MotionImage
                  src={loaderImg}
                  alt="صلد الشمال - جاري التحميل"
                  width={112}
                  height={112}
                  className="h-28 w-28 rounded-full border-2 border-[#98c25f] object-cover shadow-2xl"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: 'linear',
                  }}
                />
              </div>

              {/* Brand label & loading state */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-bold tracking-[0.2em] text-[#98c25f] uppercase animate-pulse">صلد الشمال</span>
                <span className="text-xs text-[#f4ecdf]/40 font-light tracking-wide">جاري تهيئة التجربة...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen overflow-x-hidden bg-[#f4ecdf] text-[#101610] selection:bg-[#98c25f] selection:text-[#101610] font-sans antialiased">
        <ReadingProgress />
        <Navbar />
        <HeroSection />
        <StatsSection />
        <ActivityTicker />
        <AboutSection />
        <ServicesSection />
        <ScrapGuide />
        <ScaleSection />
        <ProcessSection />
        <EquipmentSection />
        <SustainabilitySection />
        <ProjectsSection />
        <GallerySection />
        <WhyUsSection />
        <CoverageSection />
        <FAQSection />
        <ContactForm />
        <FooterSection />
        <WhatsAppFloating />
        <BackToTop />
      </main>
    </>
  );
}
