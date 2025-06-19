// Google Analytics 4 トラッキング
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      ...parameters,
      timestamp: new Date().toISOString(),
    });
  }
};

export const trackToolUsage = (toolName: string, success: boolean = true) => {
  trackEvent("tool_usage", {
    tool_name: toolName,
    success: success,
  });
};

export const trackPageView = (pageName: string) => {
  trackEvent("page_view", {
    page_title: pageName,
  });
};

// AdSense収益最適化のためのクリック追跡
export const trackAdInteraction = (adUnit: string, action: string) => {
  trackEvent("ad_interaction", {
    ad_unit: adUnit,
    action: action,
  });
};
