"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { InputField } from "../shared/input-field";
import { ResultBox } from "../shared/result-box";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { convertCurrency, getAvailableCurrencies } from "@/lib/currency-converter";
import { trackEvent } from "@/lib/analytics";

export function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const currencies = getAvailableCurrencies();

  useEffect(() => {
    if (!amount) {
      setResult(null);
      setError("");
      return;
    }

    const num = parseFloat(amount);
    if (isNaN(num) || num < 0) {
      setError("Please enter a valid positive number");
      setResult(null);
      return;
    }

    try {
      const conversionResult = convertCurrency(num, fromCurrency, toCurrency);
      setResult(conversionResult);
      setError("");

      trackEvent({
        event: "calc_performed",
        tool_name: "currency",
        input_type: `${fromCurrency}_to_${toCurrency}`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion error");
      setResult(null);
    }
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Currency Converter</CardTitle>
          <CardDescription>
            Convert between 150+ world currencies with up-to-date exchange rates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <InputField
            id="amount"
            label="Amount"
            value={amount}
            onChange={setAmount}
            type="number"
            placeholder="100"
            helperText="Enter the amount to convert"
            error={error}
          />

          <div className="space-y-2">
            <Label htmlFor="from-currency">From Currency</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger id="from-currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={swapCurrencies}
              aria-label="Swap currencies"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to-currency">To Currency</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger id="to-currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {result ? (
        <div className="space-y-6">
          <ResultBox
            title="Converted Amount"
            results={[
              {
                label: `${result.amount} ${result.fromCurrency} =`,
                value: `${result.convertedAmount.toLocaleString()} ${result.toCurrency}`,
                copyable: true,
                highlight: true,
              },
              {
                label: "Exchange Rate",
                value: `1 ${result.fromCurrency} = ${result.rate} ${result.toCurrency}`,
                copyable: false,
              },
              {
                label: "Inverse Rate",
                value: `1 ${result.toCurrency} = ${result.inverseRate} ${result.fromCurrency}`,
                copyable: false,
              },
            ]}
          />

          <Card>
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground text-center">
                <strong>Disclaimer:</strong> Rates updated {result.lastUpdated}. For official rates, check with your bank or financial institution. Actual rates may vary.
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Enter an amount to convert
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
