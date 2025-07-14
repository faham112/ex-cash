import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/components/Auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, User, Wallet, Settings, Menu, Activity, LogOut, Sun, Moon, Plus, TrendingUp, DollarSign, CreditCard, History, Eye, EyeOff } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";

interface BankAccount {
  id: string;
  bank_name: string;
  account_holder: string;
  account_number: string;
}

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [currentTab, setCurrentTab] = useState('home');
  const [depositAmount, setDepositAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showBalance, setShowBalance] = useState(true);
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();

  // Mock data - in real app, this would come from API
  const [userStats, setUserStats] = useState({
    balance: 25000,
    activeInvestments: 3,
    totalEarnings: 8500,
    todayEarnings: 150,
    monthlyEarnings: 3200
  });

  const [recentTransactions] = useState([
    { id: 1, type: 'deposit', amount: 10000, date: '2024-01-10', status: 'completed' },
    { id: 2, type: 'investment', amount: -5000, date: '2024-01-09', status: 'completed' },
    { id: 3, type: 'profit', amount: 250, date: '2024-01-08', status: 'completed' },
    { id: 4, type: 'withdrawal', amount: -2000, date: '2024-01-07', status: 'pending' }
  ]);

  const [userDepositRequests, setUserDepositRequests] = useState([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [selectedBankAccount, setSelectedBankAccount] = useState('');
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      setLocation("/login");
    }
  }, [user, loading, setLocation]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
      setLocation("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const handleDeposit = () => {
    if (!depositAmount || !paymentMethod) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(depositAmount);
    if (amount < 100) {
      toast({
        title: "Error",
        description: "Minimum deposit amount is PKR 100",
        variant: "destructive",
      });
      return;
    }

    // Simulate deposit processing
    setUserStats(prev => ({
      ...prev,
      balance: prev.balance + amount
    }));

    toast({
      title: "Deposit Initiated",
      description: `PKR ${amount.toLocaleString()} deposit request submitted via ${paymentMethod}`,
    });

    setDepositAmount('');
    setPaymentMethod('');
    setIsDepositDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderTabContent = () => {
    switch (currentTab) {
      case 'activity':
        return (
          <div className="space-y-4">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <History className="h-5 w-5" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-700 rounded-lg bg-gray-800/30">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'deposit' ? 'bg-green-900/50 text-green-400' :
                          transaction.type === 'investment' ? 'bg-blue-900/50 text-blue-400' :
                          transaction.type === 'profit' ? 'bg-purple-900/50 text-purple-400' :
                          'bg-orange-900/50 text-orange-400'
                        }`}>
                          {transaction.type === 'deposit' && <Plus className="h-4 w-4" />}
                          {transaction.type === 'investment' && <TrendingUp className="h-4 w-4" />}
                          {transaction.type === 'profit' && <DollarSign className="h-4 w-4" />}
                          {transaction.type === 'withdrawal' && <CreditCard className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium capitalize text-white">{transaction.type}</p>
                          <p className="text-sm text-gray-400">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {transaction.amount > 0 ? '+' : ''}PKR {Math.abs(transaction.amount).toLocaleString()}
                        </p>
                        <p className={`text-xs ${
                          transaction.status === 'completed' ? 'text-green-400' : 'text-orange-400'
                        }`}>
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'wallet':
        return (
          <div className="space-y-4">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Wallet className="h-5 w-5" />
                  Wallet Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/30">
                    <h3 className="font-semibold text-gray-300">Available Balance</h3>
                    <p className="text-2xl font-bold text-green-400">PKR {userStats.balance.toLocaleString()}</p>
                  </div>
                  <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/30">
                    <h3 className="font-semibold text-gray-300">Total Invested</h3>
                    <p className="text-2xl font-bold text-blue-400">PKR 15,000</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Deposit Money
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                  <Button variant="outline" className="flex-1 border-gray-600 text-white hover:bg-gray-700">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Withdraw
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-4">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Email</Label>
                    <Input value={user.email} disabled className="bg-gray-700/50 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label className="text-gray-300">Account Status</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded-full text-sm">Verified</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300">Member Since</Label>
                    <p className="text-sm text-gray-400 mt-1">January 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <>
            {/* Welcome Header */}
            <Card className="mb-6 bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-blue-400">
                    Welcome back, {user.email?.split('@')[0]}!
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* 2x2 Grid System for Investment Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Total Balance Card */}
              <Card className="bg-gradient-to-br from-green-900/80 to-green-800/80 border-green-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-green-300 flex items-center gap-1">
                      <Wallet className="h-4 w-4" />
                      Total Balance
                    </CardTitle>
                    <div className="p-1 bg-green-700/50 rounded-full">
                      <DollarSign className="h-3 w-3 text-green-300" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xl font-bold text-green-400 mb-1">
                    {showBalance ? `PKR ${userStats.balance.toLocaleString()}` : 'PKR ****'}
                  </p>
                  <p className="text-xs text-green-300/80">Available for investment</p>
                </CardContent>
              </Card>

              {/* Active Investments Card */}
              <Card className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 border-blue-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-blue-300 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      Active Investments
                    </CardTitle>
                    <div className="p-1 bg-blue-700/50 rounded-full">
                      <Activity className="h-3 w-3 text-blue-300" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xl font-bold text-blue-400 mb-1">{userStats.activeInvestments}</p>
                  <p className="text-xs text-blue-300/80">Currently running plans</p>
                </CardContent>
              </Card>

              {/* Total Earnings Card */}
              <Card className="bg-gradient-to-br from-purple-900/80 to-purple-800/80 border-purple-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-purple-300 flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      Total Earnings
                    </CardTitle>
                    <div className="p-1 bg-purple-700/50 rounded-full">
                      <DollarSign className="h-3 w-3 text-purple-300" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xl font-bold text-purple-400 mb-1">
                    {showBalance ? `PKR ${userStats.totalEarnings.toLocaleString()}` : 'PKR ****'}
                  </p>
                  <p className="text-xs text-purple-300/80">Lifetime profits earned</p>
                </CardContent>
              </Card>

              {/* Today's Earnings Card */}
              <Card className="bg-gradient-to-br from-orange-900/80 to-orange-800/80 border-orange-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-orange-300 flex items-center gap-1">
                      <Activity className="h-4 w-4" />
                      Today's Earnings
                    </CardTitle>
                    <div className="p-1 bg-orange-700/50 rounded-full">
                      <TrendingUp className="h-3 w-3 text-orange-300" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xl font-bold text-orange-400 mb-1">
                    {showBalance ? `PKR ${userStats.todayEarnings.toLocaleString()}` : 'PKR ****'}
                  </p>
                  <p className="text-xs text-orange-300/80">Earned today</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="mb-6 bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="h-16 flex flex-col bg-green-600 hover:bg-green-700">
                        <Plus className="h-5 w-5 mb-1" />
                        <span className="text-sm">Deposit</span>
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                  <Button variant="outline" className="h-16 flex flex-col border-gray-600 text-white hover:bg-gray-700">
                    <TrendingUp className="h-5 w-5 mb-1" />
                    <span className="text-sm">Invest</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col border-gray-600 text-white hover:bg-gray-700">
                    <CreditCard className="h-5 w-5 mb-1" />
                    <span className="text-sm">Withdraw</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col border-gray-600 text-white hover:bg-gray-700">
                    <Settings className="h-5 w-5 mb-1" />
                    <span className="text-sm">Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-700 rounded-lg bg-gray-800/30">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'deposit' ? 'bg-green-900/50 text-green-400' :
                          transaction.type === 'investment' ? 'bg-blue-900/50 text-blue-400' :
                          transaction.type === 'profit' ? 'bg-purple-900/50 text-purple-400' :
                          'bg-orange-900/50 text-orange-400'
                        }`}>
                          {transaction.type === 'deposit' && <Plus className="h-4 w-4" />}
                          {transaction.type === 'investment' && <TrendingUp className="h-4 w-4" />}
                          {transaction.type === 'profit' && <DollarSign className="h-4 w-4" />}
                          {transaction.type === 'withdrawal' && <CreditCard className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium capitalize text-white">{transaction.type}</p>
                          <p className="text-sm text-gray-400">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {transaction.amount > 0 ? '+' : ''}PKR {Math.abs(transaction.amount).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-gray-300 hover:text-white hover:bg-gray-700" onClick={() => setCurrentTab('activity')}>
                  View All Transactions
                </Button>
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">
              <span className="text-white">Invest</span>
              <span className="text-blue-400">RO</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 bg-gray-700 text-white hover:bg-gray-600"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button onClick={handleSignOut} variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-700">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 flex-grow pb-20">
        {renderTabContent()}
      </div>

      {/* Deposit Dialog */}
      <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Deposit Money</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount" className="text-gray-300">Amount (PKR)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount (minimum PKR 100)"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="payment-method" className="text-gray-300">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="bank-transfer" className="text-white focus:bg-gray-700">Bank Transfer</SelectItem>
                    <SelectItem value="easypaisa" className="text-white focus:bg-gray-700">EasyPaisa</SelectItem>
                    <SelectItem value="jazzcash" className="text-white focus:bg-gray-700">JazzCash</SelectItem>
                    <SelectItem value="cash" className="text-white focus:bg-gray-700">Cash Deposit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="bank-account" className="text-gray-300">Select Bank Account for Deposit</Label>
              <Select value={selectedBankAccount} onValueChange={setSelectedBankAccount}>
                <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                  <SelectValue placeholder="Select bank account" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {bankAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id} className="text-white focus:bg-gray-700">
                      {account.bank_name} - {account.account_holder} ({account.account_number})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedBankAccount && (
              <div className="bg-gray-700/30 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Deposit Instructions</h4>
                {(() => {
                  const selectedAccount = bankAccounts.find(acc => acc.id === selectedBankAccount);
                  return selectedAccount ? (
                    <div className="space-y-2 text-gray-300">
                      <p><strong>Bank Name:</strong> {selectedAccount.bank_name}</p>
                      <p><strong>Account Holder:</strong> {selectedAccount.account_holder}</p>
                      <p><strong>Account Number:</strong> {selectedAccount.account_number}</p>
                      <div className="mt-3 p-3 bg-blue-900/30 rounded border border-blue-700">
                        <p className="text-blue-200 text-sm">
                          Please transfer the exact amount to the above account and enter your transaction ID below. 
                          Your deposit will be processed after admin verification.
                        </p>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}

            <div>
              <Label htmlFor="transaction-id" className="text-gray-300">Transaction ID (Optional)</Label>
              <Input
                id="transaction-id"
                type="text"
                placeholder="Enter transaction reference ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDepositDialogOpen(false)} className="border-gray-600 text-gray-300 hover:bg-gray-700">
                Cancel
              </Button>
              <Button onClick={handleDeposit} className="bg-green-600 hover:bg-green-700">
                Submit Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-sm border-t border-gray-700">
        <div className="flex justify-between items-center px-4 py-2">
          <button 
            onClick={() => setCurrentTab('home')}
            className={`flex flex-col items-center p-2 ${currentTab === 'home' ? 'text-blue-400' : 'text-gray-400'}`}
          >
            <Home size={24} />
            <span className="text-xs">Home</span>
          </button>

          <button 
            onClick={() => setCurrentTab('activity')}
            className={`flex flex-col items-center p-2 ${currentTab === 'activity' ? 'text-blue-400' : 'text-gray-400'}`}
          >
            <Activity size={24} />
            <span className="text-xs">Activity</span>
          </button>

          <button 
            onClick={() => setCurrentTab('wallet')}
            className={`flex flex-col items-center p-2 ${currentTab === 'wallet' ? 'text-blue-400' : 'text-gray-400'}`}
          >
            <Wallet size={24} />
            <span className="text-xs">Wallet</span>
          </button>

          <button 
            onClick={() => setCurrentTab('profile')}
            className={`flex flex-col items-center p-2 ${currentTab === 'profile' ? 'text-blue-400' : 'text-gray-400'}`}
          >
            <User size={24} />
            <span className="text-xs">Profile</span>
          </button>

          <Sheet>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center p-2 text-gray-400">
                <Menu size={24} />
                <span className="text-xs">Menu</span>
              </button>
            </SheetTrigger>
            <SheetContent className="bg-gray-800 border-gray-700">
              <div className="flex flex-col gap-4 pt-10">
                <a href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                  <User className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Dashboard</span>
                </a>
                <Button variant="ghost" className="justify-start text-white hover:bg-gray-700" onClick={() => setCurrentTab('settings')}>
                  <Settings className="mr-2" size={18} />
                  Settings
                </Button>
                <Button variant="ghost" className="justify-start text-white hover:bg-gray-700" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
