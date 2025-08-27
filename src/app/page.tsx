import Image from 'next/image';
import OpeningHours from '@/components/opening-hours';
import SpecialOffers from '@/components/special-offers';
import Amenities from '@/components/amenities';
import ActivityCard from '@/components/activity-card';
import { activities } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-2xl shadow-primary/20">
        <Image
          src="/banner.jpg"
          alt="Pinopolis banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-5xl md:text-7xl font-headline tracking-tight text-primary drop-shadow-[0_0_15px_hsl(var(--primary))]">
            Welcome to Pinopolis!
          </h1>
          <p className="text-lg md:text-xl text-foreground mt-4 max-w-2xl">
            Your Ultimate Family Entertainment Centre
          </p>
        </div>
      </div>

      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">
            <Sparkles className="mr-2 h-6 w-6" />
            Choose Your Adventure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <ActivityCard key={activity.title} activity={activity} />
            ))}
          </div>
        </CardContent>
      </Card>
      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SpecialOffers />
        <OpeningHours />
      </div>

      <Amenities />
    </div>
  );
}
