

'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ToyBrick, ArrowLeft, Users, Clock, Calendar, User, Timer } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

const timeSlots = [
    "10:30 AM", "10:45 AM", "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
    "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM", "1:00 PM", "1:15 PM", "1:30 PM", "1:45 PM",
    "2:00 PM", "2:15 PM", "2:30 PM", "2:45 PM", "3:00 PM", "3:15 PM", "3:30 PM", "3:45 PM",
    "4:00 PM", "4:15 PM", "4:30 PM", "4:45 PM", "5:00 PM", "5:15 PM", "5:30 PM", "5:45 PM",
    "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM",
    "8:00 PM", "8:15 PM", "8:30 PM"
];

const formSchema = z.object({
    oches: z.string({ required_error: "Please select the number of oches." }),
    duration: z.string({ required_error: "Please select a duration." }),
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
});

type BookingFormProps = {
    activityTitle: string;
};

const pricing = {
    "1": {
        "30": 10.95,
        "60": 19.95,
    },
    "2": {
        "30": 21.90,
        "60": 39.90,
    }
};

export default function DartsBookingForm({ activityTitle }: BookingFormProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [totalPrice, setTotalPrice] = useState(0);
    const [step, setStep] = useState(1);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oches: "1",
            duration: "30",
            addSoftPlay: false,
            softPlayChildren: 1,
            marketingOptIn: false,
        },
    });

    const watchAllFields = form.watch();

    useEffect(() => {
        const { oches, duration, addSoftPlay, softPlayChildren } = watchAllFields;
        const ocheKey = oches as keyof typeof pricing;
        let price = 0;
        if (pricing[ocheKey]) {
            const durationKey = duration as keyof typeof pricing[typeof ocheKey];
            price = pricing[ocheKey][durationKey] || 0;
        }

        if (addSoftPlay && softPlayChildren) {
            price += softPlayChildren * 5;
        }

        setTotalPrice(price);
    }, [watchAllFields]);

    async function onNext() {
        const fieldsToValidate = step === 1
            ? ["oches", "duration", "date", "time", "addSoftPlay", "softPlayChildren"] as const
            : ["firstName", "lastName", "postalCode", "phone", "email"] as const;
            
        const isValid = await form.trigger(fieldsToValidate);
        if (isValid) {
            setStep(prev => prev + 1);
        }
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        let softPlayDescription = '';
        if (values.addSoftPlay && values.softPlayChildren) {
            softPlayDescription = ` with Soft Play for ${values.softPlayChildren} child(ren)`;
        }

        toast({
            title: "Booking Confirmed!",
            description: `Your booking for ${activityTitle}${softPlayDescription} is confirmed for ${format(values.date, "PPP")} at ${values.time}. Total: £${totalPrice.toFixed(2)}`,
        });
        router.push('/bookings');
    }
    
    const { oches, duration, date, time, addSoftPlay, softPlayChildren, firstName, lastName, email, phone, postalCode } = form.getValues();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {step === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            {/* Oche and Duration Selection */}
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="oches"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>Step 1: How many dart oches would you like to reserve?</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex gap-4"
                                                >
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="1" id="1-oche" className="sr-only" />
                                                        </FormControl>
                                                        <Label htmlFor="1-oche" className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === '1' ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>1 OCHE</Label>
                                                    </FormItem>
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="2" id="2-oches" className="sr-only" />
                                                        </FormControl>
                                                        <Label htmlFor="2-oches" className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === '2' ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>2 OCHES</Label>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <p className="text-sm text-muted-foreground">
                                    Each darts oche holds up to 6 players.
                                </p>
                            </div>
                            <Separator />
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="duration"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>Step 2: How long would you like to reserve?</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex gap-4"
                                                >
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="30" id="30-min" className="sr-only" />
                                                        </FormControl>
                                                        <Label htmlFor="30-min" className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === '30' ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>30 MINUTES</Label>
                                                    </FormItem>
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="60" id="60-min" className="sr-only" />
                                                        </FormControl>
                                                        <Label htmlFor="60-min" className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === '60' ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>60 MINUTES</Label>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <p className="text-sm text-muted-foreground">
                                    If there are more than 3 players, we recommend choosing 60 minutes for the best experience.
                                </p>
                            </div>

                            <Separator />

                            <FormField
                                control={form.control}
                                name="addSoftPlay"
                                render={({ field }) => (
                                    <FormItem className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <ToyBrick className="h-5 w-5 text-primary" />
                                            <Label htmlFor="soft-play-switch" className="flex-grow">Step 3: Add Soft Play for other kids?</Label>
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


                            <Separator />

                            {/* Date Picker */}
                            <div className="space-y-4">
                                <FormLabel>Step 4: When would you like to reserve?</FormLabel>
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                                        >
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
                                                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Time Slot Picker */}
                        <div className={cn(!date && "opacity-50")}>
                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => (
                                    <FormItem className="space-y-4">
                                        <FormLabel>Step 5: Please select a start time:</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="grid grid-cols-3 md:grid-cols-4 gap-4"
                                                disabled={!date}
                                            >
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
                )}
                {step === 2 && (
                    <div className="space-y-6">
                        <div>
                             <h3 className="text-2xl font-headline text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">Step 2: Your Information</h3>
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
                                    <div className="flex items-center text-sm">
                                        <Users className="mr-2 h-4 w-4" />
                                        <span>{oches} Oche(s)</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Timer className="mr-2 h-4 w-4" />
                                        <span>{duration} minutes</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        <span>{date ? format(date, "PPP") : 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Clock className="mr-2 h-4 w-4" />
                                        <span>{time}</span>
                                    </div>
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
                                Confirm Booking &amp; Pay
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </Form>
    );
}
