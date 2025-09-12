
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Footer from '@/components/footer';

export default function LogoutPage() {

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground font-body">
        <header className="py-4 border-b border-white/10">
            <div className="container mx-auto flex justify-center">
                <Link href="/">
                    <Image src="/herologo.png" alt="Pinopolis Logo" width={200} height={50} />
                </Link>
            </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-md mx-auto">
            <Card className="bg-black border border-white/10">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                    <LogOut className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl text-primary">You have been logged out.</CardTitle>
                <CardDescription>Thank you for managing Pinopolis. You can now safely close this page.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/" className="w-full">
                    <Button variant="outline" className="w-full">
                        <Home className="mr-2 h-4 w-4" /> Go to Homepage
                    </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
