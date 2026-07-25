import type { Metadata } from 'next';
import { Alexandria } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/config/site';
import { getStructuredData } from '@/lib/structured-data';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';

const alexandria = Alexandria({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--font-alexandria',
  display: 'optional',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} | ${siteConfig.alternateName}`,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  robots: 'index, follow',
  alternates: {
    canonical: `${siteConfig.url}/`,
  },
  openGraph: {
    type: 'website',
    url: `${siteConfig.url}/`,
    title: `${siteConfig.name} | ${siteConfig.alternateName}`,
    description: siteConfig.description,
    images: siteConfig.ogImage,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: siteConfig.ogImage,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdList = getStructuredData();

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {jsonLdList.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
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
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
