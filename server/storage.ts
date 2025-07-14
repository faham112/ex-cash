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
  type ReturnCalculation,
  type InsertBankAccount,
  type InsertDepositRequest
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

  // Statistics
  getStats(): Promise<PlatformStats>;
  getUserStats(userId: string): Promise<any>;
  getUserCount(): Promise<number>;

  // Admin operations
  getBankAccounts(): Promise<any[]>;
  createBankAccount(account: InsertBankAccount): Promise<any>;
  updateBankAccount(id: string, updates: Partial<any>): Promise<any | undefined>;
  deleteBankAccount(id: string): Promise<boolean>;
  getDepositRequests(): Promise<any[]>;
  createDepositRequest(request: InsertDepositRequest): Promise<any>;
  approveDepositRequest(id: string, adminNotes: string): Promise<any | undefined>;
  rejectDepositRequest(id: string, adminNotes: string): Promise<any | undefined>;
  getUserDepositRequests(userId: string): Promise<any[]>;
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

  async createUser(insertUser: InsertUser & { auth_id: string, role?: string }): Promise<User> {
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

  // Admin operations
  async getBankAccounts(): Promise<any[]> {
    const { data, error } = await supabase
      .from('bank_accounts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bank accounts:', error);
      return [];
    }

    return data;
  }

  async getDepositRequests(): Promise<any[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        user:users (
          username,
          email
        )
      `)
      .eq('type', 'deposit')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching deposit requests:', error);
      return [];
    }

    return data;
  }

  async getUserCount(): Promise<number> {
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact' })
      .eq('status', 'active');

    if (error) {
      console.error('Error fetching user count:', error);
      return 0;
    }

    return count || 0;
  }

  async createBankAccount(account: InsertBankAccount): Promise<any> {
    const { data, error } = await supabase
      .from('bank_accounts')
      .insert([account])
      .select()
      .single();

    if (error) {
      console.error('Error creating bank account:', error);
      throw new Error('Failed to create bank account');
    }

    return data;
  }

  async updateBankAccount(id: string, updates: Partial<any>): Promise<any | undefined> {
    const { data, error } = await supabase
      .from('bank_accounts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating bank account:', error);
      return undefined;
    }

    return data;
  }

  async deleteBankAccount(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('bank_accounts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting bank account:', error);
      return false;
    }

    return true;
  }

  async createDepositRequest(request: InsertDepositRequest): Promise<any> {
    const { data, error } = await supabase
      .from('transactions')
      .insert([{ ...request, type: 'deposit', status: 'pending' }])
      .select()
      .single();

    if (error) {
      console.error('Error creating deposit request:', error);
      throw new Error('Failed to create deposit request');
    }

    return data;
  }

  async approveDepositRequest(id: string, adminNotes: string): Promise<any | undefined> {
    const { data, error } = await supabase
      .from('transactions')
      .update({ status: 'approved', admin_notes: adminNotes })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error approving deposit request:', error);
      return undefined;
    }

    return data;
  }

  async rejectDepositRequest(id: string, adminNotes: string): Promise<any | undefined> {
    const { data, error } = await supabase
      .from('transactions')
      .update({ status: 'rejected', admin_notes: adminNotes })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error rejecting deposit request:', error);
      return undefined;
    }

    return data;
  }

  async getUserDepositRequests(userId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        bank_account:bank_accounts (
          bank_name,
          account_holder,
          account_number
        )
      `)
      .eq('user_id', userId)
      .eq('type', 'deposit')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user deposit requests:', error);
      return [];
    }

    return data;
  }
}

export const storage = new SupabaseStorage();
