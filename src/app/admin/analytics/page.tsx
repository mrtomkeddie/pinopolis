
'use client';

import Link from 'next/link';
import { ArrowLeft, DollarSign, Activity as ActivityIcon, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

const bookingsChartData = [
  { activity: "Bowling", bookings: 186 },
  { activity: "AR Darts", bookings: 305 },
  { activity: "Soft Play", bookings: 237 },
];

const revenueChartData = [
    { date: "2024-09-01", revenue: 450 },
    { date: "2024-09-02", revenue: 520 },
    { date: "2024-09-03", revenue: 610 },
    { date: "2024-09-04", revenue: 380 },
    { date: "2024-09-05", revenue: 720 },
    { date: "2024-09-06", revenue: 800 },
    { date: "2024-09-07", revenue: 950 },
];

const chartConfig = {
  bookings: {
    label: 'Bookings',
    color: 'hsl(var(--chart-2))',
  },
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-1))',
  },
};

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-body">
       <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
            <div>
                <h1 className="text-xl font-bold font-headline">Analytics</h1>
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
         <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Revenue Today</span>
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">£1,234.56</p>
                    <p className="text-xs text-muted-foreground">+20.1% from yesterday</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Bookings Today</span>
                        <Users className="h-5 w-5 text-muted-foreground" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">42</p>
                    <p className="text-xs text-muted-foreground">Across all activities</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Bookings by Activity</span>
                         <ActivityIcon className="h-5 w-5 text-muted-foreground" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={chartConfig} className="h-20 w-full">
                        <BarChart data={bookingsChartData} layout="vertical" margin={{ left: -20, right: 10, top: 0, bottom: 0 }}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="activity" type="category" tickLine={false} axisLine={false} tickMargin={8} width={80}/>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                            <Bar dataKey="bookings" fill="hsl(var(--primary))" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card className="md:col-span-3">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Weekly Revenue</span>
                        <ActivityIcon className="h-5 w-5 text-muted-foreground" />
                    </CardTitle>
                    <CardDescription>Revenue trend for the last 7 days.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-40 w-full">
                        <LineChart data={revenueChartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} />
                            <YAxis hide={true} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                            <Line dataKey="revenue" type="monotone" stroke="hsl(var(--primary))" strokeWidth={2} dot={true} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </section>
      </main>
    </div>
  );
}
