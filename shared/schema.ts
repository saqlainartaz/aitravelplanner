import { pgTable, text, serial, integer, jsonb, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const travelRequests = pgTable("travel_requests", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  destination: text("destination").notNull(),
  budget: integer("budget").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  preferences: text("preferences").notNull(),
  travelGroup: text("travel_group").notNull(),
  accommodationType: text("accommodation_type").notNull(),
  activities: text("activities").notNull(),
  transportationMode: text("transportation_mode").notNull(),
  recommendations: jsonb("recommendations"),
});

export const insertTravelRequestSchema = createInsertSchema(travelRequests, {
  startDate: z.date(),
  endDate: z.date(),
}).omit({
  id: true,
  recommendations: true,
});

export type InsertTravelRequest = z.infer<typeof insertTravelRequestSchema>;
export type TravelRequest = typeof travelRequests.$inferSelect;