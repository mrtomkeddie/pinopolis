

'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Minus, Plus, AlertCircle, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { useEffect, useState, useMemo } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const timeSlots = [
    "10:30 AM", "10:45 AM", "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
    "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM", "1:00 PM", "1:15 PM", "1:30 PM", "1:45 PM",
    "2:00 PM", "2:15 PM", "2:30 PM", "2:45 PM", "3:00 PM", "3:15 PM", "3:30 PM", "3:45 PM",
    "4:00 PM", "4:15 PM", "4:30 PM", "4:45 PM", "5:00 PM", "5:15 PM", "5:30 PM", "5:45 PM",
    "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM",
    "8:00 PM", "8:15 PM", "8:30 PM"
];

const deals = {
    'money-saving-monday': {
        title: 'Money Saving Monday',
        games: '1',
        pricePerPerson: 6,
        day: 1, // 0 is Sunday, 1 is Monday
    },
    'triple-tuesday': {
        title: 'Triple Tuesday',
        games: '2',
        pricePerPerson: 15,
        day: 2,
    },
    'wine-wednesday': {
        title: 'Wine Wednesday',
        games: '1',
        day: 3,
        // Special pricing logic will be handled separately
    },
};

const formSchema = z.object({
  adults: z.coerce.number().min(0),
  children: z.coerce.number().min(0),
  games: z.string().optional(),
  wine: z.string().optional(),
  date: z.date({ required_error: "A date is required." }),
  time: z.string({ required_error: "A time slot is required." }),
}).refine(data => {
    if (data.games) { // Bowling validation
        return data.adults >= 1;
    }
    return true;
}, {
    message: "Must have at least 1 adult.",
    path: ["adults"],
}).refine(data => data.adults + data.children > 0, {
    message: "You must select at least one guest.",
    path: ["adults"],
}).refine(data => data.adults + data.children <= 16, {
    message: "There is a maximum of 16 players per reservation.",
    path: ["adults"],
});


type BookingFormProps = {
    activityTitle: string;
};

export default function MultiStepBookingForm({ activityTitle }: BookingFormProps) {
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const dealId = searchParams.get('deal');
    const deal = useMemo(() => dealId ? deals[dealId as keyof typeof deals] : null, [dealId]);

    const isBowling = activityTitle === "Bowling";
    const isSoftPlay = activityTitle === "Soft Play";
    const isWineWednesday = dealId === 'wine-wednesday';
    
    const [totalPrice, setTotalPrice] = useState(0);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            adults: isBowling || isSoftPlay ? 1 : 0,
            children: isBowling ? 0 : 1,
            games: deal ? deal.games : (isBowling ? "1" : undefined),
            wine: isWineWednesday ? "White" : undefined,
        },
    });
    
    useEffect(() => {
        if (deal) {
            form.setValue('games', deal.games);
            if (isWineWednesday) {
                form.setValue('adults', 2);
                form.setValue('children', 0);
            }
        }
    }, [deal, form, isWineWednesday]);

    const adults = form.watch("adults");
    const children = form.watch("children");
    const games = form.watch("games");
    const date = form.watch("date");
    const totalGuests = adults + children;

    useEffect(() => {
        let price = 0;

        if (deal) {
            if (dealId === 'wine-wednesday') {
                price = 15; // Base for 2 guests
                if (totalGuests > 2) {
                    price += (totalGuests - 2) * 3;
                }
            } else if (deal.pricePerPerson) {
                price = totalGuests * deal.pricePerPerson;
            }
        } else if (isBowling) {
            const numGames = parseInt(games || '1', 10);
            const pricePerGame = numGames > 1 ? 5.00 : 6.50;
            price = totalGuests * pricePerGame * numGames;
        } else if (isSoftPlay) {
            price = children * 5; // £5 per child
        }

        setTotalPrice(price);
    }, [adults, children, games, totalGuests, isBowling, isSoftPlay, deal, dealId]);


    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        let dealDescription = deal ? ` (${deal.title}` : '';
        if (isWineWednesday && values.wine) {
            dealDescription += ` - ${values.wine} Wine`;
        }
        if (deal) {
            dealDescription += ')';
        }

        toast({
            title: "Booking Confirmed!",
            description: `Your booking for ${activityTitle}${dealDescription} on ${format(values.date, "PPP")} at ${values.time} for ${values.adults + values.children} guest(s) is confirmed. Total: £${totalPrice.toFixed(2)}`,
        });
        router.push('/bookings');
    }
    
    const isDateDisabled = (d: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of today for comparison
        if (d < today) return true; // Disable past dates
        if (deal && d.getDay() !== deal.day) {
            return true; // Disable dates that don't match the deal's day
        }
        return false;
    };
    
    const handleClearDeal = () => {
        router.push('/bowling');
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {deal && (
                     <Alert variant="default" className="border-primary relative">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle className="font-headline text-primary">You're booking the {deal.title} deal!</AlertTitle>
                        <AlertDescription>
                            The form options have been pre-configured for this special offer.
                        </AlertDescription>
                        <Button variant="ghost" size="sm" onClick={handleClearDeal} className="absolute top-2 right-2 h-auto px-2 py-1 text-xs">
                            <X className="mr-1 h-3 w-3" />
                            Clear Deal
                        </Button>
                    </Alert>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <FormLabel>Step 1: How many guests?</FormLabel>
                            <FormField
                                control={form.control}
                                name="adults"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-normal">Adults {isSoftPlay && "(Go Free)"}</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-2">
                                                <Button type="button" variant="outline" size="icon" className="h-10 w-10" onClick={() => form.setValue('adults', Math.max(isWineWednesday ? 2 : (isBowling || isSoftPlay ? 1 : 0), field.value - 1))} disabled={field.value <= (isWineWednesday ? 2 : (isBowling || isSoftPlay ? 1 : 0))}>
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <Input {...field} readOnly className="text-center" />
                                                <Button type="button" variant="outline" size="icon" className="h-10 w-10" onClick={() => form.setValue('adults', Math.min(16, field.value + 1))} disabled={totalGuests >= 16}>
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             {!isWineWednesday && (
                                <FormField
                                    control={form.control}
                                    name="children"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-normal">Children</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center gap-2">
                                                    <Button type="button" variant="outline" size="icon" className="h-10 w-10" onClick={() => form.setValue('children', Math.max(0, field.value - 1))} disabled={field.value <= 0}>
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <Input {...field} readOnly className="text-center" />
                                                    <Button type="button" variant="outline" size="icon" className="h-10 w-10" onClick={() => form.setValue('children', Math.min(16, field.value + 1))} disabled={totalGuests >= 16}>
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                             )}
                             {!isSoftPlay && <p className="text-sm text-muted-foreground">For bookings of more than 16 people please email info@pinopolis.wales</p>}
                        </div>

                        {isWineWednesday && (
                             <>
                                <Separator />
                                <FormField
                                    control={form.control}
                                    name="wine"
                                    render={({ field }) => (
                                        <FormItem className="space-y-4">
                                            <FormLabel>Step 2: What kind of wine would you like?</FormLabel>
                                            <FormControl>
                                                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="White" id="wine-white" className="sr-only" />
                                                        </FormControl>
                                                        <Label htmlFor="wine-white" className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === 'White' ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>White</Label>
                                                    </FormItem>
                                                     <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="Red" id="wine-red" className="sr-only" />
                                                        </FormControl>
                                                        <Label htmlFor="wine-red" className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === 'Red' ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>Red</Label>
                                                    </FormItem>
                                                     <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="Rose" id="wine-rose" className="sr-only" />
                                                        </FormControl>
                                                        <Label htmlFor="wine-rose" className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === 'Rose' ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>Rosé</Label>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
        
                        {isBowling && !isWineWednesday && (
                            <>
                                <Separator />
                                <FormField
                                    control={form.control}
                                    name="games"
                                    render={({ field }) => (
                                        <FormItem className="space-y-4">
                                            <FormLabel>Step 2: How many games?</FormLabel>
                                            <FormControl>
                                                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4" disabled={!!deal}>
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="1" id="1-game" className="sr-only" />
                                                        </FormControl>
                                                        <Label htmlFor="1-game" className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === '1' ? 'bg-primary text-primary-foreground border-primary' : 'border-input', {"opacity-50 cursor-not-allowed": !!deal})}>1 GAME</Label>
                                                    </FormItem>
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="2" id="2-games" className="sr-only" />
                                                        </FormControl>
                                                        <Label htmlFor="2-games" className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === '2' ? 'bg-primary text-primary-foreground border-primary' : 'border-input', {"opacity-50 cursor-not-allowed": !!deal})}>2 GAMES</Label>
                                                    </FormItem>
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="3" id="3-games" className="sr-only" />
                                                        </FormControl>
                                                        <Label htmlFor="3-games" className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === '3' ? 'bg-primary text-primary-foreground border-primary' : 'border-input', {"opacity-50 cursor-not-allowed": !!deal})}>3 GAMES</Label>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
        
                        <Separator />
        
                        <div className="space-y-4">
                            <FormLabel>Step {isBowling ? (isWineWednesday ? 3 : 3) : 2}: When would you like to reserve?</FormLabel>
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={isDateDisabled}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {deal && <FormMessage>You can only select a {format(new Date(2024, 0, deal.day), 'eeee')} for this deal.</FormMessage>}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    
                    <div className={cn(!date && "opacity-50")}>
                        <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem className="space-y-4">
                                    <FormLabel>Step {isBowling ? (isWineWednesday ? 4 : 4) : 3}: Please select a start time:</FormLabel>
                                    <FormControl>
                                        <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-3 md:grid-cols-4 gap-4" disabled={!date}>
                                            {timeSlots.map((slot) => (
                                                <FormItem key={slot}>
                                                    <FormControl>
                                                        <RadioGroupItem value={slot} id={slot} className="sr-only" />
                                                    </FormControl>
                                                    <Label htmlFor={slot} className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === slot ? 'bg-primary text-primary-foreground border-primary' : 'border-input', !date && "cursor-not-allowed")}>{slot}</Label>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Separator />
                
                <div className="text-right font-bold text-lg">
                    Total amount: £{totalPrice.toFixed(2)}
                </div>

                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={!form.formState.isValid}>Confirm Booking</Button>
            </form>
        </Form>
    );
}
