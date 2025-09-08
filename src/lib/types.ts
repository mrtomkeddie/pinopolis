import type { LucideIcon } from 'lucide-react';

export interface Activity {
  name: string;
  description: string;
  icon: LucideIcon;
  price: number;
  image: string;
  imageHint: string;
}

export interface ActivityBookingProps {
  activityName: string;
  price: number;
}
