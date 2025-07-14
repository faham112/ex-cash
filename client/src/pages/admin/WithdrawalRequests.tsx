import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function WithdrawalRequests() {
  const { data: withdrawals, isLoading } = useQuery({
    queryKey: ["/api/withdrawals"],
  });

  // Mock withdrawals for demonstration
  const mockWithdrawals = [
    {
      id: 1,
      userId: 1,
      amount: "1200.00",
      method: "JazzCash",
      accountDetails: "03001234567",
      status: "pending",
      user: {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
      },
      createdAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      userId: 2,
      amount: "800.00",
      method: "Bank Transfer",
      accountDetails: "Bank: ABC Bank, Account: 1234567890",
      status: "approved",
      user: {
        name: "Michael Chen",
        email: "michael@example.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
      },
      createdAt: new Date("2024-01-14"),
    },
    {
      id: 3,
      userId: 3,
      amount: "450.00",
      method: "Easypaisa",
      accountDetails: "03009876543",
      status: "rejected",
      user: {
        name: "Emma Davis",
        email: "emma@example.com",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
      },
      createdAt: new Date("2024-01-13"),
    },
  ];

  const displayWithdrawals = withdrawals?.length ? withdrawals : mockWithdrawals;

  if (isLoading) {
    return (
      <DashboardLayout pageTitle="Withdrawal Requests">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading withdrawals...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Withdrawal Requests">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Withdrawal Requests</h2>
        <div className="flex space-x-3">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-10 w-[250px]" />
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Account Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {displayWithdrawals.map((withdrawal) => (
                <tr key={withdrawal.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={withdrawal.user.avatar} 
                        alt="User" 
                        className="w-8 h-8 rounded-full object-cover" 
                      />
                      <div>
                        <div className="text-sm font-medium text-foreground">{withdrawal.user.name}</div>
                        <div className="text-sm text-muted-foreground">{withdrawal.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">${withdrawal.amount}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{withdrawal.method}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">
                    {withdrawal.accountDetails}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(withdrawal.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Badge 
                      variant={
                        withdrawal.status === "approved" ? "default" :
                        withdrawal.status === "pending" ? "secondary" : "destructive"
                      }
                      className={
                        withdrawal.status === "approved" ? "bg-green-100 text-success-green dark:bg-green-900/20" :
                        withdrawal.status === "pending" ? "bg-yellow-100 text-warning-amber dark:bg-yellow-900/20" :
                        "bg-red-100 text-destructive dark:bg-red-900/20"
                      }
                    >
                      {withdrawal.status === "approved" ? "Approved" :
                       withdrawal.status === "pending" ? "Pending" : "Rejected"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {withdrawal.status === "pending" && (
                        <>
                          <Button variant="ghost" size="sm" className="text-success-green hover:text-success-green">
                            Approve
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            Reject
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                        View Details
                      </Button>
                    </div>
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
