import BookingCard from "@/components/booking-card";
import { bookings } from "@/lib/data";

export default function BookingsPage() {
    // In a real app, this data would be fetched for the logged-in user.
    const upcomingBookings = bookings;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-headline tracking-tight">Your Upcoming Adventures</h1>
                <p className="text-muted-foreground mt-2">Manage your bookings here. We can't wait to see you!</p>
            </div>
            {upcomingBookings.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {upcomingBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 rounded-lg border-2 border-dashed">
                    <h2 className="text-xl font-semibold font-headline">No upcoming bookings</h2>
                    <p className="text-muted-foreground mt-2">Time to plan your next adventure!</p>
                </div>
            )}
        </div>
    );
}
