import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white border-b border-slate-200 py-4 shadow-sm dark:bg-muted dark:border-border dark:shadow-none">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-slate-900 dark:text-white">
            Invest<span className="text-primary">RO</span>
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
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-2"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Link href="/login">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Login
            </Button>
          </Link>
          <button 
            className="md:hidden ml-2 text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 mt-4 dark:bg-muted dark:border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="/" className="text-slate-900 hover:text-primary transition-colors py-2 dark:text-white">
              Home
            </Link>
            <Link href="#plans" className="text-slate-600 hover:text-primary transition-colors py-2 dark:text-gray-300">
              Plans
            </Link>
            <Link href="#calculator" className="text-slate-600 hover:text-primary transition-colors py-2 dark:text-gray-300">
              Calculator
            </Link>
            <Link href="#how-it-works" className="text-slate-600 hover:text-primary transition-colors py-2 dark:text-gray-300">
              About
            </Link>
            <Link href="#contact" className="text-slate-600 hover:text-primary transition-colors py-2 dark:text-gray-300">
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
