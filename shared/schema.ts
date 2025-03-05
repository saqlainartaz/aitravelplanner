import { pgTable, text, serial, integer, jsonb, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const travelRequests = pgTable("travel_requests", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  travelFrom: text("travel_from").notNull(),
  destination: text("destination").notNull(),
  budget: integer("budget").notNull(),
  startDate: text("start_date").notNull(), 
  endDate: text("end_date").notNull(), 
  preferences: text("preferences").notNull(),
  travelGroup: text("travel_group").notNull(),
  accommodationType: text("accommodation_type").notNull(),
  activities: text("activities").notNull(),
  transportationMode: text("transportation_mode").notNull(),
  recommendations: jsonb("recommendations"),
});

// For the form validation, we'll handle dates as Date objects
// but convert them to strings when sending to the server
export const insertTravelRequestSchema = createInsertSchema(travelRequests, {
  startDate: z.date().transform(date => date.toISOString()),
  endDate: z.date().transform(date => date.toISOString()),
}).omit({
  id: true,
  recommendations: true,
});

export type InsertTravelRequest = z.infer<typeof insertTravelRequestSchema>;
export type TravelRequest = typeof travelRequests.$inferSelect;