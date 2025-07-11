import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Eye,
  Shield,
  Activity,
  Mail,
  UserCheck,
  Wallet,
  BarChart3,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  MessageSquare,
  Bell,
  FileText,
  Calendar,
  CreditCard,
  PieChart,
  LineChart,
  Target,
  Award,
  Globe,
  Lock,
  Unlock,
  Ban,
  Check,
  X,
  Menu,
  Home,
  Database,
  History,
  BarChart2,
  UserCog,
  Monitor,
  Zap,
  AlertCircle
} from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [bankAccounts, setBankAccounts] = useState([]);
  const [depositRequests, setDepositRequests] = useState([]);
  const [isAddBankDialogOpen, setIsAddBankDialogOpen] = useState(false);
  const [newBankAccount, setNewBankAccount] = useState({
    bank_name: '',
    account_holder: '',
    account_number: '',
    status: 'active'
  });

  useEffect(() => {
    // Check admin authentication
    const adminAuth = localStorage.getItem('adminAuth');
    const adminUsername = localStorage.getItem('adminUser');
    
    if (adminAuth === 'true' && adminUsername) {
      setIsAuthenticated(true);
      setAdminUser(adminUsername);
      fetchBankAccounts();
      fetchDepositRequests();
    } else {
      setLocation('/admin/login');
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUser');
    setLocation('/admin/login');
  };

  const fetchBankAccounts = async () => {
    try {
      const response = await fetch('/api/admin/bank-accounts');
      if (response.ok) {
        const accounts = await response.json();
        setBankAccounts(accounts);
      }
    } catch (error) {
      console.error('Error fetching bank accounts:', error);
    }
  };

  const fetchDepositRequests = async () => {
    try {
      const response = await fetch('/api/admin/deposit-requests');
      if (response.ok) {
        const requests = await response.json();
        setDepositRequests(requests);
      }
    } catch (error) {
      console.error('Error fetching deposit requests:', error);
    }
  };

  const handleAddBankAccount = async () => {
    try {
      const response = await fetch('/api/admin/bank-accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBankAccount),
      });

      if (response.ok) {
        const account = await response.json();
        setBankAccounts(prev => [...prev, account]);
        setNewBankAccount({
          bank_name: '',
          account_holder: '',
          account_number: '',
          status: 'active'
        });
        setIsAddBankDialogOpen(false);
      }
    } catch (error) {
      console.error('Error adding bank account:', error);
    }
  };

  const handleApproveDeposit = async (requestId, adminNotes = '') => {
    try {
      const response = await fetch(`/api/admin/deposit-requests/${requestId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminNotes }),
      });

      if (response.ok) {
        fetchDepositRequests();
      }
    } catch (error) {
      console.error('Error approving deposit:', error);
    }
  };

  const handleRejectDeposit = async (requestId, adminNotes = '') => {
    try {
      const response = await fetch(`/api/admin/deposit-requests/${requestId}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminNotes }),
      });

      if (response.ok) {
        fetchDepositRequests();
      }
    } catch (error) {
      console.error('Error rejecting deposit:', error);
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white dark:bg-card border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold">InvestRO Admin</h1>
              <p className="text-sm text-muted-foreground">Admin Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium">Welcome, {adminUser}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm" className="hidden md:flex">
              <LogOut className="h-4 w-4" />
            </Button>
            
            {/* Admin Hamburger Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-left">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="text-black dark:text-white">InvestRO</span>
                    <span className="text-sm text-muted-foreground ml-2">Admin</span>
                  </SheetTitle>
                </SheetHeader>
                
                <div className="mt-8 space-y-6">
                  {/* Admin Info */}
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-medium">Welcome, {adminUser}</p>
                    <p className="text-xs text-muted-foreground">Administrator</p>
                    <Badge variant="secondary" className="mt-2">Active Session</Badge>
                  </div>

                  <Separator />

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Quick Actions</h3>
                    <div className="space-y-2">
                      <button 
                        onClick={() => setActiveTab('overview')}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors w-full text-left"
                      >
                        <Home className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Overview</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('users')}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors w-full text-left"
                      >
                        <Users className="h-5 w-5 text-green-600" />
                        <span className="font-medium">User Management</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('investments')}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors w-full text-left"
                      >
                        <DollarSign className="h-5 w-5 text-purple-600" />
                        <span className="font-medium">Investments</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('transactions')}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors w-full text-left"
                      >
                        <CreditCard className="h-5 w-5 text-orange-600" />
                        <span className="font-medium">Transactions</span>
                      </button>
                    </div>
                  </div>

                  <Separator />

                  {/* Management Tools */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Management</h3>
                    <div className="space-y-2">
                      <button 
                        onClick={() => setActiveTab('newsletter')}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors w-full text-left"
                      >
                        <Mail className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Newsletter</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('analytics')}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors w-full text-left"
                      >
                        <BarChart3 className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Analytics</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('settings')}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors w-full text-left"
                      >
                        <Settings className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">Settings</span>
                      </button>
                    </div>
                  </div>

                  <Separator />

                  {/* Platform Tools */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Platform</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 rounded-lg">
                        <Monitor className="h-5 w-5 text-green-600" />
                        <div>
                          <span className="font-medium text-sm">System Status</span>
                          <p className="text-xs text-muted-foreground">All systems operational</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg">
                        <Activity className="h-5 w-5 text-blue-600" />
                        <div>
                          <span className="font-medium text-sm">Active Users</span>
                          <p className="text-xs text-muted-foreground">892 online now</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg">
                        <Zap className="h-5 w-5 text-yellow-600" />
                        <div>
                          <span className="font-medium text-sm">Performance</span>
                          <p className="text-xs text-muted-foreground">Excellent (98.5%)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* System Actions */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">System</h3>
                    <div className="space-y-2">
                      <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors w-full text-left">
                        <RefreshCw className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Refresh Data</span>
                      </button>
                      <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors w-full text-left">
                        <Download className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Export Reports</span>
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left text-red-600 dark:text-red-400"
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">PKR 50,89,000</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Investors</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">892</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.5%</div>
              <p className="text-xs text-muted-foreground">+0.5% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="deposits">Deposits</TabsTrigger>
            <TabsTrigger value="banks">Bank Accounts</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                      <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                        <Plus className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">New user registration</p>
                        <p className="text-sm text-muted-foreground">user@example.com joined</p>
                      </div>
                      <p className="text-sm text-muted-foreground">2 min ago</p>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                        <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">New investment</p>
                        <p className="text-sm text-muted-foreground">PKR 10,000 Gold Plan</p>
                      </div>
                      <p className="text-sm text-muted-foreground">5 min ago</p>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                      <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                        <CreditCard className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Withdrawal request</p>
                        <p className="text-sm text-muted-foreground">PKR 2,500 pending approval</p>
                      </div>
                      <p className="text-sm text-muted-foreground">10 min ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-16 flex flex-col">
                      <Bell className="h-5 w-5 mb-1" />
                      <span className="text-sm">Send Alert</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col">
                      <MessageSquare className="h-5 w-5 mb-1" />
                      <span className="text-sm">Broadcast</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col">
                      <FileText className="h-5 w-5 mb-1" />
                      <span className="text-sm">Reports</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col">
                      <Download className="h-5 w-5 mb-1" />
                      <span className="text-sm">Export</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Platform Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Platform Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Server Status</p>
                      <p className="text-xs text-green-600">Online</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Pending Reviews</p>
                      <p className="text-xs text-yellow-600">12 items</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                      <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">API Response</p>
                      <p className="text-xs text-blue-600">145ms</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                      <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Uptime</p>
                      <p className="text-xs text-purple-600">99.9%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Management
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Search and Filter */}
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Users Table */}
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead>Investments</TableHead>
                          <TableHead>Balance</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                                <UserCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <p className="font-medium">john.doe@example.com</p>
                                <p className="text-sm text-muted-foreground">ID: USR001</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">Jan 8, 2025</p>
                              <p className="text-xs text-muted-foreground">2 days ago</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm font-medium">3 active</p>
                              <p className="text-xs text-muted-foreground">PKR 25,000</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm font-medium">PKR 12,500</p>
                              <p className="text-xs text-green-600">+PKR 2,500</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Lock className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                                <UserCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="font-medium">jane.smith@example.com</p>
                                <p className="text-sm text-muted-foreground">ID: USR002</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">Jan 5, 2025</p>
                              <p className="text-xs text-muted-foreground">5 days ago</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm font-medium">1 active</p>
                              <p className="text-xs text-muted-foreground">PKR 15,000</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm font-medium">PKR 8,250</p>
                              <p className="text-xs text-green-600">+PKR 1,250</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Lock className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Investments Tab */}
          <TabsContent value="investments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Investment Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full">
                        <DollarSign className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <p className="font-medium">Gold Plan Investment</p>
                        <p className="text-sm text-muted-foreground">PKR 5,000 • john.doe@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Active</Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                        <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium">Diamond Plan Investment</p>
                        <p className="text-sm text-muted-foreground">PKR 15,000 • jane.smith@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Active</Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Transaction History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                        <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">Deposit</p>
                        <p className="text-sm text-muted-foreground">PKR 5,000 • john.doe@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Success</Badge>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                        <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">Withdrawal</p>
                        <p className="text-sm text-muted-foreground">PKR 1,200 • jane.smith@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">Pending</Badge>
                      <p className="text-sm text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deposits Tab */}
          <TabsContent value="deposits" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Deposit Requests
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={fetchDepositRequests}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Deposit Requests Table */}
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Bank Details</TableHead>
                          <TableHead>Payment Method</TableHead>
                          <TableHead>Transaction ID</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {depositRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{request.user_email}</p>
                                <p className="text-sm text-muted-foreground">{request.user_name}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <p className="font-medium">PKR {parseFloat(request.amount).toLocaleString()}</p>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{request.bank_name}</p>
                                <p className="text-sm text-muted-foreground">{request.account_holder}</p>
                                <p className="text-sm text-muted-foreground">{request.account_number}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{request.payment_method}</Badge>
                            </TableCell>
                            <TableCell>
                              <p className="text-sm">{request.transaction_id || 'N/A'}</p>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                className={
                                  request.status === 'approved' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                    : request.status === 'rejected'
                                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                                }
                              >
                                {request.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="text-sm">{new Date(request.created_at).toLocaleDateString()}</p>
                                <p className="text-xs text-muted-foreground">{new Date(request.created_at).toLocaleTimeString()}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {request.status === 'pending' && (
                                <div className="flex items-center space-x-2">
                                  <Button 
                                    size="sm" 
                                    onClick={() => handleApproveDeposit(request.id, 'Payment verified and approved')}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="destructive"
                                    onClick={() => handleRejectDeposit(request.id, 'Payment not verified')}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                              {request.status !== 'pending' && (
                                <div className="text-sm text-muted-foreground">
                                  {request.admin_notes && (
                                    <p>Notes: {request.admin_notes}</p>
                                  )}
                                  {request.processed_at && (
                                    <p>Processed: {new Date(request.processed_at).toLocaleDateString()}</p>
                                  )}
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                        {depositRequests.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center text-muted-foreground">
                              No deposit requests found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bank Accounts Tab */}
          <TabsContent value="banks" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Bank Account Management
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Dialog open={isAddBankDialogOpen} onOpenChange={setIsAddBankDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Account
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Bank Account</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="bank-name">Bank Name</Label>
                            <Input
                              id="bank-name"
                              value={newBankAccount.bank_name}
                              onChange={(e) => setNewBankAccount(prev => ({ ...prev, bank_name: e.target.value }))}
                              placeholder="Enter bank name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="account-holder">Account Holder Name</Label>
                            <Input
                              id="account-holder"
                              value={newBankAccount.account_holder}
                              onChange={(e) => setNewBankAccount(prev => ({ ...prev, account_holder: e.target.value }))}
                              placeholder="Enter account holder name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="account-number">Account Number</Label>
                            <Input
                              id="account-number"
                              value={newBankAccount.account_number}
                              onChange={(e) => setNewBankAccount(prev => ({ ...prev, account_number: e.target.value }))}
                              placeholder="Enter account number"
                            />
                          </div>
                          <div>
                            <Label htmlFor="status">Status</Label>
                            <Select 
                              value={newBankAccount.status} 
                              onValueChange={(value) => setNewBankAccount(prev => ({ ...prev, status: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setIsAddBankDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleAddBankAccount}>
                              Add Account
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm" onClick={fetchBankAccounts}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Bank Accounts Table */}
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Bank Name</TableHead>
                          <TableHead>Account Holder</TableHead>
                          <TableHead>Account Number</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bankAccounts.map((account) => (
                          <TableRow key={account.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                                  <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <p className="font-medium">{account.bank_name}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <p className="font-medium">{account.account_holder}</p>
                            </TableCell>
                            <TableCell>
                              <p className="font-mono text-sm">{account.account_number}</p>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                className={
                                  account.status === 'active' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
                                }
                              >
                                {account.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="text-sm">{new Date(account.created_at).toLocaleDateString()}</p>
                                <p className="text-xs text-muted-foreground">{new Date(account.created_at).toLocaleTimeString()}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        {bankAccounts.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-muted-foreground">
                              No bank accounts found. Add one to get started.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Newsletter Tab */}
          <TabsContent value="newsletter" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Newsletter Management
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Campaign
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export List
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Newsletter Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Subscribers</p>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,245</p>
                        </div>
                        <Mail className="h-8 w-8 text-blue-500" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-800 dark:text-green-200">Active Subscribers</p>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">1,198</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-800 dark:text-purple-200">Open Rate</p>
                          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">68.5%</p>
                        </div>
                        <BarChart3 className="h-8 w-8 text-purple-500" />
                      </div>
                    </div>
                  </div>

                  {/* Search and Filter */}
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search subscribers..."
                        className="pl-9"
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subscribers Table */}
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Email</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Subscribed</TableHead>
                          <TableHead>Campaigns</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="font-medium">newsletter@example.com</p>
                                <p className="text-sm text-muted-foreground">Engagement: High</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">Jan 7, 2025</p>
                              <p className="text-xs text-muted-foreground">3 days ago</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm font-medium">12 sent</p>
                              <p className="text-xs text-green-600">8 opened</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                                <Mail className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                              </div>
                              <div>
                                <p className="font-medium">updates@example.com</p>
                                <p className="text-sm text-muted-foreground">Engagement: Medium</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">Jan 3, 2025</p>
                              <p className="text-xs text-muted-foreground">1 week ago</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm font-medium">8 sent</p>
                              <p className="text-xs text-green-600">5 opened</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    Revenue Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold text-green-600">PKR 89,45,000</p>
                        <p className="text-sm text-muted-foreground">This Month</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">PKR 12,34,000</p>
                        <p className="text-sm text-muted-foreground">Profit Generated</p>
                      </div>
                    </div>
                    
                    <div className="h-32 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Revenue Chart Placeholder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    User Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">1,234</p>
                        <p className="text-sm text-muted-foreground">Total Users</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">892</p>
                        <p className="text-sm text-muted-foreground">Active Investors</p>
                      </div>
                    </div>
                    
                    <div className="h-32 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">User Distribution Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="h-8 w-8 text-green-500" />
                    </div>
                    <p className="text-xl font-bold">+24.5%</p>
                    <p className="text-sm text-muted-foreground">Growth Rate</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Award className="h-8 w-8 text-blue-500" />
                    </div>
                    <p className="text-xl font-bold">98.5%</p>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="h-8 w-8 text-purple-500" />
                    </div>
                    <p className="text-xl font-bold">72.1%</p>
                    <p className="text-sm text-muted-foreground">User Retention</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <DollarSign className="h-8 w-8 text-yellow-500" />
                    </div>
                    <p className="text-xl font-bold">PKR 8,500</p>
                    <p className="text-sm text-muted-foreground">Avg. Investment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Platform Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Investment Plans</p>
                      <p className="text-sm text-muted-foreground">Manage investment plan settings</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Platform Statistics</p>
                      <p className="text-sm text-muted-foreground">View detailed analytics and reports</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">User Management</p>
                      <p className="text-sm text-muted-foreground">Manage user accounts and permissions</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Users
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}