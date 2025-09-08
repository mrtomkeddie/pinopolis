
'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Minus, Plus, Users, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { SoftPlayBookingDetails } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Alert, AlertDescription } from '../ui/alert';

interface Step1SoftPlayProps {
  bookingDetails: SoftPlayBookingDetails;
  updateDetails: (details: Partial<SoftPlayBookingDetails>) => void;
}

const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

const GuestCounter = ({ label, value, onIncrement, onDecrement, disabledDecrement = false }) => (
    <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={onDecrement} disabled={disabledDecrement}>
                <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-bold">{value}</span>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={onIncrement}>
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    </div>
);


export function Step1_SoftPlay_Options({ bookingDetails, updateDetails }: Step1SoftPlayProps) {
    const [childrenError, setChildrenError] = useState(false);

    const handleAdultsChange = (increment: boolean) => {
        const newAdults = bookingDetails.adults + (increment ? 1 : -1);
        if (newAdults >= 0) {
            updateDetails({ adults: newAdults });
        }
    };
    
    const handleChildrenChange = (increment: boolean) => {
        const newChildren = bookingDetails.children + (increment ? 1 : -1);
        if (newChildren >= 1) {
            updateDetails({ children: newChildren });
            setChildrenError(false);
        } else {
            setChildrenError(true);
        }
    };

  return (
    <div className="space-y-6">
      <div>
        <Label className="font-bold text-lg flex items-center gap-2 mb-2"><Users /> Select Guests</Label>
        <div className="space-y-2 p-4 border rounded-lg">
            <GuestCounter 
                label="Adults (Go Free)" 
                value={bookingDetails.adults} 
                onIncrement={() => handleAdultsChange(true)}
                onDecrement={() => handleAdultsChange(false)}
                disabledDecrement={bookingDetails.adults <= 0}
            />
            <GuestCounter 
                label="Children" 
                value={bookingDetails.children}
                onIncrement={() => handleChildrenChange(true)}
                onDecrement={() => handleChildrenChange(false)}
                disabledDecrement={bookingDetails.children <= 1}
            />
            {childrenError && <Alert variant="destructive"><AlertDescription className="text-xs">At least one child is required for soft play.</AlertDescription></Alert>}
             <p className="text-xs text-muted-foreground pt-2">Price is £5 per child. Unlimited play.</p>
        </div>
      </div>

      <div>
        <Label className="font-bold text-lg flex items-center gap-2 mb-2"><Clock /> Pick Date & Time</Label>
        <div className="grid grid-cols-1 gap-4">
            <Popover>
                <PopoverTrigger asChild>
                <Button variant={'outline'} className={cn('w-full justify-start text-left font-normal', !bookingDetails.date && 'text-muted-foreground')}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {bookingDetails.date ? format(bookingDetails.date, 'PPP') : <span>Pick a date</span>}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={bookingDetails.date} onSelect={(date) => updateDetails({date: date as Date})} initialFocus disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} />
                </PopoverContent>
            </Popover>

            <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(slot => (
                    <Button key={slot} variant={bookingDetails.time === slot ? 'default' : 'outline'} onClick={() => updateDetails({time: slot})}>
                        {slot}
                    </Button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
