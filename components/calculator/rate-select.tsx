"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface RateSelectProps {
  value: number;
  onChange: (value: number) => void;
  availableRates: number[];
  id: string;
}

export function RateSelect({ value, onChange, availableRates, id }: RateSelectProps) {
  const [customMode, setCustomMode] = useState(false);

  const handleSelectChange = (val: string) => {
    if (val === "custom") {
      setCustomMode(true);
    } else {
      setCustomMode(false);
      onChange(parseFloat(val));
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>VAT Rate (%)</Label>
      {!customMode ? (
        <Select value={value.toString()} onValueChange={handleSelectChange}>
          <SelectTrigger id={id} aria-label="Select VAT rate">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableRates.map((rate) => (
              <SelectItem key={rate} value={rate.toString()}>
                {rate}%
              </SelectItem>
            ))}
            <SelectItem value="custom">Custom rate...</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <div className="flex gap-2">
          <Input
            type="number"
            step="0.1"
            min="0"
            max="100"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            placeholder="Enter custom rate"
            aria-label="Custom VAT rate"
          />
          <button
            type="button"
            onClick={() => setCustomMode(false)}
            className="text-sm text-muted-foreground hover:text-foreground whitespace-nowrap"
          >
            Cancel
          </button>
        </div>
      )}
      <p className="text-xs text-muted-foreground">Current rate: {value}%</p>
    </div>
  );
}
