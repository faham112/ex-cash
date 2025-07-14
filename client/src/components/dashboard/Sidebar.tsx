import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  ArrowDownCircle,
  ArrowUpCircle,
  History,
  UserCircle,
  Settings,
  LogOut,
  Triangle,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const sidebarItems = [
  { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/users", icon: Users, label: "User Management" },
  { path: "/admin/plans", icon: Briefcase, label: "Investment Plans" },
  { path: "/admin/deposits", icon: ArrowDownCircle, label: "Deposit Requests" },
  { path: "/admin/withdrawals", icon: ArrowUpCircle, label: "Withdrawal Requests" },
  { path: "/admin/transactions", icon: History, label: "Transaction History" },
  { path: "/admin/profile", icon: UserCircle, label: "Admin Profile" },
  { path: "/admin/settings", icon: Settings, label: "System Settings" },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const [location] = useLocation();
  const { logout } = useAuth(); // Removed adminId as it's not directly used here

  return (
    <div 
      className={cn(
        "fixed left-0 top-0 h-full bg-white shadow-lg transform transition-all duration-300 z-40 border-r border-border",
        "flex flex-col", // Added flex column for internal layout
        collapsed ? "w-20" : "w-64" // Collapsed width and expanded width
      )}
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Triangle className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-xl font-semibold text-foreground">InvestRo Admin</span>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle} 
          className="lg:hidden" // Hide on large screens, show on smaller for toggle
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <nav className="flex-1 mt-6 overflow-y-auto"> {/* flex-1 to take available space, overflow-y-auto for scroll */}
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.path} href={item.path}>
              <a 
                className={cn(
                  "flex items-center px-6 py-3 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors border-r-3 border-transparent",
                  isActive && "text-primary bg-primary/5 border-r-primary",
                  collapsed && "justify-center px-0" // Center items when collapsed
                )}
              >
                <Icon className={cn("w-5 h-5", !collapsed && "mr-3")} />
                {!collapsed && <span>{item.label}</span>}
              </a>
            </Link>
          );
        })}
      </nav>
        
      <div className="mt-auto border-t border-border p-4"> {/* mt-auto to push to bottom */}
        <Button 
          variant="ghost"
          onClick={logout}
          className={cn(
            "flex items-center justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/5 w-full transition-colors h-auto",
            collapsed && "justify-center px-0" // Center items when collapsed
          )}
        >
          <LogOut className={cn("w-5 h-5", !collapsed && "mr-3")} />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}
