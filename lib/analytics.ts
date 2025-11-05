/**
 * Analytics utilities for tracking events
 */

export type AnalyticsEvent =
  | {
      event: "calc_performed";
      country: string;
      rate: number;
      mode: string;
      amount: number;
    }
  | {
      event: "copy_result";
      field: string;
    }
  | {
      event: "cta_click";
      location: string;
      label: string;
    }
  | {
      event: "affiliate_click";
      partner_id: string;
    }
  | {
      event: "ad_impression";
      slot_id: string;
    }
  | {
      event: "ad_click";
      slot_id: string;
    }
  | {
      event: "consent_given";
      categories: string[];
    };

declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
    plausible?: (event: string, options?: any) => void;
  }
}

/**
 * Track an analytics event
 */
export function trackEvent(eventData: AnalyticsEvent): void {
  // Only track if user has given consent
  if (typeof window === "undefined" || !hasAnalyticsConsent()) {
    return;
  }

  // Google Analytics 4
  if (window.gtag) {
    const { event, ...params } = eventData;
    window.gtag("event", event, params);
  }

  // Plausible Analytics
  if (window.plausible) {
    window.plausible(eventData.event, { props: eventData });
  }

  // Console log in development
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", eventData);
  }
}

/**
 * Check if user has given analytics consent
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) return false;

    const { analytics } = JSON.parse(consent);
    return analytics === true;
  } catch {
    return false;
  }
}

/**
 * Check if user has given ads consent
 */
export function hasAdsConsent(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) return false;

    const { ads } = JSON.parse(consent);
    return ads === true;
  } catch {
    return false;
  }
}

/**
 * Set cookie consent preferences
 */
export function setCookieConsent(preferences: {
  essential: boolean;
  analytics: boolean;
  ads: boolean;
}): void {
  if (typeof window === "undefined") return;

  localStorage.setItem("cookie-consent", JSON.stringify(preferences));

  // Track consent event
  trackEvent({
    event: "consent_given",
    categories: Object.entries(preferences)
      .filter(([_, value]) => value)
      .map(([key]) => key),
  });
}

/**
 * Get current consent preferences
 */
export function getCookieConsent(): {
  essential: boolean;
  analytics: boolean;
  ads: boolean;
} | null {
  if (typeof window === "undefined") return null;

  try {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) return null;

    return JSON.parse(consent);
  } catch {
    return null;
  }
}

/**
 * Initialize Google Analytics
 */
export function initGA(measurementId: string): void {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;

  // Add GA script
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer?.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    anonymize_ip: true,
    cookie_flags: "SameSite=None;Secure",
  });
}
