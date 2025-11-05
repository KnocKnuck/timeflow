/**
 * Date difference calculation utilities
 */

export interface DateDifferenceResult {
  days: number;
  weeks: number;
  months: number;
  years: number;
  workdays: number;
  weekends: number;
}

/**
 * Calculate difference between two dates
 */
export function calculateDateDifference(
  startDate: Date,
  endDate: Date,
  excludeWeekends: boolean = false
): DateDifferenceResult {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Reset time to midnight
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  // Ensure start is before end
  if (start > end) {
    [start.setTime(end.getTime()), end.setTime(start.getTime())];
  }

  // Calculate total days
  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor((end.getTime() - start.getTime()) / msPerDay);

  // Calculate weeks
  const weeks = Math.floor(totalDays / 7);

  // Calculate approximate months (average 30.44 days per month)
  const months = Math.floor(totalDays / 30.44);

  // Calculate years
  const years = Math.floor(totalDays / 365.25);

  // Calculate workdays and weekends if needed
  let workdays = 0;
  let weekends = 0;

  if (excludeWeekends || true) {
    // Always calculate for display
    let current = new Date(start);
    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekends++;
      } else {
        workdays++;
      }
      current.setDate(current.getDate() + 1);
    }
  }

  return {
    days: totalDays,
    weeks,
    months,
    years,
    workdays,
    weekends,
  };
}

/**
 * Validate date range
 */
export function validateDateRange(
  startDate: string,
  endDate: string
): { valid: boolean; error?: string } {
  if (!startDate || !endDate) {
    return { valid: false, error: "Please enter both dates" };
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { valid: false, error: "Please enter valid dates" };
  }

  return { valid: true };
}
