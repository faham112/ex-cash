import { pgTable, text, serial, integer, decimal, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const investments = pgTable("investments", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(),
  companyName: text("company_name").notNull(),
  shares: integer("shares").notNull(),
  purchasePrice: decimal("purchase_price", { precision: 10, scale: 2 }).notNull(),
  currentPrice: decimal("current_price", { precision: 10, scale: 2 }).notNull(),
  purchaseDate: date("purchase_date").notNull(),
});

export const insertInvestmentSchema = createInsertSchema(investments).omit({
  id: true,
});

export const updateInvestmentSchema = createInsertSchema(investments).omit({
  id: true,
}).extend({
  currentPrice: z.string().regex(/^\d+(\.\d{1,2})?$/, "Must be a valid price"),
});

export type Investment = typeof investments.$inferSelect;
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type UpdateInvestment = z.infer<typeof updateInvestmentSchema>;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
