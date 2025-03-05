import OpenAI from "openai";
import { TravelRecommendation } from "@shared/types";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
  const prompt = `Generate detailed travel recommendations for a trip to ${destination}. 
  Travel Details:
  - Budget: $${budget}
  - Dates: ${startDate} to ${endDate}
  - Group: ${travelGroup}
  - Accommodation: ${accommodationType}
  - Transportation: ${transportationMode}
  - Activities Interest: ${activities}
  - Additional Preferences: ${preferences}

  Please provide recommendations in JSON format matching the following structure:
  {
    "places": [{"name": string, "description": string, "activities": string[], "estimatedCost": number}],
    "tips": string[],
    "accommodation": {"suggestions": string[], "priceRange": string},
    "transportation": {"options": string[], "recommendations": string}
  }`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    if (!response.choices[0].message.content) {
      throw new Error("No response from OpenAI");
    }

    return JSON.parse(response.choices[0].message.content);
  } catch (error: any) {
    console.error("OpenAI API error:", error);

    // Handle rate limit errors specifically
    if (error.status === 429) {
      throw new Error("We're experiencing high demand. Please try again in a few minutes.");
    }

    // Handle other potential errors
    if (error.status === 401) {
      throw new Error("API authentication error. Please contact support.");
    }

    throw new Error("Unable to generate travel recommendations at this time. Please try again later.");
  }
}