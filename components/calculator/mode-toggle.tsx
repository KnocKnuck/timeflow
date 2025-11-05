"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VATMode } from "@/lib/vat";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface ModeToggleProps {
  value: VATMode;
  onChange: (value: VATMode) => void;
}

export function ModeToggle({ value, onChange }: ModeToggleProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Calculation Mode</label>
      <Tabs value={value} onValueChange={(val) => onChange(val as VATMode)} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="net-to-gross" className="gap-2">
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            Add VAT
          </TabsTrigger>
          <TabsTrigger value="gross-to-net" className="gap-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Remove VAT
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <p className="text-xs text-muted-foreground">
        {value === "net-to-gross"
          ? "Calculate gross amount from net amount"
          : "Calculate net amount from gross amount"}
      </p>
    </div>
  );
}
