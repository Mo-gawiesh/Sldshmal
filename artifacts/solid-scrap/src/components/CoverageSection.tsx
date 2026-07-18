import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Shield, Truck, Compass } from 'lucide-react';
import { MotionReveal } from './MotionReveal';

const cities = [
  {
    id: 'tabuk',
    name: 'تبوك',
    english: 'Tabuk (Headquarters)',
    role: 'المقر الرئيسي وساحة الفرز الكبرى',
    time: 'استجابة فورية (خلال ١٢ ساعة)',
    desc: 'مركز العمليات الرئيسي للمؤسسة، وساحة فرز وتجميع الخردة الكبرى المجهزة بجميع الرافعات والموازين المعتمدة.',
    coords: { x: '50%', y: '50%' },
  },
  {
    id: 'neom',
    name: 'نيوم',
    english: 'NEOM',
    role: 'خدمات لوجستية وإزالة خردة المشاريع',
    time: 'استجابة وتنسيق تشغيلي (خلال ٢٤ ساعة)',
    desc: 'تقديم حلول بيئية وجمع وتدوير مخلفات الحديد والمعادن للمشاريع الكبرى والشركات العاملة في قطاعات نيوم.',
    coords: { x: '35%', y: '35%' },
  },
  {
    id: 'duba',
    name: 'ضباء',
    english: 'Duba Port Area',
    role: 'تأمين ونقل سكراب المنشآت والموانئ',
    time: 'معاينة ونقل ميداني سريع (خلال ٢٤ ساعة)',
    desc: 'توفير ناقلات وسيارات نقل مخصصة لخدمة قطاع الموانئ، والورش الصناعية، وجمع خردة الحديد بمختلف أحجامها.',
    coords: { x: '30%', y: '58%' },
  },
  {
    id: 'haql',
    name: 'حقل',
    english: 'Haql Border Area',
    role: 'معاينة وجمع الخردة الحدودية والصناعية',
    time: 'جدولة دورية للمعاينة (خلال ٢٤-٤٨ ساعة)',
    desc: 'تغطية متكاملة لجمع خردة المعادن وتجهيز شاحنات التحميل للمنشآت والمواقع الصناعية بمنطقة حقل ومحيطها.',
    coords: { x: '25%', y: '20%' },
  },
  {
    id: 'tayma',
    name: 'تيماء',
    english: 'Tayma Agricultural & Urban',
    role: 'فرز خردة الورش والمعدات القديمة',
    time: 'جدولة معاينات ونقل (خلال ٢٤-٤٨ ساعة)',
    desc: 'تغطية للمواقع والمخازن الزراعية والورش في تيماء لنقل سكراب الحديد والمحركات والمعدات التالفة.',
    coords: { x: '70%', y: '65%' },
  },
  {
    id: 'alwajh',
    name: 'الوجه',
    english: 'Al Wajh Coast',
    role: 'جمع سكراب وخدمات بيئية للمشاريع الساحلية',
    time: 'خدمة مجدولة وتجميع منتظم (خلال ٤٨ ساعة)',
    desc: 'تسيير ناقلات مجهزة لنقل كميات المعادن والسكراب المتراكم للمنشآت والمشاريع الساحلية بالوجه.',
    coords: { x: '42%', y: '78%' },
  },
  {
    id: 'umluj',
    name: 'أملج',
    english: 'Umluj Industrial Site',
    role: 'جمع وإعادة تدوير خردة المعادن الثقيلة',
    time: 'خدمة مجدولة وتجميع منتظم (خلال ٤٨ ساعة)',
    desc: 'تغطية لأملج والمناطق الصناعية التابعة لها لنقل وتأمين حمولات المعادن المختلفة بآلية نقل آمنة ومعتمدة.',
    coords: { x: '55%', y: '90%' },
  },
];

export function CoverageSection() {
  const [activeCity, setActiveCity] = useState(cities[0]);

  return (
    <section id="coverage" className="scroll-mt-32 bg-[#23372a] py-20 md:py-28 text-[#f4ecdf] overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-16">
          <MotionReveal direction="up" delay={0.05}>
            <div className="flex items-center gap-4 text-[#98c25f] mb-6">
              <span className="text-xl md:text-2xl font-light tabular-nums">١٠</span>
              <div className="h-px flex-1 bg-current/25" />
              <span className="text-[0.7rem] md:text-xs uppercase tracking-[0.35em] font-semibold">تغطية لوجستية واسعة</span>
            </div>
          </MotionReveal>
          
          <MotionReveal direction="up" delay={0.1}>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.4] tracking-normal">
              نغطّي منطقة تبوك <br />
              <span className="text-[#98c25f]">والمنطقة الشمالية الغربية بالكامل.</span>
            </h2>
          </MotionReveal>
          
          <MotionReveal direction="up" delay={0.15}>
            <p className="mt-6 max-w-2xl text-base md:text-lg lg:text-xl leading-[1.75] text-[#f4ecdf]/80">
              بفضل أسطولنا المجهز وموقعنا الاستراتيجي في تبوك، نضمن سرعة وصول الشاحنات والمعاينة الميدانية العادلة لأي موقع.
            </p>
          </MotionReveal>
        </div>

        {/* Interactive Layout */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-stretch">
          
          {/* Left Column: Cities List & Detail Box */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            {/* List */}
            <div className="space-y-2">
              <span className="block text-xs uppercase tracking-wider text-[#98c25f] font-bold mb-4">اختر المدينة لمشاهدة التغطية لوجستياً</span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
                {cities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => setActiveCity(city)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-right transition-all cursor-pointer ${
                      activeCity.id === city.id
                        ? 'bg-[#98c25f] border-[#98c25f] text-[#101610] font-bold shadow-md shadow-[#98c25f]/10'
                        : 'bg-white/5 border-white/5 text-[#f4ecdf] hover:bg-white/10 hover:border-white/10'
                    }`}
                  >
                    <MapPin className={`h-4.5 w-4.5 shrink-0 ${activeCity.id === city.id ? 'text-[#101610]' : 'text-[#98c25f]'}`} />
                    <span className="text-sm md:text-base font-semibold">{city.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Detail Card */}
            <div className="bg-[#17251e] border border-white/5 p-6 md:p-8 rounded-2xl relative overflow-hidden min-h-[220px] flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#98c25f]/5 rounded-full filter blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#98c25f] font-bold">{activeCity.english}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#98c25f]/15 text-[#98c25f] font-bold">{activeCity.time}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-[#f4ecdf]">{activeCity.role}</h3>
                <p className="text-sm md:text-base leading-relaxed text-[#f4ecdf]/75 font-light">{activeCity.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-4 text-xs text-[#98c25f]/70 font-semibold">
                <Truck className="h-4 w-4 shrink-0" />
                <span>جاهزية لوجستية للنقل الثقيل والمتوسط</span>
              </div>
            </div>
          </div>

          {/* Right Column: Beautiful Stylized Map Visualizer */}
          <div className="lg:col-span-7 flex items-center justify-center bg-[#111612] border border-white/5 rounded-2xl p-8 relative min-h-[400px] lg:min-h-[500px]">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(152,194,95,0.06),transparent_70%)]" />
            <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(#98c25f 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            {/* Compass rose decoration */}
            <div className="absolute top-6 right-6 flex items-center gap-2 text-[#98c25f]/40 text-xs">
              <Compass className="h-5 w-5 animate-spin-slow" />
              <span className="font-light tracking-widest font-mono">NORTH-WEST COVERAGE</span>
            </div>

            {/* Stylized SVG Map of Tabuk Region */}
            <div className="relative w-full max-w-[450px] aspect-square">
              <svg viewBox="0 0 400 400" className="w-full h-full fill-none stroke-[#98c25f]/20 stroke-2">
                
                {/* Regional boundaries styled lines */}
                <path d="M 50,40 Q 120,60 200,50 T 350,80" className="stroke-white/5" strokeDasharray="4 4" />
                <path d="M 80,150 Q 180,200 240,250 T 320,380" className="stroke-[#98c25f]/10" strokeDasharray="3 3" />
                <path d="M 20,280 C 120,320 200,320 380,300" className="stroke-white/5" />

                {/* Connection lines from Tabuk (center) to other cities */}
                {cities.map((city) => {
                  if (city.id === 'tabuk') return null;
                  return (
                    <motion.line
                      key={`line-${city.id}`}
                      x1="200"
                      y1="200"
                      x2={parseFloat(city.coords.x) * 4}
                      y2={parseFloat(city.coords.y) * 4}
                      initial={{ pathLength: 0, opacity: 0.2 }}
                      animate={
                        activeCity.id === city.id
                          ? { pathLength: 1, opacity: 0.8, stroke: '#98c25f' }
                          : { pathLength: 1, opacity: 0.3, stroke: 'rgba(152, 194, 95, 0.2)' }
                      }
                      transition={{ duration: 0.6 }}
                      strokeWidth={activeCity.id === city.id ? 2 : 1}
                      strokeDasharray={activeCity.id === city.id ? '0' : '4 4'}
                    />
                  );
                })}

                {/* Concentric coverage rings around Tabuk */}
                <circle cx="200" cy="200" r="50" className="stroke-[#98c25f]/5" />
                <circle cx="200" cy="200" r="100" className="stroke-[#98c25f]/5" />
                <circle cx="200" cy="200" r="150" className="stroke-[#98c25f]/3" strokeDasharray="6 6" />
              </svg>

              {/* Pulsing glow under active city dot */}
              <AnimatePresence>
                {cities.map((city) => {
                  const x = parseFloat(city.coords.x);
                  const y = parseFloat(city.coords.y);
                  const isActive = activeCity.id === city.id;

                  return (
                    <div
                      key={`dot-wrapper-${city.id}`}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                      style={{ left: `${x}%`, top: `${y}%` }}
                      onClick={() => setActiveCity(city)}
                    >
                      {/* Active outer pulse */}
                      {isActive && (
                        <motion.span
                          layoutId="pulse"
                          className="absolute -inset-4 rounded-full bg-[#98c25f]/30"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1.5, opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
                        />
                      )}

                      {/* Small location dot */}
                      <span className={`block h-3.5 w-3.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-[#98c25f] scale-125 border-2 border-[#111612] shadow-lg shadow-[#98c25f]/40'
                          : 'bg-[#98c25f]/40 hover:bg-[#98c25f]/80'
                      }`} />

                      {/* Floating city tag label */}
                      <span className={`absolute top-5 right-1/2 translate-x-1/2 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-md whitespace-nowrap transition-all duration-300 shadow-md ${
                        isActive
                          ? 'bg-[#98c25f] text-[#101610] scale-105'
                          : 'bg-[#17251e] text-[#f4ecdf]/75 border border-white/5 opacity-80'
                      }`}>
                        {city.name}
                      </span>
                    </div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
