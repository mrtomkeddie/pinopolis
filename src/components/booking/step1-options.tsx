
'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Minus, Plus, Users, ToyBrick, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { BookingDetails } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '../ui/alert';

interface Step1Props {
  bookingDetails: BookingDetails;
  updateDetails: (details: Partial<BookingDetails>) => void;
  pricePerGame: number;
}

const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

const GuestCounter = ({ label, value, onIncrement, onDecrement, disabledDecrement = false, disabledIncrement = false }) => (
    <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={onDecrement} disabled={disabledDecrement}>
                <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-bold">{value}</span>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={onIncrement} disabled={disabledIncrement}>
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    </div>
);


export function Step1_Options({ bookingDetails, updateDetails, pricePerGame }: Step1Props) {
    const [adultError, setAdultError] = useState(false);

    const handleAdultsChange = (increment: boolean) => {
        const newAdults = bookingDetails.adults + (increment ? 1 : -1);
        if (newAdults >= 1 && (newAdults + bookingDetails.children <= 16)) {
            updateDetails({ adults: newAdults });
            setAdultError(false);
        } else if (newAdults < 1) {
            setAdultError(true);
        }
    };
    
    const handleChildrenChange = (increment: boolean) => {
        const newChildren = bookingDetails.children + (increment ? 1 : -1);
        if (newChildren >= 0 && (newChildren + bookingDetails.adults <= 16)) {
            updateDetails({ children: newChildren });
        }
    };

    const handleSoftPlayChildrenChange = (increment: boolean) => {
        const newSoftPlayChildren = bookingDetails.softPlayChildren + (increment ? 1 : -1);
        if (newSoftPlayChildren >= 0) {
            updateDetails({ softPlayChildren: newSoftPlayChildren });
        }
    };

  return (
    <div className="space-y-6">
      <div>
        <Label className="font-bold text-lg flex items-center gap-2 mb-2"><Users /> Select Guests</Label>
        <div className="space-y-2 p-4 border rounded-lg">
            <GuestCounter 
                label="Adults" 
                value={bookingDetails.adults} 
                onIncrement={() => handleAdultsChange(true)}
                onDecrement={() => handleAdultsChange(false)}
                disabledDecrement={bookingDetails.adults <= 1}
                disabledIncrement={bookingDetails.adults + bookingDetails.children >= 16}
            />
             {adultError && <Alert variant="destructive"><AlertDescription className="text-xs">At least one adult is required for bowling.</AlertDescription></Alert>}
            <GuestCounter 
                label="Children" 
                value={bookingDetails.children}
                onIncrement={() => handleChildrenChange(true)}
                onDecrement={() => handleChildrenChange(false)}
                disabledDecrement={bookingDetails.children <= 0}
                disabledIncrement={bookingDetails.adults + bookingDetails.children >= 16}
            />
        </div>
      </div>

      <div>
        <Label className="font-bold text-lg mb-2">Number of Games</Label>
        <RadioGroup value={String(bookingDetails.games)} onValueChange={(val) => updateDetails({ games: Number(val) })} className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map(num => (
                <div key={num}>
                    <RadioGroupItem value={String(num)} id={`games-${num}`} className="sr-only" />
                    <Label htmlFor={`games-${num}`} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                        {num} {num > 1 ? 'Games' : 'Game'}
                    </Label>
                </div>
            ))}
        </RadioGroup>
      </div>

      <div className="space-y-2 p-4 border rounded-lg">
        <div className="flex items-center justify-between">
          <Label htmlFor="soft-play-switch" className="font-bold text-md flex items-center gap-2"><ToyBrick /> Add Soft Play for other kids?</Label>
          <Switch id="soft-play-switch" checked={bookingDetails.addSoftPlay} onCheckedChange={(checked) => updateDetails({ addSoftPlay: checked, softPlayChildren: checked ? 1 : 0 })} />
        </div>
        {bookingDetails.addSoftPlay && (
          <div className="pt-4">
            <GuestCounter
                label="Number of Children for Soft Play"
                value={bookingDetails.softPlayChildren}
                onIncrement={() => handleSoftPlayChildrenChange(true)}
                onDecrement={() => handleSoftPlayChildrenChange(false)}
                disabledDecrement={bookingDetails.softPlayChildren <= 0}
            />
             <p className="text-xs text-muted-foreground mt-2">Soft play is £5 per child.</p>
          </div>
        )}
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
