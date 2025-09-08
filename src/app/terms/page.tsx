
'use client';

import Footer from '@/components/footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground font-body">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-8">
              Terms & Conditions
            </h1>
            <div className="prose prose-invert max-w-none text-muted-foreground space-y-6">
              <p>
                Please read our terms and conditions carefully before using our services.
              </p>
              <p>
                <em>Last updated: September 8, 2025</em>
              </p>
              
              <h2 className="text-2xl font-headline text-foreground">GENERAL ADMISSION</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We request that you arrive at least 15 minutes before your allocated time slot to allow you to comply with all the registration formalities.</li>
                <li>Anyone who is considered to be intimidating or aggressive to our customers or team members will be asked to leave immediately and will be refused admission at all of our venues.</li>
                <li>Please comply with our strict no-smoking policies at all our venues.</li>
                <li>Please comply with our strict no-smoking policies throughout the building which also includes e-cigarettes.</li>
                <li>Do not bring in food or drink from outside premises.</li>
                <li>The Management at all our venues reserves the right at all times to search customers and refuse admission at our absolute discretion.</li>
              </ul>

              <h2 className="text-2xl font-headline text-foreground">ALCOHOL & SOCIAL RESPONSIBILITY</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We operate all our licensed venues responsibly, safely and within the law. We want our guests to enjoy visiting us and to find safe, welcoming environments, without neither condoning nor encouraging excessive drinking. We support the objectives of the Licensing Act 2003 and the Licensing (Scotland) Act 2005. We always seek to work closely and consistently with key authorities including Police Fire, Environmental Health and Local Authorities.</li>
                <li>We actively operate the Challenge 25 Policy.</li>
              </ul>
              
              <h2 className="text-2xl font-headline text-foreground">PRIVATE HIRE TERMS</h2>
              <p>
                Please contact our venue directly for the Private Hire Terms and Conditions.
              </p>

              <h2 className="text-2xl font-headline text-foreground">TERMS AND CONDITIONS</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All our bookings prices apply to children aged 16 and under.</li>
                <li>Student discounts are only be given when presented with a valid student ID card at the time of booking.</li>
                <li>Bookings are only be considered final when full payment has been made and an official receipt or e-mail confirmation has been issued by Pinopolis. It is your responsibility to check the accuracy of your booking and contact us immediately if you spot any errors in your booking. However, we will do our best to ensure that your booking commences at the time slot allocated, but we cannot guarantee that booking commences at the exact time.</li>
                <li>We can only hold your lane for 10 minutes. After this time, we cannot guarantee your booking. However, we will do our best to rearrange if there is a slot available.</li>
                <li>Pinopolis is not under any obligation to offer any refunds for pre-purchased bowling time. If you have pre-purchased bowling time, you may not exchange in for vouchers unless permitted by a Manager at Pinopolis at his or her sole discretion.</li>
                <li>No booking can be cancelled past its start time that qualifies as a no-show; no refund can be offered and cancellation fees apply.</li>
                <li>Bookings are only valid for the date and times shown and are void if tampered with and are strictly non-transferable.</li>
                <li>Pinopolis are entitled to cancel your booking at any time. In this event of a cancellation by Pinopolis, you shall be entitled to a full refund or the option to reschedule your allocation, unless circumstances that shall be beyond the reasonable control of Pinopolis which is a limited liability partnership incorporated in Wales under Company Number 07445864 and whose registered office address is at 46 High Street, Haverfordwest, Pembrokeshire SA61 2DP.</li>
                <li>Pinopolis will process any information that we collect from you in accordance with our Privacy Policy which is available at request or at our reception desks.</li>
                <li>Pinopolis reserves the right to modify/vary change any of its Activities at any time.</li>
                <li>Pinopolis will not be held responsible for any loss or damage to any of your personal belongings during your visit to the venue.</li>
                <li>If you or any member of your group causes any damage to any of the play's facilities, fixtures, or fittings, then you will be liable for the cost of repairing and/or replacing the damaged item and loss of business incurred by the venue.</li>
                <li>The Terms and Conditions (together with any applicable Pinopolis Rules and Privacy Policy) set out the terms of agreement between Pinopolis Limited trading as Pinopolis which is a limited liability partnership and you. Please read them that you accept the Conditions and agree to comply with them. If you do not wish to be bound by these Conditions and/or you disagree with any of these Conditions, you/your child must not take part in any Activities in the venue.</li>
                <li>The Activities are provided by Pinopolis Limited trading as Pinopolis which is a limited liability partnership incorporated in Wales under Company Number 07445864 and whose registered office address is at 46 High Street, Haverfordwest, Pembrokeshire SA61 2DP.</li>
              </ul>
              
              <h2 className="text-2xl font-headline text-foreground">GOVERNING LAW</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>These Conditions and any dispute or claim (including non-contractual disputes or claims) arising out of or in connection with it or its subject matter or formation shall be governed by and construed in accordance with the law of territory of incorporation.</li>
                <li>The courts of territory of incorporation shall have exclusive jurisdiction to settle any dispute or claim (including non-contractual disputes or claims) arising out of or in connection with these Conditions or its subject matter or formation.</li>
                <li>Nothing in these Conditions shall limit or exclude Pinopolis' liability for: death or personal injury caused by its negligence, or the negligence of its employees, agents or subcontractors (as applicable); fraud or fraudulent misrepresentation.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
