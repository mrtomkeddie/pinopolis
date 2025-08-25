'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Separator } from "./ui/separator";

const formSchema = z.object({
  adults: z.string({ required_error: "Please select the number of adults." }),
  juniors: z.string({ required_error: "Please select the number of juniors." }),
  games: z.string({ required_error: "Please select the number of games." }),
  date: z.date({ required_error: "A date is required." }),
  time: z.string({ required_error: "A time slot is required." }),
}).refine(data => parseInt(data.adults) + parseInt(data.juniors) > 0, {
    message: "You must select at least one guest.",
    path: ["adults"],
}).refine(data => parseInt(data.adults) + parseInt(data.juniors) <= 16, {
    message: "There is a maximum of 16 players per reservation.",
    path: ["adults"],
});


type BookingFormProps = {
    activityTitle: string;
};

const GuestSelectItem = ({ value, isSelected, onClick }: { value: number, isSelected: boolean, onClick: () => void }) => (
    <Button
        type="button"
        variant={isSelected ? "default" : "outline"}
        onClick={onClick}
        className="h-10 w-10"
    >
        {value}
    </Button>
);

export default function BowlingBookingForm({ activityTitle }: BookingFormProps) {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            adults: "0",
            juniors: "0",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Booking Confirmed!",
            description: `Your booking for ${activityTitle} on ${format(values.date, "PPP")} for ${values.adults} adult(s) and ${values.juniors} junior(s) is confirmed.`,
        });
        router.push('/bookings');
    }

    const totalPlayers = parseInt(form.watch('adults') || '0') + parseInt(form.watch('juniors') || '0');


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <div className="space-y-4">
                    <FormLabel>How many guests would you like to reserve for?</FormLabel>
                    <FormField
                        control={form.control}
                        name="adults"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="font-normal text-muted-foreground">Adults:</FormLabel>
                                <FormControl>
                                    <div className="flex flex-wrap gap-2">
                                        {Array.from({ length: 17 }, (_, i) => (
                                            <GuestSelectItem
                                                key={`adults-${i}`}
                                                value={i}
                                                isSelected={field.value === i.toString()}
                                                onClick={() => field.onChange(i.toString())}
                                            />
                                        ))}
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="juniors"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="font-normal text-muted-foreground">Juniors:</FormLabel>
                                <FormControl>
                                    <div className="flex flex-wrap gap-2">
                                        {Array.from({ length: 17 }, (_, i) => (
                                            <GuestSelectItem
                                                key={`juniors-${i}`}
                                                value={i}
                                                isSelected={field.value === i.toString()}
                                                onClick={() => field.onChange(i.toString())}
                                            />
                                        ))}
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                     <FormMessage>{form.formState.errors.adults?.message}</FormMessage>
                     <p className="text-sm text-muted-foreground">
                        There is a maximum of 16 players per reservation. For bookings of more than 16 people please email info@pinopolis.wales
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
                                        <Label htmlFor="1-game" className={cn("block w-full text-center p-3 rounded-md border-2", field.value === '1' ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>1 GAME</Label>
                                    </FormItem>
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroupItem value="2" id="2-games" className="sr-only" />
                                        </FormControl>
                                        <Label htmlFor="2-games" className={cn("block w-full text-center p-3 rounded-md border-2", field.value === '2' ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>2 GAMES</Label>
                                    </FormItem>
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroupItem value="3" id="3-games" className="sr-only" />
                                        </FormControl>
                                        <Label htmlFor="3-games" className={cn("block w-full text-center p-3 rounded-md border-2", field.value === '3' ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>3 GAMES</Label>
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
                        name="time"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex gap-4"
                                    >
                                        <FormItem>
                                        <FormControl>
                                            <RadioGroupItem value="morning" id="morning" className="sr-only" />
                                        </FormControl>
                                        <Label htmlFor="morning" className={cn("block w-full text-center p-3 rounded-md border-2", field.value === 'morning' ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>MORNING</Label>
                                    </FormItem>
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroupItem value="afternoon" id="afternoon" className="sr-only" />
                                        </FormControl>
                                        <Label htmlFor="afternoon" className={cn("block w-full text-center p-3 rounded-md border-2", field.value === 'afternoon' ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>AFTERNOON</Label>
                                    </FormItem>
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroupItem value="evening" id="evening" className="sr-only" />
                                        </FormControl>
                                        <Label htmlFor="evening" className={cn("block w-full text-center p-3 rounded-md border-2", field.value === 'evening' ? 'bg-primary text-primary-foreground border-primary' : 'border-input')}>EVENING</Label>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Separator />
                
                <div className="text-right font-bold text-lg">
                    Total amount: £0.00
                </div>


                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Confirm Booking</Button>
            </form>
        </Form>
    );
}
