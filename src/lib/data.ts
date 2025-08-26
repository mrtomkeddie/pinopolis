import type { Activity, Booking } from './types';

export const activities: Activity[] = [
  {
    title: 'Bowling',
    description: 'Book a lane and strike up some fun with family and friends.',
    href: '/bowling',
    image: '/bowling.jpg',
    imageHint: 'bowling alley'
  },
  {
    title: 'AR Darts',
    description: 'Experience darts like never before with augmented reality.',
    href: '/darts',
    image: '/darts.jpg',
    imageHint: 'dart board'
  },
  {
    title: 'Soft Play',
    description: 'A safe and fun environment for the little ones to play.',
    href: '/soft-play',
    image: 'https://picsum.photos/seed/softplay/600/400',
    imageHint: 'kids playground'
  },
];

export const bookings: Booking[] = [
    {
        id: '1',
        activity: 'Bowling',
        date: new Date(new Date().setDate(new Date().getDate() + 7)),
        time: '18:00',
        guests: 4,
        image: 'https://placehold.co/600x400.png',
        imageHint: 'bowling alley'
    },
    {
        id: '2',
        activity: 'AR Darts',
        date: new Date(new Date().setDate(new Date().getDate() + 10)),
        time: '20:00',
        guests: 2,
        image: 'https://placehold.co/600x400.png',
        imageHint: 'dart board'
    }
]

export const bookingHistory = "1. Bowling (4 people)\n2. AR Darts (2 people)";
