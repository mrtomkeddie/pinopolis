
'use client';

import { Calendar as CalendarIcon, Minus, Plus, ToyBrick, Clock, Target, Tag, Info } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { DartsBookingDetails } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface Step1DartsProps {
  bookingDetails: DartsBookingDetails;
  updateDetails: (details: Partial<DartsBookingDetails>) => void;
  checkAvailability: (time: string, duration: number) => { available: number; bookedOches: number };
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

        // Darts slots are every 30 minutes
        minute += 30;
        if (minute >= 60) {
            hour++;
            minute -= 60;
        }
    }
    // Remove last slot if it's 10:00 PM
    if(slots[slots.length - 1] === "10:00 PM") slots.pop();
    return slots;
};
const timeSlots = generateTimeSlots();


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

export function Step1_Darts_Options({ bookingDetails, updateDetails, checkAvailability }: Step1DartsProps) {
    const handleSoftPlayChildrenChange = (increment: boolean) => {
        const newSoftPlayChildren = bookingDetails.softPlayChildren + (increment ? 1 : -1);
        if (newSoftPlayChildren >= 0) {
            updateDetails({ softPlayChildren: newSoftPlayChildren });
        }
    };
    
    const isDealApplied = bookingDetails.dealApplied ?? false;
    const { available: ochesAvailableAtTime } = bookingDetails.time ? checkAvailability(bookingDetails.time, bookingDetails.duration) : { available: 2 };


  return (
    <div className="space-y-6">
       <div className="space-y-2">
        <div className="space-y-2 mb-2">
          <Label className="font-bold text-lg flex items-center gap-2"><Clock /> Pick Date & Time</Label>
          <p className="text-xs text-muted-foreground">Please arrive 10-15 minutes prior to your requested start time</p>
        </div>
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
                        onSelect={(date) => {
                            updateDetails({date: date as Date, time: ''}); // Reset time when date changes
                        }} 
                        initialFocus 
                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                    />
                </PopoverContent>
            </Popover>

             <Select 
                value={bookingDetails.time} 
                onValueChange={(value) => updateDetails({ time: value })}
                disabled={!bookingDetails.date}
             >
                <SelectTrigger className="py-6">
                    <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                    {timeSlots.map(slot => {
                        const { available } = checkAvailability(slot, bookingDetails.duration);
                        return (
                             <SelectItem key={slot} value={slot} disabled={available === 0}>
                                {slot} {available < 2 && available > 0 && `(${available} oche left)`}
                            </SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>

        </div>
      </div>

      <div className="space-y-2">
        <div className="space-y-2 mb-2">
            <Label className="font-bold text-lg flex items-center gap-2"><Target /> Select Oches & Duration</Label>
            <p className="text-xs text-muted-foreground">Each darts oche holds up to 6 players.</p>
        </div>
        <div className="space-y-4 p-4 border rounded-lg">
            <div>
                <Label className="font-bold text-md mb-2">Number of Oches</Label>
                <RadioGroup value={String(bookingDetails.oches)} onValueChange={(val) => updateDetails({ oches: Number(val) })} className="grid grid-cols-2 gap-2">
                    {[1, 2].map(num => (
                        <div key={num}>
                            <RadioGroupItem value={String(num)} id={`oches-${num}`} className="sr-only peer" disabled={num > ochesAvailableAtTime}/>
                            <Label htmlFor={`oches-${num}`} className={cn(
                                "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
                                num > ochesAvailableAtTime ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                            )}>
                                {num} {num > 1 ? 'Oches' : 'Oche'}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
                 {bookingDetails.time && ochesAvailableAtTime < 2 && (
                    <p className="text-xs text-muted-foreground mt-2 text-center">Only 1 oche is available at the selected time.</p>
                )}
            </div>
            <div>
                <Label className="font-bold text-md mb-2">Duration</Label>
                <RadioGroup value={String(bookingDetails.duration)} onValueChange={(val) => updateDetails({ duration: Number(val) })} className="grid grid-cols-2 gap-2">
                    {[30, 60].map(num => (
                        <div key={num}>
                            <RadioGroupItem value={String(num)} id={`duration-${num}`} className="sr-only peer" />
                            <Label htmlFor={`duration-${num}`} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                {num} Minutes
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
      </div>

      <div className="space-y-2 p-4 border rounded-lg">
        <div className="flex items-center justify-between">
          <Label htmlFor="soft-play-switch" className="font-bold text-md flex items-center gap-2"><ToyBrick /> Add Soft Play</Label>
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

    </div>
  );
}
