

'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Minus, Plus, AlertCircle, X, ToyBrick, ArrowLeft, PartyPopper, User, Calendar, Clock, Gamepad2, Wine, Users } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
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
import { Switch } from "./ui/switch";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
  addSoftPlay: z.boolean().optional(),
  softPlayChildren: z.coerce.number().optional(),
  date: z.date({ required_error: "A date is required." }),
  time: z.string({ required_error: "A time slot is required." }),
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  postalCode: z.string().min(1, "Postal code is required."),
  phone: z.string().min(1, "Phone number is required."),
  email: z.string().email("Invalid email address."),
  marketingOptIn: z.boolean().optional(),
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
    const [step, setStep] = useState(1);

    const isBowling = activityTitle === "Bowling";
    const isSoftPlay = activityTitle === "Soft Play";
    const isWineWednesday = dealId === 'wine-wednesday';
    
    const [totalPrice, setTotalPrice] = useState(0);

    const dynamicSchema = useMemo(() => {
        return formSchema.refine(data => {
            if (isSoftPlay) {
                return data.children >= 1;
            }
            return true;
        }, {
            message: "Must have at least 1 child for Soft Play.",
            path: ["children"],
        });
    }, [isSoftPlay]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(dynamicSchema),
        defaultValues: {
            adults: isBowling ? 1 : (isSoftPlay ? 1 : 0),
            children: isSoftPlay ? 1 : (isBowling ? 0 : 1),
            games: deal ? deal.games : (isBowling ? "1" : undefined),
            wine: isWineWednesday ? "White" : undefined,
            addSoftPlay: false,
            softPlayChildren: 1,
            marketingOptIn: false,
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

    const watchAllFields = form.watch();

    useEffect(() => {
        const { adults, children, games, addSoftPlay, softPlayChildren } = watchAllFields;
        let price = 0;

        if (deal) {
            if (dealId === 'wine-wednesday') {
                price = 15; // Base for 2 guests
                if ((adults + children) > 2) {
                    price += ((adults + children) - 2) * 3;
                }
            } else if (deal.pricePerPerson) {
                price = (adults + children) * deal.pricePerPerson;
            }
        } else if (isBowling) {
            const numGames = parseInt(games || '1', 10);
            const pricePerGameAdult = numGames > 1 ? 5.00 : 6.50;
            const pricePerGameChild = numGames > 1 ? 4.00 : 5.50;
            price = (adults * pricePerGameAdult * numGames) + (children * pricePerGameChild * numGames);
            if(addSoftPlay && softPlayChildren) {
                price += softPlayChildren * 5;
            }
        } else if (isSoftPlay) {
            price = children * 5; // £5 per child
        }

        setTotalPrice(price);
    }, [watchAllFields, isBowling, isSoftPlay, deal, dealId]);


    async function onNext() {
        const fieldsToValidate = step === 1
            ? ["adults", "children", "games", "date", "time", "wine", "addSoftPlay", "softPlayChildren"] as const
            : ["firstName", "lastName", "postalCode", "phone", "email"] as const;

        const isValid = await form.trigger(fieldsToValidate);
        if (isValid) {
            setStep(prev => prev + 1);
        }
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        let dealDescription = deal ? ` (${deal.title}` : '';
        if (isWineWednesday && values.wine) {
            dealDescription += ` - ${values.wine} Wine`;
        }
        if (deal) {
            dealDescription += ')';
        }

        let softPlayDescription = '';
        if (isBowling && values.addSoftPlay && values.softPlayChildren) {
            softPlayDescription = ` with Soft Play for ${values.softPlayChildren} child(ren)`;
        }


        toast({
            title: "Booking Confirmed!",
            description: `Your booking for ${activityTitle}${dealDescription}${softPlayDescription} on ${format(values.date, "PPP")} at ${values.time} for ${values.adults + values.children} bowling guest(s) is confirmed. Total: £${totalPrice.toFixed(2)}`,
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

    const { adults, children, date, time, games, wine, addSoftPlay, softPlayChildren, firstName, lastName, email, phone, postalCode } = form.getValues();
    const totalGuests = adults + children;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {step === 1 && (
                    <>
                        {deal && (
                            <Alert variant="default" className="border-primary relative">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle className="font-headline text-primary">You're booking the {deal.title} deal!</AlertTitle>
                                <AlertDescription>
                                    The form options have been pre-configured for this special offer.
                                </AlertDescription>
                                <Button variant="ghost" size="sm" onClick={handleClearDeal} className="absolute top-1/2 right-2 -translate-y-1/2 text-xs">
                                    <X className="mr-1 h-3 w-3" />
                                    Clear Deal
                                </Button>
                            </Alert>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <FormLabel>Step 1: How many {isBowling ? "bowling" : ""} guests?</FormLabel>
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
                                                            <Button type="button" variant="outline" size="icon" className="h-10 w-10" onClick={() => form.setValue('children', Math.max(isSoftPlay ? 1 : 0, field.value - 1))} disabled={field.value <= (isSoftPlay ? 1 : 0)}>
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

                                {isBowling && !deal && (
                                    <>
                                        <Separator />
                                        <FormField
                                            control={form.control}
                                            name="addSoftPlay"
                                            render={({ field }) => (
                                                <FormItem className="space-y-4">
                                                    <div className="flex items-center space-x-2">
                                                        <ToyBrick className="h-5 w-5 text-primary" />
                                                        <Label htmlFor="soft-play-switch" className="flex-grow">Step 2: Add Soft Play for other kids?</Label>
                                                        <FormControl>
                                                            <Switch
                                                                id="soft-play-switch"
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {watchAllFields.addSoftPlay && (
                                            <FormField
                                                control={form.control}
                                                name="softPlayChildren"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-normal">Number of Children for Soft Play</FormLabel>
                                                        <FormControl>
                                                            <div className="flex items-center gap-2">
                                                                <Button type="button" variant="outline" size="icon" className="h-10 w-10" onClick={() => form.setValue('softPlayChildren', Math.max(1, (field.value || 1) - 1))} disabled={(field.value || 1) <= 1}>
                                                                    <Minus className="h-4 w-4" />
                                                                </Button>
                                                                <Input {...field} value={field.value || 1} readOnly className="text-center" />
                                                                <Button type="button" variant="outline" size="icon" className="h-10 w-10" onClick={() => form.setValue('softPlayChildren', Math.min(15, (field.value || 1) + 1))} disabled={(field.value || 1) >= 15}>
                                                                    <Plus className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}
                                    </>
                                )}


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
                                                    <FormLabel>Step 3: How many games?</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4" disabled={!!deal}>
                                                            <FormItem>
                                                                <FormControl>
                                                                    <RadioGroupItem value="1" id="1-game" className="sr-only" />
                                                                </FormControl>
                                                                <Label htmlFor="1-game" className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === '1' ? 'bg-primary text-primary-foreground border-primary' : 'border-input', { "opacity-50 cursor-not-allowed": !!deal })}>1 GAME</Label>
                                                            </FormItem>
                                                            <FormItem>
                                                                <FormControl>
                                                                    <RadioGroupItem value="2" id="2-games" className="sr-only" />
                                                                </FormControl>
                                                                <Label htmlFor="2-games" className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === '2' ? 'bg-primary text-primary-foreground border-primary' : 'border-input', { "opacity-50 cursor-not-allowed": !!deal })}>2 GAMES</Label>
                                                            </FormItem>
                                                            <FormItem>
                                                                <FormControl>
                                                                    <RadioGroupItem value="3" id="3-games" className="sr-only" />
                                                                </FormControl>
                                                                <Label htmlFor="3-games" className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === '3' ? 'bg-primary text-primary-foreground border-primary' : 'border-input', { "opacity-50 cursor-not-allowed": !!deal })}>3 GAMES</Label>
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
                                    <FormLabel>Step {isBowling ? (isWineWednesday ? 3 : 4) : 2}: When would you like to reserve?</FormLabel>
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
                                                        <CalendarComponent
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
                                            <FormLabel>Step {isBowling ? (isWineWednesday ? 4 : 5) : 3}: Please select a start time:</FormLabel>
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
                    </>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <div>
                             <h3 className="text-2xl font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">Step {isBowling || isSoftPlay ? 'Final' : '2'}: Your Information</h3>
                             <p className="text-muted-foreground">Please enter your contact information. An email address is required for your confirmation receipt.</p>
                             <Separator className="my-4" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="First name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Last name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                         <FormField
                            control={form.control}
                            name="postalCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Postal code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Postal code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Phone number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-Mail</FormLabel>
                                    <FormControl>
                                        <Input placeholder="E-Mail" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="marketingOptIn"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormDescription>
                                            We would like to send you details of Pinopolis latest offers and information by email. To opt in please tick this box.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                )}

                 {step === 3 && (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">Reservation Review</CardTitle>
                                <CardDescription>Please review your booking details below before confirming.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2 rounded-lg border p-4">
                                    <h4 className="font-semibold text-primary">{activityTitle} Booking</h4>
                                    {deal && (
                                        <div className="flex items-center text-sm">
                                            <PartyPopper className="mr-2 h-4 w-4" />
                                            <span>Deal: {deal.title}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center text-sm">
                                        <Users className="mr-2 h-4 w-4" />
                                        <span>{adults} Adult(s), {children} Child(ren)</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        <span>{date ? format(date, "PPP") : 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Clock className="mr-2 h-4 w-4" />
                                        <span>{time}</span>
                                    </div>
                                    {isBowling && games && (
                                        <div className="flex items-center text-sm">
                                            <Gamepad2 className="mr-2 h-4 w-4" />
                                            <span>{games} Game(s)</span>
                                        </div>
                                    )}
                                    {isWineWednesday && wine && (
                                         <div className="flex items-center text-sm">
                                            <Wine className="mr-2 h-4 w-4" />
                                            <span>{wine} Wine</span>
                                        </div>
                                    )}
                                    {addSoftPlay && softPlayChildren && (
                                         <div className="flex items-center text-sm">
                                            <ToyBrick className="mr-2 h-4 w-4" />
                                            <span>Soft Play for {softPlayChildren} child(ren)</span>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2 rounded-lg border p-4">
                                    <h4 className="font-semibold text-primary">Your Information</h4>
                                    <div className="flex items-center text-sm">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>{firstName} {lastName}</span>
                                    </div>
                                     <p className="text-sm text-muted-foreground pl-6">{email}</p>
                                     <p className="text-sm text-muted-foreground pl-6">{phone}</p>
                                     <p className="text-sm text-muted-foreground pl-6">{postalCode}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                 )}


                <Separator />
                
                <div className="flex items-center justify-between">
                    <div className="text-right font-bold text-lg">
                        Total amount: £{totalPrice.toFixed(2)}
                    </div>
                    <div className="flex gap-4">
                        {(step === 2 || step === 3) && (
                             <Button type="button" variant="outline" onClick={() => setStep(prev => prev - 1)}>
                                <ArrowLeft className="mr-2 h-4 w-4"/>
                                Back
                            </Button>
                        )}
                        
                        {step < 3 && (
                            <Button type="button" onClick={onNext} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                                {step === 1 ? 'Next' : 'Review Booking'}
                            </Button>
                        )}
                        
                        {step === 3 && (
                            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={!form.formState.isValid}>
                                Confirm Booking
                            </Button>
                        )}
                    </div>
                </div>

            </form>
        </Form>
    );
}
