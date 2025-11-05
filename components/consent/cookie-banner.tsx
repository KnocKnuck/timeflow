"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { getCookieConsent, setCookieConsent, initGA } from "@/lib/analytics";
import { X } from "lucide-react";

export function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    ads: false,
  });

  useEffect(() => {
    const consent = getCookieConsent();
    if (!consent) {
      setIsOpen(true);
    } else {
      // Initialize analytics if consent was given
      if (consent.analytics && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
        initGA(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allPreferences = {
      essential: true,
      analytics: true,
      ads: true,
    };
    setCookieConsent(allPreferences);
    setIsOpen(false);

    // Initialize analytics
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      initGA(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
    }
  };

  const handleRejectAll = () => {
    const minimalPreferences = {
      essential: true,
      analytics: false,
      ads: false,
    };
    setCookieConsent(minimalPreferences);
    setIsOpen(false);
  };

  const handleSavePreferences = () => {
    setCookieConsent(preferences);
    setIsOpen(false);

    // Initialize analytics if enabled
    if (preferences.analytics && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      initGA(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Cookie Preferences</CardTitle>
              <CardDescription className="mt-2">
                We use cookies to enhance your browsing experience and analyze our traffic.
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRejectAll}
              aria-label="Close and reject all"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showSettings ? (
            <>
              <p className="text-sm text-muted-foreground">
                By clicking "Accept All", you agree to the storing of cookies on your device. You
                can customize your preferences or reject non-essential cookies.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleAcceptAll} className="flex-1">
                  Accept All
                </Button>
                <Button onClick={handleRejectAll} variant="outline" className="flex-1">
                  Reject All
                </Button>
                <Button
                  onClick={() => setShowSettings(true)}
                  variant="outline"
                  className="flex-1"
                >
                  Customize
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                <a href="/legal/privacy" className="underline hover:text-foreground">
                  Privacy Policy
                </a>
              </p>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="essential" className="font-medium">
                      Essential Cookies
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Required for the website to function
                    </p>
                  </div>
                  <Switch id="essential" checked={true} disabled />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="analytics" className="font-medium">
                      Analytics Cookies
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Help us understand how you use our site
                    </p>
                  </div>
                  <Switch
                    id="analytics"
                    checked={preferences.analytics}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, analytics: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ads" className="font-medium">
                      Advertising Cookies
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Used to show relevant advertisements
                    </p>
                  </div>
                  <Switch
                    id="ads"
                    checked={preferences.ads}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, ads: checked })}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSavePreferences} className="flex-1">
                  Save Preferences
                </Button>
                <Button onClick={() => setShowSettings(false)} variant="outline">
                  Back
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
