import { pgTable, text, serial, integer, jsonb, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const travelRequests = pgTable("travel_requests", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  destination: text("destination").notNull(),
  budget: integer("budget").notNull(),
  duration: integer("duration").notNull(),
  preferences: text("preferences").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  recommendations: jsonb("recommendations"),
});

export const insertTravelRequestSchema = createInsertSchema(travelRequests).pick({
  email: true,
  destination: true,
  budget: true,
  duration: true,
  preferences: true,
  startDate: true,
  endDate: true,
});

export type InsertTravelRequest = z.infer<typeof insertTravelRequestSchema>;
export type TravelRequest = typeof travelRequests.$inferSelect;