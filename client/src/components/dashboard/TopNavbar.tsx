import { cn } from "@/lib/utils";
import {
  Menu,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  UserCircle,
  LogOut,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopNavbarProps {
  collapsed: boolean;
  onToggle: () => void;
  pageTitle: string;
}

export default function TopNavbar({ collapsed, onToggle, pageTitle }: TopNavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <div 
      className={cn(
        "fixed top-0 right-0 h-16 bg-white shadow-sm z-30 transition-all duration-300 border-b border-border",
        collapsed ? "left-20 w-[calc(100%-5rem)]" : "left-64 w-[calc(100%-16rem)]" // Adjust width based on sidebar
      )}
    >
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon" // Changed size to icon for better button styling
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-muted lg:hidden" // Hide on large screens, show on smaller for toggle
          >
            <Menu className="w-5 h-5 text-muted-foreground" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">{pageTitle}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted"
          >
            {theme === 'dark' ? (
              <Moon className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Sun className="w-5 h-5 text-muted-foreground" />
            )}
          </Button>
          
          <div className="relative">
            <Button variant="ghost" size="icon" className="p-2 rounded-lg hover:bg-muted relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></span>
            </Button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                  alt="Admin Avatar" 
                  className="w-8 h-8 rounded-full object-cover" 
                />
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>
                {user?.user_metadata?.adminId || user?.email || "Admin"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
