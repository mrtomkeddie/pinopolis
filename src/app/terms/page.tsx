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
                Welcome to Pinopolis Book. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Pinopolis Book if you do not agree to all of the terms and conditions stated on this page.
              </p>
              
              <h2 className="text-2xl font-headline text-foreground">Bookings and Payments</h2>
              <p>
                All bookings are subject to availability. Payment must be made in full at the time of booking to confirm your reservation. We accept all major credit and debit cards. All prices are inclusive of VAT.
              </p>

              <h2 className="text-2xl font-headline text-foreground">Cancellations and Refunds</h2>
              <p>
                Cancellations made more than 48 hours before the scheduled booking time will receive a full refund. Cancellations made within 48 hours are non-refundable. To cancel a booking, please contact us directly via email or phone.
              </p>

              <h2 className="text-2xl font-headline text-foreground">Liability</h2>
              <p>
                Pinopolis Book is not liable for any personal injury or loss or damage to personal property, except where it is caused by our negligence. All guests are expected to behave responsibly and follow the rules of each activity.
              </p>

              <h2 className="text-2xl font-headline text-foreground">Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of Wales and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
