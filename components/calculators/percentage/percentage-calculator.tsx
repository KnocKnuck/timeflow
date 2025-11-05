"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputField } from "../shared/input-field";
import { ResultBox } from "../shared/result-box";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculatePercentage, PercentageMode } from "@/lib/percentage";
import { trackEvent } from "@/lib/analytics";

const modes = [
  { value: "percent-of", label: "% of", description: "What is X% of Y?" },
  { value: "is-what-percent", label: "Is What %", description: "X is what % of Y?" },
  { value: "percent-change", label: "% Change", description: "% change from X to Y" },
  { value: "increase-by", label: "Increase", description: "Increase X by Y%" },
  { value: "decrease-by", label: "Decrease", description: "Decrease X by Y%" },
] as const;

export function PercentageCalculator() {
  const [mode, setMode] = useState<PercentageMode>("percent-of");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!value1 || !value2) {
      setResult(null);
      setError("");
      return;
    }

    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (isNaN(num1) || isNaN(num2)) {
      setError("Please enter valid numbers");
      setResult(null);
      return;
    }

    try {
      const calcResult = calculatePercentage({
        value1: num1,
        value2: num2,
        mode,
      });

      setResult(calcResult);
      setError("");

      trackEvent({
        event: "calc_performed",
        tool_name: "percentage",
        input_type: mode,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
      setResult(null);
    }
  }, [value1, value2, mode]);

  const getLabels = () => {
    switch (mode) {
      case "percent-of":
        return { label1: "Percentage (%)", label2: "Value", placeholder1: "15", placeholder2: "200" };
      case "is-what-percent":
        return { label1: "Value", label2: "Total", placeholder1: "25", placeholder2: "200" };
      case "percent-change":
        return { label1: "Old Value", label2: "New Value", placeholder1: "100", placeholder2: "150" };
      case "increase-by":
        return { label1: "Value", label2: "Percentage (%)", placeholder1: "200", placeholder2: "15" };
      case "decrease-by":
        return { label1: "Value", label2: "Percentage (%)", placeholder1: "200", placeholder2: "15" };
    }
  };

  const labels = getLabels();
  const currentMode = modes.find((m) => m.value === mode);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Percentage Calculator</CardTitle>
          <CardDescription>
            Calculate percentages, increases, decreases, and percent differences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Calculation Type</label>
            <Tabs value={mode} onValueChange={(val) => setMode(val as PercentageMode)}>
              <TabsList className="grid w-full grid-cols-3 h-auto">
                {modes.slice(0, 3).map((m) => (
                  <TabsTrigger key={m.value} value={m.value} className="text-xs py-2">
                    {m.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsList className="grid w-full grid-cols-2 h-auto mt-2">
                {modes.slice(3).map((m) => (
                  <TabsTrigger key={m.value} value={m.value} className="text-xs py-2">
                    {m.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <p className="text-xs text-muted-foreground">{currentMode?.description}</p>
          </div>

          <InputField
            id="value1"
            label={labels.label1}
            value={value1}
            onChange={setValue1}
            type="number"
            placeholder={labels.placeholder1}
            helperText={`Example: ${labels.placeholder1}`}
          />

          <InputField
            id="value2"
            label={labels.label2}
            value={value2}
            onChange={setValue2}
            type="number"
            placeholder={labels.placeholder2}
            helperText={`Example: ${labels.placeholder2}`}
            error={error}
          />
        </CardContent>
      </Card>

      {result ? (
        <ResultBox
          title="Result"
          results={[
            {
              label: "Answer",
              value: result.result,
              copyable: true,
              highlight: true,
            },
            {
              label: "Formula",
              value: result.formula,
              copyable: false,
            },
          ]}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Enter values to calculate
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
