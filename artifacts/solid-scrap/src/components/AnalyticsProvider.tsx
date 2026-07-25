'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { dispatchEventToAnalytics } from '@/lib/analytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

// Inner navigation tracker wrapped in Suspense to prevent build-time SSR errors
function NavigationTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      const searchStr = searchParams?.toString();
      const fullPath = pathname + (searchStr ? `?${searchStr}` : '');
      
      // Automatic page_view dispatch when path/search changes
      dispatchEventToAnalytics('page_view', {
        page: fullPath,
      });
    } catch (e) {
      // Fail silently
    }
  }, [pathname, searchParams]);

  return null;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  // Environment variables
  const isProduction = process.env.NODE_ENV === 'production';
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  // Single enableAnalytics function (cookie consent ready)
  const enableAnalytics = () => {
    setAnalyticsEnabled(true);
  };

  useEffect(() => {
    enableAnalytics();
  }, []);

  // 1. Scroll depth tracker (25%, 50%, 75%, 100% - once per session)
  useEffect(() => {
    if (!analyticsEnabled) return;

    const handleScroll = () => {
      try {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;

        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        const thresholds = [25, 50, 75, 100];

        thresholds.forEach((threshold) => {
          const sessionKey = `scroll_depth_${threshold}`;
          if (scrollPercent >= threshold && !sessionStorage.getItem(sessionKey)) {
            sessionStorage.setItem(sessionKey, 'true');
            dispatchEventToAnalytics('scroll_depth', {
              scroll_percentage: threshold,
              section: 'page_scroll',
            });
          }
        });
      } catch (e) {
        // Fail silently
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [analyticsEnabled]);

  // 2. Global fallback click listener
  useEffect(() => {
    if (!analyticsEnabled) return;

    const handleGlobalClick = (e: MouseEvent) => {
      try {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a');
        if (!anchor) return;

        // Skip if this link is manually tracked (priority to manual tracking)
        if (anchor.getAttribute('data-tracked') === 'true') {
          return;
        }

        const href = anchor.getAttribute('href') || '';
        const text = anchor.textContent?.trim() || '';

        // Detect and track tel: links
        if (href.startsWith('tel:')) {
          dispatchEventToAnalytics('phone_click', {
            section: 'global_fallback',
            button_name: text || href,
            cta_type: 'telephone_call_fallback',
          });
          return;
        }

        // Detect and track mailto: links
        if (href.startsWith('mailto:')) {
          dispatchEventToAnalytics('email_click', {
            section: 'global_fallback',
            button_name: text || href,
            cta_type: 'send_email_fallback',
          });
          return;
        }

        // Detect and track WhatsApp links
        if (href.includes('wa.me/') || href.includes('api.whatsapp.com/')) {
          dispatchEventToAnalytics('whatsapp_click', {
            section: 'global_fallback',
            button_name: text || 'واتساب',
            cta_type: 'whatsapp_redirect_fallback',
          });
          return;
        }

        // Detect and track target="_blank" (outbound links)
        if (anchor.getAttribute('target') === '_blank') {
          dispatchEventToAnalytics('external_link_click', {
            section: 'global_fallback',
            button_name: text || href,
            target_url: href,
            cta_type: 'external_redirect_fallback',
          });
        }
      } catch (err) {
        // Fail silently
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [analyticsEnabled]);

  return (
    <>
      <Suspense fallback={null}>
        <NavigationTracker />
      </Suspense>

      {/* Initialize third-party scripts ONLY in production when enabled */}
      {isProduction && analyticsEnabled && (
        <>
          {gaId && <GoogleAnalytics gaId={gaId} />}
          {gtmId && <GoogleTagManager gtmId={gtmId} />}
          {clarityId && (
            <Script
              id="microsoft-clarity"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(c,l,a,r,i,t,y){
                      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, "clarity", "script", "${clarityId}");
                `,
              }}
            />
          )}
        </>
      )}

      {children}
    </>
  );
}
