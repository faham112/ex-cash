import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function DepositRequests() {
  const { data: deposits, isLoading } = useQuery({
    queryKey: ["/api/deposits"],
  });

  // Mock deposits for demonstration
  const mockDeposits = [
    {
      id: 1,
      userId: 1,
      amount: "250.00",
      method: "JazzCash",
      status: "pending",
      user: {
        name: "John Smith",
        email: "john@example.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
      },
      createdAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      userId: 2,
      amount: "500.00",
      method: "Easypaisa",
      status: "approved",
      user: {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
      },
      createdAt: new Date("2024-01-14"),
    },
    {
      id: 3,
      userId: 3,
      amount: "150.00",
      method: "Bank Transfer",
      status: "rejected",
      user: {
        name: "Michael Chen",
        email: "michael@example.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
      },
      createdAt: new Date("2024-01-13"),
    },
  ];

  const displayDeposits = deposits?.length ? deposits : mockDeposits;

  if (isLoading) {
    return (
      <DashboardLayout pageTitle="Deposit Requests">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading deposits...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Deposit Requests">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Deposit Requests</h2>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {displayDeposits.map((deposit) => (
                <tr key={deposit.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={deposit.user.avatar} 
                        alt="User" 
                        className="w-8 h-8 rounded-full object-cover" 
                      />
                      <div>
                        <div className="text-sm font-medium text-foreground">{deposit.user.name}</div>
                        <div className="text-sm text-muted-foreground">{deposit.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">${deposit.amount}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{deposit.method}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(deposit.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Badge 
                      variant={
                        deposit.status === "approved" ? "default" :
                        deposit.status === "pending" ? "secondary" : "destructive"
                      }
                      className={
                        deposit.status === "approved" ? "bg-green-100 text-success-green dark:bg-green-900/20" :
                        deposit.status === "pending" ? "bg-yellow-100 text-warning-amber dark:bg-yellow-900/20" :
                        "bg-red-100 text-destructive dark:bg-red-900/20"
                      }
                    >
                      {deposit.status === "approved" ? "Approved" :
                       deposit.status === "pending" ? "Pending" : "Rejected"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                        View Proof
                      </Button>
                      {deposit.status === "pending" && (
                        <>
                          <Button variant="ghost" size="sm" className="text-success-green hover:text-success-green">
                            Approve
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            Reject
                          </Button>
                        </>
                      )}
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
