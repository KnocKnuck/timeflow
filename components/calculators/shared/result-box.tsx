"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";

interface ResultItem {
  label: string;
  value: string | number;
  copyable?: boolean;
  highlight?: boolean;
}

interface ResultBoxProps {
  title?: string;
  results: ResultItem[];
  className?: string;
}

export function ResultBox({ title = "Result", results, className }: ResultBoxProps) {
  return (
    <Card className={cn("border-primary/20", className)} role="region" aria-live="polite">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {results.map((result, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-between p-4 rounded-lg",
              result.highlight
                ? "bg-primary/5 border border-primary/20"
                : "bg-muted/50"
            )}
          >
            <div>
              <p className="text-sm text-muted-foreground">{result.label}</p>
              <p
                className={cn(
                  "text-2xl font-bold",
                  result.highlight && "text-primary"
                )}
              >
                {result.value}
              </p>
            </div>
            {result.copyable && (
              <CopyButton value={String(result.value)} field={result.label} />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
