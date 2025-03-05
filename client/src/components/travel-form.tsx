import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { insertTravelRequestSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Loader2 } from "lucide-react";

export default function TravelForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(
      insertTravelRequestSchema.extend({
        email: insertTravelRequestSchema.shape.email.email("Please enter a valid email"),
        budget: insertTravelRequestSchema.shape.budget.min(100, "Budget must be at least $100"),
        duration: insertTravelRequestSchema.shape.duration.min(1, "Duration must be at least 1 day"),
      })
    ),
    defaultValues: {
      email: "",
      destination: "",
      budget: undefined,
      duration: undefined,
      preferences: "",
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
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (days)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="7"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="bg-background/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="preferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Travel Preferences</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your interests (e.g., adventure, culture, food...)"
                  {...field}
                  className="bg-background/50 min-h-[100px]"
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