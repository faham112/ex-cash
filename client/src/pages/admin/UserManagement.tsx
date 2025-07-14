import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import type { User } from "@shared/schema";

export default function UserManagement() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["/api/users"],
  });

  // Mock users for demonstration since we don't have any in storage
  const mockUsers = [
    {
      id: 1,
      username: "sarah_johnson",
      email: "sarah.johnson@example.com",
      firstName: "Sarah",
      lastName: "Johnson",
      phone: "+1-555-0123",
      status: "active",
      totalInvestment: "2450.00",
      joinedAt: new Date("2023-12-15"),
    },
    {
      id: 2,
      username: "michael_chen",
      email: "michael.chen@example.com",
      firstName: "Michael",
      lastName: "Chen",
      phone: "+1-555-0456",
      status: "active",
      totalInvestment: "5200.00",
      joinedAt: new Date("2023-11-20"),
    },
    {
      id: 3,
      username: "emma_davis",
      email: "emma.davis@example.com",
      firstName: "Emma",
      lastName: "Davis",
      phone: "+1-555-0789",
      status: "suspended",
      totalInvestment: "1800.00",
      joinedAt: new Date("2024-01-10"),
    },
  ];

  const displayUsers = users?.length ? users : mockUsers;

  if (isLoading) {
    return (
      <DashboardLayout pageTitle="User Management">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading users...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="User Management">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">User Management</h2>
        <div className="flex space-x-3">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Users" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-10 w-[250px]" />
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Total Investment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {displayUsers.map((user, index) => (
                <tr key={user.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={`https://images.unsplash.com/photo-${
                          index === 0 ? '1494790108755-2616b612b786' :
                          index === 1 ? '1472099645785-5658abf4ff4e' :
                          '1438761681033-6461ffad8d80'
                        }?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100`}
                        alt="User" 
                        className="w-10 h-10 rounded-full object-cover" 
                      />
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">ID: #{user.id.toString().padStart(5, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">${user.totalInvestment || "0.00"}</td>
                  <td className="px-6 py-4">
                    <Badge 
                      variant={user.status === "active" ? "default" : "secondary"}
                      className={
                        user.status === "active" ? "bg-green-100 text-success-green dark:bg-green-900/20" :
                        user.status === "suspended" ? "bg-red-100 text-destructive dark:bg-red-900/20" :
                        "bg-yellow-100 text-warning-amber dark:bg-yellow-900/20"
                      }
                    >
                      {user.status === "active" ? "Active" :
                       user.status === "suspended" ? "Suspended" : "Pending"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                        View Profile
                      </Button>
                      <Button variant="ghost" size="sm" className="text-warning-amber hover:text-warning-amber">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        {user.status === "active" ? "Block" : "Unblock"}
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
