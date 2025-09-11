
'use client';

import {
  ArrowRight,
  Calendar,
  Cog,
  LogOut,
  Swords,
  PlusCircle,
  BarChart,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    title: 'View Analytics',
    description: 'See revenue and booking trends.',
    href: '/admin/analytics',
    icon: BarChart,
  },
  {
    title: 'Account Settings',
    description: 'Change your account password.',
    href: '/admin/settings',
    icon: Cog,
  },
];


export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-body">
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
        <div>
            <h1 className="text-xl font-bold font-headline">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Pinopolis</p>
        </div>
        <div className="flex items-center gap-2">
             <Link href="/admin/new-booking">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Booking
                </Button>
            </Link>
            <Link
                href="/logout"
                className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">

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
