
'use client';

import {
  ArrowRight,
  Calendar,
  Cog,
  LogOut,
  DollarSign,
  Activity as ActivityIcon,
  Swords,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

const dashboardItems = [
  {
    title: 'View Bookings',
    description: 'See and manage all upcoming appointments.',
    href: '/admin/bookings',
    icon: Calendar,
  },
  {
    title: 'Manage Activities',
    description: 'Add, edit, or remove venue activities.',
    href: '/admin/activities',
    icon: Swords,
  },
  {
    title: 'Account Settings',
    description: 'Change your account password.',
    href: '/admin/settings',
    icon: Cog,
  },
];

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

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-body">
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
        <div>
            <h1 className="text-xl font-bold font-headline">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Pinopolis</p>
        </div>
        <Link
            href="/logout"
            className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Link>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">

        {/* Analytics Section */}
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
            <Card className="md:col-span-2">
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

        {/* Navigation Section */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {dashboardItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-lg border bg-card text-card-foreground shadow-sm transition-colors hover:bg-secondary"
            >
              <div className="flex h-full flex-col justify-between p-6">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <div
                  className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Go to page
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-auto text-center text-sm text-muted-foreground">
            <p>Welcome, admin@pinopolis.wales. Select a category to start managing your venue.</p>
        </div>
      </main>
    </div>
  );
}
