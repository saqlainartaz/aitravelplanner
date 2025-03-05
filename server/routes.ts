import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateTravelRecommendations } from "./lib/openai";
import { sendTravelRecommendations } from "./lib/email";
import { postToWebflow } from "./lib/webflow";
import { insertTravelRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/travel-advice", async (req, res) => {
    try {
      const validatedData = insertTravelRequestSchema.parse(req.body);
      
      // Generate recommendations using OpenAI
      const recommendations = await generateTravelRecommendations(
        validatedData.destination,
        validatedData.budget,
        validatedData.duration,
        validatedData.preferences
      );

      // Store in database
      const travelRequest = await storage.createTravelRequest({
        ...validatedData,
        recommendations
      });

      // Send email
      await sendTravelRecommendations(validatedData.email, recommendations);

      // Post to Webflow
      await postToWebflow(validatedData.destination, recommendations);

      res.json({ success: true, recommendations, id: travelRequest.id });
    } catch (error) {
      console.error("Error processing travel advice request:", error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "An error occurred" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
