
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getApplicablePromotion } from '@/lib/promotions';
import type { BookingDetails, Activity, Promotion } from '@/lib/types';
import { Step1_DateTime } from './booking/step1-date-time';
import { Step1_GuestOptions } from './booking/step1-guest-options';
import { Step2_Details } from './booking/step2-details';
import { Step3_Summary } from './booking/step3-summary';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { cn } from '@/lib/utils';

const steps = ['dateTime', 'guestOptions', 'details', 'summary'];

type AccentColor = 'orange' | 'pink' | 'cyan';

export default function ActivityBooking({ activity, price, accentColor }: { activity: Activity, price: number, accentColor: AccentColor }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    activityName: activity.name,
    adults: 1,
    children: 0,
    games: 1,
    addSoftPlay: false,
    softPlayChildren: 0,
    date: new Date(),
    time: '',
    contactDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      postcode: '',
      marketingOptIn: false,
    },
    dealApplied: false,
  });
  const [promotion, setPromotion] = useState<Promotion | null>(null);

  const { toast } = useToast();
  
  useEffect(() => {
    const applicablePromotion = getApplicablePromotion(bookingDetails.date);
    setPromotion(applicablePromotion);

    if (applicablePromotion) {
        if(bookingDetails.dealApplied) {
            if(applicablePromotion.type === 'perPerson' || applicablePromotion.type === 'package') {
                updateDetails({ games: applicablePromotion.games });
            }
            if (applicablePromotion.type === 'package') {
                updateDetails({ adults: 2, children: 0 });
            }
        }
    } else {
        // If no promotion, ensure dealApplied is false
        updateDetails({ dealApplied: false });
    }
  }, [bookingDetails.date, bookingDetails.dealApplied]);


  const basePrice = useMemo(() => {
    if (promotion && bookingDetails.dealApplied) {
        switch (promotion.type) {
            case 'perPerson':
                return (bookingDetails.adults + bookingDetails.children) * promotion.price;
            case 'package':
                const additionalGuests = Math.max(0, bookingDetails.adults - promotion.minGuests);
                return promotion.price + (additionalGuests * promotion.pricePerAdditionalGuest);
            case 'discount':
                const totalGuests = bookingDetails.adults + bookingDetails.children;
                const bowlingPrice = totalGuests * bookingDetails.games * price;
                return bowlingPrice;
        }
    }
    // Default pricing if no promotion
    const totalGuests = bookingDetails.adults + bookingDetails.children;
    const bowlingPrice = totalGuests * bookingDetails.games * price;
    const softPlayPrice = bookingDetails.addSoftPlay ? bookingDetails.softPlayChildren * 5 : 0;
    return bowlingPrice + softPlayPrice;
  }, [bookingDetails, price, promotion]);

  const discountAmount = useMemo(() => {
    if (promotion?.type === 'discount' && bookingDetails.dealApplied) {
        return basePrice * (promotion.discount / 100);
    }
    return 0;
  }, [promotion, basePrice, bookingDetails.dealApplied]);

  const finalPrice = useMemo(() => basePrice - discountAmount, [basePrice, discountAmount]);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleBooking = () => {
    // Here you would typically handle payment processing
    toast({
      title: 'Booking Confirmed!',
      description: `Your booking for ${activity.name} has been made.`,
    });
    // Potentially redirect to a "My Bookings" page
  };

  const updateDetails = (details: Partial<BookingDetails>) => {
    setBookingDetails((prev) => ({ ...prev, ...details }));
  };
  
  const updateContactDetails = (details: Partial<BookingDetails['contactDetails']>) => {
    setBookingDetails(prev => ({
        ...prev,
        contactDetails: { ...prev.contactDetails, ...details }
    }));
  };

  const renderStep = () => {
    switch (steps[currentStep]) {
      case 'dateTime':
        return <Step1_DateTime bookingDetails={bookingDetails} updateDetails={updateDetails} accentColor={accentColor} />;
      case 'guestOptions':
        return <Step1_GuestOptions bookingDetails={bookingDetails} updateDetails={updateDetails} pricePerGame={price} promotion={promotion} accentColor={accentColor} />;
      case 'details':
        return <Step2_Details contactDetails={bookingDetails.contactDetails} updateContactDetails={updateContactDetails} />;
      case 'summary':
        return <Step3_Summary bookingDetails={bookingDetails} basePrice={basePrice} discountAmount={discountAmount} finalPrice={finalPrice} promotion={bookingDetails.dealApplied ? promotion : null} />;
      default:
        return null;
    }
  };
  
  const accentClasses = {
      orange: 'from-yellow-500 to-orange-500',
      pink: 'from-pink-500 to-purple-500',
      cyan: 'from-cyan-500 to-blue-500',
  };

  const isNextDisabled = () => {
    if (steps[currentStep] === 'dateTime') {
      return !bookingDetails.date || !bookingDetails.time;
    }
    return false;
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
        <SheetHeader className="p-4 flex-shrink-0 border-b">
            <SheetTitle className="font-headline text-2xl">Book: {activity.name}</SheetTitle>
            <SheetDescription>Select your details to reserve a spot.</SheetDescription>
        </SheetHeader>
      <ScrollArea className="flex-grow bg-card">
        { currentStep === 0 && (
          <div className="p-6">
            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Weekly Deals Available!</AlertTitle>
                <AlertDescription>
                    Select a Monday, Tuesday or Wednesday on the calendar to see our special offers.
                </AlertDescription>
            </Alert>
          </div>
        )}
        <div className="p-6 pt-0">
            {renderStep()}
        </div>
      </ScrollArea>

      <div className="flex-shrink-0 px-6 py-4 border-t border-border bg-black/50">
         <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">Total Price:</span>
            <span className="text-xl font-bold">£{finalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
            {currentStep > 0 && (
            <Button variant="outline" onClick={prevStep} className="mr-2">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            )}
            <div className="flex-grow" />
            {currentStep < steps.length - 1 ? (
            <Button onClick={nextStep} disabled={isNextDisabled()} className={cn("w-full ml-auto text-white border-0 bg-gradient-to-r", accentClasses[accentColor])} style={{maxWidth: 'calc(100% - 100px)'}}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            ) : (
            <Button onClick={handleBooking} className={cn("w-full ml-auto text-white border-0 bg-gradient-to-r", accentClasses[accentColor])} style={{maxWidth: 'calc(100% - 100px)'}}>
                Confirm Booking & Pay
            </Button>
            )}
        </div>
      </div>
    </div>
  );
}
