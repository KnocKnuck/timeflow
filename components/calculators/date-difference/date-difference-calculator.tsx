"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputField } from "../shared/input-field";
import { ResultBox } from "../shared/result-box";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { calculateDateDifference, validateDateRange } from "@/lib/date-difference";
import { trackEvent } from "@/lib/analytics";

export function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [excludeWeekends, setExcludeWeekends] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!startDate || !endDate) {
      setResult(null);
      setError("");
      return;
    }

    const validation = validateDateRange(startDate, endDate);
    if (!validation.valid) {
      setError(validation.error || "Invalid dates");
      setResult(null);
      return;
    }

    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffResult = calculateDateDifference(start, end, excludeWeekends);

      setResult(diffResult);
      setError("");

      trackEvent({
        event: "calc_performed",
        tool_name: "date_difference",
        input_type: excludeWeekends ? "exclude_weekends" : "all_days",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
      setResult(null);
    }
  }, [startDate, endDate, excludeWeekends]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Date Difference Calculator</CardTitle>
          <CardDescription>
            Calculate the difference between two dates in days, weeks, or months
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <InputField
            id="start-date"
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
            type="date"
            helperText="Select the start date"
          />

          <InputField
            id="end-date"
            label="End Date"
            value={endDate}
            onChange={setEndDate}
            type="date"
            error={error}
            helperText="Select the end date"
          />

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <Label htmlFor="exclude-weekends" className="cursor-pointer">
              Show workdays/weekends breakdown
            </Label>
            <Switch
              id="exclude-weekends"
              checked={excludeWeekends}
              onCheckedChange={setExcludeWeekends}
            />
          </div>
        </CardContent>
      </Card>

      {result ? (
        <ResultBox
          title="Time Difference"
          results={[
            {
              label: "Total Days",
              value: `${result.days.toLocaleString()} days`,
              copyable: true,
              highlight: true,
            },
            {
              label: "Weeks",
              value: `${result.weeks} weeks`,
              copyable: false,
            },
            {
              label: "Months",
              value: `~${result.months} months`,
              copyable: false,
            },
            {
              label: "Years",
              value: `~${result.years} years`,
              copyable: false,
            },
            ...(result.workdays > 0
              ? [
                  {
                    label: "Workdays (Mon-Fri)",
                    value: `${result.workdays} days`,
                    copyable: false,
                  },
                  {
                    label: "Weekends",
                    value: `${result.weekends} days`,
                    copyable: false,
                  },
                ]
              : []),
          ]}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Enter both dates to calculate the difference
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
