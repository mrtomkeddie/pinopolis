import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeDollarSign, PartyPopper, ArrowRight } from 'lucide-react';
import { Button } from "./ui/button";
import Link from "next/link";

const deals = [
    {
        title: 'Money Saving Monday!',
        details: [
            '1 Game of Bowling & any pint.',
            'Available on: Mondays between 11am-close.',
            '£6 per person.',
            'You must be 18+ to reserve this package.',
        ],
    },
    {
        title: 'Triple Tuesday!',
        details: [
            '2 Games of Bowling per group & 1 O.G Burger per person.',
            'Available on: Tuesdays between 11am-close.',
            '£15 per person.',
        ],
    },
    {
        title: 'Wine Wednesday!',
        details: [
            'A bottle of rose, white or red wine & a game of bowling for 2 guests.',
            'Available on: Wednesdays between 11am-close.',
            '£15 for 2 guests.',
            '£3 per additional guest.',
            'You must be 18+ to reserve this package.',
        ],
    },
];

export default function SpecialOffers() {
    return (
        <Card className="bg-card border-border/50">
            <CardHeader>
                <CardTitle className="flex items-center text-2xl font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">
                    <PartyPopper className="mr-2 h-6 w-6" />
                    Weekly Specials
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {deals.map((deal, index) => (
                        <AccordionItem value={`item-${index}`} key={deal.title}>
                            <AccordionTrigger className="font-medium text-left hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <BadgeDollarSign className="h-5 w-5 text-primary" />
                                    <span>{deal.title}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    <ul className="space-y-1 pl-4 list-disc text-muted-foreground">
                                        {deal.details.map((line, i) => (
                                            <li key={i}>{line}</li>
                                        ))}
                                    </ul>
                                    <Button asChild className="w-full">
                                        <Link href="/bowling">
                                            Book This Deal
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
}
