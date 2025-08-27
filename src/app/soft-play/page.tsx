

import MultiStepBookingForm from "@/components/multi-step-booking-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function SoftPlayPage() {
    return (
        <div className="space-y-8 max-w-6xl mx-auto">
             <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
                    <Image src="/softplay.jpg?v=1" alt="Soft Play Area" fill className="object-cover" />
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-headline text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]">Soft Play Scheduling</h1>
                    <p className="text-muted-foreground">
                        Let your little ones explore, climb, and slide in our multi-level soft play area. Designed for maximum fun and safety, it's the perfect place for kids to burn off energy while you relax.
                    </p>
                </div>
            </div>
            <Card className="shadow-lg w-full">
                <CardHeader>
                    <CardTitle className="font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">Schedule Soft Play</CardTitle>
                    <CardDescription>Book a play session for your children.</CardDescription>
                </CardHeader>
                <CardContent>
                    <MultiStepBookingForm activityTitle="Soft Play" />
                </CardContent>
            </Card>
        </div>
    );
}
