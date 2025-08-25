
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Minus, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";

const timeSlots = {
    morning: ["10:30", "10:45", "11:00", "11:15", "11:30", "11:45"],
    afternoon: ["12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45"],
    evening: ["18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30"],
};

const formSchema = z.object({
  adults: z.coerce.number().min(1, { message: "Must have at least 1 adult." }),
  children: z.coerce.number().min(0),
  games: z.string({ required_error: "Please select the number of games." }),
  date: z.date({ required_error: "A date is required." }),
  timeOfDay: z.string({ required_error: "Please select a time of day." }),
  time: z.string({ required_error: "A time slot is required." }),
}).refine(data => data.adults + data.children <= 16, {
    message: "There is a maximum of 16 players per reservation.",
    path: ["adults"],
});

type BookingFormProps = {
    activityTitle: string;
};

export default function BowlingBookingForm({ activityTitle }: BookingFormProps) {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            adults: 1,
            children: 0,
        },
    });

    const timeOfDay = form.watch("timeOfDay");
    const adults = form.watch("adults");
    const children = form.watch("children");

    const totalGuests = adults + children;

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Booking Confirmed!",
            description: `Your booking for ${activityTitle} on ${format(values.date, "PPP")} at ${values.time} for ${values.adults + values.children} guest(s) is confirmed.`,
        });
        router.push('/bookings');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <div className="space-y-4">
                    <FormLabel>How many guests would you like to reserve for?</FormLabel>
                    <FormField
                        control={form.control}
                        name="adults"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-normal">Adults</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className="h-10 w-10"
                                            onClick={() => form.setValue('adults', Math.max(1, field.value - 1))}
                                            disabled={field.value <= 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <Input {...field} readOnly className="text-center" />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className="h-10 w-10"
                                            onClick={() => form.setValue('adults', Math.min(16, field.value + 1))}
                                            disabled={totalGuests >= 16}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="children"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-normal">Children</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className="h-10 w-10"
                                            onClick={() => form.setValue('children', Math.max(0, field.value - 1))}
                                            disabled={field.value <= 0}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <Input {...field} readOnly className="text-center" />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className="h-10 w-10"
                                            onClick={() => form.setValue('children', Math.min(15, field.value + 1))}
                                            disabled={totalGuests >= 16}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <p className="text-sm text-muted-foreground">
                        For bookings of more than 16 people please email info@pinopolis.wales
                    </p>
                </div>


                <Separator />

                <FormField
                    control={form.control}
                    name="games"
                    render={({ field }) => (
                        <FormItem className="space-y-4">
                            <FormLabel>How many games would you like to reserve?</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex gap-4"
                                >
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroupItem value="1" id="1-game" className="sr-only" />
                                        </FormControl>
                                        <Label htmlFor="1-game" className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === '1' ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>1 GAME</Label>
                                    </FormItem>
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroupItem value="2" id="2-games" className="sr-only" />
                                        </FormControl>
                                        <Label htmlFor="2-games" className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === '2' ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>2 GAMES</Label>
                                    </FormItem>
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroupItem value="3" id="3-games" className="sr-only" />
                                        </FormControl>
                                        <Label htmlFor="3-games" className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === '3' ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>3 GAMES</Label>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Separator />

                <div className="space-y-4">
                    <FormLabel>When would you like to reserve?</FormLabel>
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
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
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
                                            disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="timeOfDay"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            form.setValue("time", ""); // Reset time when time of day changes
                                        }}
                                        defaultValue={field.value}
                                        className="grid grid-cols-3 gap-4"
                                    >
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroupItem value="morning" id="morning" className="sr-only" />
                                            </FormControl>
                                            <Label htmlFor="morning" className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === 'morning' ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>MORNING</Label>
                                        </FormItem>
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroupItem value="afternoon" id="afternoon" className="sr-only" />
                                            </FormControl>
                                            <Label htmlFor="afternoon" className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === 'afternoon' ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>AFTERNOON</Label>
                                        </FormItem>
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroupItem value="evening" id="evening" className="sr-only" />
                                            </FormControl>
                                            <Label htmlFor="evening" className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === 'evening' ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>EVENING</Label>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {timeOfDay && (
                     <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem className="space-y-4">
                                <FormLabel>Please select a start time:</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="grid grid-cols-3 md:grid-cols-4 gap-4"
                                    >
                                        {timeSlots[timeOfDay as keyof typeof timeSlots].map((slot) => (
                                            <FormItem key={slot}>
                                                <FormControl>
                                                    <RadioGroupItem value={slot} id={slot} className="sr-only" />
                                                </FormControl>
                                                <Label htmlFor={slot} className={cn("block w-full text-center p-3 rounded-md border-2 cursor-pointer", field.value === slot ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>{slot}</Label>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}


                <Separator />
                
                <div className="text-right font-bold text-lg">
                    Total amount: £0.00
                </div>


                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Confirm Booking</Button>
            </form>
        </Form>
    );
}
