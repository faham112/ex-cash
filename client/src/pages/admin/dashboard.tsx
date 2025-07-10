
import { useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ADMIN_CREDENTIALS } from "@/lib/constants";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Simple admin check
    const checkAdmin = async () => {
      if (!sessionStorage.getItem("adminAuth")) {
        setLocation("/login");
      }
    };
    checkAdmin();
  }, [setLocation]);

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Welcome to the admin dashboard</p>
          <Button 
            variant="destructive" 
            onClick={() => {
              sessionStorage.removeItem("adminAuth");
              setLocation("/login");
            }}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
