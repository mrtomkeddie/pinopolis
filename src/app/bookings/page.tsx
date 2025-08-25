'use client';

import { useState } from 'react';
import BookingCard from "@/components/booking-card";
import { bookings } from "@/lib/data";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Search } from 'lucide-react';

export default function BookingsPage() {
    const [showBookings, setShowBookings] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // In a real app, this data would be fetched for the logged-in user.
    const upcomingBookings = bookings;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        // Simulate an API call
        setTimeout(() => {
            setShowBookings(true);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-headline tracking-tight text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]">Your Upcoming Adventures</h1>
                <p className="text-muted-foreground mt-2">
                    {showBookings ? "Manage your bookings below." : "Enter your email or mobile to find your bookings."}
                </p>
            </div>

            {!showBookings ? (
                 <Card className="w-full shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">Find Your Bookings</CardTitle>
                        <CardDescription>Enter your details to retrieve your upcoming bookings.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input type="text" placeholder="Email or Mobile Number..." required />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                <Search className="mr-2 h-4 w-4" />
                                {isLoading ? 'Searching...' : 'Find My Bookings'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            ) : upcomingBookings.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {upcomingBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 rounded-lg border-2 border-dashed">
                    <h2 className="text-xl font-semibold font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">No upcoming bookings</h2>
                    <p className="text-muted-foreground mt-2">We couldn't find any bookings with those details.</p>
                </div>
            )}
        </div>
    );
}
