'use client';

import type { Booking } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Calendar, Clock, Users, X } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type BookingCardProps = {
    booking: Booking;
};

export default function BookingCard({ booking }: BookingCardProps) {
    const { toast } = useToast();

    const handleCancel = () => {
        // In a real app, this would trigger an API call to cancel the booking.
        console.log(`Cancelling booking ${booking.id}`);
        toast({
            title: "Booking Cancelled",
            description: `Your booking for ${booking.activity} has been cancelled.`,
        });
        // Here you would also update the state to remove the card from the UI.
    };
    
    return (
        <Card className="flex flex-col overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105">
            <CardHeader className="p-0">
                <div className="relative h-40 w-full">
                    <Image
                        src={booking.image}
                        alt={booking.activity}
                        fill
                        className="object-cover"
                        data-ai-hint={booking.imageHint}
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
                <h3 className="text-xl font-bold">{booking.activity}</h3>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{format(booking.date, 'PPPP')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{booking.guests} Guest(s)</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" className="w-full hover:bg-destructive hover:text-destructive-foreground">
                            <X className="mr-2 h-4 w-4" />
                            Cancel Booking
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently cancel your booking
                                for {booking.activity} on {format(booking.date, 'PPP')} at {booking.time}.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                            <AlertDialogAction onClick={handleCancel} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Yes, Cancel
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
}
