import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { insertTravelRequestSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const ACCOMMODATION_TYPES = [
  "Hotel",
  "Resort",
  "Airbnb",
  "Hostel",
  "Vacation Rental",
];

const TRANSPORTATION_MODES = [
  "Flying",
  "Driving",
  "Train",
  "Bus",
  "Combination",
];

const TRAVEL_GROUPS = [
  "Solo",
  "Couple",
  "Family",
  "Friends",
  "Business",
];

export default function TravelForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(
      insertTravelRequestSchema.extend({
        email: insertTravelRequestSchema.shape.email.email("Please enter a valid email"),
        budget: insertTravelRequestSchema.shape.budget.min(100, "Budget must be at least $100"),
        startDate: insertTravelRequestSchema.shape.startDate.refine(
          (date) => date > new Date(),
          "Start date must be in the future"
        ),
        endDate: insertTravelRequestSchema.shape.endDate.refine(
          (date) => date > new Date(),
          "End date must be in the future"
        ),
      })
    ),
    defaultValues: {
      email: "",
      destination: "",
      budget: undefined,
      startDate: undefined,
      endDate: undefined,
      preferences: "",
      travelGroup: undefined,
      accommodationType: undefined,
      activities: "",
      transportationMode: undefined,
    },
  });

  async function onSubmit(data: any) {
    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/travel-advice", data);
      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success!",
          description: "Your travel recommendations are being generated.",
        });
        setLocation(`/results/${result.id}`);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="your@email.com" 
                  {...field}
                  className="bg-background/50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Where do you want to go?" 
                  {...field}
                  className="bg-background/50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal bg-background/50",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date <= new Date()
                      }
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
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal bg-background/50",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date <= new Date() || (form.getValues("startDate") && date <= form.getValues("startDate"))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="5000"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="bg-background/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="travelGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Travel Group</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Who are you traveling with?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TRAVEL_GROUPS.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="accommodationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Accommodation Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select preferred accommodation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ACCOMMODATION_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transportationMode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transportation Mode</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="How do you want to travel?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TRANSPORTATION_MODES.map((mode) => (
                      <SelectItem key={mode} value={mode}>
                        {mode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="activities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Activities</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What activities interest you? (e.g., hiking, museums, food tours...)"
                  {...field}
                  className="bg-background/50 min-h-[80px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Preferences</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any other preferences? (e.g., dietary restrictions, accessibility needs...)"
                  {...field}
                  className="bg-background/50 min-h-[80px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full font-medium" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Recommendations...
            </>
          ) : (
            "Get Recommendations"
          )}
        </Button>
      </form>
    </Form>
  );
}