

'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Minus, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"
];

const formSchema = z.object({
  guests: z.coerce.number().min(1, { message: "Must have at least 1 guest." }).max(8, { message: "Maximum 8 guests." }),
  date: z.date({ required_error: "A date is required." }),
  time: z.string({ required_error: "A time slot is required." }),
});

type BookingFormProps = {
    activityTitle: string;
};

export default function BookingForm({ activityTitle }: BookingFormProps) {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            guests: 1,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Booking Confirmed!",
            description: `Your booking for ${activityTitle} on ${format(values.date, "PPP")} at ${values.time} for ${values.guests} guest(s) is confirmed.`,
        });
        router.push('/bookings');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Number of Guests</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        className="h-10 w-10"
                                        onClick={() => form.setValue('guests', Math.max(1, field.value - 1))}
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
                                        onClick={() => form.setValue('guests', Math.min(8, field.value + 1))}
                                        disabled={field.value >= 8}
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
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
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
                    name="time"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Time Slot</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a time slot" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {timeSlots.map(slot => (
                                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Confirm Booking</Button>
            </form>
        </Form>
    );
}
