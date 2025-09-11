
'use client';

import Link from 'next/link';
import { ArrowLeft, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mockBookings = [
    { id: '1', name: 'Liam Johnson', email: 'liam@example.com', activity: 'Bowling', date: '2024-09-21', time: '3:00 PM', guests: 4, status: 'Confirmed' },
    { id: '2', name: 'Olivia Smith', email: 'olivia@example.com', activity: 'AR Darts', date: '2024-09-21', time: '4:30 PM', guests: 6, status: 'Confirmed' },
    { id: '3', name: 'Noah Williams', email: 'noah@example.com', activity: 'Soft Play', date: '2024-09-22', time: '11:00 AM', guests: 3, status: 'Cancelled' },
    { id: '4', name: 'Emma Brown', email: 'emma@example.com', activity: 'Bowling', date: '2024-09-22', time: '6:00 PM', guests: 8, status: 'Confirmed' },
     { id: '5', name: 'James Jones', email: 'james@example.com', activity: 'AR Darts', date: '2024-09-23', time: '8:00 PM', guests: 2, status: 'Pending' },
];

export default function BookingsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-body">
       <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
            <div>
                <h1 className="text-xl font-bold font-headline">View Bookings</h1>
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
         <Card>
            <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>A list of all upcoming bookings at your venue.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Activity</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead className="text-right">Guests</TableHead>
                             <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockBookings.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell>
                                    <div className="font-medium">{booking.name}</div>
                                    <div className="text-sm text-muted-foreground">{booking.email}</div>
                                </TableCell>
                                <TableCell>{booking.activity}</TableCell>
                                <TableCell>
                                     <Badge variant={booking.status === 'Cancelled' ? 'destructive' : 'default'}>
                                        {booking.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{booking.date} at {booking.time}</TableCell>
                                <TableCell className="text-right">{booking.guests}</TableCell>
                                 <TableCell>
                                    <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Cancel Booking</DropdownMenuItem>
                                    </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
         </Card>
      </main>
    </div>
  );
}
