import { pgTable, text, uuid, integer, boolean, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  auth_id: uuid("auth_id"),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  full_name: text("full_name"),
  balance: numeric("balance").notNull().default("0"),
  phone: text("phone"),
  referral_code: text("referral_code").unique(),
  referred_by: uuid("referred_by"),
  kyc_status: text("kyc_status").default("pending"),
  status: text("status").default("active"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow()
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  full_name: true,
  phone: true,
  referral_code: true,
  referred_by: true
});

// Plans
export const plans = pgTable("plans", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  roi: numeric("roi").notNull(),
  duration_days: integer("duration_days").notNull(),
  min_investment: numeric("min_investment").notNull(),
  max_investment: numeric("max_investment"),
  principal_return: boolean("principal_return").notNull().default(true),
  bonus: boolean("bonus").notNull().default(false),
  popular: boolean("popular").notNull().default(false),
  active: boolean("active").notNull().default(true),
  features: text("features").array(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow()
});

export const insertPlanSchema = createInsertSchema(plans).pick({
  name: true,
  description: true,
  roi: true,
  duration_days: true,
  min_investment: true,
  max_investment: true,
  principal_return: true,
  bonus: true,
  popular: true,
  features: true
});

// Investments
export const investments = pgTable("investments", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").notNull(),
  plan_id: uuid("plan_id").notNull(),
  amount: numeric("amount").notNull(),
  status: text("status").notNull().default("active"),
  start_date: timestamp("start_date").defaultNow(),
  end_date: timestamp("end_date"),
  total_return: numeric("total_return"),
  daily_profit: numeric("daily_profit"),
  last_profit_date: timestamp("last_profit_date"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow()
});

export const insertInvestmentSchema = createInsertSchema(investments).pick({
  user_id: true,
  plan_id: true,
  amount: true,
  start_date: true
});

// Transactions
export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").notNull(),
  investment_id: uuid("investment_id"),
  type: text("type").notNull(),
  amount: numeric("amount").notNull(),
  status: text("status").notNull().default("pending"),
  payment_method: text("payment_method"),
  transaction_hash: text("transaction_hash"),
  description: text("description"),
  processed_at: timestamp("processed_at"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow()
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  user_id: true,
  investment_id: true,
  type: true,
  amount: true,
  payment_method: true,
  description: true
});

// Referrals
export const referrals = pgTable("referrals", {
  id: uuid("id").primaryKey().defaultRandom(),
  referrer_id: uuid("referrer_id").notNull(),
  referred_id: uuid("referred_id").notNull(),
  commission_rate: numeric("commission_rate").default("10.00"),
  total_earned: numeric("total_earned").default("0.00"),
  created_at: timestamp("created_at").defaultNow()
});

export const insertReferralSchema = createInsertSchema(referrals).pick({
  referrer_id: true,
  referred_id: true,
  commission_rate: true
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPlan = z.infer<typeof insertPlanSchema>;
export type Plan = typeof plans.$inferSelect;

export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type Investment = typeof investments.$inferSelect;

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;

export type InsertReferral = z.infer<typeof insertReferralSchema>;
export type Referral = typeof referrals.$inferSelect;

// Statistics
export interface PlatformStats {
  totalInvestments: number;
  activeInvestors: number;
  successRate: number;
  maxRoi: number;
}

// Return calculation
export interface ReturnCalculation {
  dailyProfit: number;
  weeklyProfit: number;
  monthlyProfit: number;
  totalReturn: number;
  duration: number;
}