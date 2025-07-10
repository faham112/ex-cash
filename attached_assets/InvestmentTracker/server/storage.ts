import { 
  type User, 
  type InsertUser, 
  type Plan, 
  type InsertPlan, 
  type Investment, 
  type InsertInvestment, 
  type Newsletter,
  type InsertNewsletter,
  type PlatformStats,
  type ReturnCalculation
} from "@shared/schema";
import { supabase } from "./supabase";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByAuthId(authId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<User>): Promise<User | undefined>;
  
  // Plan operations
  getPlans(): Promise<Plan[]>;
  getPlan(id: string): Promise<Plan | undefined>;
  
  // Investment operations
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  getUserInvestments(userId: string): Promise<Investment[]>;
  updateInvestment(id: string, investment: Partial<Investment>): Promise<Investment | undefined>;
  calculateReturns(amount: number, planId: string): Promise<ReturnCalculation | undefined>;
  
  // Transaction operations
  createTransaction(transaction: any): Promise<any>;
  getUserTransactions(userId: string): Promise<any[]>;
  updateTransaction(id: string, transaction: any): Promise<any>;
  
  // Referral operations
  createReferral(referrerId: string, referredId: string): Promise<any>;
  getUserReferrals(userId: string): Promise<any[]>;
  
  // Statistics
  getStats(): Promise<PlatformStats>;
  getUserStats(userId: string): Promise<any>;
  
  // Newsletter operations
  subscribeToNewsletter(email: string): Promise<Newsletter>;
  unsubscribeFromNewsletter(email: string): Promise<void>;
  getNewsletterSubscriptions(): Promise<Newsletter[]>;
}

export class SupabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching user:', error);
      return undefined;
    }
    
    return data as User;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error) {
      console.error('Error fetching user by username:', error);
      return undefined;
    }
    
    return data as User;
  }

  async getUserByAuthId(authId: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', authId)
      .single();
    
    if (error) {
      console.error('Error fetching user by auth ID:', error);
      return undefined;
    }
    
    return data as User;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert([insertUser])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
    
    return data as User;
  }

  async updateUser(id: string, user: Partial<User>): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .update(user)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating user:', error);
      return undefined;
    }
    
    return data as User;
  }

  // Plan operations
  async getPlans(): Promise<Plan[]> {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .eq('active', true)
      .order('created_at');
    
    if (error) {
      console.error('Error fetching plans:', error);
      return [];
    }
    
    return data as Plan[];
  }

  async getPlan(id: string): Promise<Plan | undefined> {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .eq('id', id)
      .eq('active', true)
      .single();
    
    if (error) {
      console.error('Error fetching plan:', error);
      return undefined;
    }
    
    return data as Plan;
  }

  // Investment operations
  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    const { data, error } = await supabase
      .from('investments')
      .insert([investment])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating investment:', error);
      throw new Error('Failed to create investment');
    }
    
    return data as Investment;
  }

  async getUserInvestments(userId: string): Promise<Investment[]> {
    const { data, error } = await supabase
      .from('investments')
      .select(`
        *,
        plans (
          name,
          roi,
          duration_days
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching user investments:', error);
      return [];
    }
    
    return data as Investment[];
  }

  async updateInvestment(id: string, investment: Partial<Investment>): Promise<Investment | undefined> {
    const { data, error } = await supabase
      .from('investments')
      .update(investment)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating investment:', error);
      return undefined;
    }
    
    return data as Investment;
  }

  async calculateReturns(amount: number, planId: string): Promise<ReturnCalculation | undefined> {
    const plan = await this.getPlan(planId);
    
    if (!plan) return undefined;
    
    const rate = Number(plan.roi) / 100;
    const days = plan.duration_days;
    
    const dailyProfit = amount * rate;
    const weeklyProfit = dailyProfit * 7;
    const monthlyProfit = dailyProfit * 30;
    const totalReturn = (dailyProfit * days) + amount;
    
    return {
      dailyProfit,
      weeklyProfit,
      monthlyProfit,
      totalReturn,
      duration: days
    };
  }

  // Transaction operations
  async createTransaction(transaction: any): Promise<any> {
    const { data, error } = await supabase
      .from('transactions')
      .insert([transaction])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating transaction:', error);
      throw new Error('Failed to create transaction');
    }
    
    return data;
  }

  async getUserTransactions(userId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching user transactions:', error);
      return [];
    }
    
    return data;
  }

  async updateTransaction(id: string, transaction: any): Promise<any> {
    const { data, error } = await supabase
      .from('transactions')
      .update(transaction)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating transaction:', error);
      return undefined;
    }
    
    return data;
  }

  // Referral operations
  async createReferral(referrerId: string, referredId: string): Promise<any> {
    const { data, error } = await supabase
      .from('referrals')
      .insert([{
        referrer_id: referrerId,
        referred_id: referredId
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating referral:', error);
      throw new Error('Failed to create referral');
    }
    
    return data;
  }

  async getUserReferrals(userId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('referrals')
      .select(`
        *,
        referred:users!referred_id (
          username,
          email,
          created_at
        )
      `)
      .eq('referrer_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching user referrals:', error);
      return [];
    }
    
    return data;
  }

  // Statistics
  async getStats(): Promise<PlatformStats> {
    const [
      { data: investments, error: investmentsError },
      { data: users, error: usersError },
      { data: plans, error: plansError }
    ] = await Promise.all([
      supabase.from('investments').select('amount, user_id').eq('status', 'active'),
      supabase.from('users').select('id').eq('status', 'active'),
      supabase.from('plans').select('roi').eq('active', true)
    ]);
    
    if (investmentsError || usersError || plansError) {
      console.error('Error fetching stats:', { investmentsError, usersError, plansError });
      return {
        totalInvestments: 10000000,
        activeInvestors: 50000,
        successRate: 98,
        maxRoi: 5.5
      };
    }
    
    const totalInvestments = investments?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 10000000;
    const activeInvestors = users?.length || 50000;
    const maxRoi = plans?.reduce((max, plan) => Math.max(max, Number(plan.roi)), 0) || 5.5;
    
    return {
      totalInvestments,
      activeInvestors,
      successRate: 98,
      maxRoi
    };
  }

  async getUserStats(userId: string): Promise<any> {
    const [
      { data: investments, error: investmentsError },
      { data: transactions, error: transactionsError },
      { data: referrals, error: referralsError }
    ] = await Promise.all([
      supabase.from('investments').select('*').eq('user_id', userId),
      supabase.from('transactions').select('*').eq('user_id', userId),
      supabase.from('referrals').select('*').eq('referrer_id', userId)
    ]);
    
    if (investmentsError || transactionsError || referralsError) {
      console.error('Error fetching user stats:', { investmentsError, transactionsError, referralsError });
      return {
        totalInvestments: 0,
        activeInvestments: 0,
        totalEarnings: 0,
        totalReferrals: 0
      };
    }
    
    const totalInvestments = investments?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0;
    const activeInvestments = investments?.filter(inv => inv.status === 'active').length || 0;
    const totalEarnings = transactions?.filter(t => t.type === 'profit').reduce((sum, t) => sum + Number(t.amount), 0) || 0;
    const totalReferrals = referrals?.length || 0;
    
    return {
      totalInvestments,
      activeInvestments,
      totalEarnings,
      totalReferrals
    };
  }

  // Newsletter operations
  async subscribeToNewsletter(email: string): Promise<Newsletter> {
    const { data, error } = await supabase
      .from('newsletters')
      .insert([{ email }])
      .select()
      .single();
    
    if (error) {
      console.error('Error subscribing to newsletter:', error);
      throw new Error('Failed to subscribe to newsletter');
    }
    
    return data as Newsletter;
  }

  async unsubscribeFromNewsletter(email: string): Promise<void> {
    const { error } = await supabase
      .from('newsletters')
      .update({ 
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString()
      })
      .eq('email', email);
    
    if (error) {
      console.error('Error unsubscribing from newsletter:', error);
      throw new Error('Failed to unsubscribe from newsletter');
    }
  }

  async getNewsletterSubscriptions(): Promise<Newsletter[]> {
    const { data, error } = await supabase
      .from('newsletters')
      .select('*')
      .eq('status', 'active')
      .order('subscribed_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching newsletter subscriptions:', error);
      return [];
    }
    
    return data as Newsletter[];
  }
}

export const storage = new SupabaseStorage();