import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, Info, Award, HelpCircle, ArrowLeft } from 'lucide-react';
import { MotionReveal } from './MotionReveal';

const categories = [
  { id: 'all', label: 'الكل' },
  { id: 'copper', label: 'نحاس' },
  { id: 'iron', label: 'حديد' },
  { id: 'aluminum', label: 'ألومنيوم' },
  { id: 'other', label: 'معادن أخرى' },
];

const scrapItems = [
  {
    id: 'bright-copper',
    name: 'نحاس أحمر ممتاز (ميلباري)',
    category: 'copper',
    value: 'مرتفع جداً',
    desc: 'أسلاك وكابلات نحاسية حمراء نظيفة تماماً وخالية من العزل أو اللحامات أو الصدأ.',
    tip: 'قم بتقشير الأسلاك الكهربائية السميكة للحصول على النحاس الأحمر الصافي وبيعه بأعلى قيمة.',
  },
  {
    id: 'brass-copper',
    name: 'نحاس أصفر (برونز)',
    category: 'copper',
    value: 'مرتفع',
    desc: 'سبائك نحاسية صفراء اللون، توجد عادة في قطع السباكة، المحابس، الرديترات، والمشغولات الفنية.',
    tip: 'تأكد من إزالة أي قطع حديد أو بلاستيك ملتصقة بقطع النحاس الأصفر لرفع جودة الفرز.',
  },
  {
    id: 'heavy-steel',
    name: 'حديد ثقيل وهياكل (شاسي وجسور)',
    category: 'iron',
    value: 'متوسط',
    desc: 'الحديد السميك والصلب الذي يزيد سمكه عن ٦ ملم، مثل جسور الحديد (H-Beams) وقضبان التسليح الكبيرة وهياكل الآلات.',
    tip: 'يحظى بطلب كبير في المصانع لسهولة صهره، قيمته أعلى بكثير من الحديد الخفيف.',
  },
  {
    id: 'light-iron',
    name: 'حديد خفيف وصاج (بليت)',
    category: 'iron',
    value: 'عادي',
    desc: 'الصفائح المعدنية الرقيقة، صاج السيارات، الشبكات المعدنية، الأجهزة المنزلية القديمة (الغسالات، الثلاجات).',
    tip: 'قم بجمع كميات كبيرة وتكبيسها لتقليل تكلفة النقل وزيادة العائد الإجمالي.',
  },
  {
    id: 'alum-profile',
    name: 'ألومنيوم قطاعات (مطابخ ونوافذ)',
    category: 'aluminum',
    value: 'جيد جداً',
    desc: 'إطارات النوافذ والأبواب والمطابخ المصنوعة من قطاعات الألومنيوم، وتكون خفيفة ومقاومة للصدأ.',
    tip: 'الألومنيوم الأبيض أو الفضي غير المصبوغ يكون سعره أعلى من القطاعات المصبوغة.',
  },
  {
    id: 'cables-wire',
    name: 'كابلات وأسلاك معزولة',
    category: 'other',
    value: 'جيد',
    desc: 'أسلاك النحاس أو الألومنيوم التي لا تزال مغطاة بغلاف بلاستيكي أو مطاطي عازل.',
    tip: 'يمكننا شراؤها معزولة كما هي، ولكن قيمتها تزيد إذا تم تجريدها من العازل البلاستيكي.',
  },
  {
    id: 'car-radiator',
    name: 'رديترات سيارات (ألومنيوم ونحاس)',
    category: 'other',
    value: 'جيد جداً',
    desc: 'المبادلات الحرارية التالفة من السيارات والمكيفات، والتي تحتوي على مزيج من النحاس والألومنيوم.',
    tip: 'قم بفصل رديتر النحاس عن رديتر الألومنيوم لتحديد السعر الأنسب لكل خامة.',
  },
  {
    id: 'stainless-steel',
    name: 'ستانلس ستيل (حديد مقاوم للصدأ)',
    category: 'other',
    value: 'جيد',
    desc: 'المعادن المقاومة للصدأ المستخدمة في أواني المطاعم، أنابيب الحليب، المغاسل، وبعض المعدات الطبية.',
    tip: 'يمكنك التمييز بينه وبين الحديد العادي باستخدام المغناطيس؛ فالستانلس ستيل النقي لا ينجذب للمغناطيس.',
  },
];

export function ScrapGuide() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = scrapItems.filter((item) => {
    const matchesCat = selectedCat === 'all' || item.category === selectedCat;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="scrap-guide" className="scroll-mt-32 bg-[#111612] py-20 md:py-28 text-[#f4ecdf]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <MotionReveal direction="up" delay={0.05}>
              <div className="flex items-center gap-4 text-[#98c25f] mb-6">
                <span className="text-xl md:text-2xl font-light tabular-nums">٠٤</span>
                <div className="h-px flex-1 bg-current/25" />
                <span className="text-[0.7rem] md:text-xs uppercase tracking-[0.35em] font-semibold">دليل تصنيف الخردة</span>
              </div>
            </MotionReveal>
            
            <MotionReveal direction="up" delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.4] tracking-normal">
                كيف تميز وتصنف <br />
                <span className="text-[#98c25f]">معادنك بالشكل الصحيح؟</span>
              </h2>
            </MotionReveal>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              placeholder="ابحث عن خامة أو معدن..."
              aria-label="ابحث عن خامة أو معدن"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 bg-white/5 border border-white/10 rounded-full px-5 pr-12 text-sm text-[#f4ecdf] placeholder:text-[#f4ecdf]/40 focus:outline-none focus:border-[#98c25f] transition-all font-sans"
            />
            <Search className="absolute top-1/2 right-4 -translate-y-1/2 h-5 w-5 text-[#f4ecdf]/40 pointer-events-none" />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold border transition-all cursor-pointer ${
                selectedCat === cat.id
                  ? 'bg-[#98c25f] border-[#98c25f] text-[#101610]'
                  : 'bg-transparent border-white/10 text-[#f4ecdf]/70 hover:bg-white/5 hover:text-[#f4ecdf]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Scrap Items Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-[#17251e] border border-white/5 p-6 rounded-2xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-[10px] uppercase tracking-wider text-[#98c25f] font-bold">
                      {item.category === 'copper' ? 'نحاس صافي' : item.category === 'iron' ? 'حديد صلب' : item.category === 'aluminum' ? 'ألومنيوم قطاعات' : 'معادن منوعة'}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.value === 'مرتفع جداً' || item.value === 'مرتفع'
                        ? 'bg-[#98c25f]/15 text-[#98c25f]'
                        : 'bg-white/5 text-[#f4ecdf]/60'
                    }`}>
                      سعر {item.value}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#f4ecdf] mb-3 leading-snug group-hover:text-[#98c25f] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs md:text-sm leading-relaxed text-[#f4ecdf]/75 font-light mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 bg-[#121c17] -mx-6 -mb-6 p-4 rounded-b-2xl">
                  <div className="flex items-start gap-2.5">
                    <Info className="h-4.5 w-4.5 text-[#98c25f] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] font-bold text-[#98c25f] mb-1">نصيحة لرفع السعر:</span>
                      <p className="text-[11px] leading-relaxed text-[#f4ecdf]/60 font-light">{item.tip}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
