import { useState } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

export default function DashboardLayout({ children, pageTitle }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-dashboard-bg"> {/* Main flex container */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      
      <div 
        className={cn(
          "flex-1 flex flex-col transition-all duration-300", // Flex column for navbar and content
          sidebarCollapsed ? "ml-20" : "ml-64" // Adjust margin for the main content wrapper
        )}
      >
        <TopNavbar 
          collapsed={sidebarCollapsed} 
          onToggle={toggleSidebar} 
          pageTitle={pageTitle} 
        />
        
        <main 
          className={cn(
            "mt-16 p-6 flex-1", // mt-16 for navbar height, flex-1 to take remaining space
            "max-w-full lg:max-w-7xl mx-auto w-full" // Max width and center for responsiveness
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
