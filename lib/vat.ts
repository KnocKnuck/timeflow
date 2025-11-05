/**
 * VAT calculation utilities with banker's rounding
 */

export type VATMode = "net-to-gross" | "gross-to-net";

export interface VATCalculationInput {
  amount: number;
  vatRate: number; // percentage (e.g., 20 for 20%)
  mode: VATMode;
}

export interface VATCalculationResult {
  netAmount: number;
  vatAmount: number;
  grossAmount: number;
  vatRate: number;
  mode: VATMode;
}

/**
 * Banker's rounding (round half to even)
 * More accurate for financial calculations
 */
export function bankersRound(value: number, decimals: number = 2): number {
  const multiplier = Math.pow(10, decimals);
  const scaled = value * multiplier;
  const floor = Math.floor(scaled);
  const fraction = scaled - floor;

  if (fraction === 0.5) {
    // Round to nearest even number
    return floor % 2 === 0 ? floor / multiplier : (floor + 1) / multiplier;
  }

  return Math.round(scaled) / multiplier;
}

/**
 * Calculate VAT from net amount (add VAT)
 */
export function calculateNetToGross(netAmount: number, vatRate: number): VATCalculationResult {
  const rateDecimal = vatRate / 100;
  const vatAmount = bankersRound(netAmount * rateDecimal);
  const grossAmount = bankersRound(netAmount + vatAmount);

  return {
    netAmount: bankersRound(netAmount),
    vatAmount,
    grossAmount,
    vatRate,
    mode: "net-to-gross",
  };
}

/**
 * Calculate VAT from gross amount (remove VAT)
 */
export function calculateGrossToNet(grossAmount: number, vatRate: number): VATCalculationResult {
  const rateDecimal = vatRate / 100;
  const netAmount = bankersRound(grossAmount / (1 + rateDecimal));
  const vatAmount = bankersRound(grossAmount - netAmount);

  return {
    netAmount,
    vatAmount,
    grossAmount: bankersRound(grossAmount),
    vatRate,
    mode: "gross-to-net",
  };
}

/**
 * Main VAT calculation function
 */
export function calculateVAT(input: VATCalculationInput): VATCalculationResult {
  // Validate inputs
  if (input.amount < 0) {
    throw new Error("Amount cannot be negative");
  }
  if (input.vatRate < 0 || input.vatRate > 100) {
    throw new Error("VAT rate must be between 0 and 100");
  }

  if (input.mode === "net-to-gross") {
    return calculateNetToGross(input.amount, input.vatRate);
  } else {
    return calculateGrossToNet(input.amount, input.vatRate);
  }
}

/**
 * Validate amount input
 */
export function validateAmount(value: string): { valid: boolean; error?: string } {
  if (!value || value.trim() === "") {
    return { valid: false, error: "Amount is required" };
  }

  const num = parseFloat(value);

  if (isNaN(num)) {
    return { valid: false, error: "Please enter a valid number" };
  }

  if (num < 0) {
    return { valid: false, error: "Amount cannot be negative" };
  }

  if (num > 999999999) {
    return { valid: false, error: "Amount is too large" };
  }

  return { valid: true };
}

/**
 * Validate VAT rate
 */
export function validateVATRate(value: number): { valid: boolean; error?: string } {
  if (value < 0) {
    return { valid: false, error: "VAT rate cannot be negative" };
  }

  if (value > 100) {
    return { valid: false, error: "VAT rate cannot exceed 100%" };
  }

  return { valid: true };
}
