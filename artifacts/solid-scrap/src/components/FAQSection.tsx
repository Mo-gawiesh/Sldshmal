import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { MotionReveal } from '@/components/MotionReveal';

const faqs = [
  {
    q: 'كيف يتم تقييم سعر الخردة؟',
    a: 'يتم التقييم بناءً على نوع المعدن (حديد، نحاس، ألومنيوم، ستانلس ستيل)، والوزن الصافي، وجودة المادة ودرجة نقاوتها. يقوم فريقنا الميداني بزيارة موقعك لإجراء الفحص والتقييم المباشر مجاناً.',
  },
  {
    q: 'هل تشمل الخدمة النقل والجمع من الموقع؟',
    a: 'نعم، نوفر أسطول نقل متكامل يشمل رافعات ومعدات تحميل تناسب المواد الثقيلة، وخدمة الجمع والنقل تُحدَّد وفق حجم الطلب والمسافة الجغرافية.',
  },
  {
    q: 'ما الحد الأدنى للكميات المقبولة؟',
    a: 'لا يوجد حد أدنى صارم؛ نتعامل مع الأفراد وأصحاب الورش الصغيرة والمصانع الكبرى على حد سواء. تواصل معنا وسنحدد الآلية المناسبة لك.',
  },
  {
    q: 'ما أنواع المعادن التي تشترونها؟',
    a: 'نشتري جميع أنواع المعادن والخردة: حديد، فولاذ، نحاس، ألومنيوم، ستانلس ستيل، مواسير، كابلات، معدات صناعية قديمة، سيارات خردة، وغيرها.',
  },
  {
    q: 'كم يستغرق وقت المعاينة والاستلام؟',
    a: 'نسعى لإتمام المعاينة والاستلام في غضون ٢٤–٤٨ ساعة من تقديم الطلب. في الحالات العاجلة نرتّب الزيارة في اليوم ذاته بحسب توفر الفريق.',
  },
  {
    q: 'هل تعملون خارج مدينة تبوك؟',
    a: 'نعم، تمتد خدماتنا لتغطية المنطقة الشمالية الغربية من المملكة. للاستفسار عن منطقتك تحديداً تواصل معنا عبر واتساب وسنوضح لك نطاق التغطية.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <section id="faq" className="scroll-mt-32 bg-[#f4ecdf] py-20 md:py-28 text-[#101610]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">

          {/* Left: heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <MotionReveal direction="up" delay={0.05}>
              <div className="flex items-center gap-4 text-[#3c6b43] mb-6">
                <span className="text-xl md:text-2xl font-light tabular-nums">١٤</span>
                <div className="h-px flex-1 bg-current/25" />
                <span className="text-[0.7rem] md:text-xs uppercase tracking-[0.35em] font-semibold">الأسئلة الشائعة</span>
              </div>
            </MotionReveal>

            <MotionReveal direction="up" delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-[1.4] tracking-normal">
                أسئلة تبادر <br />
                <span className="text-[#3c6b43]">إلى الذهن دائماً.</span>
              </h2>
            </MotionReveal>

            <MotionReveal direction="up" delay={0.15}>
              <p className="mt-6 text-base md:text-lg leading-[1.8] text-[#101610]/70 font-light">
                جمعنا أبرز ما يسأله عملاؤنا قبل التواصل معنا، إن لم تجد إجابتك فريقنا جاهز.
              </p>
            </MotionReveal>
          </div>

          {/* Right: FAQ accordion */}
          <div className="lg:col-span-8 divide-y divide-[#101610]/10 border-y border-[#101610]/10">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-start justify-between gap-6 py-6 text-right cursor-pointer group"
                  aria-expanded={openIndex === i}
                >
                  <span className="text-base md:text-lg font-bold leading-snug group-hover:text-[#3c6b43] transition-colors">
                    {faq.q}
                  </span>
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3c6b43]/10 text-[#3c6b43] transition-all duration-300 group-hover:bg-[#3c6b43]/20">
                    {openIndex === i
                      ? <Minus className="h-4 w-4" />
                      : <Plus className="h-4 w-4" />
                    }
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-base md:text-lg leading-[1.85] text-[#101610]/70 font-light">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
