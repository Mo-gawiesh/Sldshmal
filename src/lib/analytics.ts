// Reusable safe analytics utility

export type EventParams = {
  section?: string;
  button_name?: string;
  cta_type?: string;
  file_name?: string;
  error_message?: string;
  [key: string]: any;
};

// Detect device type safely on the client
export function getDeviceType(): 'desktop' | 'tablet' | 'mobile' {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

// Check if debug mode is active
const isDebugActive = (): boolean => {
  return (
    process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true' ||
    (typeof window !== 'undefined' && localStorage.getItem('analytics_debug') === 'true')
  );
};

// Dispatch a formatted event to GA4, GTM, and print in console if in debug mode
export function dispatchEventToAnalytics(eventName: string, params: EventParams = {}) {
  // Gracefully fail if not running in the browser
  if (typeof window === 'undefined') return;

  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const isDebug = isDebugActive();

    // Auto-inject metadata
    const enrichedParams = {
      page: window.location.pathname + window.location.search,
      locale: document.documentElement.lang || 'ar',
      device_type: getDeviceType(),
      timestamp: new Date().toISOString(),
      ...params,
    };

    // 1. Send to Google Tag Manager (dataLayer push)
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName,
        ...enrichedParams,
      });
    }

    // 3. Send to Microsoft Clarity
    if (typeof window.clarity === 'function') {
      window.clarity('event', eventName, enrichedParams);
    }

    // 4. Debug Mode Logging
    if (isDebug) {
      console.log(`%c✓ ${eventName}`, 'color: #98c25f; font-weight: bold;', enrichedParams);
    }
  } catch (error) {
    // Fail silently in all cases
  }
}
