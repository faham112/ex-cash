
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get('/api/stats', async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stats' });
    }
  });

  app.get('/api/plans', async (req, res) => {
    try {
      const plans = await storage.getPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch plans' });
    }
  });

  app.post('/api/calculate', async (req, res) => {
    try {
      const { amount, planId } = req.body;
      
      if (!amount || !planId) {
        return res.status(400).json({ error: 'Amount and plan ID are required' });
      }
      
      const result = await storage.calculateReturns(parseFloat(amount), planId);
      if (!result) {
        return res.status(404).json({ error: 'Plan not found' });
      }
      
      res.json(result);
    } catch (error) {
      console.error('Error calculating returns:', error);
      res.status(500).json({ error: 'Failed to calculate returns' });
    }
  });

  // User management routes
  app.get('/api/users/:id', async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });

  app.put('/api/users/:id', async (req, res) => {
    try {
      const user = await storage.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  });

  app.get('/api/users/:id/stats', async (req, res) => {
    try {
      const stats = await storage.getUserStats(req.params.id);
      res.json(stats);
    } catch (error) {
      console.error('Error fetching user stats:', error);
      res.status(500).json({ error: 'Failed to fetch user stats' });
    }
  });

  // Investment routes
  app.post('/api/investments', async (req, res) => {
    try {
      const investment = await storage.createInvestment(req.body);
      res.status(201).json(investment);
    } catch (error) {
      console.error('Error creating investment:', error);
      res.status(500).json({ error: 'Failed to create investment' });
    }
  });

  app.get('/api/users/:userId/investments', async (req, res) => {
    try {
      const investments = await storage.getUserInvestments(req.params.userId);
      res.json(investments);
    } catch (error) {
      console.error('Error fetching user investments:', error);
      res.status(500).json({ error: 'Failed to fetch investments' });
    }
  });

  // Transaction routes
  app.post('/api/transactions', async (req, res) => {
    try {
      const transaction = await storage.createTransaction(req.body);
      res.status(201).json(transaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ error: 'Failed to create transaction' });
    }
  });

  app.get('/api/users/:userId/transactions', async (req, res) => {
    try {
      const transactions = await storage.getUserTransactions(req.params.userId);
      res.json(transactions);
    } catch (error) {
      console.error('Error fetching user transactions:', error);
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  });

  // Referral routes
  app.post('/api/referrals', async (req, res) => {
    try {
      const { referrerId, referredId } = req.body;
      const referral = await storage.createReferral(referrerId, referredId);
      res.status(201).json(referral);
    } catch (error) {
      console.error('Error creating referral:', error);
      res.status(500).json({ error: 'Failed to create referral' });
    }
  });

  app.get('/api/users/:userId/referrals', async (req, res) => {
    try {
      const referrals = await storage.getUserReferrals(req.params.userId);
      res.json(referrals);
    } catch (error) {
      console.error('Error fetching user referrals:', error);
      res.status(500).json({ error: 'Failed to fetch referrals' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
