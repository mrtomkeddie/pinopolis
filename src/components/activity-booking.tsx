
'use client';

import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getApplicablePromotion } from '@/lib/promotions';
import type { BookingDetails, Activity, Promotion } from '@/lib/types';
import { Step1_Options } from './booking/step1-options';
import { Step2_Details } from './booking/step2-details';
import { Step3_Summary } from './booking/step3-summary';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

const steps = ['options', 'details', 'summary'];

export default function ActivityBooking({ activity, price }: { activity: Activity, price: number }) {
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
  });
  const [promotion, setPromotion] = useState<Promotion | null>(null);

  const { toast } = useToast();

  const basePrice = useMemo(() => {
    const totalGuests = bookingDetails.adults + bookingDetails.children;
    const bowlingPrice = totalGuests * bookingDetails.games * price;
    const softPlayPrice = bookingDetails.addSoftPlay ? bookingDetails.softPlayChildren * 5 : 0;
    return bowlingPrice + softPlayPrice;
  }, [bookingDetails, price]);

  const discountAmount = useMemo(() => {
    const applicablePromotion = bookingDetails.date ? getApplicablePromotion(bookingDetails.date) : null;
    setPromotion(applicablePromotion);
    if (applicablePromotion) {
      return basePrice * (applicablePromotion.discount / 100);
    }
    return 0;
  }, [bookingDetails.date, basePrice]);

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
        return <Step1_Options bookingDetails={bookingDetails} updateDetails={updateDetails} pricePerGame={price} />;
      case 'details':
        return <Step2_Details contactDetails={bookingDetails.contactDetails} updateContactDetails={updateContactDetails} />;
      case 'summary':
        return <Step3_Summary bookingDetails={bookingDetails} basePrice={basePrice} discountAmount={discountAmount} finalPrice={finalPrice} promotion={promotion} />;
      default:
        return null;
    }
  };

  return (
    <div className="py-4 space-y-6 flex flex-col h-full overflow-hidden">
      <ScrollArea className="flex-grow pr-6 -mr-6">
        <div className="py-4">
            {renderStep()}
        </div>
      </ScrollArea>

      <div className="flex-shrink-0 pt-4 border-t border-border">
        {currentStep > 0 && (
          <Button variant="outline" onClick={prevStep} className="mr-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        )}
        {currentStep < steps.length - 1 ? (
          <Button onClick={nextStep} className="w-full">
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleBooking} className="w-full">
            Confirm Booking & Pay
          </Button>
        )}
      </div>
    </div>
  );
}
