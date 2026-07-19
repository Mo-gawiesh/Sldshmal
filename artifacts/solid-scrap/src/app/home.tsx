import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, ArrowUpLeft, Factory, Recycle, ScanSearch, ShieldCheck, Sparkles, Truck, Leaf, PhoneCall, X, ChevronLeft, ChevronRight } from 'lucide-react';

import { Navbar } from '@/components/navbar';
import { MotionReveal } from '@/components/MotionReveal';
import { Button } from '@/components/ui/button';
import { ReadingProgress } from '@/components/ReadingProgress';
import { ActivityTicker } from '@/components/ActivityTicker';

// SEO-friendly Dynamic Client Components (SSR enabled)
const ContactForm = dynamic(() => import('@/components/ContactForm').then(m => m.ContactForm), { ssr: true });
const FAQSection = dynamic(() => import('@/components/FAQSection').then(m => m.FAQSection), { ssr: true });
const CoverageSection = dynamic(() => import('@/components/CoverageSection').then(m => m.CoverageSection), { ssr: true });
const ScrapGuide = dynamic(() => import('@/components/ScrapGuide').then(m => m.ScrapGuide), { ssr: true });

// Browser-only Dynamic Client Components (SSR disabled)
const WhatsAppFloating = dynamic(() => import('@/components/WhatsAppFloating').then(m => m.WhatsAppFloating), { ssr: false });
const BackToTop = dynamic(() => import('@/components/BackToTop').then(m => m.BackToTop), { ssr: false });

import logoImg from '@assets/Logo_1_png_1784267438904.png';
import visionLogoImg from '@assets/vision_2030.png';
import loaderImg from '@assets/generated_images/loader.webp';
import heroImg from '@assets/generated_images/hero.webp';
import aboutImg from '@assets/generated_images/about.webp';
import servicesImg from '@assets/generated_images/services.webp';
import processImg from '@assets/generated_images/process.webp';
import equipmentImg from '@assets/generated_images/equipment.webp';
import sustainabilityImg from '@assets/generated_images/sustainability.webp';
import projectsImg from '@assets/generated_images/projects.webp';

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

const stats = [
  { value: '٠٠', label: 'الرقم الفعلي', note: 'قيد التحديث' },
  { value: '٠٠', label: 'الرقم الفعلي', note: 'قيد التحديث' },
  { value: '٠٠', label: 'الرقم الفعلي', note: 'قيد التحديث' },
  { value: '٠٠', label: 'الرقم الفعلي', note: 'قيد التحديث' },
];

const workflow = [
  { title: 'المعاينة', desc: 'معاينة ميدانية أولية لتقدير نوعية وحجم المواد بدقة.' },
  { title: 'التقييم', desc: 'تقديم تقييم عادل يعكس أسعار السوق الحالية بجداول واضحة.' },
  { title: 'الجمع', desc: 'تجميع الخردة بطرق آمنة ومنظمة داخل الموقع الجغرافي.' },
  { title: 'النقل', desc: 'نقل المواد باستخدام أسطول نقل مجهز وآمن لساحة الفرز.' },
  { title: 'الفرز', desc: 'فرز دقيق وتصنيف شامل للمعادن لرفع جودة المواد المستردة.' },
  { title: 'إعادة التدوير', desc: 'إدخال المواد المجهزة في العملية الصناعية لدعم الاقتصاد الدائري.' },
];

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
    span: 'lg:col-span-6',
  },
  {
    title: 'تدفق المواد داخل الساحة',
    text: 'مشهد تشغيلي منظم يوضح كيف تتحول الخردة إلى مادة قابلة لإعادة الاستخدام.',
    image: processImg,
    span: 'lg:col-span-6',
  },
];

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

const principles = [
  { text: 'استرداد الموارد من المواد غير المستخدمة', icon: Recycle },
  { text: 'تقليل الأثر الناتج عن الهدر الصناعي', icon: Leaf },
  { text: 'دعم الاقتصاد الدائري بطريقة موثوقة', icon: ShieldCheck },
  { text: 'تحسين كفاءة سلاسل الإمداد للمعادن', icon: Truck },
];

const galleryCategories = [
  { id: 'all', label: 'الكل' },
  { id: 'yard', label: 'ساحة الاستقبال' },
  { id: 'transport', label: 'النقل والتحميل' },
  { id: 'metals', label: 'فرز المعادن' },
];

const galleryItems = [
  {
    id: 1,
    title: 'ساحة الفرز الكبرى بتبوك',
    category: 'yard',
    image: projectsImg,
    desc: 'مقرنا الرئيسي لتجميع الخردة والمعادن وتصنيفها.',
  },
  {
    id: 2,
    title: 'تجميع ونقل مخلفات المنشآت',
    category: 'transport',
    image: equipmentImg,
    desc: 'أسطول شاحنات مجهز لنقل الحمولات الكبيرة.',
  },
  {
    id: 3,
    title: 'فرز كابلات النحاس الأحمر',
    category: 'metals',
    image: aboutImg,
    desc: 'تجهيز كابلات النحاس بعد تجريدها للفرز الأول.',
  },
  {
    id: 4,
    title: 'تصنيف قطاعات الألومنيوم',
    category: 'metals',
    image: processImg,
    desc: 'فرز وتجهيز الألومنيوم قبل كبسه وتوريده.',
  },
  {
    id: 5,
    title: 'رافعات ساحة الاستقبال',
    category: 'yard',
    image: servicesImg,
    desc: 'رافعات مخصصة لمناولة وتنزيل الأوزان الثقيلة.',
  },
  {
    id: 6,
    title: 'شحنات الحديد التالف للمصانع',
    category: 'transport',
    image: sustainabilityImg,
    desc: 'نقل وتوريد حديد التسليح وهياكل السيارات المستعملة.',
  },
];


function scrollToId(id: string) {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function SectionKicker({ index, label, english }: { index: string; label: string; english?: string }) {
  return (
    <div className="flex items-center gap-4 text-[#98c25f] mb-6">
      <span className="text-xl md:text-2xl font-light tabular-nums">{index}</span>
      <div className="h-px flex-1 bg-current/25" />
      <span className="text-[0.7rem] md:text-xs uppercase tracking-[0.35em] font-semibold">{label}</span>
      {english ? <span className="hidden lg:inline text-[0.7rem] uppercase tracking-[0.3em] text-current/45">{english}</span> : null}
    </div>
  );
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

function AboutSection() {
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

function ServicesSection() {
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

function ScaleSection() {
  return (
    <section id="scale" className="scroll-mt-32 border-y border-[#101610]/10 bg-[#f4ecdf] py-16 md:py-24 text-[#101610]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <MotionReveal direction="up" delay={0.05}>
              <SectionKicker index="٠٥" label="الأرقام" english="Placeholder until final data is confirmed" />
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

function ProcessSection() {
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

function EquipmentSection() {
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

function SustainabilitySection() {
  return (
    <section id="sustainability" className="scroll-mt-32 bg-[#f4ecdf] py-20 md:py-28 text-[#101610]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <MotionReveal direction="up" delay={0.05}>
              <SectionKicker index="٠٨" label="الاستدامة" english="Circular economy perspective" />
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

function ProjectsSection() {
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

function GallerySection() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = galleryItems.filter(
    (item) => selectedCat === 'all' || item.category === selectedCat
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === null || prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === null || prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="scroll-mt-32 bg-[#0c100d] py-20 md:py-28 text-[#f4ecdf] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <MotionReveal direction="up" delay={0.05}>
              <SectionKicker index="١٠" label="معرض الأعمال" english="Interactive Gallery" />
            </MotionReveal>
            
            <MotionReveal direction="up" delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.4] tracking-normal">
                صور من الميدان <br />
                <span className="text-[#98c25f]">وواقع أعمالنا التشغيلية.</span>
              </h2>
            </MotionReveal>
          </div>

          {/* Filters */}
          <MotionReveal direction="up" delay={0.15}>
            <div className="flex flex-wrap gap-2">
              {galleryCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCat(cat.id);
                    setLightboxIndex(null);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold border transition-all cursor-pointer ${
                    selectedCat === cat.id
                      ? 'bg-[#98c25f] text-[#101610] border-[#98c25f] shadow-md'
                      : 'border-white/10 bg-white/5 text-[#f4ecdf]/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </MotionReveal>
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => openLightbox(index)}
              className="group relative overflow-hidden border border-white/10 bg-[#111612] rounded-xl cursor-pointer aspect-[4/3]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={80}
              />
              
              {/* Glassmorphic Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-xs uppercase tracking-wider text-[#98c25f] font-bold mb-1">
                  {galleryCategories.find(c => c.id === item.category)?.label}
                </span>
                <h3 className="text-lg font-black text-white leading-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#f4ecdf]/70 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Static visual indicator for Mobile/No-Hover */}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/5 block group-hover:hidden transition-all duration-300">
                <span className="text-xs font-bold text-white/95">
                  {item.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-[10000] p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-105 transition-all cursor-pointer"
              aria-label="إغلاق المعرض"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-[10000] p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-105 transition-all cursor-pointer"
              aria-label="الصورة السابقة"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-[10000] p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-105 transition-all cursor-pointer"
              aria-label="الصورة التالية"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Lightbox Content */}
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full aspect-[4/3] max-h-[80vh] overflow-hidden rounded-2xl border border-white/10 bg-[#0c100d] shadow-2xl flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative flex-1 w-full h-full">
                <Image
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  quality={90}
                  priority
                />
              </div>

              {/* Caption Bar */}
              <div className="w-full bg-[#111612]/90 backdrop-blur-md border-t border-white/5 px-8 py-5 flex items-center justify-between text-[#f4ecdf]">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#98c25f] font-bold">
                    {galleryCategories.find(c => c.id === filteredItems[lightboxIndex].category)?.label}
                  </span>
                  <h4 className="text-lg font-black mt-1">{filteredItems[lightboxIndex].title}</h4>
                  <p className="text-sm text-[#f4ecdf]/70 font-light mt-1">{filteredItems[lightboxIndex].desc}</p>
                </div>
                <div className="text-xs font-semibold tabular-nums tracking-widest text-[#f4ecdf]/40">
                  {lightboxIndex + 1} / {filteredItems.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function WhyUsSection() {
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

function FooterSection() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <footer className="border-t border-white/10 bg-[#111612] text-[#f4ecdf] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Footer Top Grid */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">

          {/* COLUMN 1: Primary Brand (Right on Desktop) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-right order-1">
            <Image
              src={logoImg}
              alt="شعار مؤسسة صلد الشمال"
              width={240}
              height={110}
              className="h-[110px] w-auto object-contain mb-6 transition-transform duration-300 hover:scale-102"
            />
            <p className="max-w-md text-base leading-relaxed text-[#f4ecdf]/70 font-light">
              مؤسسة سعودية صناعية متخصصة في شراء المعادن والخردة وجمعها وفرزها وإعادة تدويرها بأسلوب تشغيلي منضبط ومهيأ للاستدامة والتنمية الاقتصادية.
            </p>

            {/* Mobile-Only Primary WhatsApp CTA */}
            <div className="mt-6 w-full max-w-xs block lg:hidden">
              <a
                href="https://wa.me/966543019329"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-between rounded-full bg-[#98c25f] pl-1 pr-4 text-xs font-bold text-[#101610] hover:bg-[#b3d37f] transition-all shadow-md cursor-pointer gap-3 group"
              >
                <span>تواصل معنا عبر واتساب</span>
                <span className="h-9 w-9 rounded-full bg-white flex items-center justify-center text-[#101610] shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <PhoneCall className="h-4 w-4" />
                </span>
              </a>
            </div>
          </div>

          {/* COLUMN 2: Site Navigation (Center on Desktop) */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-right order-3 lg:order-2">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#98c25f] mb-6">خريطة الموقع</h3>
            <nav className="grid grid-cols-2 gap-x-8 gap-y-4 w-full max-w-xs justify-items-center lg:justify-items-start">
              {[
                { id: 'home', label: 'الرئيسية' },
                { id: 'about', label: 'من نحن' },
                { id: 'services', label: 'الخدمات' },
                { id: 'process', label: 'آلية العمل' },
                { id: 'projects', label: 'أعمالنا' },
                { id: 'sustainability', label: 'الاستدامة' },
                { id: 'contact', label: 'تواصل معنا' },
              ].map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="text-sm text-[#f4ecdf]/80 hover:text-[#98c25f] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* COLUMN 3: Contact (Left on Desktop) */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-right order-2 lg:order-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#98c25f] mb-6">اتصل بنا</h3>
            <div className="space-y-4 text-[#f4ecdf]/80 font-light text-base w-full">
              <a
                href="https://wa.me/966543019329"
                className="block hover:text-[#98c25f] transition-colors text-center lg:text-right"
                dir="ltr"
              >
                +966 54 301 9329
              </a>
              <a
                href="mailto:Sldalshmal@gmail.com"
                className="block hover:text-[#98c25f] transition-colors text-center lg:text-right"
              >
                Sldalshmal@gmail.com
              </a>
              <a
                href="https://maps.app.goo.gl/RwZqwLyBnBpYRP7S6"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#98c25f] transition-colors text-center lg:text-right leading-relaxed"
              >
                تبوك، المملكة العربية السعودية
              </a>
            </div>
          </div>

        </div>

        {/* Institutional Divider (Vision 2030 Aligned Row) */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Vision 2030 Logo and label (Right on Desktop) */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right">
              <Image
                src={visionLogoImg}
                alt="رؤية المملكة 2030"
                width={100}
                height={48}
                className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
              <span className="text-xs text-[#f4ecdf]/40 font-semibold tracking-wider">
                رؤية المملكة العربية السعودية ٢٠٣٠
              </span>
            </div>
            {/* Sustainability statement (Left on Desktop) */}
            <div className="text-center lg:text-left text-xs text-[#f4ecdf]/50 max-w-md font-light leading-relaxed">
              نسعى لتعزيز الاستدامة البيئية ودعم حلول الاقتصاد الدائري ضمن عمليات تدوير وتصنيع المعادن.
            </div>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-8 text-xs text-[#f4ecdf]/30 sm:flex-row sm:items-center sm:justify-between font-light tracking-wider">
          <div className="text-center sm:text-right">
            © {new Date().getFullYear()} مؤسسة صلد الشمال. جميع الحقوق محفوظة.
          </div>
        </div>

      </div>
    </footer>
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
