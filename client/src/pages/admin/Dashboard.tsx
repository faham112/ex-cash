import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ChartCard from "@/components/dashboard/ChartCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  TrendingUp,
  Clock,
  DollarSign,
  Eye,
  MoreHorizontal
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const chartData = [
  { name: "Jan", deposits: 20, withdrawals: 15 },
  { name: "Feb", deposits: 12, withdrawals: 8 },
  { name: "Mar", deposits: 15, withdrawals: 10 },
  { name: "Apr", deposits: 55, withdrawals: 40 },
  { name: "May", deposits: 45, withdrawals: 35 },
  { name: "Jun", deposits: 15, withdrawals: 12 },
  { name: "Jul", deposits: 25, withdrawals: 20 },
  { name: "Aug", deposits: 30, withdrawals: 25 },
  { name: "Sep", deposits: 35, withdrawals: 30 },
];

const lineChartData = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 45 },
  { name: "Mar", value: 35 },
  { name: "Apr", value: 55 },
  { name: "May", value: 40 },
  { name: "Jun", value: 60 },
];

const pieData = [
  { name: "Active", value: 78, color: "#3b82f6" },
  { name: "Inactive", value: 22, color: "#e5e7eb" },
];

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const recentActivities = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
      },
      action: "New Investment",
      amount: "$500",
      date: "2 hours ago",
      status: "active"
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
      },
      action: "Withdrawal Request",
      amount: "$1,200",
      date: "5 hours ago",
      status: "pending"
    },
    {
      id: 3,
      user: {
        name: "Emma Davis",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
      },
      action: "Deposit Confirmed",
      amount: "$750",
      date: "1 day ago",
      status: "approved"
    },
  ];

  if (isLoading) {
    return (
      <DashboardLayout pageTitle="Dashboard">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Dashboard">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          change={{
            value: "12.5%",
            type: "increase",
            period: "from last month"
          }}
          icon={Users}
          iconColor="text-primary"
          iconBgColor="bg-blue-100 dark:bg-blue-900/20"
        />
        
        <StatCard
          title="Active Investments"
          value={stats?.activeInvestments || 0}
          change={{
            value: "8.2%",
            type: "increase",
            period: "from last week"
          }}
          icon={TrendingUp}
          iconColor="text-success-green"
          iconBgColor="bg-green-100 dark:bg-green-900/20"
        />
        
        <StatCard
          title="Pending Deposits"
          value={stats?.pendingDeposits || 0}
          change={{
            value: "2.1%",
            type: "neutral",
            period: "needs attention"
          }}
          icon={Clock}
          iconColor="text-pink-main"
          iconBgColor="bg-pink-100 dark:bg-pink-900/20"
        />
        
        <StatCard
          title="Total Profit"
          value={`$${stats?.totalProfit || "0"}`}
          change={{
            value: "15.3%",
            type: "increase",
            period: "this month"
          }}
          icon={DollarSign}
          iconColor="text-info-cyan"
          iconBgColor="bg-cyan-100 dark:bg-cyan-900/20"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Daily Deposits Chart */}
        <ChartCard
          title="Daily Deposits"
          value="$42,568"
          change={{
            value: "8.6%",
            type: "increase"
          }}
        >
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--success-green))" 
                  strokeWidth={2}
                  dot={false}
                  fill="hsl(var(--success-green))"
                  fillOpacity={0.1}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Investment Distribution */}
        <ChartCard
          title="Investment Plans"
          subtitle="Plan Distribution"
        >
          <div className="h-40 flex items-center justify-center">
            <div className="relative w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">78%</div>
                  <div className="text-xs text-muted-foreground">Active</div>
                </div>
              </div>
            </div>
          </div>
        </ChartCard>

        {/* Monthly Performance */}
        <ChartCard
          title="Monthly Performance"
          value="$185,247"
          change={{
            value: "12.4%",
            type: "increase"
          }}
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Goal Achievement</span>
              <span className="text-sm font-medium text-foreground">84%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: "84%" }}></div>
            </div>
            <p className="text-xs text-muted-foreground">245 left to Goal</p>
          </div>
        </ChartCard>
      </div>

      {/* Investment Performance Chart */}
      <div className="chart-card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Investment Performance</h3>
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Deposits</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-main rounded-full"></div>
              <span className="text-muted-foreground">Withdrawals</span>
            </div>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Bar dataKey="deposits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="withdrawals" fill="hsl(var(--purple-main))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="dashboard-card">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentActivities.map((activity) => (
                <tr key={activity.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={activity.user.avatar} 
                        alt="User" 
                        className="w-8 h-8 rounded-full object-cover" 
                      />
                      <span className="text-sm font-medium text-foreground">{activity.user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{activity.action}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{activity.amount}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{activity.date}</td>
                  <td className="px-6 py-4">
                    <Badge 
                      variant={activity.status === "active" ? "default" : 
                               activity.status === "pending" ? "secondary" : "outline"}
                      className={
                        activity.status === "active" ? "bg-green-100 text-success-green dark:bg-green-900/20" :
                        activity.status === "pending" ? "bg-yellow-100 text-warning-amber dark:bg-yellow-900/20" :
                        "bg-green-100 text-success-green dark:bg-green-900/20"
                      }
                    >
                      {activity.status === "active" ? "Active" :
                       activity.status === "pending" ? "Pending" : "Approved"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
