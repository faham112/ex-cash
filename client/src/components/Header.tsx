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
    <header className="bg-muted border-b border-border py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            Invest<span className="text-primary">RO</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="#plans" className="text-gray-300 hover:text-primary transition-colors">
            Plans
          </Link>
          <Link href="#calculator" className="text-gray-300 hover:text-primary transition-colors">
            Calculator
          </Link>
          <Link href="#how-it-works" className="text-gray-300 hover:text-primary transition-colors">
            About
          </Link>
          <Link href="#contact" className="text-gray-300 hover:text-primary transition-colors">
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
            className="md:hidden ml-2 text-gray-400 hover:text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-muted border-t border-border mt-4">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="/" className="text-white hover:text-primary transition-colors py-2">
              Home
            </Link>
            <Link href="#plans" className="text-gray-300 hover:text-primary transition-colors py-2">
              Plans
            </Link>
            <Link href="#calculator" className="text-gray-300 hover:text-primary transition-colors py-2">
              Calculator
            </Link>
            <Link href="#how-it-works" className="text-gray-300 hover:text-primary transition-colors py-2">
              About
            </Link>
            <Link href="#contact" className="text-gray-300 hover:text-primary transition-colors py-2">
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
