
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

  app.get('/api/users/count', async (req, res) => {
    try {
      const count = await storage.getUserCount();
      res.json({ count });
    } catch (error) {
      console.error('Error fetching user count:', error);
      res.status(500).json({ error: 'Failed to fetch user count' });
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

  // Newsletter subscription endpoint
  app.post('/api/newsletter/subscribe', async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
      
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
      }
      
      // Save newsletter subscription to database
      const subscription = await storage.subscribeToNewsletter(email);
      
      res.json({ 
        message: 'Successfully subscribed to newsletter',
        email: email,
        subscription: subscription
      });
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      res.status(500).json({ error: 'Failed to subscribe to newsletter' });
    }
  });

  // Admin login route
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { adminId, password } = req.body;

      if (!adminId || !password) {
        return res.status(400).json({ error: 'Admin ID and password are required' });
      }

      // For demonstration purposes, use hardcoded credentials
      // In a real application, you would hash passwords and compare them securely
      if (adminId === 'Faham112' && password === 'admin123') {
        // In a real application, you would generate a JWT or session token here
        res.json({ success: true, message: 'Login successful', admin: { adminId: 'Faham112' } });
      } else {
        res.status(401).json({ success: false, error: 'Invalid admin ID or password' });
      }
    } catch (error) {
      console.error('Error during admin login:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });

  // Bank account management routes
  app.get('/api/admin/bank-accounts', async (req, res) => {
    try {
      const accounts = await storage.getBankAccounts();
      res.json(accounts);
    } catch (error) {
      console.error('Error fetching bank accounts:', error);
      res.status(500).json({ error: 'Failed to fetch bank accounts' });
    }
  });

  app.post('/api/admin/bank-accounts', async (req, res) => {
    try {
      const { bankName, accountHolder, accountNumber, status } = req.body;
      
      if (!bankName || !accountHolder || !accountNumber) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      
      const account = await storage.createBankAccount({
        bank_name: bankName,
        account_holder: accountHolder,
        account_number: accountNumber,
        status: status || 'active'
      });
      
      res.status(201).json(account);
    } catch (error) {
      console.error('Error creating bank account:', error);
      res.status(500).json({ error: 'Failed to create bank account' });
    }
  });

  app.put('/api/admin/bank-accounts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const account = await storage.updateBankAccount(id, updates);
      if (!account) {
        return res.status(404).json({ error: 'Bank account not found' });
      }
      
      res.json(account);
    } catch (error) {
      console.error('Error updating bank account:', error);
      res.status(500).json({ error: 'Failed to update bank account' });
    }
  });

  app.delete('/api/admin/bank-accounts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteBankAccount(id);
      
      if (!success) {
        return res.status(404).json({ error: 'Bank account not found' });
      }
      
      res.json({ message: 'Bank account deleted successfully' });
    } catch (error) {
      console.error('Error deleting bank account:', error);
      res.status(500).json({ error: 'Failed to delete bank account' });
    }
  });

  // Deposit request routes
  app.post('/api/deposit-requests', async (req, res) => {
    try {
      const { userId, amount, bankAccountId, paymentMethod, transactionId, receipt } = req.body;
      
      if (!userId || !amount || !bankAccountId || !paymentMethod) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }
      
      const depositRequest = await storage.createDepositRequest({
        user_id: userId, // Use snake_case
        amount: amount.toString(), // Convert to string
        bank_account_id: bankAccountId, // Use snake_case
        payment_method: paymentMethod, // Use snake_case
        transaction_id: transactionId, // Use snake_case
        receipt
      });
      
      res.status(201).json(depositRequest);
    } catch (error) {
      console.error('Error creating deposit request:', error);
      res.status(500).json({ error: 'Failed to create deposit request' });
    }
  });

  app.get('/api/admin/deposit-requests', async (req, res) => {
    try {
      const requests = await storage.getDepositRequests();
      res.json(requests);
    } catch (error) {
      console.error('Error fetching deposit requests:', error);
      res.status(500).json({ error: 'Failed to fetch deposit requests' });
    }
  });

  app.put('/api/admin/deposit-requests/:id/approve', async (req, res) => {
    try {
      const { id } = req.params;
      const { adminNotes } = req.body;
      
      const result = await storage.approveDepositRequest(id, adminNotes);
      if (!result) {
        return res.status(404).json({ error: 'Deposit request not found' });
      }
      
      res.json({ message: 'Deposit request approved successfully', result });
    } catch (error) {
      console.error('Error approving deposit request:', error);
      res.status(500).json({ error: 'Failed to approve deposit request' });
    }
  });

  app.put('/api/admin/deposit-requests/:id/reject', async (req, res) => {
    try {
      const { id } = req.params;
      const { adminNotes } = req.body;
      
      const result = await storage.rejectDepositRequest(id, adminNotes);
      if (!result) {
        return res.status(404).json({ error: 'Deposit request not found' });
      }
      
      res.json({ message: 'Deposit request rejected', result });
    } catch (error) {
      console.error('Error rejecting deposit request:', error);
      res.status(500).json({ error: 'Failed to reject deposit request' });
    }
  });

  app.get('/api/users/:userId/deposit-requests', async (req, res) => {
    try {
      const { userId } = req.params;
      const requests = await storage.getUserDepositRequests(userId);
      res.json(requests);
    } catch (error) {
      console.error('Error fetching user deposit requests:', error);
      res.status(500).json({ error: 'Failed to fetch deposit requests' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
