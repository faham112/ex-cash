import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function TransactionHistory() {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["/api/transactions"],
  });

  // Mock transactions for demonstration
  const mockTransactions = [
    {
      id: 1,
      userId: 1,
      type: "deposit",
      amount: "500.00",
      description: "Deposit via JazzCash",
      status: "completed",
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
      },
      createdAt: new Date("2024-01-15T10:30:00"),
    },
    {
      id: 2,
      userId: 2,
      type: "investment",
      amount: "1000.00",
      description: "Investment in Gold Plan",
      status: "completed",
      user: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
      },
      createdAt: new Date("2024-01-15T09:15:00"),
    },
    {
      id: 3,
      userId: 3,
      type: "withdrawal",
      amount: "750.00",
      description: "Withdrawal to Bank Account",
      status: "pending",
      user: {
        name: "Emma Davis",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
      },
      createdAt: new Date("2024-01-14T16:45:00"),
    },
    {
      id: 4,
      userId: 1,
      type: "profit",
      amount: "50.00",
      description: "Daily profit from Silver Plan",
      status: "completed",
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
      },
      createdAt: new Date("2024-01-14T08:00:00"),
    },
    {
      id: 5,
      userId: 2,
      type: "deposit",
      amount: "250.00",
      description: "Deposit via Easypaisa",
      status: "completed",
      user: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
      },
      createdAt: new Date("2024-01-13T14:20:00"),
    },
  ];

  const displayTransactions = transactions?.length ? transactions : mockTransactions;

  const getTypeColor = (type: string) => {
    switch (type) {
      case "deposit":
        return "bg-green-100 text-success-green dark:bg-green-900/20";
      case "withdrawal":
        return "bg-red-100 text-destructive dark:bg-red-900/20";
      case "investment":
        return "bg-blue-100 text-primary dark:bg-blue-900/20";
      case "profit":
        return "bg-yellow-100 text-warning-amber dark:bg-yellow-900/20";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-900/20";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-success-green dark:bg-green-900/20";
      case "pending":
        return "bg-yellow-100 text-warning-amber dark:bg-yellow-900/20";
      case "failed":
        return "bg-red-100 text-destructive dark:bg-red-900/20";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-900/20";
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout pageTitle="Transaction History">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading transactions...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Transaction History">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Transaction History</h2>
        <div className="flex space-x-3">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
              <SelectItem value="withdrawal">Withdrawals</SelectItem>
              <SelectItem value="investment">Investments</SelectItem>
              <SelectItem value="profit">Profits</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {displayTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    #{transaction.id.toString().padStart(6, '0')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={transaction.user.avatar} 
                        alt="User" 
                        className="w-8 h-8 rounded-full object-cover" 
                      />
                      <span className="text-sm font-medium text-foreground">{transaction.user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={getTypeColor(transaction.type)}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    <span className={transaction.type === "withdrawal" ? "text-destructive" : "text-success-green"}>
                      {transaction.type === "withdrawal" ? "-" : "+"}${transaction.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    <div>
                      <div>{new Date(transaction.createdAt).toLocaleDateString()}</div>
                      <div className="text-xs">{new Date(transaction.createdAt).toLocaleTimeString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={getStatusColor(transaction.status)}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
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
