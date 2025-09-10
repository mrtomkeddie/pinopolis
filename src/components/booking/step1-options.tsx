
'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Minus, Plus, Users, ToyBrick, Clock, Info, Wine, Tag, Gamepad2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { BookingDetails, Promotion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';

type AccentColor = 'orange' | 'pink' | 'cyan';

interface Step1Props {
  bookingDetails: BookingDetails;
  updateDetails: (details: Partial<BookingDetails>) => void;
  pricePerGame: number;
  promotion: Promotion | null;
  accentColor: AccentColor;
  checkAvailability: (time: string) => { available: number; bookedLanes: number };
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


export function Step1_Options({ bookingDetails, updateDetails, pricePerGame, promotion, accentColor, checkAvailability }: Step1Props) {
    const [adultError, setAdultError] = useState(false);
    const isMobile = useIsMobile();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const isDealApplied = bookingDetails.dealApplied ?? false;
    const isGamesLocked = isDealApplied && promotion && (promotion.type === 'perPerson' || promotion.type === 'package');
    const isWineWednesday = isDealApplied && promotion?.type === 'package';
    
    const lanesNeeded = Math.ceil((bookingDetails.adults + bookingDetails.children) / 8) || 1;

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

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            updateDetails({date: date, time: ''});
            setIsCalendarOpen(false); // Close calendar after selection
        }
    }
    
    const accentBorder = {
        orange: 'border-orange-400 focus-visible:ring-orange-400',
        pink: 'border-pink-400 focus-visible:ring-pink-400',
        cyan: 'border-cyan-400 focus-visible:ring-cyan-400'
    }

    const accentText = {
        orange: 'text-orange-400',
        pink: 'text-pink-400',
        cyan: 'text-cyan-400'
    }

    const CalendarButton = () => (
         <Button variant={'outline'} className={cn('w-full justify-start text-left font-normal py-6 px-4', !bookingDetails.date && 'text-muted-foreground')}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {bookingDetails.date ? format(bookingDetails.date, 'PPP') : <span>Pick a date</span>}
        </Button>
    );

    const CalendarComponent = () => (
        <Calendar 
            mode="single" 
            selected={bookingDetails.date} 
            onSelect={handleDateSelect}
            initialFocus 
            disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
        />
    )

    return (
        <div className="space-y-6">
            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Weekly Deals Available!</AlertTitle>
                <AlertDescription>
                    Select a Monday, Tuesday or Wednesday on the calendar to see our special offers.
                </AlertDescription>
            </Alert>
            <div className="space-y-2">
                <Label className="font-bold text-lg flex items-center gap-2"><Clock /> Pick Date & Time</Label>
                 <p className="text-xs text-muted-foreground">Please arrive 10-15 minutes prior to your requested start time</p>
                <div className="flex flex-col gap-4">
                    { isMobile ? (
                         <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                            <DialogTrigger asChild>
                                <CalendarButton />
                            </DialogTrigger>
                            <DialogContent className="w-auto">
                                <CalendarComponent />
                            </DialogContent>
                        </Dialog>
                    ) : (
                        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                            <PopoverTrigger asChild>
                                <CalendarButton />
                            </PopoverTrigger>
                            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                                <CalendarComponent />
                            </PopoverContent>
                        </Popover>
                    )}

                    <Select value={bookingDetails.time} onValueChange={(value) => updateDetails({ time: value })} disabled={!bookingDetails.date}>
                        <SelectTrigger className="py-6">
                            <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                            {timeSlots.map(slot => {
                                const { available } = checkAvailability(slot);
                                return (
                                     <SelectItem key={slot} value={slot} disabled={available < lanesNeeded}>
                                        {slot} ({available} {available === 1 ? 'lane' : 'lanes'} left)
                                    </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {promotion && (
                <Alert variant="default" className={cn(accentText[accentColor], accentBorder[accentColor])}>
                    <Tag className="h-4 w-4" />
                    <AlertTitle>{promotion.name} Available!</AlertTitle>
                    <AlertDescription>
                    {promotion.description}
                    </AlertDescription>
                    <div className="flex items-center justify-between mt-4">
                        <Label htmlFor="deal-switch" className="text-sm font-normal">Apply Deal</Label>
                        <Switch id="deal-switch" checked={isDealApplied} onCheckedChange={(checked) => updateDetails({ dealApplied: checked })} />
                    </div>
                </Alert>
            )}

            <div className="space-y-2">
                <Label className="font-bold text-lg flex items-center gap-2"><Users /> Select Guests</Label>
                 <p className="text-xs text-muted-foreground">Max 8 players per lane. Max 16 players per booking.</p>
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
                </div>
            </div>

            <div className="space-y-2">
                <Label className="font-bold text-lg flex items-center gap-2"><Gamepad2 /> Number of Games</Label>
                 <RadioGroup 
                    value={String(bookingDetails.games)} 
                    onValueChange={(val) => updateDetails({ games: Number(val) })} 
                    className="grid grid-cols-3 gap-2"
                >
                    {[1, 2, 3].map(num => (
                        <div key={num}>
                            <RadioGroupItem value={String(num)} id={`games-${num}`} className="sr-only peer" disabled={isGamesLocked} />
                            <Label 
                                htmlFor={`games-${num}`} 
                                className={cn(
                                    "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4", 
                                    isGamesLocked 
                                        ? "cursor-not-allowed opacity-50" 
                                        : "cursor-pointer hover:bg-accent hover:text-accent-foreground",
                                    "peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                )}>
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
                                <RadioGroupItem value={wine} id={`wine-${wine}`} className="sr-only peer" />
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
                    <p className="text-xs text-muted-foreground mt-2">Soft play is £5 per child per hour.</p>
                </div>
                )}
            </div>
        </div>
    );
}

    

    