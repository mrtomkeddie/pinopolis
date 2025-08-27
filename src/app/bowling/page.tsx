
import MultiStepBookingForm from "@/components/multi-step-booking-form";
import SpecialOffers from "@/components/special-offers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function BowlingPage() {
    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
                    <Image src="/bowling.jpg" alt="Bowling alley" fill className="object-cover" />
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-headline text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]">Bowling Lane Booking</h1>
                    <p className="text-muted-foreground">
                        Step up to one of our state-of-the-art bowling lanes, Wales’ first and only immersive Brunswick Spark Bowling Lanes. Perfect for all ages and skill levels, our lanes feature automatic scoring, bumper guards for the little ones, and a vibrant atmosphere. Reserve your lane now for an unforgettable experience!
                    </p>
                </div>
            </div>
            <div className="space-y-8">
                <SpecialOffers />
                <Card className="shadow-lg w-full">
                    <CardHeader>
                        <CardTitle className="font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">Book Your Lane</CardTitle>
                        <CardDescription>Select your details and get ready to roll.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MultiStepBookingForm activityTitle="Bowling" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
