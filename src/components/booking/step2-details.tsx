
'use client';

import type { BookingDetails } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { User } from 'lucide-react';

interface Step2Props {
  contactDetails: BookingDetails['contactDetails'];
  updateContactDetails: (details: Partial<BookingDetails['contactDetails']>) => void;
}

export function Step2_Details({ contactDetails, updateContactDetails }: Step2Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateContactDetails({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
        <Label className="font-bold text-lg flex items-center gap-2 mb-2"><User /> Your Details</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" value={contactDetails.firstName} onChange={handleChange} required />
            </div>
            <div className="space-y-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" value={contactDetails.lastName} onChange={handleChange} required />
            </div>
        </div>
        <div className="space-y-1">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" value={contactDetails.email} onChange={handleChange} required />
            <p className="text-xs text-muted-foreground">Your booking confirmation will be sent here.</p>
        </div>
        <div className="space-y-1">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" value={contactDetails.phone} onChange={handleChange} />
        </div>
        <div className="space-y-1">
            <Label htmlFor="postcode">Postal Code</Label>
            <Input id="postcode" name="postcode" value={contactDetails.postcode} onChange={handleChange} />
        </div>
        <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="marketingOptIn" name="marketingOptIn" checked={contactDetails.marketingOptIn} onCheckedChange={(checked) => updateContactDetails({ marketingOptIn: !!checked })} />
            <label htmlFor="marketingOptIn" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Keep me updated with news, events, and offers.
            </label>
        </div>
    </div>
  );
}
