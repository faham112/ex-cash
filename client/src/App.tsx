
import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { AuthProvider, useAuth } from "./components/Auth/AuthProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import NotFound from "./pages/not-found";

const Dashboard = lazy(() => import("./pages/dashboard"));
const AdminLogin = lazy(() => import("./pages/admin/Login")); // Corrected casing
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));

import { Redirect } from "wouter";

function Router() {
  const { user, loading } = useAuth();
  const [path, setLocation] = useLocation(); // Destructure to get path explicitly

  useEffect(() => {
    if (!loading) {
      // Redirect authenticated users from login/register to dashboard
      if (user) {
        if (path === "/admin/login") { // Use path
          setLocation("/admin/dashboard");
        }
      } else {
        // Redirect unauthenticated users from protected routes to login
        if (path.startsWith("/admin") && path !== "/admin/login") { // Use path
          setLocation("/admin/login");
        }
      }
    }
  }, [user, loading, path, setLocation]); // Depend on path

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading authentication...</div>;
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading page...</div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" component={AdminLogin} />
        {user && user.user_metadata?.role === 'admin' ? (
          <Route path="/admin/dashboard" component={AdminDashboard} />
        ) : (
          <Route path="/admin/dashboard">
            {/* If not admin, redirect to admin login */}
            <Redirect to="/admin/login" />
          </Route>
        )}
        
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
