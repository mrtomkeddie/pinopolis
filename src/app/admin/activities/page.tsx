
'use client';

import Link from 'next/link';
import { ArrowLeft, Dices, Target, ToyBrick, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const activities = [
  {
    name: 'Bowling',
    icon: Dices,
    image: '/bowling.jpg',
    status: 'Active',
  },
  {
    name: 'AR Darts',
    icon: Target,
    image: '/darts.jpg',
    status: 'Active',
  },
  {
    name: 'Soft Play',
    icon: ToyBrick,
    image: '/softplay.jpg',
    status: 'Active',
  },
];

export default function ActivitiesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-body">
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
            <div>
                <h1 className="text-xl font-bold font-headline">Manage Activities</h1>
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <Card key={activity.name}>
                <CardHeader>
                    <div className="flex items-center justify-between">
                         <CardTitle className="flex items-center gap-2">
                            <activity.icon className="h-5 w-5" />
                            {activity.name}
                        </CardTitle>
                        <Badge variant={activity.status === 'Active' ? 'default' : 'secondary'}>{activity.status}</Badge>
                    </div>
                </CardHeader>
              <CardContent>
                <div className="relative h-40 w-full mb-4 rounded-md overflow-hidden">
                    <Image src={activity.image} alt={activity.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                    <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4" /> Disable</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
