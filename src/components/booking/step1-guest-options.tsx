
'use client';

import { useState } from 'react';
import { Minus, Plus, Users, ToyBrick, Wine, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BookingDetails, Promotion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface Step1GuestOptionsProps {
  bookingDetails: BookingDetails;
  updateDetails: (details: Partial<BookingDetails>) => void;
  pricePerGame: number;
  promotion: Promotion | null;
}

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


export function Step1_GuestOptions({ bookingDetails, updateDetails, pricePerGame, promotion }: Step1GuestOptionsProps) {
    const [adultError, setAdultError] = useState(false);

    const isDealApplied = bookingDetails.dealApplied ?? false;
    const isGamesLocked = isDealApplied && promotion && (promotion.type === 'perPerson' || promotion.type === 'package');
    const isWineWednesday = isDealApplied && promotion?.type === 'package';

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

  return (
    <div className="space-y-6 pt-6">
        {promotion && (
            <Alert variant="default">
                <Tag className="h-4 w-4" />
                <AlertTitle>{promotion.name} Available!</AlertTitle>
                <AlertDescription>
                   {promotion.description}
                </AlertDescription>
                <div className="flex items-center justify-between mt-4">
                    <Label htmlFor="deal-switch" className="text-sm font-normal">Apply Deal</Label>
                    <Switch id="deal-switch" checked={isDealApplied} onCheckedChange={(checked) => updateDetails({ dealApplied: checked })}/>
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
                    <Label 
                        htmlFor={`games-${num}`} 
                        className={cn("flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4", 
                        isGamesLocked ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-accent hover:text-accent-foreground", 
                        "peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
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
