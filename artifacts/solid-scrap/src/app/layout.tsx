import type { Metadata } from 'next';
import { Alexandria } from 'next/font/google';
import './globals.css';

const alexandria = Alexandria({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--font-alexandria',
  display: 'optional',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://solid-scrap.com'),
  title: 'مؤسسة صلد الشمال لشراء الخردة والمعادن | Solid Scrap Of The North',
  description: 'مؤسسة صلد الشمال لشراء جميع أنواع الخردة والمعادن، الجمع، النقل، والفرز في المملكة العربية السعودية. حلول متكاملة للمخلفات الصناعية والورش والمصانع.',
  keywords: 'صلد الشمال, شراء خردة, سكراب تبوك, إعادة تدوير المعادن, شراء معادن السعودية, مخلفات صناعية',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://solid-scrap.com/',
    title: 'مؤسسة صلد الشمال لشراء الخردة والمعادن | Solid Scrap Of The North',
    description: 'شراء، نقل، فرز، وإعادة تدوير المعادن والخردة بأسلوب ميداني احترافي متوافق مع رؤية السعودية 2030.',
    images: '/attached_assets/generated_images/hero.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'مؤسسة صلد الشمال لشراء الخردة والمعادن',
    description: 'حلول شراء ونقل وتدوير السكراب والمعادن في المملكة العربية السعودية.',
    images: '/attached_assets/generated_images/hero.jpg',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "مؤسسة صلد الشمال لشراء الخردة والمعادن",
  "alternateName": "Solid Scrap Of The North",
  "description": "مؤسسة سعودية متخصصة في شراء المعادن والخردة، وجمعها، وفرزها، وإعادة تدويرها.",
  "url": "https://solid-scrap.com/",
  "logo": "https://solid-scrap.com/attached_assets/Logo_1_png_1784267438904.png",
  "image": "https://solid-scrap.com/attached_assets/generated_images/hero.jpg",
  "telephone": "+966543019329",
  "email": "Sldalshmal@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "المنطقة الصناعية",
    "addressLocality": "تبوك",
    "addressCountry": "SA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "28.5595749",
    "longitude": "36.6860525"
  },
  "hasMap": "https://maps.app.goo.gl/RwZqwLyBnBpYRP7S6",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
              document.addEventListener('keydown', function(e) {
                if (
                  e.key === 'F12' ||
                  (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.key === 'K')) ||
                  (e.ctrlKey && e.key === 'u')
                ) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              });
            `
          }}
        />
      </head>
      <body className={`${alexandria.variable} antialiased min-h-screen bg-[#111612] text-[#f4ecdf] font-sans selection:bg-[#98c25f] selection:text-[#101610]`}>
        {children}
      </body>
    </html>
  );
}
