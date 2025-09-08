
'use client';

import type { DartsBookingDetails, Promotion } from '@/lib/types';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Users, Calendar, Target, ToyBrick, Clock, Tag } from 'lucide-react';

interface Step3DartsProps {
  bookingDetails: DartsBookingDetails;
  basePrice: number;
  discountAmount: number;
  finalPrice: number;
  promotion: Promotion | null;
}

export function Step3_Darts_Summary({ bookingDetails, basePrice, discountAmount, finalPrice, promotion }: Step3DartsProps) {
  const { activityName, oches, duration, addSoftPlay, softPlayChildren, date, time, contactDetails } = bookingDetails;

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-lg">Review & Confirm</h3>
      
      <div className="space-y-4 p-4 border rounded-lg">
        {promotion ? (
             <div className="flex items-start gap-3 text-primary pb-4 border-b">
                <Tag className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold">{promotion.name}</h4>
                    <p className="text-sm text-primary/80">{promotion.description}</p>
                </div>
            </div>
        ) : (
            <h4 className="font-semibold text-primary">{activityName}</h4>
        )}
        <div className="flex items-center gap-2 text-sm"><Target className="w-4 h-4" /> {oches} Oche(s)</div>
        <div className="flex items-center gap-2 text-sm"><Clock className="w-4 h-4" /> {duration} Minutes</div>
        <div className="flex items-center gap-2 text-sm"><Calendar className="w-4 h-4" /> {date ? format(date, 'E, d MMM yyyy') : 'N/A'} at {time || 'N/A'}</div>
        
        {addSoftPlay && (
            <div className="flex items-center gap-2 text-sm pt-2 border-t mt-2"><ToyBrick className="w-4 h-4 text-cyan-400" /> Soft Play for {softPlayChildren} child(ren)</div>
        )}
      </div>

      <div className="space-y-4 p-4 border rounded-lg">
        <h4 className="font-semibold">Your Details</h4>
        <p className="text-sm">{contactDetails.firstName} {contactDetails.lastName}</p>
        <p className="text-sm text-muted-foreground">{contactDetails.email}</p>
        <p className="text-sm text-muted-foreground">{contactDetails.phone}</p>
      </div>

      <div className="space-y-4 rounded-lg border bg-muted/20 p-4">
        <h3 className="font-headline text-lg font-semibold">Pricing Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Base price:</span>
            <span>£{basePrice.toFixed(2)}</span>
          </div>
          {promotion && discountAmount > 0 && (
            <div className="flex justify-between text-primary">
              <span>
                <Badge variant="outline" className="border-primary text-primary mr-2">{promotion.name}</Badge>
                Discount:
              </span>
              <span>-£{discountAmount.toFixed(2)}</span>
            </div>
          )}
          <Separator className="my-2" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total Price:</span>
            <span>£{finalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
