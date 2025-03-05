import { travelRequests, type TravelRequest, type InsertTravelRequest } from "@shared/schema";

export interface IStorage {
  getTravelRequest(id: number): Promise<TravelRequest | undefined>;
  createTravelRequest(request: InsertTravelRequest & { recommendations: any }): Promise<TravelRequest>;
}

export class MemStorage implements IStorage {
  private requests: Map<number, TravelRequest>;
  currentId: number;

  constructor() {
    this.requests = new Map();
    this.currentId = 1;
  }

  async getTravelRequest(id: number): Promise<TravelRequest | undefined> {
    return this.requests.get(id);
  }

  async createTravelRequest(request: InsertTravelRequest & { recommendations: any }): Promise<TravelRequest> {
    const id = this.currentId++;
    const travelRequest: TravelRequest = { ...request, id };
    this.requests.set(id, travelRequest);
    return travelRequest;
  }
}

export const storage = new MemStorage();