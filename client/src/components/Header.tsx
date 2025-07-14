import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { 
  Menu, 
  X, 
  User, 
  Sun, 
  Moon, 
  Home, 
  CreditCard, 
  Calculator, 
  Info, 
  MessageCircle, 
  Shield, 
  FileText, 
  HelpCircle,
  Phone,
  UserPlus,
  LogIn,
  Settings,
  Globe
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
// import { useAuth } from "./Auth/AuthProvider"; // Removed useAuth import

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  // const { user } = useAuth(); // Removed useAuth hook

  // For now, we'll assume the dashboard link is always visible or handled by routing
  const user = null; // Mock user to avoid errors, will be handled by routing

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 py-4 shadow-sm dark:bg-muted dark:border-border dark:shadow-none">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              <span className="text-black dark:text-white">Invest</span>
              <span className="text-yellow-600">RO</span>
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-slate-900 hover:text-primary transition-colors dark:text-white">
            Home
          </Link>
          <Link href="#plans" className="text-slate-600 hover:text-primary transition-colors dark:text-gray-300">
            Plans
          </Link>
          <Link href="#calculator" className="text-slate-600 hover:text-primary transition-colors dark:text-gray-300">
            Calculator
          </Link>
          <Link href="#how-it-works" className="text-slate-600 hover:text-primary transition-colors dark:text-gray-300">
            About
          </Link>
          <Link href="#contact" className="text-slate-600 hover:text-primary transition-colors dark:text-gray-300">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme Toggle Button - Visible on all screens */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-2"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          {/* Desktop Login Button */}
          <Link href="/login" className="hidden md:block">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-slate-300 dark:border-slate-700">
              <User className="h-4 w-4" /> Login
            </Button>
          </Link>
          
          {/* Mobile Login Button */}
          <Link href="/login" className="md:hidden">
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-slate-300 dark:border-slate-700">
              <User className="h-4 w-4" /> Login
            </Button>
          </Link>
          
          {/* Modern Hamburger Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-left">
                  <span className="text-black dark:text-white">Invest</span><span className="text-blue-600">RO</span>
                  <span className="text-sm text-muted-foreground ml-2">Menu</span>
                </SheetTitle>
              </SheetHeader>
              
              <div className="mt-8 space-y-6">
                {/* Navigation Section */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Navigation</h3>
                  <div className="space-y-2">
                    <Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <Home className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Home</span>
                    </Link>
                    <Link href="#plans" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <CreditCard className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Investment Plans</span>
                    </Link>
                    <Link href="#calculator" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <Calculator className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">ROI Calculator</span>
                    </Link>
                    <Link href="#how-it-works" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <Info className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">How It Works</span>
                    </Link>
                  </div>
                </div>

                <Separator />

                {/* Account Section */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Account</h3>
                  <div className="space-y-2">
                    <Link href="/login" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <LogIn className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Sign In</span>
                    </Link>
                    <Link href="/register" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <UserPlus className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Sign Up</span>
                    </Link>
                    {/* Removed conditional rendering based on user for simplicity on public header */}
                    <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <User className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                  </div>
                </div>

                <Separator />

                {/* Support Section */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Support</h3>
                  <div className="space-y-2">
                    <Link href="/help" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <HelpCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Help Center</span>
                    </Link>
                    <Link href="/contact" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <Phone className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Contact Us</span>
                    </Link>
                    <Link href="/faq" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <MessageCircle className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">FAQ</span>
                    </Link>
                  </div>
                </div>

                <Separator />

                {/* Legal Section */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Legal</h3>
                  <div className="space-y-2">
                    <Link href="/terms" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <FileText className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Terms of Service</span>
                    </Link>
                    <Link href="/privacy" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <Shield className="h-5 w-5 text-red-600" />
                      <span className="font-medium">Privacy Policy</span>
                    </Link>
                  </div>
                </div>

                <Separator />

                {/* Settings Section */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Settings</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={toggleTheme}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors w-full text-left"
                    >
                      {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-600" /> : <Moon className="h-5 w-5 text-indigo-600" />}
                      <span className="font-medium">
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                      </span>
                    </button>
                    <Link href="/admin/login" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <Settings className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Admin Panel</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      </div>

    </header>
  );
}
