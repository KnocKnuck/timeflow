"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface AffiliateCardProps {
  partnerId: string;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  logo?: string;
}

export function AffiliateCard({
  partnerId,
  title,
  description,
  ctaText,
  ctaUrl,
  logo,
}: AffiliateCardProps) {
  const handleClick = () => {
    trackEvent({
      event: "affiliate_click",
      partner_id: partnerId,
    });
  };

  // Add UTM parameters to affiliate URL
  const affiliateUrl = new URL(ctaUrl);
  affiliateUrl.searchParams.set("utm_source", "taxflow");
  affiliateUrl.searchParams.set("utm_medium", "affiliate");
  affiliateUrl.searchParams.set("utm_campaign", partnerId);

  return (
    <Card className="border-primary/20">
      <CardHeader>
        {logo && (
          <div className="mb-2 h-8">
            <img src={logo} alt={`${title} logo`} className="h-full object-contain" />
          </div>
        )}
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          asChild
          className="w-full"
          onClick={handleClick}
          data-affiliate-partner={partnerId}
        >
          <a
            href={affiliateUrl.toString()}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="gap-2"
          >
            {ctaText}
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Sponsored · We may earn a commission
        </p>
      </CardContent>
    </Card>
  );
}
