"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputField } from "../shared/input-field";
import { ResultBox } from "../shared/result-box";
import { calculateAge, validateBirthDate } from "@/lib/age";
import { trackEvent } from "@/lib/analytics";

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  // Set a default example date (30 years ago)
  useEffect(() => {
    const thirtyYearsAgo = new Date();
    thirtyYearsAgo.setFullYear(thirtyYearsAgo.getFullYear() - 30);
    const formatted = thirtyYearsAgo.toISOString().split("T")[0];
    // Don't auto-fill, just use as placeholder
  }, []);

  useEffect(() => {
    if (!birthDate) {
      setResult(null);
      setError("");
      return;
    }

    const validation = validateBirthDate(birthDate);
    if (!validation.valid) {
      setError(validation.error || "Invalid date");
      setResult(null);
      return;
    }

    try {
      const date = new Date(birthDate);
      const ageResult = calculateAge(date);

      setResult(ageResult);
      setError("");

      trackEvent({
        event: "calc_performed",
        tool_name: "age",
        input_type: "date_of_birth",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
      setResult(null);
    }
  }, [birthDate]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get max date (today)
  const maxDate = new Date().toISOString().split("T")[0];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Age Calculator</CardTitle>
          <CardDescription>
            Enter your date of birth to calculate your exact age
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <InputField
            id="birth-date"
            label="Date of Birth"
            value={birthDate}
            onChange={setBirthDate}
            type="date"
            error={error}
            helperText="Select your birth date from the calendar"
            required
            max={maxDate}
          />

          <div className="p-4 rounded-lg bg-muted/50 text-sm">
            <p className="font-medium mb-2">How to use:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>1. Click the date field to open the calendar picker</li>
              <li>2. Select your birth date</li>
              <li>3. Your age will be calculated instantly</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {result ? (
        <div className="space-y-6">
          <ResultBox
            title="Your Age"
            results={[
              {
                label: "Age",
                value: `${result.years} years, ${result.months} months, ${result.days} days`,
                copyable: true,
                highlight: true,
              },
              {
                label: "Total Days",
                value: `${result.totalDays.toLocaleString()} days`,
                copyable: false,
              },
              {
                label: "Total Months",
                value: `${result.totalMonths} months`,
                copyable: false,
              },
            ]}
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Next Birthday</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">
                {formatDate(result.nextBirthday)}
              </p>
              <p className="text-2xl font-bold text-primary">
                {result.daysUntilBirthday} days to go
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
              Enter your birth date to see your age
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
