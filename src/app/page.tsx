

import { Dices, Target, ToyBrick, ArrowRight, PartyPopper, MapPin, Clock, Zap } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Footer from '@/components/footer';
import ActivityBooking from '@/components/activity-booking';
import type { Activity } from '@/lib/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import PartyPackages from '@/components/party-packages';
import SegmentedControl from '@/components/segmented-control';

const activities: (Activity & { gradient: string })[] = [
  {
    name: 'Cyber Bowling',
    description: 'Experience bowling with a holographic twist. Perfect for groups and all skill levels.',
    icon: Dices,
    price: 15,
    image: '/bowling.jpg',
    imageHint: 'bowling alley',
    gradient: 'from-pink-500 to-purple-500',
  },
  {
    name: 'AR Darts',
    description: 'Challenge your friends to augmented reality darts. Multiple game modes available.',
    icon: Target,
    price: 10,
    image: '/darts.jpg',
    imageHint: 'darts game',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'Zero-G Soft Play',
    description: 'A multi-level soft play area with a futuristic theme for the little ones.',
    icon: ToyBrick,
    price: 8,
    image: '/softplay.jpg',
    imageHint: 'kids playground',
    gradient: 'from-cyan-500 to-blue-500',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground font-body">
      <main className="flex-1 flex flex-col items-center justify-center">
        <section className="relative w-full h-dvh flex flex-col items-center justify-center text-center bg-background overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
          <div className="relative z-10 flex flex-col items-center space-y-4">
            <Image src="/herologo.png?v=1" alt="Pinopolis Logo" width={800} height={200} className="max-w-md md:max-w-2xl px-4" />
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-muted-foreground mt-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Sandy Road, Llanelli, SA15 4DP</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border"></div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>Daily: 10:30am - 10:00pm</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border"></div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-pink-500" />
                <span>Premium Experience</span>
              </div>
            </div>
            <Link href="#activities">
              <Button size="lg" className="mt-8">
                Book Your Experience
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        <section id="experiences" className="py-16 md:py-24 w-full">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <SegmentedControl />
                </div>
                <div id="activities">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline">Book an Activity</h2>
                        <p className="mt-2 text-lg text-muted-foreground">Choose your next adventure.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activities.map((activity) => (
                        <Card key={activity.name} className="bg-card/95 border-t-2 border-primary/40 hover:-translate-y-1 transition-transform duration-300 group flex flex-col">
                        <CardHeader className="p-0">
                            <div className="relative h-48 rounded-t-lg overflow-hidden">
                            <Image
                                src={activity.image}
                                alt={activity.name}
                                fill={true}
                                style={{objectFit: 'cover'}}
                                className="group-hover:scale-105 transition-transform duration-500"
                                data-ai-hint={activity.imageHint}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 flex-grow flex flex-col">
                            <div className="flex justify-between items-start">
                                <div className='flex-grow'>
                                    <CardTitle className="font-headline text-2xl">{activity.name}</CardTitle>
                                    <CardDescription className="mt-2 text-base">{activity.description}</CardDescription>
                                </div>
                                <div className={cn("text-white p-2 bg-gradient-to-br rounded-lg -mt-12", activity.gradient)}>
                                    <activity.icon className="w-6 h-6"/>
                                </div>
                            </div>
                            <div className="flex-grow" />
                            <div className="flex justify-between items-center mt-6 pt-6 border-t border-border/20">
                                <p className="text-xl">From <span className="font-bold text-primary">${activity.price}</span><span className="text-sm text-muted-foreground">/person</span></p>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" className={cn("bg-gradient-to-r text-white border-0", activity.gradient)}>Book Now <ArrowRight className="ml-2 h-4 w-4" /></Button>
                                    </SheetTrigger>
                                    <SheetContent className="w-full md:max-w-md bg-card border-l border-border">
                                        <SheetHeader>
                                            <SheetTitle className="font-headline text-2xl">Book: {activity.name}</SheetTitle>
                                            <SheetDescription>Select your details to reserve a spot.</SheetDescription>
                                        </SheetHeader>
                                        <ActivityBooking activityName={activity.name} price={activity.price} />
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </CardContent>
                        </Card>
                    ))}
                    </div>
                </div>
                {/* Placeholder for Food & Drinks and Party Bookings sections */}
                <div id="food-drinks" className="hidden">
                    {/* Food & Drinks Content Here */}
                </div>
                <div id="party-bookings" className="hidden">
                    {/* Party Bookings Content Here */}
                </div>
            </div>
        </section>

        <section id="party-packages" className="py-16 md:py-24 w-full">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline flex items-center justify-center gap-4"><PartyPopper className="w-10 h-10 text-primary" /> Book a Party Package</h2>
              <p className="mt-2 text-lg text-muted-foreground">Let our AI assistant find the perfect package for your event.</p>
            </div>
            <PartyPackages />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
