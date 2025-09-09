
import type { DartsBooking, BowlingBooking } from './types';
import { format } from 'date-fns';

// This is a mock database of existing bookings.
// In a real application, this data would come from a database.
const mockDartsBookings: DartsBooking[] = [
  {
    date: '2024-09-15',
    time: '2:00 PM',
    oches: 2,
    duration: 60,
  },
  {
    date: '2024-09-15',
    time: '4:00 PM',
    oches: 1,
    duration: 30,
  },
  {
    date: '2024-09-16',
    time: '6:30 PM',
    oches: 1,
    duration: 60,
  },
  {
    date: '2024-09-16',
    time: '6:30 PM',
    oches: 1,
    duration: 30,
  },
];

const mockBowlingBookings: BowlingBooking[] = [];


/**
 * Gets all darts bookings for a specific date from the mock database.
 * @param date The date to retrieve bookings for.
 * @returns An array of DartsBooking objects for that date.
 */
export function getDartsBookingsForDate(date: Date): DartsBooking[] {
  const formattedDate = format(date, 'yyyy-MM-dd');
  
  // In a real app, you would add a "loading" state here.
  // We add a realistic date to the mock data for demonstration purposes.
  const today = new Date();
  const dynamicBookings = [
    {
        date: format(today, 'yyyy-MM-dd'),
        time: '2:00 PM',
        oches: 2,
        duration: 60,
    },
    {
        date: format(today, 'yyyy-MM-dd'),
        time: '4:00 PM',
        oches: 1,
        duration: 30,
    },
  ];

  const allBookings = [...mockDartsBookings, ...dynamicBookings];

  return allBookings.filter(booking => booking.date === formattedDate);
}

/**
 * Gets all bowling bookings for a specific date from the mock database.
 * @param date The date to retrieve bookings for.
 * @returns An array of BowlingBooking objects for that date.
 */
export function getBowlingBookingsForDate(date: Date): BowlingBooking[] {
    const formattedDate = format(date, 'yyyy-MM-dd');

    const today = new Date();
    const dynamicBookings: BowlingBooking[] = [
        {
            date: format(today, 'yyyy-MM-dd'),
            time: '3:00 PM',
            lanes: 1,
            players: 6,
            games: 2,
        },
        {
            date: format(today, 'yyyy-MM-dd'),
            time: '3:30 PM',
            lanes: 1,
            players: 4,
            games: 1,
        },
    ];
    const allBookings = [...mockBowlingBookings, ...dynamicBookings];
    return allBookings.filter(booking => booking.date === formattedDate);
}
