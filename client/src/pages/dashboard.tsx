
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/components/Auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, User, Wallet, Settings, Menu, Activity, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [currentTab, setCurrentTab] = useState('home');
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();

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
    return null; // Will redirect to login via useEffect
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header with Hello World */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl text-orange-600 font-bold">InvestRO</h1>
          
          {/* Hello World Section */}
          <div className="text-center flex-1 mx-8">
            <h1 className="text-4xl font-bold text-orange-600">Hello World</h1>
            <p className="text-gray-600 mt-1">Welcome to your investment dashboard</p>
          </div>
          
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="container mx-auto p-4 flex-grow">
        {/* Welcome Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-600">
              Welcome back, {user.email}!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Total Balance</h3>
                <p className="text-2xl font-bold text-green-600">PKR 0.00</p>
              </div>
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">Active Investments</h3>
                <p className="text-2xl font-bold text-blue-600">0</p>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">Total Earnings</h3>
                <p className="text-2xl font-bold text-purple-600">PKR 0.00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-16 flex flex-col">
                <Wallet className="h-5 w-5 mb-1" />
                <span className="text-sm">Deposit</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col">
                <Activity className="h-5 w-5 mb-1" />
                <span className="text-sm">Invest</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col">
                <User className="h-5 w-5 mb-1" />
                <span className="text-sm">Profile</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col">
                <Settings className="h-5 w-5 mb-1" />
                <span className="text-sm">Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
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
