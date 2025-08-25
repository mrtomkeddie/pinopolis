import BookingForm from "@/components/booking-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function DartsPage() {
    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
                <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                    <Image src="https://placehold.co/600x400.png" alt="AR Darts" layout="fill" objectFit="cover" data-ai-hint="dart board" />
                </div>
                <h1 className="text-4xl font-headline">AR Darts Reservation</h1>
                <p className="text-muted-foreground">
                    Challenge your friends to a game of AR Darts! Our interactive dartboards bring a classic pub game to life with exciting animations, multiple game modes, and instant scoring. It's a whole new way to play.
                </p>
            </div>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline">Reserve AR Darts</CardTitle>
                    <CardDescription>Select your details and aim for the bullseye.</CardDescription>
                </CardHeader>
                <CardContent>
                    <BookingForm activityTitle="AR Darts" />
                </CardContent>
            </Card>
        </div>
    );
}
