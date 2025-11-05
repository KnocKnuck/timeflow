"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VATCalculationResult } from "@/lib/vat";
import { formatCurrency, CurrencyCode } from "@/lib/currency";
import { Copy, Check, Share2 } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { trackEvent } from "@/lib/analytics";

interface ResultsCardProps {
  result: VATCalculationResult | null;
  currency: CurrencyCode;
}

export function ResultsCard({ result, currency }: ResultsCardProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!result) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Enter an amount to calculate VAT
          </p>
        </CardContent>
      </Card>
    );
  }

  const copyToClipboard = async (value: number, field: string) => {
    const formatted = formatCurrency(value, currency);
    await navigator.clipboard.writeText(formatted);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);

    trackEvent({
      event: "copy_result",
      field,
    });
  };

  const shareCalculation = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("amount", result.netAmount.toString());
    url.searchParams.set("rate", result.vatRate.toString());
    url.searchParams.set("mode", result.mode);
    navigator.clipboard.writeText(url.toString());
    setCopiedField("share");
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <Card className="border-primary/20" role="region" aria-live="polite" aria-label="Calculation results">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Results</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={shareCalculation}
                  aria-label="Share calculation"
                >
                  {copiedField === "share" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Share2 className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {copiedField === "share" ? "Link copied!" : "Share calculation"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Net Amount */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
          <div>
            <p className="text-sm text-muted-foreground">Net Amount</p>
            <p className="text-2xl font-bold">{formatCurrency(result.netAmount, currency)}</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(result.netAmount, "net")}
                  aria-label="Copy net amount"
                >
                  {copiedField === "net" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{copiedField === "net" ? "Copied!" : "Copy"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* VAT Amount */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div>
            <p className="text-sm text-muted-foreground">VAT ({result.vatRate}%)</p>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(result.vatAmount, currency)}
            </p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(result.vatAmount, "vat")}
                  aria-label="Copy VAT amount"
                >
                  {copiedField === "vat" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{copiedField === "vat" ? "Copied!" : "Copy"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Gross Amount */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
          <div>
            <p className="text-sm text-muted-foreground">Gross Amount</p>
            <p className="text-2xl font-bold">{formatCurrency(result.grossAmount, currency)}</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(result.grossAmount, "gross")}
                  aria-label="Copy gross amount"
                >
                  {copiedField === "gross" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{copiedField === "gross" ? "Copied!" : "Copy"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
