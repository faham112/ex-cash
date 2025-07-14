import { Link } from "wouter";
import { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }
      
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter!",
      });
      setEmail("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-muted pt-12 pb-6 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div>
            <Link href="/" className="text-2xl font-bold mb-4 inline-block text-[#020817]">
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
        
        <div className="mt-8">
          <Card className="bg-background/50 border-none">
            <CardHeader>
              <CardTitle>Newsletter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                Stay updated with the latest investment opportunities and platform news.
              </p>
              <form onSubmit={handleNewsletterSubmit}>
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background text-foreground h-full"
                      disabled={isSubscribing}
                    />
                  </div>
                  <div className="col-span-1">
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      disabled={isSubscribing}
                    >
                      {isSubscribing ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </div>
                </div>
              </form>
              <p className="text-xs text-muted-foreground mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="border-t border-border pt-6 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} InvestRO. All rights reserved.</p>
          <p className="mt-2">
          </p>
        </div>
      </div>
    </footer>
  );
}
