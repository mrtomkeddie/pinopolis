import BookingForm from "@/components/booking-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function BowlingPage() {
    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
                <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                    <Image src="https://placehold.co/600x400.png" alt="Bowling alley" layout="fill" objectFit="cover" data-ai-hint="bowling alley" />
                </div>
                <h1 className="text-4xl font-headline">Bowling Lane Booking</h1>
                <p className="text-muted-foreground">
                    Step up to one of our state-of-the-art bowling lanes. Perfect for all ages and skill levels, our lanes feature automatic scoring, bumper guards for the little ones, and a vibrant atmosphere. Reserve your lane now for an unforgettable experience!
                </p>
            </div>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline">Book Your Lane</CardTitle>
                    <CardDescription>Select your details and get ready to roll.</CardDescription>
                </CardHeader>
                <CardContent>
                    <BookingForm activityTitle="Bowling" />
                </CardContent>
            </Card>
        </div>
    );
}
