import { TravelRecommendation } from "@shared/types";

const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const WEBFLOW_SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_COLLECTION_ID = process.env.WEBFLOW_COLLECTION_ID;

export async function postToWebflow(
  destination: string,
  recommendations: TravelRecommendation
) {
  const response = await fetch(
    `https://api.webflow.com/sites/${WEBFLOW_SITE_ID}/collections/${WEBFLOW_COLLECTION_ID}/items`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WEBFLOW_API_TOKEN}`,
        "Content-Type": "application/json",
        "accept-version": "1.0.0"
      },
      body: JSON.stringify({
        fields: {
          name: `Travel Guide: ${destination}`,
          slug: destination.toLowerCase().replace(/\s+/g, "-"),
          "places-to-visit": recommendations.places
            .map(
              (place) =>
                `<h3>${place.name}</h3><p>${place.description}</p><p>Activities: ${place.activities.join(
                  ", "
                )}</p>`
            )
            .join(""),
          tips: recommendations.tips.join("\n"),
          accommodation: recommendations.accommodation.suggestions.join("\n"),
          transportation: recommendations.transportation.recommendations,
          status: "Published"
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error("Failed to post to Webflow");
  }
}
