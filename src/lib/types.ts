
import type { LucideIcon } from 'lucide-react';

export interface Activity {
  name: string;
  description: string;
  icon: LucideIcon;
  price: number;
  image: string;
  imageHint: string;
}

export type Promotion = {
    name: string;
    description: string;
} & (
    | {
        type: 'perPerson';
        price: number;
        games: number;
      }
    | {
        type: 'package';
        price: number;
        games: number;
        minGuests: number;
        maxGuests: number;
        pricePerAdditionalGuest: number;
      }
    | {
        type: 'discount';
        discount: number;
    }
);


interface ContactDetails {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    postcode: string;
    marketingOptIn: boolean;
}

export interface BookingDetails {
  activityName: string;
  adults: number;
  children: number;
  games: number;
  addSoftPlay: boolean;
  softPlayChildren: number;
  date: Date;
  time: string;
  contactDetails: ContactDetails;
  wineChoice?: 'White' | 'Red' | 'Rosé';
}

export interface DartsBookingDetails {
    activityName: string;
    oches: number;
    duration: number; // in minutes
    addSoftPlay: boolean;
    softPlayChildren: number;
    date: Date;
    time: string;
    contactDetails: ContactDetails;
}

export interface SoftPlayBookingDetails {
    activityName: string;
    adults: number;
    children: number;
    date: Date;
    time: string;
    contactDetails: ContactDetails;
}
