import OpenAI from "openai";
import { TravelRecommendation } from "@shared/types";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateTravelRecommendations(
  destination: string,
  budget: number,
  duration: number,
  preferences: string
): Promise<TravelRecommendation> {
  const prompt = `Generate detailed travel recommendations for a trip to ${destination}. 
  Budget: $${budget}
  Duration: ${duration} days
  Preferences: ${preferences}
  
  Please provide recommendations in JSON format including places to visit, activities, tips, accommodation, and transportation options.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate travel recommendations");
  }
}
