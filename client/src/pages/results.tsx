import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DestinationCard from "@/components/destination-card";
import type { TravelRecommendation } from "@shared/types";
import { MdDirectionsCar, MdHotel } from "react-icons/md";

export default function Results() {
  const { id } = useParams();

  const { data, isLoading } = useQuery<{
    recommendations: TravelRecommendation;
  }>({
    queryKey: ["/api/travel-advice", id],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-8 max-w-7xl">
        <Skeleton className="h-12 w-2/3 mb-6" />
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!data?.recommendations) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-semibold text-muted-foreground">
          No recommendations found
        </h2>
      </div>
    );
  }

  const { recommendations } = data;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary/90 to-blue-600 bg-clip-text text-transparent">
            Your Travel Recommendations
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore our personalized suggestions for your trip
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {recommendations.places.map((place, i) => (
            <DestinationCard key={i} place={place} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 backdrop-blur-sm bg-card/95">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MdHotel className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Accommodation</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Price Range: {recommendations.accommodation.priceRange}
            </p>
            <ul className="space-y-3">
              {recommendations.accommodation.suggestions.map((suggestion, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8 backdrop-blur-sm bg-card/95">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MdDirectionsCar className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Transportation</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              {recommendations.transportation.recommendations}
            </p>
            <ul className="space-y-3">
              {recommendations.transportation.options.map((option, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  {option}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}