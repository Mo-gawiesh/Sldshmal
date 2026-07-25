'use client';

import { useCallback } from 'react';
import { dispatchEventToAnalytics, type EventParams } from '@/lib/analytics';

export function useAnalytics() {
  const track = useCallback((eventName: string, params?: EventParams) => {
    dispatchEventToAnalytics(eventName, params);
  }, []);

  const trackHeroCTA = useCallback(() => {
    track('hero_cta_click', {
      section: 'hero',
      button_name: 'استكشف خدماتنا',
      cta_type: 'scroll_to_section',
    });
  }, [track]);

  const trackWhatsApp = useCallback((section: string, buttonName: string = 'واتساب') => {
    track('whatsapp_click', {
      section,
      button_name: buttonName,
      cta_type: 'whatsapp_redirect',
    });
  }, [track]);

  const trackCall = useCallback((section: string, buttonName: string = 'اتصال هاتف') => {
    track('phone_click', {
      section,
      button_name: buttonName,
      cta_type: 'telephone_call',
    });
  }, [track]);

  const trackEmail = useCallback((section: string, buttonName: string = 'البريد الإلكتروني') => {
    track('email_click', {
      section,
      button_name: buttonName,
      cta_type: 'send_email',
    });
  }, [track]);

  const trackMap = useCallback((section: string = 'contact', buttonName: string = 'فتح الموقع في خرائط جوجل') => {
    track('map_click', {
      section,
      button_name: buttonName,
      cta_type: 'google_maps_redirect',
    });
  }, [track]);

  const trackDownload = useCallback((fileName: string, section: string = 'downloads') => {
    track('download_pdf', {
      section,
      button_name: `تحميل ${fileName}`,
      file_name: fileName,
      cta_type: 'download',
    });
  }, [track]);

  const trackFormStart = useCallback((formId: string = 'pricing_inquiry') => {
    track('form_start', {
      section: 'contact',
      form_id: formId,
      button_name: 'تعبئة النموذج',
    });
  }, [track]);

  const trackFormSubmit = useCallback((formId: string = 'pricing_inquiry') => {
    track('form_submit', {
      section: 'contact',
      form_id: formId,
      button_name: 'إرسال الطلب عبر واتساب',
    });
  }, [track]);

  const trackFormError = useCallback((errorMessage: string, formId: string = 'pricing_inquiry') => {
    track('form_error', {
      section: 'contact',
      form_id: formId,
      error_message: errorMessage,
    });
  }, [track]);

  const trackCustomEvent = useCallback((eventName: string, params?: EventParams) => {
    track(eventName, params);
  }, [track]);

  return {
    track,
    trackHeroCTA,
    trackWhatsApp,
    trackCall,
    trackEmail,
    trackMap,
    trackDownload,
    trackFormStart,
    trackFormSubmit,
    trackFormError,
    trackCustomEvent,
  };
}
