import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Beer, Dices, GlassWater, Gamepad2, Tv, Utensils } from 'lucide-react';

const amenities = [
    { icon: Gamepad2, text: 'VR Arcade' },
    { icon: Beer, text: 'Draft Beer' },
    { icon: Utensils, text: 'American Style Street Food' },
    { icon: Tv, text: 'Sky Sports Bar' },
    { icon: GlassWater, text: 'Cocktails' },
    { icon: Dices, text: 'Pool Tables' },
];

export default function Amenities() {
    return (
        <Card className="bg-card border-border/50">
            <CardHeader>
                <CardTitle className="text-2xl font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">
                    And So Much More...
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
                    {amenities.map((amenity) => (
                        <div key={amenity.text} className="flex flex-col items-center gap-2">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                                <amenity.icon className="w-8 h-8" />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">{amenity.text}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
