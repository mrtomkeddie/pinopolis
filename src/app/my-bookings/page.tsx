
'use client';

import { useState } from 'react';
import Footer from '@/components/footer';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Phone, Search } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function MyBookingsPage() {
  const [identifier, setIdentifier] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would fetch booking data here.
    // For now, we just show the static message.
    setSearched(true);
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground font-body">
      <header className="py-4 border-b border-white/10">
        <div className="container mx-auto flex justify-center">
            <Link href="/">
                <Image src="/herologo.png" alt="Pinopolis Logo" width={200} height={50} />
            </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
            
            <Card className="bg-black border border-white/10">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">Check Your Bookings</CardTitle>
                    <CardDescription>Enter your email or phone number to find your upcoming bookings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="identifier">Email or Phone Number</Label>
                            <Input 
                                id="identifier" 
                                type="text"
                                placeholder="e.g., your@email.com or 07123456789"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0">
                            <Search className="mr-2 h-4 w-4"/>
                            Find Bookings
                        </Button>
                    </form>

                    {searched && (
                        <Alert className="mt-6" variant="default">
                            <Phone className="h-4 w-4" />
                            <AlertTitle>Need to make a change?</AlertTitle>
                            <AlertDescription>
                                To cancel or amend your booking, please call our team directly on <strong>01554 556226</strong>.
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
