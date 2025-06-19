// Google Analytics 4 追跡
export const trackPageView = (title: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: title,
      page_location: window.location.href,
    });
  }
};

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackToolUsage = (toolName: string, data?: Record<string, any>) => {
  trackEvent('tool_usage', {
    tool_name: toolName,
    ...data,
  });
};

// TypeScript用のgtagの型定義
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}