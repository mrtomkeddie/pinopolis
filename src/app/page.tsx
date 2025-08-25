import Image from 'next/image';
import OpeningHours from '@/components/opening-hours';
import SpecialOffers from '@/components/special-offers';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-2xl shadow-primary/20">
        <Image
          src="https://placehold.co/1200x400.png"
          alt="Pinopolis interior"
          layout="fill"
          objectFit="cover"
          data-ai-hint="entertainment center"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-5xl md:text-7xl font-headline tracking-tight text-primary drop-shadow-[0_0_15px_hsl(var(--primary))]">
            Welcome to Pinopolis!
          </h1>
          <p className="text-lg md:text-xl text-foreground mt-4 max-w-2xl">
            Your ultimate entertainment destination. Use the menu to book your next adventure.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <OpeningHours />
        <SpecialOffers />
      </div>
    </div>
  );
}
