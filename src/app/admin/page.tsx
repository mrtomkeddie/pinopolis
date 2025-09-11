
'use client';

import {
  ArrowRight,
  Calendar,
  Cog,
  Heart,
  LogOut,
  QrCode,
  Shield,
  Users,
  Swords,
} from 'lucide-react';
import Link from 'next/link';

const dashboardItems = [
  {
    title: 'View Bookings',
    description: 'See and manage all upcoming appointments.',
    href: '/admin/bookings',
    icon: Calendar,
  },
  {
    title: 'Customer Loyalty',
    description: 'Track visit history and reward your top customers.',
    href: '/admin/customers',
    icon: Heart,
  },
  {
    title: 'Walk-in QR Codes',
    description: 'Generate links for walk-in customer check-ins.',
    href: '/admin/qr-codes',
    icon: QrCode,
  },
  {
    title: 'Manage Activities',
    description: 'Add, edit, or remove venue activities.',
    href: '/admin/activities',
    icon: Swords,
  },
  {
    title: 'Manage Staff',
    description: 'Add or remove staff members and their roles.',
    href: '/admin/staff',
    icon: Users,
  },
  {
    title: 'Manage Admins',
    description: 'Add or edit permissions for administrators.',
    href: '/admin/admins',
    icon: Shield,
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
            <p className="text-sm text-muted-foreground">Managing: Pinopolis</p>
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
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {dashboardItems.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
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
                <Link
                  href={item.href}
                  className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Go to {item.title.split(' ')[1]}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto text-center text-sm text-muted-foreground">
            <p>Welcome, admin@pinopolis.wales. Select a category to start managing your venue.</p>
        </div>
      </main>
    </div>
  );
}
