
import type { Promotion } from './types';
import { getDay } from 'date-fns';

export const weeklyPromotions: { [key: number]: Promotion } = {
  1: { 
    name: 'Money Saving Monday', 
    type: 'perPerson',
    price: 6,
    games: 1,
    description: 'One game of bowling and a pint.'
  },
  2: { 
    name: 'Triple Tuesday', 
    type: 'perPerson',
    price: 15,
    games: 2,
    description: 'Two games of bowling and an O.G. Burger.'
  },
  3: {
    name: 'Wine Wednesday',
    type: 'package',
    price: 15,
    games: 1,
    description: 'One game of bowling and a bottle of wine for two.',
    minGuests: 2,
    maxGuests: 2,
    pricePerAdditionalGuest: 3
  }
};

/**
 * Gets the applicable promotion for a given date.
 * @param date The date of the booking.
 * @returns The promotion object if one is applicable, otherwise undefined.
 */
export function getApplicablePromotion(date: Date | undefined): Promotion | undefined {
  if (!date) return undefined;
  const dayOfWeek = getDay(date); // Sunday is 0, Monday is 1, etc.
  return weeklyPromotions[dayOfWeek] || undefined;
}
