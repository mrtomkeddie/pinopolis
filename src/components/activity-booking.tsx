'use client';

import { useState, useEffect, useMemo } from 'react';
import { Calendar as CalendarIcon, Clock, Users, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { getApplicablePromotion } from '@/lib/promotions';
import type { Activity } from '@/lib/types';
import { Badge } from './ui/badge';

interface ActivityBookingProps {
  activity: Activity;
}

const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
const durations = [1, 1.5, 2, 2.5, 3];
const guestOptions = Array.from({ length: 10 }, (_, i) => i + 1);

export default function ActivityBooking({ activity }: ActivityBookingProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>('14:00');
  const [duration, setDuration] = useState<number>(1);
  const [guests, setGuests] = useState<number>(2);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [promotionName, setPromotionName] = useState<string | null>(null);

  const { toast } = useToast();

  const pricePerGuest = activity.price;

  useEffect(() => {
    const basePrice = pricePerGuest * guests * duration;
    const promotion = date ? getApplicablePromotion(date) : null;

    if (promotion) {
      const discountAmount = basePrice * (promotion.discount / 100);
      setDiscount(discountAmount);
      setTotalPrice(basePrice - discountAmount);
      setPromotionName(promotion.name);
    } else {
      setDiscount(0);
      setTotalPrice(basePrice);
      setPromotionName(null);
    }
  }, [date, duration, guests, pricePerGuest]);

  const handleBooking = () => {
    toast({
      title: 'Booking Confirmed!',
      description: `You've booked ${activity.name} for ${guests} people on ${date ? format(date, 'PPP') : ''} at ${time}.`,
    });
  };

  const finalPrice = useMemo(() => totalPrice, [totalPrice]);

  return (
    <div className="py-4 space-y-8">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={'outline'}
                className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="time">Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger>
                <Clock className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="duration">Duration (hours)</Label>
            <Select value={String(duration)} onValueChange={(val) => setDuration(Number(val))}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {durations.map((d) => (
                  <SelectItem key={d} value={String(d)}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="guests">Guests</Label>
          <Select value={String(guests)} onValueChange={(val) => setGuests(Number(val))}>
            <SelectTrigger>
              <Users className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select guests" />
            </SelectTrigger>
            <SelectContent>
              {guestOptions.map((g) => (
                <SelectItem key={g} value={String(g)}>
                  {g} person{g > 1 ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-muted/20 p-4">
        <h3 className="font-headline text-lg font-semibold">Booking Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Base price:</span>
            <span>${(pricePerGuest * guests * duration).toFixed(2)}</span>
          </div>
          {promotionName && (
            <div className="flex justify-between text-primary">
              <span>
                <Badge variant="outline" className="border-primary text-primary mr-2">{promotionName}</Badge>
                Discount:
              </span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
            <span>Total Price:</span>
            <span>${finalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Button size="lg" className="w-full" onClick={handleBooking}>
        Confirm Booking <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
