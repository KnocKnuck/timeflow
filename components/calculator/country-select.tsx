"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import vatRatesData from "@/data/vat-rates.json";

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  id: string;
}

export function CountrySelect({ value, onChange, id }: CountrySelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Country</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} aria-label="Select country">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          {vatRatesData.countries.map((country) => (
            <SelectItem key={country.countryCode} value={country.countryCode}>
              {country.countryName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">
        Select your country to auto-load VAT rate
      </p>
    </div>
  );
}
