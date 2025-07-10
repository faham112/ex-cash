import { investments, users, type Investment, type InsertInvestment, type UpdateInvestment, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Investment methods
  getAllInvestments(): Promise<Investment[]>;
  getInvestment(id: number): Promise<Investment | undefined>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  updateInvestment(id: number, investment: Partial<UpdateInvestment>): Promise<Investment | undefined>;
  deleteInvestment(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private investments: Map<number, Investment>;
  private currentUserId: number;
  private currentInvestmentId: number;

  constructor() {
    this.users = new Map();
    this.investments = new Map();
    this.currentUserId = 1;
    this.currentInvestmentId = 1;
    
    // Add some sample investments for demo
    this.createSampleInvestments();
  }

  private createSampleInvestments() {
    const sampleInvestments: InsertInvestment[] = [
      {
        symbol: "AAPL",
        companyName: "Apple Inc.",
        shares: 150,
        purchasePrice: "150.00",
        currentPrice: "175.23",
        purchaseDate: "2024-01-15"
      },
      {
        symbol: "TSLA",
        companyName: "Tesla Inc.",
        shares: 50,
        purchasePrice: "200.00",
        currentPrice: "245.67",
        purchaseDate: "2024-02-10"
      },
      {
        symbol: "MSFT",
        companyName: "Microsoft Corp.",
        shares: 75,
        purchasePrice: "320.00",
        currentPrice: "338.92",
        purchaseDate: "2024-01-20"
      }
    ];

    sampleInvestments.forEach(investment => {
      this.createInvestment(investment);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllInvestments(): Promise<Investment[]> {
    return Array.from(this.investments.values());
  }

  async getInvestment(id: number): Promise<Investment | undefined> {
    return this.investments.get(id);
  }

  async createInvestment(insertInvestment: InsertInvestment): Promise<Investment> {
    const id = this.currentInvestmentId++;
    const investment: Investment = { ...insertInvestment, id };
    this.investments.set(id, investment);
    return investment;
  }

  async updateInvestment(id: number, updateData: Partial<UpdateInvestment>): Promise<Investment | undefined> {
    const existing = this.investments.get(id);
    if (!existing) return undefined;
    
    const updated: Investment = { ...existing, ...updateData };
    this.investments.set(id, updated);
    return updated;
  }

  async deleteInvestment(id: number): Promise<boolean> {
    return this.investments.delete(id);
  }
}

export const storage = new MemStorage();
