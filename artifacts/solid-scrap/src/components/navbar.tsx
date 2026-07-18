import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowLeft, PhoneCall } from 'lucide-react';
import { Button } from './ui/button';
import { usePathname, useRouter } from 'next/navigation';
import logoImg from '@assets/Logo_1_png_1784267438904.png';

const navLinks = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'about', label: 'من نحن' },
  { id: 'services', label: 'الخدمات' },
  { id: 'process', label: 'آلية العمل' },
  { id: 'projects', label: 'أعمالنا' },
  { id: 'sustainability', label: 'الاستدامة' },
  { id: 'contact', label: 'تواصل معنا' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const pathname = usePathname();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  // Ticker informational messages (Safe Option B - no mocked numerical prices)
  const tickerMessages = [
    'أسعار شراء المعادن تتغير بشكل مستمر حسب البورصة العالمية ونوع الخام ونظافته',
    'نقدم أسعاراً تنافسية ومجزية لجميع كميات السكراب الفردية والصناعية بتبوك',
    'يمكنك إرفاق صور السكراب في نموذج التواصل بالأسفل لتقدير السعر المبدئي',
    'تواصل معنا مباشرة عبر الجوال أو الواتساب للحصول على تسعير فوري ودقيق',
    'نشتري النحاس والألومنيوم والحديد والبطاريات وكافة أنواع المعادن والخردة',
  ];

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToId = (id: string) => {
    setIsOpen(false);
    if (pathname !== '/') {
      router.push('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Scroll spy to detect active section
  useEffect(() => {
    const sections = navLinks.map((link) => document.getElementById(link.id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -50% 0px' }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Handle scroll header background change
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Duplicate messages to create seamless loop
  const tickerList = [...tickerMessages, ...tickerMessages, ...tickerMessages];

  return (
    <motion.header
      initial={shouldReduceMotion ? {} : { y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b border-black/10 transition-all duration-300 bg-[#446a4d] shadow-md`}
    >
      {/* Upper main header bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        
        {/* Right: Logo */}
        <div className="flex lg:flex-1 justify-start">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('home');
            }}
            className="flex items-center gap-3"
          >
            <img
              src={(logoImg as any).src || logoImg}
              alt="شعار سكرباب صلد الشمال"
              className="h-12 w-auto object-contain sm:h-15 transition-transform duration-300 hover:scale-102"
            />
          </a>
        </div>

        {/* Center: Navigation Links with Active Capsule style */}
        <nav className="hidden lg:flex items-center justify-center gap-4 lg:flex-[2]">
          {navLinks.map((link) => {
            const isActive = activeLink === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(link.id);
                }}
                className={`text-sm font-medium px-4 py-2 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#98c25f] text-[#101610] rounded-lg font-bold shadow-sm'
                    : 'text-[#f4ecdf] hover:text-[#98c25f] hover:bg-white/5 rounded-lg'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Left: Capsule Button */}
        <div className="hidden lg:flex lg:flex-1 justify-end">
          <button
            onClick={() => scrollToId('contact')}
            className="inline-flex h-11 items-center justify-between rounded-full bg-[#98c25f] pl-1 pr-4 text-xs font-bold text-[#101610] hover:bg-[#b3d37f] transition-all shadow-md cursor-pointer gap-3 group"
          >
            <span>تواصل سريع</span>
            <span className="h-9 w-9 rounded-full bg-white flex items-center justify-center text-[#101610] shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <PhoneCall className="h-3.5 w-3.5 text-[#101610]" />
            </span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-[#f4ecdf]/15 text-[#f4ecdf] hover:bg-[#f4ecdf]/5 lg:hidden shrink-0"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

      </div>

      {/* Live Metal Prices Ticker */}
      <div className="relative bg-[#111612] border-t border-black/20 h-10 text-xs md:text-sm select-none overflow-hidden">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-33.33%, 0, 0); }
          }
          .animate-marquee {
            display: inline-flex;
            animation: marquee 45s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}} />

        <div className="mx-auto max-w-7xl px-6 lg:px-10 w-full h-full flex items-center justify-between gap-6">
          {/* Sticky Label (Visible only on Desktop/Web, hidden on Mobile) */}
          <div className="hidden lg:flex z-10 bg-[#446a4d]/25 text-[#f4ecdf] px-4 h-full items-center gap-2 border-r border-l border-white/5 font-bold shrink-0">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#98c25f] animate-pulse" />
            <span className="text-xs tracking-wide">تحديثات وأسعار خردة المعادن بتبوك</span>
          </div>

          {/* Scrolling Ticker Area */}
          <div className="flex-1 overflow-hidden relative flex items-center h-full" style={{ direction: 'rtl' }}>
            <div className="animate-marquee flex gap-12 items-center">
              {tickerList.map((msg, idx) => (
                <div key={idx} className="inline-flex items-center gap-4 shrink-0 text-xs md:text-sm text-[#f4ecdf]/80 font-medium">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#98c25f]" />
                  <span>{msg}</span>
                  <span className="text-white/15 select-none mr-4">|</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[104px] bottom-0 z-40 bg-[#111612] lg:hidden border-t border-white/5 overflow-y-auto"
          >
            <div className="mx-auto max-w-7xl px-6 py-8">
              <div className="grid gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(link.id);
                    }}
                    className="flex items-center justify-between border border-[#f4ecdf]/10 px-5 py-4 text-base text-[#f4ecdf] hover:border-[#98c25f]/50 transition-colors"
                  >
                    <span className="font-semibold">{link.label}</span>
                    <ArrowLeft className="h-4 w-4 text-[#98c25f]" />
                  </a>
                ))}
              </div>
              <button
                onClick={() => scrollToId('contact')}
                className="mt-8 inline-flex h-14 w-full items-center justify-between rounded-full bg-[#98c25f] pl-1.5 pr-6 text-base font-bold text-[#101610] hover:bg-[#b3d37f] transition-all shadow-md cursor-pointer gap-4 group"
              >
                <span>تواصل سريع</span>
                <span className="h-11 w-11 rounded-full bg-white flex items-center justify-center text-[#101610] shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <PhoneCall className="h-4 w-4 text-[#101610]" />
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
