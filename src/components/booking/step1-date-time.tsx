
'use client';

import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { BookingDetails } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type AccentColor = 'orange' | 'pink' | 'cyan';

interface Step1DateTimeProps {
  bookingDetails: BookingDetails;
  updateDetails: (details: Partial<BookingDetails>) => void;
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

export function Step1_DateTime({ bookingDetails, updateDetails, accentColor }: Step1DateTimeProps) {
  
  const calendarAccentClasses = {
      orange: {
        '--primary': '25 95% 53%',
        '--accent': '25 95% 53% / 0.1',
        '--accent-foreground': 'hsl(25 95% 53%)'
      },
       pink: {
        '--primary': '325 81% 59%',
        '--accent': '325 81% 59% / 0.1',
        '--accent-foreground': 'hsl(325 81% 59%)'
      },
       cyan: {
        '--primary': '190 95% 50%',
        '--accent': '190 95% 50% / 0.1',
        '--accent-foreground': 'hsl(190 95% 50%)'
      },
    } as React.CSSProperties;

  return (
    <div className="space-y-6 pt-6">
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
                            style={calendarAccentClasses[accentColor]}
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
    </div>
  );
}
