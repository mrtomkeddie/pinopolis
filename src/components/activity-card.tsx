import type { Activity } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

type ActivityCardProps = {
  activity: Activity;
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
            <Image
                src={activity.image}
                alt={activity.title}
                fill
                className="object-cover"
                data-ai-hint={activity.imageHint}
            />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl font-bold">{activity.title}</CardTitle>
        <CardDescription className="mt-2">{activity.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={activity.href}>
            Book Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
