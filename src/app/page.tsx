
'use client';

import { useState } from 'react';
import { Dices, Target, ToyBrick, ArrowRight, PartyPopper, MapPin, Clock, Zap, Utensils, Martini, Users } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import MenuDialog from '@/components/menu-dialog';
import { streetFoodMenu, drinksMenu } from '@/lib/menu-data';

const activities: (Activity & { gradient: string, accentColor: 'orange' | 'pink' | 'cyan' })[] = [
  {
    name: 'Cyber Bowling',
    description: 'Brunswick bowling with state-of-the-art lanes, scoring systems and atmospheric lighting.',
    icon: Dices,
    price: 35,
    image: '/bowling.jpg',
    imageHint: 'bowling alley',
    gradient: 'from-yellow-500 to-orange-500',
    accentColor: 'orange',
  },
  {
    name: 'AR Darts',
    description: 'Augmented reality dartboards with digital targets, effects and competitive scoring modes.',
    icon: Target,
    price: 28,
    image: '/darts.jpg',
    imageHint: 'darts game',
    gradient: 'from-pink-500 to-purple-500',
    accentColor: 'pink',
  },
  {
    name: 'Zero-G Soft Play',
    description: 'Safe and exciting soft play area designed for children with interactive features and supervised fun.',
    icon: ToyBrick,
    price: 8,
    image: '/softplay.jpg',
    imageHint: 'kids playground',
    gradient: 'from-cyan-500 to-blue-500',
    accentColor: 'cyan',
  },
];

const foodAndDrinks = [
  {
    name: 'American Style Street Food',
    description: 'Authentic American street food including loaded burgers, wings, nachos and BBQ served in a neon-lit atmosphere.',
    icon: Utensils,
    image: '/food1.jpg',
    imageHint: 'street food burgers',
    gradient: 'from-cyan-500 to-blue-500',
    tags: ['Loaded Burgers', 'BBQ Specials', 'Sharing Platters'],
    buttonText: 'View Menu',
    menu: streetFoodMenu,
    accentColor: 'cyan' as const,
  },
  {
    name: 'Craft Beer & Cocktails',
    description: 'Premium craft beers on tap alongside expertly crafted cocktails in a futuristic sports bar atmosphere.',
    icon: Martini,
    image: '/drinks.jpg',
    imageHint: 'craft beer cocktails',
    gradient: 'from-pink-500 to-purple-500',
    tags: ['Craft Beer Selection', 'Live Sports TV', 'Draft Cocktails'],
    buttonText: 'View Drinks',
    menu: drinksMenu,
    accentColor: 'pink' as const,
  },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState<'experiences' | 'food-drinks' | 'party-bookings'>('experiences');

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
            <Link href="#experiences">
              <Button size="lg" className="mt-8">
                Book Your Experience
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        <section id="content" className="py-16 md:py-24 w-full">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <SegmentedControl activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                
                {activeTab === 'experiences' && (
                  <div id="activities">
                      <div className="text-center mb-12">
                          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Book an Activity</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {activities.map((activity) => (
                          <Card key={activity.name} className="bg-black border border-white/10 hover:-translate-y-1 transition-transform duration-300 group flex flex-col overflow-hidden rounded-xl">
                          <CardHeader className="p-0 relative">
                              <div className="relative h-48">
                                  <Image
                                      src={activity.image}
                                      alt={activity.name}
                                      fill={true}
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
                              <div className="flex items-center gap-4 text-muted-foreground text-sm mt-4">
                                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /><span>90 min</span></div>
                                <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /><span>2-8 players</span></div>
                              </div>
                              <div className="flex-grow" />
                              <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/10">
                                  <p className="text-xl">£<span className="font-bold">{activity.price}</span><span className="text-sm text-muted-foreground">/hour</span></p>
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
                )}
                
                {activeTab === 'food-drinks' && (
                  <div id="food-drinks">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline text-yellow-400">CULINARY INNOVATION</h2>
                        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">Discover the future of dining with molecular gastronomy and interactive culinary experiences that challenge your senses and redefine flavor.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                      {foodAndDrinks.map((item) => (
                        <Dialog key={item.name}>
                          <Card className="bg-black border border-white/10 hover:-translate-y-1 transition-transform duration-300 group flex flex-col overflow-hidden rounded-xl">
                            <CardHeader className="p-0 relative">
                                <div className="relative h-48">
                                  <Image
                                      src={item.image}
                                      alt={item.name}
                                      fill={true}
                                      style={{objectFit: 'cover'}}
                                      className="group-hover:scale-105 transition-transform duration-500"
                                      data-ai-hint={item.imageHint}
                                  />
                                </div>
                                <div className={cn("h-1 w-full bg-gradient-to-r", item.gradient)}></div>
                            </CardHeader>
                            <CardContent className="p-6 flex-grow flex flex-col">
                                <div className="flex justify-between items-start">
                                    <div className='flex-grow'>
                                        <CardTitle className="font-headline text-2xl">{item.name}</CardTitle>
                                        <CardDescription className="mt-2 text-base">{item.description}</CardDescription>
                                    </div>
                                    <div className={cn("p-2", item.accentColor === 'cyan' ? 'text-cyan-400' : 'text-pink-400')}>
                                        <Zap className="w-6 h-6"/>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {item.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                </div>
                                <div className="flex-grow" />
                                <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/10">
                                  <div></div>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" className={cn("bg-gradient-to-r text-white border-0", item.gradient)}>
                                      {item.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                </div>
                            </CardContent>
                          </Card>
                          <MenuDialog menu={item.menu} accentColor={item.accentColor === 'cyan' ? 'yellow' : 'pink'} />
                        </Dialog>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'party-bookings' && (
                  <section id="party-packages">
                    <div className="container mx-auto px-4">
                      <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline flex items-center justify-center gap-4"><PartyPopper className="w-10 h-10 text-primary" /> Book a Party Package</h2>
                        <p className="mt-2 text-lg text-muted-foreground">Let our AI assistant find the perfect package for your event.</p>
                      </div>
                      <PartyPackages />
                    </div>
                  </section>
                )}
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

    
    

    

    