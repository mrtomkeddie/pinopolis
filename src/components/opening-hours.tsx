import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

const openingHours = [
    { day: 'MONDAY', hours: '10:30am - 10:00pm' },
    { day: 'TUESDAY', hours: '10:30am - 10:00pm' },
    { day: 'WEDNESDAY', hours: '10:30am - 10:00pm' },
    { day: 'THURSDAY', hours: '10:30am - 10:00pm' },
    { day: 'FRIDAY', hours: '10:30am - 10:00pm' },
    { day: 'SATURDAY', hours: '10:30am - 10:00pm' },
    { day: 'SUNDAY', hours: '10:30am - 10:00pm' },
];

export default function OpeningHours() {
    return (
        <Card className="bg-card border-border/50">
            <CardHeader>
                <CardTitle className="flex items-center text-2xl font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">
                    <Clock className="mr-2 h-6 w-6" />
                    Opening Hours
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    {openingHours.map((item) => (
                        <li key={item.day} className="flex justify-between items-center">
                            <span className="font-medium text-foreground">{item.day}</span>
                            <span className="font-mono">{item.hours}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
