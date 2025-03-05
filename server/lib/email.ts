import nodemailer from "nodemailer";
import { TravelRecommendation } from "@shared/types";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendTravelRecommendations(
  to: string,
  recommendations: TravelRecommendation
) {
  const html = `
    <h1>Your Travel Recommendations</h1>
    
    <h2>Places to Visit</h2>
    <ul>
      ${recommendations.places
        .map(
          (place) => `
        <li>
          <h3>${place.name}</h3>
          <p>${place.description}</p>
          <p>Activities: ${place.activities.join(", ")}</p>
          <p>Estimated Cost: $${place.estimatedCost}</p>
        </li>
      `
        )
        .join("")}
    </ul>

    <h2>Travel Tips</h2>
    <ul>
      ${recommendations.tips.map((tip) => `<li>${tip}</li>`).join("")}
    </ul>

    <h2>Accommodation</h2>
    <p>Price Range: ${recommendations.accommodation.priceRange}</p>
    <ul>
      ${recommendations.accommodation.suggestions
        .map((suggestion) => `<li>${suggestion}</li>`)
        .join("")}
    </ul>

    <h2>Transportation</h2>
    <p>${recommendations.transportation.recommendations}</p>
    <ul>
      ${recommendations.transportation.options
        .map((option) => `<li>${option}</li>`)
        .join("")}
    </ul>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || "travel-advisor@example.com",
    to,
    subject: "Your Travel Recommendations",
    html,
  });
}
