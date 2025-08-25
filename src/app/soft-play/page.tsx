import BookingForm from "@/components/booking-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function SoftPlayPage() {
    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
                <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                    <Image src="https://placehold.co/600x400.png" alt="Soft Play Area" layout="fill" objectFit="cover" data-ai-hint="kids playground" />
                </div>
                <h1 className="text-4xl font-headline">Soft Play Scheduling</h1>
                <p className="text-muted-foreground">
                    Let your little ones explore, climb, and slide in our multi-level soft play area. Designed for maximum fun and safety, it's the perfect place for kids to burn off energy while you relax.
                </p>
            </div>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline">Schedule Soft Play</CardTitle>
                    <CardDescription>Book a play session for your children.</CardDescription>
                </CardHeader>
                <CardContent>
                    <BookingForm activityTitle="Soft Play" />
                </CardContent>
            </Card>
        </div>
    );
}
