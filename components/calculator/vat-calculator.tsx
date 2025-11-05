"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AmountInput } from "./amount-input";
import { CountrySelect } from "./country-select";
import { RateSelect } from "./rate-select";
import { ModeToggle } from "./mode-toggle";
import { ResultsCard } from "./results-card";
import { calculateVAT, validateAmount, VATMode, VATCalculationResult } from "@/lib/vat";
import { CurrencyCode, SUPPORTED_CURRENCIES } from "@/lib/currency";
import vatRatesData from "@/data/vat-rates.json";
import { trackEvent } from "@/lib/analytics";
import { useSearchParams } from "next/navigation";

export function VATCalculator() {
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<VATMode>("net-to-gross");
  const [amount, setAmount] = useState("");
  const [country, setCountry] = useState("FR");
  const [vatRate, setVatRate] = useState(20);
  const [currency, setCurrency] = useState<CurrencyCode>("EUR");
  const [error, setError] = useState("");
  const [result, setResult] = useState<VATCalculationResult | null>(null);

  // Get available rates for selected country
  const availableRates = useMemo(() => {
    const countryData = vatRatesData.countries.find((c) => c.countryCode === country);
    if (!countryData) return [20];
    return [countryData.standardRate, ...countryData.reducedRates].sort((a, b) => b - a);
  }, [country]);

  // Update VAT rate when country changes
  useEffect(() => {
    const countryData = vatRatesData.countries.find((c) => c.countryCode === country);
    if (countryData) {
      setVatRate(countryData.standardRate);
    }
  }, [country]);

  // Load from URL params if present
  useEffect(() => {
    const urlAmount = searchParams.get("amount");
    const urlRate = searchParams.get("rate");
    const urlMode = searchParams.get("mode");

    if (urlAmount) setAmount(urlAmount);
    if (urlRate) setVatRate(parseFloat(urlRate));
    if (urlMode && (urlMode === "net-to-gross" || urlMode === "gross-to-net")) {
      setMode(urlMode);
    }
  }, [searchParams]);

  // Calculate VAT whenever inputs change
  useEffect(() => {
    if (!amount) {
      setResult(null);
      setError("");
      return;
    }

    const validation = validateAmount(amount);
    if (!validation.valid) {
      setError(validation.error || "Invalid amount");
      setResult(null);
      return;
    }

    setError("");

    try {
      const calculationResult = calculateVAT({
        amount: parseFloat(amount),
        vatRate,
        mode,
      });

      setResult(calculationResult);

      // Track calculation event
      trackEvent({
        event: "calc_performed",
        country,
        rate: vatRate,
        mode,
        amount: parseFloat(amount),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
      setResult(null);
    }
  }, [amount, vatRate, mode, country]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Input Card */}
      <Card>
        <CardHeader>
          <CardTitle>VAT Calculator</CardTitle>
          <CardDescription>
            Calculate VAT for any amount with EU country-specific rates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mode Toggle */}
          <ModeToggle value={mode} onChange={setMode} />

          {/* Amount Input */}
          <AmountInput
            id="amount-input"
            value={amount}
            onChange={setAmount}
            label={mode === "net-to-gross" ? "Net Amount" : "Gross Amount (incl. VAT)"}
            error={error}
            placeholder="1000.00"
          />

          {/* Country Select */}
          <CountrySelect id="country-select" value={country} onChange={setCountry} />

          {/* VAT Rate */}
          <RateSelect
            id="rate-select"
            value={vatRate}
            onChange={setVatRate}
            availableRates={availableRates}
          />

          {/* Currency */}
          <div className="space-y-2">
            <Label htmlFor="currency-select">Currency</Label>
            <Select value={currency} onValueChange={(val) => setCurrency(val as CurrencyCode)}>
              <SelectTrigger id="currency-select" aria-label="Select currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_CURRENCIES.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code}>
                    {curr.code} ({curr.symbol}) - {curr.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Card */}
      <ResultsCard result={result} currency={currency} />
    </div>
  );
}
