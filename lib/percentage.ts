/**
 * Percentage calculation utilities
 */

export type PercentageMode =
  | "percent-of" // What is X% of Y?
  | "is-what-percent" // X is what percent of Y?
  | "percent-change" // Percent increase/decrease from X to Y
  | "increase-by" // Increase X by Y%
  | "decrease-by"; // Decrease X by Y%

export interface PercentageInput {
  value1: number;
  value2: number;
  mode: PercentageMode;
}

export interface PercentageResult {
  result: number;
  mode: PercentageMode;
  formula: string;
}

/**
 * Round to 2 decimal places
 */
function round(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * What is X% of Y?
 */
export function calculatePercentOf(percent: number, value: number): PercentageResult {
  const result = round((percent / 100) * value);
  return {
    result,
    mode: "percent-of",
    formula: `${percent}% of ${value} = ${result}`,
  };
}

/**
 * X is what percent of Y?
 */
export function calculateIsWhatPercent(value: number, total: number): PercentageResult {
  const result = round((value / total) * 100);
  return {
    result,
    mode: "is-what-percent",
    formula: `${value} is ${result}% of ${total}`,
  };
}

/**
 * Percent change from X to Y
 */
export function calculatePercentChange(oldValue: number, newValue: number): PercentageResult {
  const result = round(((newValue - oldValue) / oldValue) * 100);
  return {
    result,
    mode: "percent-change",
    formula: `From ${oldValue} to ${newValue} is ${result >= 0 ? '+' : ''}${result}%`,
  };
}

/**
 * Increase X by Y%
 */
export function calculateIncreaseBy(value: number, percent: number): PercentageResult {
  const increase = (percent / 100) * value;
  const result = round(value + increase);
  return {
    result,
    mode: "increase-by",
    formula: `${value} + ${percent}% = ${result}`,
  };
}

/**
 * Decrease X by Y%
 */
export function calculateDecreaseBy(value: number, percent: number): PercentageResult {
  const decrease = (percent / 100) * value;
  const result = round(value - decrease);
  return {
    result,
    mode: "decrease-by",
    formula: `${value} - ${percent}% = ${result}`,
  };
}

/**
 * Main percentage calculation function
 */
export function calculatePercentage(input: PercentageInput): PercentageResult {
  const { value1, value2, mode } = input;

  // Validate inputs
  if (isNaN(value1) || isNaN(value2)) {
    throw new Error("Please enter valid numbers");
  }

  switch (mode) {
    case "percent-of":
      return calculatePercentOf(value1, value2);
    case "is-what-percent":
      if (value2 === 0) throw new Error("Cannot divide by zero");
      return calculateIsWhatPercent(value1, value2);
    case "percent-change":
      if (value1 === 0) throw new Error("Cannot calculate percent change from zero");
      return calculatePercentChange(value1, value2);
    case "increase-by":
      return calculateIncreaseBy(value1, value2);
    case "decrease-by":
      return calculateDecreaseBy(value1, value2);
    default:
      throw new Error("Invalid calculation mode");
  }
}
