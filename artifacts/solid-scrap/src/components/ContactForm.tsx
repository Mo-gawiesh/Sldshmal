import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Phone, Mail, Clock, Send, MapPin, ExternalLink, Upload, X, Paperclip } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MotionReveal } from './MotionReveal';

const formSchema = z.object({
  name: z.string().min(2, { message: 'الاسم يجب أن يحتوي على حرفين على الأقل' }),
  phone: z.string().min(1, { message: 'يرجى إدخال رقم جوال صحيح' }).refine((val) => {
    const cleanPhone = val.replace(/[\s-]/g, '');
    const hasOnlyPhoneChars = /^\+?[0-9]+$/.test(cleanPhone);
    const digitsOnly = cleanPhone.replace(/\+/g, '');
    return hasOnlyPhoneChars && digitsOnly.length >= 7;
  }, {
    message: 'يرجى إدخال رقم جوال صحيح',
  }),
  email: z.string().email({ message: 'الرجاء إدخال بريد إلكتروني صحيح' }).optional().or(z.literal('')),
  serviceType: z.string({ required_error: 'يرجى تحديد نوع الخدمة المطلوبة' }),
  city: z.string().optional().or(z.literal('')),
  message: z.string().optional().or(z.literal('')),
});

const serviceLabels: Record<string, string> = {
  buy: 'شراء السكراب والمعادن',
  collect: 'جمع ونقل السكراب',
  sort: 'فرز المعادن وتصنيفها',
  recycle: 'إعادة تدوير المعادن',
  industrial: 'التعامل مع المخلفات الصناعية',
  other: 'طلب/استفسار آخر',
};

const inputClass =
  'h-14 bg-transparent border-0 border-b border-[#f4ecdf]/20 rounded-none px-0 text-[#f4ecdf] placeholder:text-[#f4ecdf]/35 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#98c25f] text-base md:text-lg transition-colors';

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    trackWhatsApp,
    trackEmail,
    trackMap,
    trackFormStart,
    trackFormSubmit,
    trackFormError,
  } = useAnalytics();
  const [formTrackingStarted, setFormTrackingStarted] = useState(false);

  const handleFormFocus = () => {
    if (!formTrackingStarted) {
      setFormTrackingStarted(true);
      trackFormStart();
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      serviceType: '',
      city: '',
      message: '',
    },
  });

  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setImages(prev => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    trackFormSubmit();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('فشل التحقق من صحة البيانات على الخادم');
      }

      const data = await response.json();

      toast({
        title: 'جاري تحضير طلبك',
        description: 'سيتم توجيهك الآن إلى واتساب لإرسال الطلب...',
        className: 'bg-[#23372a] text-[#f4ecdf] border border-white/10 rounded-none font-sans',
      });

      // Attempt to open in a new tab; if blocked by desktop popup blocker, fallback to redirecting current window.
      const newTab = window.open(data.whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
        window.location.href = data.whatsappUrl;
      }
      
      setIsSubmitting(false);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Fails server validation';
      trackFormError(errorMsg);
      toast({
        title: 'خطأ في التحقق من البيانات',
        description: 'فشل التحقق من صحة البيانات المرسلة من الخادم. يرجى مراجعة المدخلات والمحاولة لاحقاً.',
        className: 'bg-[#5c2222] text-[#f4ecdf] border border-white/10 rounded-none font-sans',
      });
      setIsSubmitting(false);
    }
  }

  const onFormError = (errors: any) => {
    const errorMsg = Object.keys(errors)
      .map((key) => `${key}: ${errors[key]?.message}`)
      .join(', ');
    trackFormError(errorMsg);
  };

  return (
    <section id="contact" className="relative scroll-mt-32 bg-[#0f1410] py-24 text-[#f4ecdf] lg:py-36 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
          
          {/* Left Column: Contact info & Google Map (Unified) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <MotionReveal direction="up" delay={0.1}>
                <div className="flex items-center gap-4 text-[#98c25f] mb-8">
                  <span className="text-3xl font-light tabular-nums">١٢</span>
                  <div className="h-px flex-1 bg-current/25" />
                  <span className="text-xs uppercase tracking-[0.3em] font-semibold">تواصل مباشر وموقعنا</span>
                </div>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.2}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.4] tracking-normal mb-8">
                  تواصل معنا <br />
                  <span className="text-[#98c25f]">وزُر موقعنا.</span>
                </h2>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.3}>
                <p className="text-[#f4ecdf]/70 text-base md:text-lg leading-relaxed mb-10 max-w-md">
                  يسعدنا تقديم الاستشارات والمعاينات الميدانية. يرجى ملء النموذج وسنقوم بالتواصل المباشر معك لإتمام العملية، أو زيارة مقرنا في تبوك.
                </p>
              </MotionReveal>

              <MotionReveal direction="up" delay={0.4} className="space-y-6 border-t border-white/10 pt-8">
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-[#98c25f]" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#98c25f] font-bold mb-1">اتصال أو واتساب</span>
                    <a
                      href="https://wa.me/966543019329"
                      onClick={() => trackWhatsApp('contact_info', '+966 54 301 9329')}
                      data-tracked="true"
                      className="text-base md:text-lg font-bold hover:text-[#98c25f] transition-colors"
                      style={{ direction: 'ltr', display: 'inline-block' }}
                    >
                      +966 54 301 9329
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-[#98c25f]" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#98c25f] font-bold mb-1">البريد الإلكتروني</span>
                    <a
                      href="mailto:Sldalshmal@gmail.com"
                      onClick={() => trackEmail('contact_info', 'Sldalshmal@gmail.com')}
                      data-tracked="true"
                      className="text-base md:text-lg font-bold hover:text-[#98c25f] transition-colors"
                    >
                      Sldalshmal@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#98c25f]" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#98c25f] font-bold mb-1">العنوان والمقر</span>
                    <p className="text-sm md:text-base text-[#f4ecdf]/80 leading-relaxed font-light">
                      تبوك، المنطقة الصناعية، المملكة العربية السعودية
                    </p>
                  </div>
                </div>
              </MotionReveal>
            </div>

            {/* Embedded map directly unified in the left column */}
            <MotionReveal direction="up" delay={0.5} className="mt-12 w-full">
              <div className="relative h-[220px] w-full overflow-hidden border border-white/10 bg-[#0c100d] mb-4 rounded-xl">
                <iframe
                  title="موقع مؤسسة صلد الشمال على خرائط جوجل"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3591.1396113940173!2d36.6860525!3d28.5595749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15a9ad777ff8bc8b%3A0x597f483d5763a2ae!2z2YXYpNiz2LPYqSDYtdmE2K8g2KfZhNi02YXYp9mE4oCt!5e0!3m2!1sar!2ssa!4v1717777777777"
                  className="absolute inset-0 h-full w-full border-0 grayscale opacity-85 invert-[0.05] contrast-[0.9] hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://maps.app.goo.gl/RwZqwLyBnBpYRP7S6"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackMap('contact_info')}
                data-tracked="true"
                className="inline-flex h-12 w-full items-center justify-between rounded-full bg-[#98c25f] pl-1 pr-4 text-xs font-bold text-[#101610] hover:bg-[#b3d37f] transition-all shadow-md cursor-pointer gap-3 group"
              >
                <span>فتح الموقع في خرائط جوجل</span>
                <span className="h-9 w-9 rounded-full bg-white flex items-center justify-center text-[#101610] shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <ExternalLink className="h-4 w-4" />
                </span>
              </a>
            </MotionReveal>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <MotionReveal direction="up" delay={0.2} className="border border-white/5 bg-[#141a15]/30 p-8 md:p-12 lg:p-14 rounded-xl">
              <h3 className="text-xl md:text-2xl font-bold mb-8 text-[#98c25f]">طلب تسعير ومعاينة ميدانية</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, onFormError)} onFocus={handleFormFocus} className="space-y-8">
                  
                  <div className="grid gap-8 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-0">
                          <label htmlFor="name-input" className="block text-xs uppercase tracking-wider text-[#98c25f] font-bold mb-2">الاسم الكامل</label>
                          <FormControl>
                            <Input id="name-input" placeholder="أدخل اسمك الكريم" {...field} className={inputClass} />
                          </FormControl>
                          <FormMessage className="text-sm mt-2 text-[#ff6b6b]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="space-y-0">
                          <label htmlFor="phone-input" className="block text-xs uppercase tracking-wider text-[#98c25f] font-bold mb-2">رقم الجوال</label>
                          <FormControl>
                            <Input
                              id="phone-input"
                              placeholder="05xxxxxxxx"
                              {...field}
                              className={inputClass}
                              style={{ direction: 'ltr', textAlign: 'right' }}
                            />
                          </FormControl>
                          <FormMessage className="text-sm mt-2 text-[#ff6b6b]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-8 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-0">
                           <label htmlFor="email-input" className="block text-xs uppercase tracking-wider text-[#98c25f] font-bold mb-2">البريد الإلكتروني (اختياري)</label>
                          <FormControl>
                            <Input id="email-input" placeholder="example@mail.com" {...field} className={inputClass} style={{ direction: 'ltr', textAlign: 'right' }} />
                          </FormControl>
                          <FormMessage className="text-sm mt-2 text-[#ff6b6b]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="space-y-0">
                           <label htmlFor="city-input" className="block text-xs uppercase tracking-wider text-[#98c25f] font-bold mb-2">المدينة (اختياري)</label>
                          <FormControl>
                            <Input id="city-input" placeholder="أدخل مدينتك (مثل: تبوك)" {...field} className={inputClass} />
                          </FormControl>
                          <FormMessage className="text-sm mt-2 text-[#ff6b6b]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <label id="service-type-label" className="block text-xs uppercase tracking-wider text-[#98c25f] font-bold mb-2">نوع الخدمة المطلوبة</label>
                        <Select onValueChange={field.onChange} defaultValue={field.value} dir="rtl">
                          <FormControl>
                            <SelectTrigger aria-labelledby="service-type-label" className="h-14 bg-transparent border-0 border-b border-[#f4ecdf]/20 rounded-none px-0 text-base md:text-lg focus:ring-0 focus:ring-offset-0 text-[#f4ecdf] hover:border-[#98c25f] transition-colors [&>svg]:text-[#98c25f]">
                              <SelectValue placeholder="اختر الخدمة المطلوبة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#111612] text-[#f4ecdf] border-white/10 rounded-none font-sans">
                            {Object.entries(serviceLabels).map(([key, label]) => (
                              <SelectItem key={key} value={key} className="focus:bg-[#98c25f] focus:text-[#101610] cursor-pointer">
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-sm mt-2 text-[#ff6b6b]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <label htmlFor="message-input" className="block text-xs uppercase tracking-wider text-[#98c25f] font-bold mb-2">تفاصيل الطلب / المواد المتوفرة (اختياري)</label>
                        <FormControl>
                          <Textarea
                            id="message-input"
                            placeholder="الرجاء كتابة تفاصيل ونوع المواد أو الخردة المتوفرة وكمياتها التقريبية..."
                            className="min-h-[120px] resize-none bg-transparent border-0 border-b border-[#f4ecdf]/20 rounded-none px-0 text-[#f4ecdf] placeholder:text-[#f4ecdf]/35 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-[#98c25f] text-base md:text-lg transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-sm mt-2 text-[#ff6b6b]" />
                      </FormItem>
                    )}
                  />
                  {/* Scrap Photo Upload Component */}
                  <div className="border-t border-white/10 pt-6">
                    <span className="block text-xs uppercase tracking-wider text-[#98c25f] font-bold mb-3">إرفاق صور السكراب (اختياري)</span>
                    <p className="text-xs text-[#f4ecdf]/60 mb-4 font-light leading-relaxed">
                      رفع صور الخردة المتوفرة يساعدنا على تقديم تقدير تسعير أسرع وأدق.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-4 items-start">
                      {/* Upload Button Box */}
                      <label htmlFor="file-upload" className="flex flex-col items-center justify-center h-24 border border-dashed border-white/20 hover:border-[#98c25f]/50 bg-white/5 rounded-xl cursor-pointer transition-colors group">
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <Upload className="h-5 w-5 text-[#f4ecdf]/40 group-hover:text-[#98c25f] transition-colors mb-1.5" />
                        <span className="text-[0.65rem] font-bold text-[#f4ecdf]/60 group-hover:text-[#98c25f] transition-colors">اختر ملفات</span>
                      </label>

                      {/* Preview Grid */}
                      {images.map((img, index) => (
                        <div key={img.preview} className="relative h-24 rounded-xl overflow-hidden border border-white/10 group bg-[#0c100d]">
                          <img src={img.preview} alt={`Scrap preview ${index + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1.5 left-1.5 h-6 w-6 rounded-full bg-black/75 hover:bg-red-600 flex items-center justify-center text-white transition-colors cursor-pointer"
                            aria-label="حذف الصورة"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex h-16 items-center justify-between rounded-full bg-[#98c25f] pl-2.5 pr-8 text-base font-bold text-[#101610] hover:bg-[#b3d37f] transition-all shadow-md cursor-pointer gap-4 group disabled:opacity-50"
                    >
                      <span>إرسال الطلب عبر واتساب</span>
                      <span className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-[#101610] shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                        <Send className="h-5 w-5 transform rotate-180 text-[#101610]" />
                      </span>
                    </button>
                    <span className="text-[#f4ecdf]/40 text-xs font-light leading-relaxed">
                      * سنقوم بتوجيهك فوراً لتطبيق واتساب مع الطلب منسقاً بالكامل لإتمام المعاينة والتسعير.
                    </span>
                  </div>

                </form>
              </Form>
            </MotionReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
