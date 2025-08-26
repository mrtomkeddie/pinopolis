

import DartsBookingForm from "@/components/darts-booking-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function DartsPage() {
    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                 <div className="space-y-4">
                    <h1 className="text-4xl font-headline text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]">AR Darts Reservation</h1>
                    <p className="text-muted-foreground">
                        Challenge your friends to a game of AR Darts! Our interactive dartboards bring a classic pub game to life with exciting animations, multiple game modes, and instant scoring. It's a whole new way to play.
                    </p>
                </div>
                <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
                    <Image src="/darts.jpg" alt="AR Darts" layout="fill" objectFit="cover" />
                </div>
            </div>
            <Card className="shadow-lg w-full">
                <CardHeader>
                    <CardTitle className="font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">Reserve AR Darts</CardTitle>
                    <CardDescription>Select your details and aim for the bullseye.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DartsBookingForm activityTitle="AR Darts" />
                </CardContent>
            </Card>
        </div>
    );
}
