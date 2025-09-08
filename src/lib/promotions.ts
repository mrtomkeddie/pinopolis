import { getDay } from 'date-fns';

interface Promotion {
  name: string;
  discount: number; // as a percentage
}

const weeklyPromotions: { [key: number]: Promotion } = {
  1: { name: 'Money Saving Monday', discount: 20 }, // Monday
  2: { name: 'Triple Tuesday', discount: 15 }, // Tuesday
};

/**
 * Gets the applicable promotion for a given date.
 * @param date The date of the booking.
 * @returns The promotion object if one is applicable, otherwise null.
 */
export function getApplicablePromotion(date: Date): Promotion | null {
  const dayOfWeek = getDay(date); // Sunday is 0, Monday is 1, etc.
  return weeklyPromotions[dayOfWeek] || null;
}
