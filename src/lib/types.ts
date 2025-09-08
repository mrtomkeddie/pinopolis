
import type { LucideIcon } from 'lucide-react';

export interface Activity {
  name: string;
  description: string;
  icon: LucideIcon;
  price: number;
  image: string;
  imageHint: string;
}

export interface Promotion {
  name: string;
  discount: number; // as a percentage
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
  contactDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    postcode: string;
    marketingOptIn: boolean;
  };
}
