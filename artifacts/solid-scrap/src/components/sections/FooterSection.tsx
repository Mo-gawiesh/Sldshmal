import React from 'react';
import Image from 'next/image';
import { PhoneCall } from 'lucide-react';

import logoImg from '@assets/Logo_1_png_1784267438904.png';
import visionLogoImg from '@assets/vision_2030.png';

export function FooterSection() {
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
