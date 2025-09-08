
'use client';

import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getApplicablePromotion } from '@/lib/promotions';
import type { SoftPlayBookingDetails, Activity, Promotion } from '@/lib/types';
import { Step1_SoftPlay_Options } from './booking/step1-soft-play-options';
import { Step2_Details } from './booking/step2-details';
import { Step3_SoftPlay_Summary } from './booking/step3-soft-play-summary';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { cn } from '@/lib/utils';

const steps = ['options', 'details', 'summary'];

type AccentColor = 'orange' | 'pink' | 'cyan';

export default function SoftPlayBooking({ activity, price, accentColor }: { activity: Activity, price: number, accentColor: AccentColor }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingDetails, setBookingDetails] = useState<SoftPlayBookingDetails>({
    activityName: activity.name,
    adults: 0,
    children: 1,
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
  });
  const [promotion, setPromotion] = useState<Promotion | null>(null);

  const { toast } = useToast();

  const basePrice = useMemo(() => {
    return bookingDetails.children * price;
  }, [bookingDetails, price]);

  const discountAmount = useMemo(() => {
    if (!bookingDetails.date) return 0;
    const applicablePromotion = getApplicablePromotion(bookingDetails.date);
    setPromotion(applicablePromotion);
    if (applicablePromotion) {
      // Assuming promotions for soft play are discounts. This can be expanded.
      if (applicablePromotion.type === 'discount') {
        return basePrice * (applicablePromotion.discount / 100);
      }
    }
    return 0;
  }, [bookingDetails.date, basePrice]);

  const finalPrice = useMemo(() => basePrice - discountAmount, [basePrice, discountAmount]);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleBooking = () => {
    toast({
      title: 'Booking Confirmed!',
      description: `Your booking for ${activity.name} has been made.`,
    });
  };

  const updateDetails = (details: Partial<SoftPlayBookingDetails>) => {
    setBookingDetails((prev) => ({ ...prev, ...details }));
  };
  
  const updateContactDetails = (details: Partial<SoftPlayBookingDetails['contactDetails']>) => {
    setBookingDetails(prev => ({
        ...prev,
        contactDetails: { ...prev.contactDetails, ...details }
    }));
  };

  const renderStep = () => {
    switch (steps[currentStep]) {
      case 'options':
        return <Step1_SoftPlay_Options bookingDetails={bookingDetails} updateDetails={updateDetails} />;
      case 'details':
        return <Step2_Details contactDetails={bookingDetails.contactDetails} updateContactDetails={updateContactDetails} />;
      case 'summary':
        return <Step3_SoftPlay_Summary bookingDetails={bookingDetails} basePrice={basePrice} discountAmount={discountAmount} finalPrice={finalPrice} promotion={promotion} />;
      default:
        return null;
    }
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

  return (
    <>
       <SheetHeader className="p-6 flex-shrink-0 border-b">
            <SheetTitle className={cn("font-headline text-2xl", accentText[accentColor])}>Book: {activity.name}</SheetTitle>
            <SheetDescription>Select your details to reserve a spot.</SheetDescription>
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
