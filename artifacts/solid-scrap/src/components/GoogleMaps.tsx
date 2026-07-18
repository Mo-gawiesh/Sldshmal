import { MapPin, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { MotionReveal } from './MotionReveal';

interface GoogleMapsProps {
  mapUrl?: string;
  embedUrl?: string;
  address?: string;
}

export function GoogleMaps({
  mapUrl = 'https://maps.app.goo.gl/RwZqwLyBnBpYRP7S6',
  embedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3591.1396113940173!2d36.6860525!3d28.5595749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15a9ad777ff8bc8b%3A0x597f483d5763a2ae!2z2YXYpNiz2LPYqSDYtdmE2K8g2KfZhNi02YXYp9mE4oCt!5e0!3m2!1sar!2ssa!4v1717777777777',
  address = 'تبوك، المنطقة الصناعية، المملكة العربية السعودية',
}: GoogleMapsProps) {
  return (
    <section id="location" className="relative scroll-mt-28 bg-[#111612] py-20 text-[#f4ecdf] lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-stretch">
          
          {/* Info Card */}
          <div className="lg:col-span-4 flex flex-col justify-between border border-white/10 bg-[#1a201b]/50 p-8 md:p-10 backdrop-blur-sm">
            <div>
              <div className="flex items-center gap-4 text-[#98c25f] mb-6">
                <span className="text-3xl font-light tabular-nums">٠٩</span>
                <div className="h-px flex-1 bg-current/25" />
                <span className="text-xs uppercase tracking-[0.3em] font-semibold">موقعنا الجغرافي</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-6">
                عنوان/موقع <br />
                <span className="text-[#98c25f]">الشركة</span>
              </h2>

              <p className="text-[#f4ecdf]/70 text-base md:text-lg leading-relaxed mb-8">
                ندعوكم لزيارة ساحة الفرز والاستقبال الخاصة بمؤسسة صلد الشمال في تبوك لمعاينة المواد وتسليم الدفعات الكبيرة مباشرة.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#98c25f]" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#98c25f] font-bold mb-1">المقر والساحة</span>
                    <p className="text-sm text-[#f4ecdf]/80 leading-relaxed font-light">{address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-white/10">
              <Button
                asChild
                className="w-full h-14 gap-2 rounded-none bg-[#98c25f] text-base font-bold text-[#101610] hover:bg-[#b3d37f] transition-all"
              >
                <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                  <span>فتح في خرائط جوجل</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Interactive Map Iframe */}
          <div className="lg:col-span-8 relative min-h-[350px] lg:min-h-[480px] w-full overflow-hidden border border-white/10 bg-[#0c100d]">
            <iframe
              title="موقع مؤسسة صلد الشمال على خرائط جوجل"
              src={embedUrl}
              className="absolute inset-0 h-full w-full border-0 grayscale opacity-85 invert-[0.05] contrast-[0.9] hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
