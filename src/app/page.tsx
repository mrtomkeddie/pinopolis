
import { Dices, Target, ToyBrick, ArrowRight, PartyPopper } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Footer from '@/components/footer';
import ActivityBooking from '@/components/activity-booking';
import type { Activity } from '@/lib/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const activities: (Activity & { gradient: string })[] = [
  {
    name: 'Cyber Bowling',
    description: 'Experience bowling with a holographic twist. Perfect for groups and all skill levels.',
    icon: Dices,
    price: 15,
    image: '/bowling.jpg',
    imageHint: 'bowling alley',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'AR Darts',
    description: 'Challenge your friends to augmented reality darts. Multiple game modes available.',
    icon: Target,
    price: 10,
    image: '/bowling.jpg',
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
    gradient: 'from-pink-500 to-purple-500',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground font-body">
      <main className="flex-1 flex flex-col items-center justify-center">
        <section className="relative w-full h-dvh flex flex-col items-center justify-center text-center bg-background overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
          <div className="relative z-10 flex flex-col items-center space-y-8">
            <Image src="/herologo.png" alt="Pinopolis Logo" width={800} height={200} className="max-w-md md:max-w-2xl px-4" />
            <Link href="#activities">
              <Button size="lg" className="mt-4">
                Book Your Experience
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        <section id="activities" className="py-16 md:py-24 bg-card/50 w-full">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Book an Activity</h2>
              <p className="mt-2 text-lg text-muted-foreground">Choose your next adventure.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity) => (
                <div key={activity.name} className={cn("p-px rounded-lg bg-gradient-to-br", activity.gradient)}>
                  <Card className="bg-card/95 border-0 hover:-translate-y-1 transition-transform duration-300 h-full group">
                    <CardHeader>
                      <div className="relative h-40 rounded-md overflow-hidden mb-4">
                          <Image src={activity.image} alt={activity.name} fill={true} style={{objectFit:"cover"}} className="group-hover:scale-105 transition-transform duration-500" data-ai-hint={activity.imageHint} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                      <div className="flex items-center gap-4">
                          <div className={cn("text-white p-2 bg-gradient-to-br rounded-lg", activity.gradient)}>
                              <activity.icon className="w-8 h-8"/>
                          </div>
                          <div>
                              <CardTitle className="font-headline text-2xl">{activity.name}</CardTitle>
                              <CardDescription className="mt-1">{activity.description}</CardDescription>
                          </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center text-lg">
                          <p>From <span className="font-bold text-primary">${activity.price}</span>/person</p>
                          <Sheet>
                              <SheetTrigger asChild>
                                  <Button variant="outline">Book Now <ArrowRight className="ml-2 h-4 w-4" /></Button>
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
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
