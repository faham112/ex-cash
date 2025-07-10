import { Link } from "wouter";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Send
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted pt-12 pb-6 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="text-2xl font-bold text-white mb-4 inline-block">
              Invest<span className="text-primary">RO</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Secure, reliable investment platform for daily returns on your investments.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Telegram">
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">Home</Link>
              </li>
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-primary">Features</Link>
              </li>
              <li>
                <Link href="#plans" className="text-muted-foreground hover:text-primary">Plans</Link>
              </li>
              <li>
                <Link href="#calculator" className="text-muted-foreground hover:text-primary">Calculator</Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-muted-foreground hover:text-primary">How It Works</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">FAQ</Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">Help Center</Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail className="text-primary h-5 w-5 mt-1 mr-2" />
                <span className="text-muted-foreground">support@investro.online</span>
              </li>
              <li className="flex items-start">
                <Phone className="text-primary h-5 w-5 mt-1 mr-2" />
                <span className="text-muted-foreground">+92 300 1234567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="text-primary h-5 w-5 mt-1 mr-2" />
                <span className="text-muted-foreground">Lahore, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-6 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} InvestRO. All rights reserved.</p>
          <p className="mt-2">
            <span className="text-xs">*Disclaimer: Investments involve risk. Past performance is not indicative of future results.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
