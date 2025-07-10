import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Wallet, 
  Shield, 
  Headphones, 
  ArrowRight, 
  Info 
} from "lucide-react";

export default function Hero() {
  return (
    <section className="py-16 md:py-24 relative gradient-bg">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-12 lg:mb-0 pr-0 lg:pr-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span>Grow </span>
            <span className="text-primary">Your</span>
            <br />
            <span>Wealth with</span>
            <br />
            <span className="text-primary">InvestPro</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Earn daily profits with our secure & trusted investment platform. Start your journey to financial freedom today.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center bg-muted bg-opacity-60 p-3 rounded-lg">
              <TrendingUp className="text-primary h-5 w-5 mr-3" />
              <span>Up to 5% Daily ROI</span>
            </div>
            <div className="flex items-center bg-muted bg-opacity-60 p-3 rounded-lg">
              <Wallet className="text-primary h-5 w-5 mr-3" />
              <span>Instant Withdrawals</span>
            </div>
            <div className="flex items-center bg-muted bg-opacity-60 p-3 rounded-lg">
              <Shield className="text-primary h-5 w-5 mr-3" />
              <span>Secure & Reliable</span>
            </div>
            <div className="flex items-center bg-muted bg-opacity-60 p-3 rounded-lg">
              <Headphones className="text-primary h-5 w-5 mr-3" />
              <span>24/7 Support</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              asChild 
              className="bg-[#fac219] hover:bg-[#e6ae17] text-black font-semibold px-6 py-3 rounded-lg transition-all transform hover:scale-105"
            >
              <Link href="#plans" className="flex items-center gap-2">
                Start Investing Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              asChild 
              className="border border-gray-600 hover:border-primary text-foreground"
            >
              <Link href="#how-it-works" className="flex items-center gap-2">
                Learn More
                <Info className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="stat-card">
            <div className="grid grid-cols-2 gap-8 mb-4">
              <div className="text-center">
                <h3 className="text-primary text-3xl md:text-4xl font-bold mb-2">$10M+</h3>
                <p className="text-muted-foreground">Total Investments</p>
              </div>
              <div className="text-center">
                <h3 className="text-primary text-3xl md:text-4xl font-bold mb-2">50K+</h3>
                <p className="text-muted-foreground">Active Investors</p>
              </div>
              <div className="text-center">
                <h3 className="text-primary text-3xl md:text-4xl font-bold mb-2">98%</h3>
                <p className="text-muted-foreground">Success Rate</p>
              </div>
              <div className="text-center">
                <h3 className="text-primary text-3xl md:text-4xl font-bold mb-2">5%</h3>
                <p className="text-muted-foreground">Daily ROI</p>
              </div>
            </div>
            <div className="mt-8 p-4 bg-gradient-to-r from-background to-muted rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Platform Growth</span>
                <span className="text-sm text-green-500">+24.8%</span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
