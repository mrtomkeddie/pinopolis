

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
