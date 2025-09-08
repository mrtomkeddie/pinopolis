
'use client';

import { Calendar as CalendarIcon, Minus, Plus, ToyBrick, Clock, Target } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { DartsBookingDetails } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';

interface Step1DartsProps {
  bookingDetails: DartsBookingDetails;
  updateDetails: (details: Partial<DartsBookingDetails>) => void;
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

export function Step1_Darts_Options({ bookingDetails, updateDetails }: Step1DartsProps) {
    const handleSoftPlayChildrenChange = (increment: boolean) => {
        const newSoftPlayChildren = bookingDetails.softPlayChildren + (increment ? 1 : -1);
        if (newSoftPlayChildren >= 0) {
            updateDetails({ softPlayChildren: newSoftPlayChildren });
        }
    };

  return (
    <div className="space-y-6">
      <div>
        <Label className="font-bold text-lg flex items-center gap-2 mb-2"><Target /> Select Oches & Duration</Label>
        <div className="space-y-4 p-4 border rounded-lg">
            <div>
                <Label className="font-bold text-md mb-2">Number of Oches</Label>
                <RadioGroup value={String(bookingDetails.oches)} onValueChange={(val) => updateDetails({ oches: Number(val) })} className="grid grid-cols-2 gap-2">
                    {[1, 2].map(num => (
                        <div key={num}>
                            <RadioGroupItem value={String(num)} id={`oches-${num}`} className="sr-only" />
                            <Label htmlFor={`oches-${num}`} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                {num} {num > 1 ? 'Oches' : 'Oche'}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
            <div>
                <Label className="font-bold text-md mb-2">Duration</Label>
                <RadioGroup value={String(bookingDetails.duration)} onValueChange={(val) => updateDetails({ duration: Number(val) })} className="grid grid-cols-2 gap-2">
                    {[30, 60].map(num => (
                        <div key={num}>
                            <RadioGroupItem value={String(num)} id={`duration-${num}`} className="sr-only" />
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
            <p className="text-xs text-muted-foreground text-center">Please arrive 10-15 minutes prior to your requested start time</p>
        </div>
      </div>
    </div>
  );
}
