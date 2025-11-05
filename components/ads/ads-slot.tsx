"use client";

import { useEffect, useRef, useState } from "react";
import { hasAdsConsent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface AdsSlotProps {
  slotId: string;
  className?: string;
  format?: "banner" | "rectangle" | "sidebar";
}

export function AdsSlot({ slotId, className, format = "banner" }: AdsSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [hasConsent, setHasConsent] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check for ads consent
    setHasConsent(hasAdsConsent());

    // Listen for consent changes
    const handleConsentChange = () => {
      setHasConsent(hasAdsConsent());
    };

    window.addEventListener("storage", handleConsentChange);
    return () => window.removeEventListener("storage", handleConsentChange);
  }, []);

  useEffect(() => {
    if (!hasConsent || !adRef.current || isLoaded) return;

    // Lazy load ad script
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Here you would load actual ad scripts
          // For now, we'll just show a placeholder
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(adRef.current);

    return () => observer.disconnect();
  }, [hasConsent, isLoaded]);

  if (!hasConsent) {
    return null;
  }

  return (
    <div
      ref={adRef}
      className={cn(
        "rounded-lg border border-dashed border-muted-foreground/20 bg-muted/10 flex items-center justify-center",
        format === "banner" && "h-24 w-full",
        format === "rectangle" && "h-64 w-full",
        format === "sidebar" && "h-96 w-full",
        className
      )}
      data-ad-slot={slotId}
    >
      <p className="text-xs text-muted-foreground">Advertisement</p>
    </div>
  );
}
