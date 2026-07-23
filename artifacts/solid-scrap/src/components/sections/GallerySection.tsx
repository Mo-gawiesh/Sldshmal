import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MotionReveal } from '@/components/MotionReveal';
import { SectionKicker } from '../SectionKicker';

import projectsImg from '@assets/generated_images/projects.webp';
import equipmentImg from '@assets/generated_images/equipment.webp';
import aboutImg from '@assets/generated_images/about.webp';
import processImg from '@assets/generated_images/process.webp';
import servicesImg from '@assets/generated_images/services.webp';
import sustainabilityImg from '@assets/generated_images/sustainability.webp';

import gallery1 from '@assets/generated_images/gallery_1.webp';
import gallery2 from '@assets/generated_images/gallery_2.webp';
import gallery3 from '@assets/generated_images/gallery_3.webp';
import gallery4 from '@assets/generated_images/gallery_4.webp';
import gallery5 from '@assets/generated_images/gallery_5.webp';

const galleryCategories = [
  { id: 'all', label: 'الكل' },
  { id: 'yard', label: 'ساحة الاستقبال' },
  { id: 'transport', label: 'النقل والتحميل' },
  { id: 'metals', label: 'فرز المعادن' },
];

const galleryItems = [
  {
    id: 1,
    title: 'تنظيم الساحات الكبرى بتبوك',
    category: 'yard',
    image: projectsImg,
    desc: 'مقرنا الرئيسي لتجميع الخردة والمعادن وتصنيفها.',
  },
  {
    id: 2,
    title: 'لوجستيات نقل مخلفات المصانع',
    category: 'transport',
    image: equipmentImg,
    desc: 'أسطول شاحنات مجهز لنقل الحمولات الكبيرة.',
  },
  {
    id: 3,
    title: 'فرز وتجفيف الكابلات النحاسية',
    category: 'metals',
    image: aboutImg,
    desc: 'تجهيز كابلات النحاس بعد تجريدها للفرز الأول.',
  },
  {
    id: 4,
    title: 'تجميع الألمنيوم والقطاعات الهيكلية',
    category: 'metals',
    image: processImg,
    desc: 'فرز وتجهيز الألومنيوم قبل كبسه وتوريده.',
  },
  {
    id: 5,
    title: 'معدات الرفع والمناولة الثقيلة',
    category: 'yard',
    image: servicesImg,
    desc: 'رافعات مخصصة لمناولة وتنزيل الأوزان الثقيلة.',
  },
  {
    id: 6,
    title: 'توريد حديد التسليح للمصانع',
    category: 'transport',
    image: sustainabilityImg,
    desc: 'نقل وتوريد حديد التسليح وهياكل السيارات المستعملة.',
  },
  {
    id: 7,
    title: 'تجميع خردة الحديد والمعادن',
    category: 'yard',
    image: gallery3,
    desc: 'فرز وتجميع هياكل الحديد الكبيرة داخل ساحة الاستقبال بتبوك.',
  },
  {
    id: 8,
    title: 'شحن ونقل السكراب الثقيل',
    category: 'transport',
    image: gallery4,
    desc: 'أسطول شاحنات مجهز لنقل وتفريغ الحمولات المعدنية الضخمة.',
  },
  {
    id: 9,
    title: 'فرز كابلات النحاس الأحمر',
    category: 'metals',
    image: gallery1,
    desc: 'تجهيز وتصنيف النحاس الأحمر الممتاز بعد تجريد العوازل.',
  },
  {
    id: 10,
    title: 'فرز وتصنيف جنوط الألومنيوم',
    category: 'metals',
    image: gallery2,
    desc: 'فرز جنوط وقطع الألومنيوم المختلفة لرفع نقاوة وجودة المواد.',
  },
  {
    id: 11,
    title: 'مظلات فرز وتكديس قطاعات الألومنيوم',
    category: 'yard',
    image: gallery5,
    desc: 'ساحة مجهزة لفصل قطاعات الألومنيوم وتخزينها تمهيداً للتوريد.',
  },
];

export function GallerySection() {
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
