export interface TravelRecommendation {
  places: Array<{
    name: string;
    description: string;
    activities: string[];
    estimatedCost: number;
  }>;
  tips: string[];
  accommodation: {
    suggestions: string[];
    priceRange: string;
  };
  transportation: {
    options: string[];
    recommendations: string;
  };
}
