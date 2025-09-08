

'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Minus, Plus, Users, ToyBrick, Clock, Info, Wine, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { BookingDetails, Promotion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type AccentColor = 'orange' | 'pink' | 'cyan';

interface Step1Props {
  bookingDetails: BookingDetails;
  updateDetails: (details: Partial<BookingDetails>) => void;
  pricePerGame: number;
  promotion: Promotion | null;
  accentColor: AccentColor;
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


export function Step1_Options({ bookingDetails, updateDetails, pricePerGame, promotion, accentColor }: Step1Props) {
    const [adultError, setAdultError] = useState(false);

    const isDealActive = !!promotion;
    const isDealApplied = bookingDetails.dealApplied ?? false;
    const isGamesLocked = isDealActive && isDealApplied && (promotion.type === 'perPerson' || promotion.type === 'package');
    const isWineWednesday = isDealActive && isDealApplied && promotion.type === 'package';

    const handleAdultsChange = (increment: boolean) => {
        const newAdults = bookingDetails.adults + (increment ? 1 : -1);
        const minAdults = isWineWednesday ? 2 : 1;
        if (newAdults >= minAdults && (newAdults + bookingDetails.children <= 16)) {
            updateDetails({ adults: newAdults });
            setAdultError(false);
        } else if (newAdults < minAdults) {
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

    const handleWineChoice = (wine: 'White' | 'Red' | 'Rosé') => {
        updateDetails({ wineChoice: wine });
    };

    const accentBorderColor = {
        orange: 'border-orange-500',
        pink: 'border-pink-500',
        cyan: 'border-cyan-500',
    };

    const accentTextColor = {
        orange: 'text-orange-400',
        pink: 'text-pink-400',
        cyan: 'text-cyan-400',
    };
    
    const accentSwitchClass = {
        orange: 'data-[state=checked]:bg-orange-500',
        pink: 'data-[state=checked]:bg-pink-500',
        cyan: 'data-[state=checked]:bg-cyan-500',
    };

     const accentAlertClasses = {
      orange: 'border-orange-500 text-orange-500',
      pink: 'border-pink-500 text-pink-500',
      cyan: 'border-cyan-500 text-cyan-500',
    }

  return (
    <div className="space-y-6">
        <div>
            <Label className="font-bold text-lg flex items-center gap-2 mb-2"><Clock /> Pick Date & Time</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Popover>
                    <PopoverTrigger asChild>
                    <Button variant={'outline'} className={cn('w-full justify-start text-left font-normal', !bookingDetails.date && 'text-muted-foreground')}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {bookingDetails.date ? format(bookingDetails.date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
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
                    <SelectTrigger>
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

        {promotion && (
            <Alert variant="default" className={cn(accentAlertClasses[accentColor])}>
                <Tag className="h-4 w-4" />
                <AlertTitle>{promotion.name} Available!</AlertTitle>
                <AlertDescription>
                   {promotion.description}
                </AlertDescription>
                <div className="flex items-center justify-between mt-4">
                    <Label htmlFor="deal-switch" className="text-sm font-normal">Apply Deal</Label>
                    <Switch id="deal-switch" checked={isDealApplied} onCheckedChange={(checked) => updateDetails({ dealApplied: checked })} className={cn(accentSwitchClass[accentColor])}/>
                </div>
            </Alert>
        )}

      <div>
        <Label className="font-bold text-lg flex items-center gap-2 mb-2"><Users /> Select Guests</Label>
        <div className="space-y-2 p-4 border rounded-lg">
            <GuestCounter 
                label="Adults" 
                value={bookingDetails.adults} 
                onIncrement={() => handleAdultsChange(true)}
                onDecrement={() => handleAdultsChange(false)}
                disabledDecrement={bookingDetails.adults <= (isWineWednesday ? 2 : 1)}
                disabledIncrement={bookingDetails.adults + bookingDetails.children >= 16}
            />
             {adultError && <Alert variant="destructive"><AlertDescription className="text-xs">At least one adult is required for bowling.</AlertDescription></Alert>}
            <GuestCounter 
                label="Children" 
                value={bookingDetails.children}
                onIncrement={() => handleChildrenChange(true)}
                onDecrement={() => handleChildrenChange(false)}
                disabledDecrement={bookingDetails.children <= 0}
                disabledIncrement={isWineWednesday || (bookingDetails.adults + bookingDetails.children >= 16)}
            />
            <p className="text-xs text-muted-foreground pt-2">There is a maximum of 16 players per reservation. For bookings of more than 16 people please email info@pinopolis.wales</p>
        </div>
      </div>

      <div>
        <Label className="font-bold text-lg mb-2">Number of Games</Label>
        <RadioGroup 
            value={String(bookingDetails.games)} 
            onValueChange={(val) => updateDetails({ games: Number(val) })} 
            className="grid grid-cols-3 gap-2"
            disabled={isGamesLocked}
        >
            {[1, 2, 3].map(num => (
                <div key={num}>
                    <RadioGroupItem value={String(num)} id={`games-${num}`} className="sr-only" />
                    <Label htmlFor={`games-${num}`} className={cn("flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary", isGamesLocked ? "cursor-not-allowed opacity-50" : "cursor-pointer", {
                        [`peer-data-[state=checked]:border-orange-500 [&:has([data-state=checked])]:border-orange-500`]: accentColor === 'orange',
                        [`peer-data-[state=checked]:border-pink-500 [&:has([data-state=checked])]:border-pink-500`]: accentColor === 'pink',
                        [`peer-data-[state=checked]:border-cyan-500 [&:has([data-state=checked])]:border-cyan-500`]: accentColor === 'cyan',
                    })}>
                        {num} {num > 1 ? 'Games' : 'Game'}
                    </Label>
                </div>
            ))}
        </RadioGroup>
        {isGamesLocked && <p className="text-xs text-muted-foreground mt-2 text-center">Number of games is locked for this deal.</p>}
      </div>
        
      {isWineWednesday && (
        <div>
            <Label className="font-bold text-lg flex items-center gap-2 mb-2"><Wine /> Select Your Wine</Label>
            <RadioGroup 
                value={bookingDetails.wineChoice} 
                onValueChange={(val) => handleWineChoice(val as any)} 
                className="grid grid-cols-3 gap-2"
            >
                {(['White', 'Red', 'Rosé'] as const).map(wine => (
                    <div key={wine}>
                        <RadioGroupItem value={wine} id={`wine-${wine}`} className="sr-only" />
                        <Label htmlFor={`wine-${wine}`} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                            {wine}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
      )}

      <div className="space-y-2 p-4 border rounded-lg">
        <div className="flex items-center justify-between">
          <Label htmlFor="soft-play-switch" className="font-bold text-md flex items-center gap-2"><ToyBrick /> Add Soft Play</Label>
          <Switch id="soft-play-switch" checked={bookingDetails.addSoftPlay} onCheckedChange={(checked) => updateDetails({ addSoftPlay: checked, softPlayChildren: checked ? 1 : 0 })} className={cn(accentSwitchClass[accentColor])}/>
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
             <p className="text-xs text-muted-foreground mt-2">Soft play is £5 per child per hour.</p>
          </div>
        )}
      </div>
    </div>
  );
}
