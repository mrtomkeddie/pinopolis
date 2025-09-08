import { Dices, Target, ToyBrick, PartyPopper, Users, Clock, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ActivityBooking from '@/components/activity-booking';
import PartyPackages from '@/components/party-packages';
import type { Activity } from '@/lib/types';

const activities: Activity[] = [
  {
    name: 'Cyber Bowling',
    description: 'Experience bowling with a holographic twist. Perfect for groups and all skill levels.',
    icon: Dices,
    price: 15,
    image: 'https://picsum.photos/600/400?random=1',
    imageHint: 'bowling alley',
  },
  {
    name: 'AR Darts',
    description: 'Challenge your friends to augmented reality darts. Multiple game modes available.',
    icon: Target,
    price: 10,
    image: 'https://picsum.photos/600/400?random=2',
    imageHint: 'darts game',
  },
  {
    name: 'Zero-G Soft Play',
    description: 'A multi-level soft play area with a futuristic theme for the little ones.',
    icon: ToyBrick,
    price: 8,
    image: 'https://picsum.photos/600/400?random=3',
    imageHint: 'kids playground',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground font-body">
      <Header />
      <main className="flex-1">
        <section className="relative text-center py-24 md:py-32 lg:py-40 px-4 flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-cyan opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
            <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-primary/70">
                    Your Future of Fun Awaits
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
                    Book bowling, AR darts, soft play, and exclusive party packages at Pinopolis. The ultimate cyberpunk entertainment hub.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button size="lg" asChild>
                        <a href="#activities">Book an Activity</a>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <a href="#parties">Plan a Party</a>
                    </Button>
                </div>
            </div>
        </section>


        <section id="activities" className="py-16 md:py-24 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Activities</h2>
              <p className="mt-2 text-lg text-muted-foreground">Choose your next adventure.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity) => (
                <Card key={activity.name} className="bg-card/80 border-border/60 hover:border-primary/80 transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden">
                  <CardHeader>
                    <div className="relative h-40 rounded-md overflow-hidden mb-4">
                        <Image src={activity.image} alt={activity.name} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-500" data-ai-hint={activity.imageHint} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="glitch-icon text-primary p-2 bg-primary/10 rounded-lg">
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
                                <Button variant="default">Book Now <ArrowRight className="ml-2 h-4 w-4" /></Button>
                            </SheetTrigger>
                            <SheetContent className="w-full md:max-w-md bg-card border-l border-border">
                                <SheetHeader>
                                    <SheetTitle className="font-headline text-2xl">Book: {activity.name}</SheetTitle>
                                    <SheetDescription>Select your details to reserve a spot.</SheetDescription>
                                </SheetHeader>
                                <ActivityBooking activity={activity} />
                            </SheetContent>
                        </Sheet>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="parties" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Party Packages</h2>
              <p className="mt-2 text-lg text-muted-foreground">Let our AI find the perfect package for your event.</p>
            </div>
            <PartyPackages />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Add a simple grid background pattern
const style = `
  .bg-grid-cyan {
    background-image:
      linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
      linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px);
    background-size: 40px 40px;
  }
`;
const styleElement = <style>{style}</style>;

// Hack to include style element in the final output
export const head = () => {
    return styleElement;
}
