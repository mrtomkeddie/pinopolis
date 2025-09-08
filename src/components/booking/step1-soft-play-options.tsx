

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Step1SoftPlayProps {
  bookingDetails: SoftPlayBookingDetails;
  updateDetails: (details: Partial<SoftPlayPlayBookingDetails>) => void;
}

const generateTimeSlots = () => {
    const slots = [];
    let hour = 10;
    let minute = 30;

    while (hour < 22) {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
        const time = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
        slots.push(time);

        minute += 30;
        if (minute === 60) {
            hour++;
            minute = 0;
        }
    }
    return slots;
};
const timeSlots = generateTimeSlots();


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


export function Step1_SoftPlay_Options({ bookingDetails, updateDetails }: Step1SoftPlayProps) {
    const [childrenError, setChildrenError] = useState(false);

    const handleAdultsChange = (increment: boolean) => {
        const newAdults = bookingDetails.adults + (increment ? 1 : -1);
        if (newAdults >= 0 && (newAdults + bookingDetails.children <= 16)) {
            updateDetails({ adults: newAdults });
        }
    };
    
    const handleChildrenChange = (increment: boolean) => {
        const newChildren = bookingDetails.children + (increment ? 1 : -1);
        if (newChildren >= 1 && (newChildren + bookingDetails.adults <= 16)) {
            updateDetails({ children: newChildren });
            setChildrenError(false);
        } else if (newChildren < 1) {
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
                disabledIncrement={bookingDetails.adults + bookingDetails.children >= 16}
            />
            <GuestCounter 
                label="Children" 
                value={bookingDetails.children}
                onIncrement={() => handleChildrenChange(true)}
                onDecrement={() => handleChildrenChange(false)}
                disabledDecrement={bookingDetails.children <= 1}
                disabledIncrement={bookingDetails.adults + bookingDetails.children >= 16}
            />
            {childrenError && <Alert variant="destructive"><AlertDescription className="text-xs">At least one child is required for soft play.</AlertDescription></Alert>}
             <p className="text-xs text-muted-foreground pt-2">Price is £5 per child. Unlimited play.</p>
        </div>
      </div>

      <div>
        <Label className="font-bold text-lg flex items-center gap-2 mb-2"><Clock /> Pick Date & Time</Label>
        <div className="flex flex-col gap-4">
            <Popover>
                <PopoverTrigger asChild>
                <Button variant={'outline'} className={cn('w-full justify-start text-left font-normal py-6 px-4', !bookingDetails.date && 'text-muted-foreground')}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {bookingDetails.date ? format(bookingDetails.date, 'PPP') : <span>Pick a date</span>}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                    <Calendar 
                        mode="single" 
                        selected={bookingDetails.date} 
                        onSelect={(date) => updateDetails({date: date as Date})} 
                        initialFocus 
                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                        modifiers={{
                            deal: (date) => [1,2,3].includes(date.getDay())
                        }}
                        modifiersStyles={{
                            deal: {
                                color: 'hsl(var(--primary-foreground))',
                                backgroundColor: 'hsl(var(--primary))'
                            }
                        }}
                    />
                </PopoverContent>
            </Popover>

            <Select value={bookingDetails.time} onValueChange={(value) => updateDetails({ time: value })}>
                <SelectTrigger className="py-6">
                    <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                    {timeSlots.map(slot => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4">Please arrive 10-15 minutes prior to your requested start time</p>
      </div>
    </div>
  );
}
