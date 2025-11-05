/**
 * Age calculation utilities
 */

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalMonths: number;
  nextBirthday: Date;
  daysUntilBirthday: number;
}

/**
 * Calculate age from birth date
 */
export function calculateAge(birthDate: Date): AgeResult {
  const today = new Date();

  // Reset time to midnight for accurate day calculations
  const birth = new Date(birthDate);
  birth.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (birth > today) {
    throw new Error("Birth date cannot be in the future");
  }

  // Calculate years
  let years = today.getFullYear() - birth.getFullYear();

  // Calculate months
  let months = today.getMonth() - birth.getMonth();

  // Calculate days
  let days = today.getDate() - birth.getDate();

  // Adjust if day is negative
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Adjust if month is negative
  if (months < 0) {
    years--;
    months += 12;
  }

  // Calculate total days
  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor((today.getTime() - birth.getTime()) / msPerDay);

  // Calculate total months
  const totalMonths = years * 12 + months;

  // Calculate next birthday
  const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  // Calculate days until birthday
  const daysUntilBirthday = Math.floor((nextBirthday.getTime() - today.getTime()) / msPerDay);

  return {
    years,
    months,
    days,
    totalDays,
    totalMonths,
    nextBirthday,
    daysUntilBirthday,
  };
}

/**
 * Validate date input
 */
export function validateBirthDate(dateString: string): { valid: boolean; error?: string } {
  if (!dateString) {
    return { valid: false, error: "Please enter a birth date" };
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return { valid: false, error: "Please enter a valid date" };
  }

  const today = new Date();
  if (date > today) {
    return { valid: false, error: "Birth date cannot be in the future" };
  }

  const minDate = new Date("1900-01-01");
  if (date < minDate) {
    return { valid: false, error: "Please enter a date after 1900" };
  }

  return { valid: true };
}
