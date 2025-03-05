import OpenAI from "openai";
import { TravelRecommendation } from "@shared/types";

function generateMockRecommendations(
  destination: string,
  budget: number,
  startDate: string,
  endDate: string,
  preferences: string,
  travelGroup: string,
  accommodationType: string,
  activities: string,
  transportationMode: string
): TravelRecommendation {
  return {
    places: [
      {
        name: `Popular Spot in ${destination}`,
        description: "A beautiful location with amazing views and cultural significance.",
        activities: ["Sightseeing", "Photography", "Local Food Tasting"],
        estimatedCost: Math.round(budget * 0.3)
      },
      {
        name: `Hidden Gem in ${destination}`,
        description: "Off the beaten path location loved by locals.",
        activities: ["Walking Tours", "Shopping", "Cultural Activities"],
        estimatedCost: Math.round(budget * 0.2)
      }
    ],
    tips: [
      `Best time to visit ${destination} is during the dates you selected: ${startDate} to ${endDate}`,
      `${transportationMode} is a great choice for getting around`,
      "Remember to carry comfortable walking shoes",
      "Try the local cuisine at recommended restaurants"
    ],
    accommodation: {
      suggestions: [
        `${accommodationType} in City Center - Great for ${travelGroup}`,
        `${accommodationType} near Tourist Spots - Easy access to attractions`,
        `Budget-friendly ${accommodationType} with good reviews`
      ],
      priceRange: `$${Math.round(budget * 0.4)} - $${Math.round(budget * 0.6)} per night`
    },
    transportation: {
      options: [
        "Public Transportation - Economic and efficient",
        "Taxi/Ride-sharing - Convenient for short trips",
        "Rental Services - Flexible for exploration"
      ],
      recommendations: `Based on your preference for ${transportationMode}, we recommend using a combination of public transport and ride-sharing services.`
    }
  };
}

export async function generateTravelRecommendations(
  destination: string,
  budget: number,
  startDate: string,
  endDate: string,
  preferences: string,
  travelGroup: string,
  accommodationType: string,
  activities: string,
  transportationMode: string
): Promise<TravelRecommendation> {
  try {
    // Using mock data for now
    return generateMockRecommendations(
      destination,
      budget,
      startDate,
      endDate,
      preferences,
      travelGroup,
      accommodationType,
      activities,
      transportationMode
    );
  } catch (error: any) {
    console.error("Travel recommendation generation error:", error);
    throw new Error("Unable to generate travel recommendations at this time. Please try again later.");
  }
}