
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'deposit' ? 'bg-green-100 text-green-600' :
                          transaction.type === 'investment' ? 'bg-blue-100 text-blue-600' :
                          transaction.type === 'profit' ? 'bg-purple-100 text-purple-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {transaction.type === 'deposit' && <Plus className="h-4 w-4" />}
                          {transaction.type === 'investment' && <TrendingUp className="h-4 w-4" />}
                          {transaction.type === 'profit' && <DollarSign className="h-4 w-4" />}
                          {transaction.type === 'withdrawal' && <CreditCard className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium capitalize">{transaction.type}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}PKR {Math.abs(transaction.amount).toLocaleString()}
                        </p>
                        <p className={`text-xs ${
                          transaction.status === 'completed' ? 'text-green-600' : 'text-orange-600'
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Wallet Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-gray-600">Available Balance</h3>
                    <p className="text-2xl font-bold text-green-600">PKR {userStats.balance.toLocaleString()}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-gray-600">Total Invested</h3>
                    <p className="text-2xl font-bold text-blue-600">PKR 15,000</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex-1">
                        <Plus className="h-4 w-4 mr-2" />
                        Deposit Money
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                  <Button variant="outline" className="flex-1">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Email</Label>
                    <Input value={user.email} disabled />
                  </div>
                  <div>
                    <Label>Account Status</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Verified</span>
                    </div>
                  </div>
                  <div>
                    <Label>Member Since</Label>
                    <p className="text-sm text-muted-foreground mt-1">January 2024</p>
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
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-orange-600">
                    Welcome back, {user.email?.split('@')[0]}!
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBalance(!showBalance)}
                  >
                    {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* 2x2 Grid System for Investment Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Total Balance Card */}
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-green-800 flex items-center gap-2">
                      <Wallet className="h-5 w-5" />
                      Total Balance
                    </CardTitle>
                    <div className="p-2 bg-green-200 rounded-full">
                      <DollarSign className="h-4 w-4 text-green-700" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600 mb-2">
                    {showBalance ? `PKR ${userStats.balance.toLocaleString()}` : 'PKR ****'}
                  </p>
                  <p className="text-sm text-green-700">Available for investment</p>
                </CardContent>
              </Card>

              {/* Active Investments Card */}
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Active Investments
                    </CardTitle>
                    <div className="p-2 bg-blue-200 rounded-full">
                      <Activity className="h-4 w-4 text-blue-700" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-600 mb-2">{userStats.activeInvestments}</p>
                  <p className="text-sm text-blue-700">Currently running plans</p>
                </CardContent>
              </Card>

              {/* Total Earnings Card */}
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-purple-800 flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Total Earnings
                    </CardTitle>
                    <div className="p-2 bg-purple-200 rounded-full">
                      <DollarSign className="h-4 w-4 text-purple-700" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-purple-600 mb-2">
                    {showBalance ? `PKR ${userStats.totalEarnings.toLocaleString()}` : 'PKR ****'}
                  </p>
                  <p className="text-sm text-purple-700">Lifetime profits earned</p>
                </CardContent>
              </Card>

              {/* Today's Earnings Card */}
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-orange-800 flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Today's Earnings
                    </CardTitle>
                    <div className="p-2 bg-orange-200 rounded-full">
                      <TrendingUp className="h-4 w-4 text-orange-700" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-orange-600 mb-2">
                    {showBalance ? `PKR ${userStats.todayEarnings.toLocaleString()}` : 'PKR ****'}
                  </p>
                  <p className="text-sm text-orange-700">Earned today</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
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
                  <Button variant="outline" className="h-16 flex flex-col">
                    <TrendingUp className="h-5 w-5 mb-1" />
                    <span className="text-sm">Invest</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col">
                    <CreditCard className="h-5 w-5 mb-1" />
                    <span className="text-sm">Withdraw</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col">
                    <Settings className="h-5 w-5 mb-1" />
                    <span className="text-sm">Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'deposit' ? 'bg-green-100 text-green-600' :
                          transaction.type === 'investment' ? 'bg-blue-100 text-blue-600' :
                          transaction.type === 'profit' ? 'bg-purple-100 text-purple-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {transaction.type === 'deposit' && <Plus className="h-4 w-4" />}
                          {transaction.type === 'investment' && <TrendingUp className="h-4 w-4" />}
                          {transaction.type === 'profit' && <DollarSign className="h-4 w-4" />}
                          {transaction.type === 'withdrawal' && <CreditCard className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium capitalize">{transaction.type}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}PKR {Math.abs(transaction.amount).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4" onClick={() => setCurrentTab('activity')}>
                  View All Transactions
                </Button>
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">
              <span className="text-black dark:text-white">Invest</span>
              <span className="text-blue-600">RO</span>
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 bg-[#0f1729] text-[#ffffff] hover:bg-[#0f1729]/90"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            <Button onClick={handleSignOut} variant="outline" size="sm">
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deposit Money</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount (PKR)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount (minimum PKR 100)"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="easypaisa">EasyPaisa</SelectItem>
                  <SelectItem value="jazzcash">JazzCash</SelectItem>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleDeposit} className="flex-1">
                Deposit
              </Button>
              <Button variant="outline" onClick={() => setIsDepositDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="flex justify-between items-center px-4 py-2">
          <button 
            onClick={() => setCurrentTab('home')}
            className={`flex flex-col items-center p-2 ${currentTab === 'home' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Home size={24} />
            <span className="text-xs">Home</span>
          </button>
          
          <button 
            onClick={() => setCurrentTab('activity')}
            className={`flex flex-col items-center p-2 ${currentTab === 'activity' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Activity size={24} />
            <span className="text-xs">Activity</span>
          </button>
          
          <button 
            onClick={() => setCurrentTab('wallet')}
            className={`flex flex-col items-center p-2 ${currentTab === 'wallet' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Wallet size={24} />
            <span className="text-xs">Wallet</span>
          </button>
          
          <button 
            onClick={() => setCurrentTab('profile')}
            className={`flex flex-col items-center p-2 ${currentTab === 'profile' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <User size={24} />
            <span className="text-xs">Profile</span>
          </button>
          
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center p-2 text-muted-foreground">
                <Menu size={24} />
                <span className="text-xs">Menu</span>
              </button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 pt-10">
                <Button variant="ghost" className="justify-start" onClick={() => setCurrentTab('settings')}>
                  <Settings className="mr-2" size={18} />
                  Settings
                </Button>
                <Button variant="ghost" className="justify-start" onClick={handleSignOut}>
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
