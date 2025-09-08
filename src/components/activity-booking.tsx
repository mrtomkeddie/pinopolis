
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getApplicablePromotion } from '@/lib/promotions';
import type { BookingDetails, Activity, Promotion } from '@/lib/types';
import { Step1_Options } from './booking/step1-options';
import { Step2_Details } from './booking/step2-details';
import { Step3_Summary } from './booking/step3-summary';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { cn } from '@/lib/utils';

const steps = ['options', 'details', 'summary'];

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
    date: undefined,
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
        if (bookingDetails.dealApplied) {
            updateDetails({ dealApplied: false });
        }
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
    const pricePerGame = bookingDetails.games > 1 ? 5.00 : price;
    const bowlingPrice = totalGuests * pricePerGame * bookingDetails.games;
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
      case 'options':
        return <Step1_Options bookingDetails={bookingDetails} updateDetails={updateDetails} pricePerGame={price} promotion={promotion} accentColor={accentColor} />;
      case 'details':
        return <Step2_Details contactDetails={bookingDetails.contactDetails} updateContactDetails={updateContactDetails} />;
      case 'summary':
        return <Step3_Summary bookingDetails={bookingDetails} basePrice={basePrice} discountAmount={discountAmount} finalPrice={finalPrice} promotion={bookingDetails.dealApplied ? promotion : null} />;
      default:
        return null;
    }
  };
  
  const accentGradient = {
      orange: 'from-yellow-500 to-orange-500',
      pink: 'from-pink-500 to-purple-500',
      cyan: 'from-cyan-500 to-blue-500',
  };

  const accentText = {
      orange: 'text-orange-400',
      pink: 'text-pink-400',
      cyan: 'text-cyan-400',
  };

  const isNextDisabled = () => {
    if (steps[currentStep] === 'options') {
      return !bookingDetails.date || !bookingDetails.time;
    }
    if (steps[currentStep] === 'details') {
        return !bookingDetails.contactDetails.firstName || !bookingDetails.contactDetails.lastName || !bookingDetails.contactDetails.email;
    }
    return false;
  };

  return (
    <>
      <SheetHeader className="p-6 pb-0 flex-shrink-0">
        <div className="pb-6 border-b">
          <SheetTitle className={cn("font-headline text-2xl", accentText[accentColor])}>Book: {activity.name}</SheetTitle>
          <SheetDescription>Select your details to reserve a spot.</SheetDescription>
        </div>
      </SheetHeader>
      
      <ScrollArea className="flex-grow min-h-0">
        <div className="p-6" style={{ contain: 'layout' }}>
            {renderStep()}
        </div>
      </ScrollArea>

      <div className="flex-shrink-0 px-6 py-4 border-t bg-card">
         <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">Total Price:</span>
            <span className="text-xl font-bold">£{finalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between gap-4">
            {currentStep > 0 ? (
                <Button variant="outline" onClick={prevStep} className="w-1/3">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
            ) : <div className="w-1/3" /> }
            
            {currentStep < steps.length - 1 ? (
                <Button onClick={nextStep} disabled={isNextDisabled()} className={cn("text-white border-0 bg-gradient-to-r flex-grow", accentGradient[accentColor])}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            ) : (
                <Button onClick={handleBooking} className={cn("text-white border-0 bg-gradient-to-r flex-grow", accentGradient[accentColor])}>
                    Confirm Booking & Pay
                </Button>
            )}
        </div>
      </div>
    </>
  );
}
