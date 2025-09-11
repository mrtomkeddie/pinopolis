
'use client';

import Link from 'next/link';
import { ArrowLeft, Dices, Target, ToyBrick, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Activity } from '@/lib/types';
import ActivityBooking from '@/components/activity-booking';
import DartsBooking from '@/components/darts-booking';
import SoftPlayBooking from '@/components/soft-play-booking';

const activities: (Activity & { gradient: string, accentColor: 'orange' | 'pink' | 'cyan' })[] = [
  {
    name: 'Bowling',
    description: 'Brunswick bowling with state-of-the-art lanes, scoring systems and atmospheric lighting.',
    icon: Dices,
    price: 6.50, // Price per game per person
    image: '/bowling.jpg',
    imageHint: 'bowling alley',
    gradient: 'from-yellow-500 to-orange-500',
    accentColor: 'orange',
  },
  {
    name: 'AR Darts',
    description: 'Augmented reality dartboards with digital targets, effects and competitive scoring modes.',
    icon: Target,
    price: 0, // Price is complex, handled in component
    image: '/darts.jpg',
    imageHint: 'darts game',
    gradient: 'from-pink-500 to-purple-500',
    accentColor: 'pink',
  },
  {
    name: 'Soft Play',
    description: 'Safe and exciting soft play area designed for children with interactive features and supervised fun.',
    icon: ToyBrick,
    price: 5, // Price per hour per child
    image: '/softplay.jpg',
    imageHint: 'kids playground',
    gradient: 'from-cyan-500 to-blue-500',
    accentColor: 'cyan',
  },
];

const accentHoverBorderColor = {
      orange: 'hover:border-orange-500/50',
      pink: 'hover:border-pink-500/50',
      cyan: 'hover:border-cyan-500/50',
  }

export default function NewBookingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-body">
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
            <div>
                <h1 className="text-xl font-bold font-headline">Create New Booking</h1>
                <p className="text-sm text-muted-foreground">Pinopolis</p>
            </div>
            <Link href="/admin">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
            </Link>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Choose an Experience</h2>
            <p className="text-muted-foreground">Select an activity to create a new walk-in booking.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
              <Card key={activity.name} className={cn("bg-black border border-white/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col overflow-hidden rounded-xl", accentHoverBorderColor[activity.accentColor])}>
              <CardHeader className="p-0 relative">
                  <div className="relative h-48">
                      <Image
                          src={activity.image}
                          alt={activity.name}
                          fill={true}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{objectFit: 'cover'}}
                          className="group-hover:scale-105 transition-transform duration-500"
                          data-ai-hint={activity.imageHint}
                      />
                  </div>
                   <div className={cn("h-1 w-full bg-gradient-to-r", activity.gradient)}></div>
              </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start">
                      <div className='flex-grow'>
                          <CardTitle className="font-headline text-2xl">{activity.name}</CardTitle>
                      </div>
                      <Zap className={cn("w-6 h-6", {
                        'text-orange-400': activity.accentColor === 'orange',
                        'text-pink-400': activity.accentColor === 'pink',
                        'text-cyan-400': activity.accentColor === 'cyan',
                      })} />
                  </div>
                  <CardDescription className="mt-2 text-base text-muted-foreground">{activity.description}</CardDescription>
                  
                  <div className="flex-grow" />
                  <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/10">
                      <p className="text-xl">
                        {activity.price > 0 ? (
                            <>£<span className="font-bold">{activity.price.toFixed(2)}</span><span className="text-sm text-muted-foreground">{activity.name === 'Bowling' ? '/game' : '/child'}</span></>
                        ) : (
                            <><span className="font-bold text-base">From £10.95 /oche</span></>
                        )}
                      </p>
                      <Sheet>
                          <SheetTrigger asChild>
                              <Button variant="outline" className={cn("bg-gradient-to-r text-white border-0", activity.gradient)}>Book Now <ArrowRight className="ml-2 h-4 w-4" /></Button>
                          </SheetTrigger>
                          <SheetContent className="w-full md:max-w-md bg-card border-l border-border flex flex-col p-0">
                              {activity.name === 'Bowling' && <ActivityBooking activity={activity} price={activity.price} accentColor={activity.accentColor} />}
                              {activity.name === 'AR Darts' && <DartsBooking activity={activity} accentColor={activity.accentColor} />}
                              {activity.name === 'Soft Play' && <SoftPlayBooking activity={activity} price={activity.price} accentColor={activity.accentColor} />}
                          </SheetContent>
                      </Sheet>
                  </div>
              </CardContent>
              </Card>
          ))}
          </div>
      </main>
    </div>
  );
}
