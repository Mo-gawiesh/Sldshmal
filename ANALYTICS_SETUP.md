# دليل إعداد التحليلات والسيو التقني (Analytics & Technical SEO Setup)

يحتوي هذا الملف على تفاصيل تشغيل وإعداد تتبع البيانات (Analytics)، إدارة الأوسمة (Google Tag Manager)، مراقبة سلوك المستخدمين (Microsoft Clarity)، وإعدادات السيو التقني (SEO) لموقع **صلد الشمال لشراء الخردة والمعادن**.

---

## ١. إعدادات معرفات التحليلات (Analytics IDs Configuration)

يتم تخزين معرفات التتبع (GTM, GA4, Clarity) في ملف إعدادات موحد ومستقل داخل المشروع:
`src/config/analytics.ts`

```typescript
export const ANALYTICS = {
  GTM_ID: 'GTM-KTLSF5VW',
  GA4_ID: 'G-7LC0HVQR24',
  CLARITY_ID: '', // ضع معرف Clarity هنا إذا أردت تفعيله
};
```

### المتغيرات البيئية الاختيارية (Optional Environment Variables):
يُمكنك تفعيل وضع تصحيح الأخطاء والتتبع التفصيلي في كونسول المتصفح محلياً أو في الإنتاج عبر:
```env
NEXT_PUBLIC_ANALYTICS_DEBUG=true
```

---

## ٢. كيفية الحصول على المعرفات (Where to obtain each ID)

### أ. تحليلات جوجل (Google Analytics 4):
1. اذهب إلى [Google Analytics Console](https://analytics.google.com/).
2. أنشئ حساباً جديداً (Account) وموقعاً (Property) باسم الموقع.
3. اذهب إلى **Admin** -> **Data Streams** -> اختر **Web**.
4. انسخ معرف القياس **Measurement ID** الذي يبدأ بـ `-G`.

### ب. مدير أوسمة جوجل (Google Tag Manager):
1. اذهب إلى [Google Tag Manager](https://tagmanager.google.com/).
2. أنشئ حساباً وحاوية جديدة (Web Container).
3. انسخ معرف الحاوية **Container ID** الذي يبدأ بـ `-GTM`.

### ج. مايكروسوفت كلاريتي (Microsoft Clarity):
1. اذهب إلى [Microsoft Clarity Console](https://clarity.microsoft.com/).
2. أنشئ مشروعاً جديداً باسم الموقع.
3. اذهب إلى **Settings** -> **Setup**.
4. انسخ رمز المشروع **Project ID** من رابط لوحة التحكم أو من كود التثبيت.

---

## ٣. كيف يتم تشغيل التتبع في الإنتاج؟ (How to enable Production)

* لا يتم تحميل الأكواد البرمجية لـ GA4 و GTM و Clarity إلا إذا كان متغير البيئة `NODE_ENV === 'production'`.
* إذا لم تكن المعرفات البيئية موجودة، فلن يحدث أي تحميل للأكواد لضمان أفضل أداء للموقع وعدم تلوث البيانات في بيئات التجربة.
* عند تفعيل `NEXT_PUBLIC_ANALYTICS_DEBUG=true`، ستتم طباعة كل حدث يتم إطلاقه في كونسول المتصفح مع علامة صح خضراء `✓ event_name` لرصد صحة البيانات محلياً.

---

## ٤. قائمة الأحداث التي يتم تتبعها (Events List)

تستخدم الأكواد البرمجية نظام تسميات **GA4 standard snake_case**:

| اسم الحدث | نوع التتبع | المتغيرات المرسلة (Metadata) | متى يتم إطلاقه؟ |
| :--- | :--- | :--- | :--- |
| `page_view` | تلقائي | `page`, `locale`, `device_type`, `timestamp` | عند تغيير الصفحة أو تصفح مسار جديد |
| `scroll_depth` | تلقائي (مرة للجلسة) | `scroll_percentage`, `page`, `locale`, `device_type` | عند التمرير لـ 25%، 50%، 75%، 100% |
| `hero_cta_click` | يدوي (أولوية) | `section`, `button_name`, `cta_type`, `page`, `locale` | عند نقر زر "استكشف خدماتنا" في الهيرو |
| `whatsapp_click` | يدوي / تلقائي | `section`, `button_name`, `cta_type`, `page`, `locale` | عند النقر على أي رابط واتساب في الموقع |
| `phone_click` | يدوي / تلقائي | `section`, `button_name`, `cta_type`, `page`, `locale` | عند النقر على روابط الهاتف للاتصال المباشر |
| `email_click` | يدوي / تلقائي | `section`, `button_name`, `cta_type`, `page`, `locale` | عند النقر على روابط البريد الإلكتروني لإرسال إيميل |
| `map_click` | يدوي | `section`, `button_name`, `cta_type`, `page`, `locale` | عند النقر لفتح موقعنا على خرائط جوجل |
| `form_start` | يدوي | `section`, `form_id`, `button_name`, `page`, `locale` | عند بدء تفاعل العميل بالكتابة داخل نموذج الاتصال |
| `form_submit` | يدوي | `section`, `form_id`, `button_name`, `page`, `locale` | عند إرسال طلب التسعير بنجاح وتوجيهه للواتساب |
| `form_error` | يدوي | `section`, `form_id`, `error_message`, `page`, `locale` | عند حدوث خطأ في التحقق من البيانات محلياً أو بالخادم |
| `download_pdf` | يدوي | `section`, `button_name`, `file_name`, `cta_type` | عند إتاحة تحميل أي ملف PDF مستقبلاً |
| `external_link_click` | تلقائي (أمان) | `section`, `button_name`, `target_url`, `cta_type` | عند النقر على أي رابط خارجي يفتح في نافذة جديدة |

---

## ٥. قائمة فحص السيو التقني (SEO Checklist)

الموقع مهيأ برمجياً للسيو بشكل كامل ومتوافق مع محركات البحث:
- [x] **خريطة الموقع (Sitemap.xml):** يتم توليدها ديناميكياً عبر [sitemap.ts](file:///d:/Saas/Sald/artifacts/solid-scrap/src/app/sitemap.ts) لتشمل كافة الأقسام.
- [x] **ملف الروبوتات (Robots.txt):** يتم توليده ديناميكياً عبر [robots.ts](file:///d:/Saas/Sald/artifacts/solid-scrap/src/app/robots.ts) ويشير إلى ملف السitemap.
- [x] **العناوين القانونية (Canonical URLs):** مضافة في ترويسة الصفحة الرئيسية لربطها بالرابط الأصلي تلقائياً.
- [x] **البيانات المهيكلة (JSON-LD Schemas):** تم عزلها داخل [structured-data.ts](file:///d:/Saas/Sald/artifacts/solid-scrap/src/lib/structured-data.ts) وتولد بيانات معيارية لـ:
  - `Website` (تعريف الموقع والاسم البديل).
  - `Organization` (تعريف المؤسسة وشعارها وقنوات التواصل).
  - `LocalBusiness` (موقع الورشة الجغرافي، الإحداثيات، خريطة جوجل وساعات العمل).
- [x] **البطاقات الاجتماعية:** متوافقة مع بروتوكول OpenGraph و Twitter Cards لعرض الصورة والعنوان بشكل فاخر عند مشاركة الرابط.

---

## ٦. خطوات التحقق (Verification Steps)

1. **التحقق من كود التشغيل المحلي:**
   * قم بتفعيل `NEXT_PUBLIC_ANALYTICS_DEBUG=true`.
   * افتح الموقع واضغط `F12` لفتح الكونسول (Console).
   * قم بالنقر على الأزرار، التمرير، أو تعبئة الفورم؛ ستلاحظ ظهور سجل الأحداث باللون الأخضر مثل:
     `✓ form_submit` متبوعاً بكافة تفاصيل الـ Metadata.
2. **التحقق من عدم حدوث أخطاء الـ Build:**
   * قم بتشغيل `pnpm run build` للتأكد من خلو المشروع من أخطاء الـ SSR أو الـ Typescript.

---

## ٧. استكشاف الأخطاء وإصلاحها (Troubleshooting)

* **السؤال: البيانات لا تصل لـ Google Analytics؟**
  * تأكد من إدخال الـ ID بشكل صحيح وبدون فراغات إضافية في ملف الإعدادات `src/config/analytics.ts`.
* **السؤال: أحصل على خطأ EADDRINUSE عند تشغيل السيرفر؟**
  * هذا يعني أن هناك سيرفر قديم يعمل في الخلفية على نفس المنفذ. قم بإيقافه يدوياً أو أعد تشغيل الجهاز.
