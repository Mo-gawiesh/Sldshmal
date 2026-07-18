# 🇸🇦 مؤسسة صلد الشمال لشراء وتدوير المعادن والخردة
## Solid Scrap Of The North — Official Corporate Website

[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployment_Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

موقع تعريفي مؤسسي تفاعلي ذو طابع صناعي فاخر لمؤسسة **صلد الشمال لشراء المعادن والخردة** ومقرها تبوك، المملكة العربية السعودية. تم بناء الموقع بالكامل ليتوافق مع أحدث معايير الأداء وتجربة المستخدم السلسة وسهولة الوصول، وبما يتماشى فخرًا مع مستهدفات **رؤية المملكة ٢٠٣٠** للاستدامة والاقتصاد الدائري.

---

## 🛠️ البنية التقنية (Technology Stack)

* **المكتبة الأساسية (Core Library):** [React 19](https://react.dev) (بصياغة مكونات وظيفية نظيفة).
* **أداة البناء (Build Tool):** [Vite 7](https://vite.dev) (تجميع فائق السرعة).
* **لغة البرمجة:** [TypeScript](https://www.typescriptlang.org) (أنماط بيانات صارمة وآمنة).
* **إطار عمل التنسيق (Styling):** [Tailwind CSS v4](https://tailwindcss.com) (تنسيق مخصص بالكامل وتوافق RTL).
* **المكتبات الحركية (Animations):** [Framer Motion](https://www.framer.com/motion) (تأثيرات ظهور حركية راقية وانسيابية).
* **التحقق وإدارة النماذج (Forms):** [React Hook Form](https://react-hook-form.com) بالتعاون مع [Zod Validation](https://zod.dev).
* **نظام التوجيه (Routing):** [Wouter](https://github.com/molecula-db/wouter) (موجّه خفيف الحجم).

---

## ✨ المميزات الرئيسية للمشروع (Key Features)

1. **تصميم صناعي فاخر (Premium Industrial UI):** تباينات لونية مستوحاة من البيئة المعدنية وإعادة التدوير (الأخضر العشبي والأخضر الداكن مع النحاسي الفاتح الدافئ).
2. **شريط أسعار استرشادية دائري (Live-like Informational Ticker):** شريط متحرك يعرض تحديثات حول عوامل تسعير خردة المعادن بطريقة تفاعلية سلسة ومستمرة.
3. **نموذج تواصل مرن ومتطور (Flexible Contact Form):**
   * يدعم أرقام الهواتف المحلية والدولية (بدون قيود على الأكواد وبحد أدنى 7 أرقام).
   * حقول البريد الإلكتروني والمدينة وتفاصيل الطلب أصبحت حقولاً اختيارية لتسهيل الإرسال على العملاء.
   * إتاحة رفع وتجهيز صور الخردة مع توجيه العميل لإرفاقها يدوياً في الواتساب لضمان الخصوصية وسرعة التقييم.
4. **توجيه أحادي الصفحة (One-Page Routing Flow):** الانتقال التلقائي للقسم المطلوب والتمرير السلس حتى لو تم استدعاء الرابط مباشرة من شريط العنوان.
5. **أداء خارق (Performance Optimized):** ضغط كافة الصور الفوتوغرافية وتحويلها لصيغة **WebP** خفيفة جداً، محققةً انخفاضاً هائلاً في حجم التحميل بنسبة **٧٨.٣٪** (إجمالي مساحة المجلد ١.٩ ميجابايت بدلاً من ٨.٨ ميجابايت).
6. **شاشة افتتاحية متحركة (Recycle Pre-loader Screen):** شاشة انتظار متألقة بشعار إعادة التدوير الدوار تمنح الموقع وقاراً واحترافية عالية عند التحميل الأول.

---

## 📦 هيكل المجلدات الرئيسي (Project Structure)

```text
Sald/                       # المجلد الرئيسي للمشروع (pnpm monorepo)
├── artifacts/
│   └── solid-scrap/        # كود تطبيق الويب الرئيسي (Vite React Client)
│       ├── public/         # الأصول الثابتة (أيقونة التبويب، robots.txt)
│       ├── src/
│       │   ├── components/ # المكونات التفاعلية (Form, Navbar, Float CTA)
│       │   ├── hooks/      # الخطافات المخصصة للتحقق وتجاوب الجوال
│       │   ├── lib/        # أدوات المساعدة والدمج (utils)
│       │   ├── pages/
│       │   │   ├── home.tsx      # الواجهة الرئيسية الشاملة للموقع
│       │   │   └── not-found.tsx # صفحة الخطأ 404
│       │   ├── App.tsx     # إعدادات المسارات والتوجيه
│       │   └── main.tsx    # نقطة التشغيل الرئيسية
│       ├── vite.config.ts  # إعدادات البناء والمنافذ (مهيأ لـ Vercel)
│       └── package.json    # إعدادات الحزم الفرعية للمشروع
├── attached_assets/        # مجلد الصور الفوتوغرافية والأصول المرجعية
│   └── generated_images/   # النسخ المحسنة بصيغة WebP
├── pnpm-workspace.yaml     # إعداد مساحات العمل
└── package.json            # إعدادات الاعتمادات الرئيسية
```

---

## 💻 التشغيل والتطوير المحلي (Local Development)

لتهيئة بيئة العمل وتشغيل الموقع محلياً:

1. **تثبيت الحزم (Install dependencies):**
   ```bash
   pnpm install
   ```
2. **تشغيل خادم التطوير المحلي (Start dev server):**
   ```bash
   pnpm --filter @workspace/solid-scrap run dev
   ```
   *سيقوم الخادم بالتشغيل تلقائياً على المنفذ الافتراضي `http://localhost:5173`.*

3. **اختبار البناء الفني (Test build locally):**
   ```bash
   pnpm --filter @workspace/solid-scrap run build
   ```

---

## 🚀 النشر على منصة فيرسل (Deploying on Vercel)

الموقع مهيأ بالكامل للنشر الفوري على منصة **Vercel** بضغطة زر واحدة. اتبع الإعدادات التالية عند ربط المستودع في لوحة تحكم Vercel:

1. **إعداد المجلد الرئيسي (Root Directory):**
   * اضبط قيمة الـ **Root Directory** على: `artifacts/solid-scrap`
2. **إطار العمل الافتراضي (Framework Preset):**
   * اختر **Next.js** (سيتم التعرف عليه تلقائياً).
3. **أوامر البناء والتثبيت (Build and Install Commands):**
   * **Build Command:** `next build`
   * **Output Directory:** `.next` (الافتراضي لـ Next.js)
   * **Install Command:** `pnpm install`
4. **متغيرات البيئة (Environment Variables):**
   * **لا يتطلب الموقع أي متغيرات بيئة إجبارية**. Next.js سيتعرف تلقائياً على إعدادات Vercel ويبني الموقع بنجاح.

---

## 🇸🇦 رؤية ٢٠٣٠ والاستدامة
تلتزم مؤسسة صلد الشمال بدعم المبادرات البيئية الوطنية من خلال تحسين عمليات جمع وفرز وتدوير الخردة والمعادن، للإسهام بفاعلية في تقليل الانبعاثات الكربونية وبناء اقتصاد دائري مستدام يحافظ على الموارد الطبيعية للمملكة العربية السعودية للأجيال القادمة.