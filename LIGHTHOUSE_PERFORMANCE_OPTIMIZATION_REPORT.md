# SOLID SCRAP OF THE NORTH
# LIGHTHOUSE PERFORMANCE OPTIMIZATION REPORT

This report provides a detailed performance audit, Largest Contentful Paint (LCP) root cause investigation, hydration cost analysis, and bundle optimization strategy for the **Solid Scrap Of The North** Next.js 15 application.

---

## 1. Executive Summary
Following the Vite to Next.js 15 migration, the site is visually complete and under strict **Design Freeze**. The goal of this phase is to elevate the Mobile Lighthouse Performance score from **~65 to 90+** and Desktop Performance from **~92 to 95+**, while achieving **100** on Accessibility, Best Practices, and SEO.

---

## 2. JavaScript Bundle Audit

### Current Production Bundle Status (Analyzed via `next build`):
* **First Load JS shared by all**: **102 kB** (React, React-DOM, Next.js framework)
* **Landing Page (`/`) JS size**: **151 kB** (First Load JS total: **253 kB**)
* **Analysis**:
  * The main bundle is relatively lightweight.
  * **Recharts** is currently a devDependency and is configured inside a Shadcn chart component (`chart.tsx`), but because it is not imported anywhere in the landing page, it is successfully **tree-shaken** and does not add to the client bundle.
  * The primary weight in the 151 kB page JS comes from **Framer Motion**, **Lucide Icons** (which are fully imported), and the massive inline code structure of `home.tsx` where all page sections are loaded statically at startup.

### Bundle & Hydration Reduction Strategy:
Each below-the-fold component has been analyzed individually to determine its ideal rendering pattern (Server vs. Client vs. Dynamic Client), optimizing for both performance and SEO.

| Component | Selected For Dynamic? | SSR Enabled? | Expected Lighthouse Gain | SEO Impact | Risk Level |
|---|---|---|---|---|---|
| **Google Maps** (`GoogleMaps.tsx`) | **Yes** | **No (`ssr: false`)** | +5 Performance points | None (Map iframe has no indexed text) | Low |
| **Contact Form** (`ContactForm.tsx`) | **Yes** | **Yes (`ssr: true`)** | +8 Performance points | None (Form inputs are indexed but not content-heavy) | Low |
| **FAQ Section** (`FAQSection.tsx`) | **Yes** | **Yes (`ssr: true`)** | +3 Performance points | Preserves critical SEO text crawling for FAQs | Low |
| **Coverage Section** (`CoverageSection.tsx`) | **Yes** | **Yes (`ssr: true`)** | +2 Performance points | Preserves local SEO (Tabuk, Dhiba, etc. keywords) | Low |
| **Scrap Guide** (`ScrapGuide.tsx`) | **Yes** | **Yes (`ssr: true`)** | +3 Performance points | Preserves metal-specific descriptive text for SEO | Low |
| **WhatsApp Floating** (`WhatsAppFloating.tsx`) | **Yes** | **No (`ssr: false`)** | +2 Performance points | None (Utility widget) | Low |
| **Back To Top** (`BackToTop.tsx`) | **Yes** | **No (`ssr: false`)** | +1 Performance point | None (Utility widget) | Low |

---

## 3. Largest Contentful Paint (LCP) Root Cause Investigation

### The LCP Element:
The actual LCP element on both Desktop and Mobile is the **Hero Section background image (`hero.webp`)**.
* **DOM Element**: `div#home > div > div > img` (currently compiled as `img` inside `motion.div`).
* **Size**: 100% of the viewport height and width.

### Current Loading Behavior & Bottlenecks:
1. **Unoptimized `<img />` tag**: The image is currently loaded using a standard `<img>` tag with `src={(heroImg as any).src || heroImg}`. It does not load responsive sizes, meaning mobile users download the full desktop-size WebP/JPG image.
2. **Missing Preload Headers**: The browser only discovers the image after parsing the JSX and layout structure, delaying the start of the image download.
3. **Render-Blocking Web Font**: The font `'Alexandria'` is loaded via external Google Fonts `<link>` tag. The browser delays painting the text on top of the LCP image until the font files are fetched, dragging down the overall LCP paint metric.

### Recommended Optimization:
* Convert the LCP background image to Next.js **`<Image>`** component with **`priority={true}`**, **`fetchPriority="high"`**, and **`fill`**.
* Configure the `sizes` attribute to **`100vw`**.
* Convert Google Font loading to Next.js **`next/font/google`** to self-host and preload the web font automatically.

---

## 4. Client/Server Component & Hydration Audit

* **Page-Level Architecture**:
  * Currently, the root of the App Router `page.tsx` is marked with `"use client";` because it wraps the page in `QueryClientProvider` and `TooltipProvider`. This causes the entire page tree (`HomePage` and all its sections) to undergo client-side hydration.
  * **Hydration Cost**: Hydrating all 10 sections of `home.tsx` on first load consumes significant CPU cycles on low-end mobile devices, blocking the main thread and increasing **Interaction to Next Paint (INP)**.
  
* **Optimized Architecture**:
  * By dynamically importing below-the-fold client components with `{ ssr: true }` where possible, we **defer their hydration** until after the initial paint while keeping all text indexing active.
  * The Hero, Navbar, About, and Services sections remain static on initial load, ensuring immediate paint and zero hydration delays for critical above-the-fold content.

---

## 5. Estimated Performance Impact

| Metric | Before (Mobile) | Target (Mobile) | Improvement Detail |
|---|---|---|---|
| **LCP (Largest Contentful Paint)** | ~3.4s | **<2.2s** | Native `<Image priority>`, `next/font` preloading. |
| **CLS (Cumulative Layout Shift)** | 0.08 | **<0.01** | Standardizing image aspect ratios and Next.js font display swap. |
| **TBT (Total Blocking Time)** | ~450ms | **<100ms** | Deferring hydration of below-the-fold sections. |
| **Lighthouse Score** | **~65** | **90+** | Overall performance score. |
| **Lighthouse Score (Desktop)** | **~92** | **95+** | High-end desktop performance. |
| **Accessibility** | **91** | **100** | Adding missing `aria-labels` to mobile button elements. |
| **Best Practices** | **96** | **100** | Resolving hydration console warnings and using next/image. |
| **SEO** | **100** | **100** | Preserving meta tags and semantic headers. |
