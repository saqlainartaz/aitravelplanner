import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DestinationCard from "@/components/destination-card";
import type { TravelRecommendation } from "@shared/types";

export default function Results() {
  const { id } = useParams();

  const { data, isLoading } = useQuery<{
    recommendations: TravelRecommendation;
  }>({
    queryKey: ["/api/travel-advice", id],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <Skeleton className="h-12 w-2/3 mb-6" />
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!data?.recommendations) {
    return <div>No recommendations found</div>;
  }

  const { recommendations } = data;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Your Travel Recommendations</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {recommendations.places.map((place, i) => (
          <DestinationCard key={i} place={place} />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Travel Tips</h2>
          <ul className="list-disc pl-4 space-y-2">
            {recommendations.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Accommodation</h2>
          <p className="text-muted-foreground mb-2">
            Price Range: {recommendations.accommodation.priceRange}
          </p>
          <ul className="list-disc pl-4 space-y-2">
            {recommendations.accommodation.suggestions.map((suggestion, i) => (
              <li key={i}>{suggestion}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
