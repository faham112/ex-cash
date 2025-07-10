import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { plans } from "@/lib/constants";

export default function Plans() {
  return (
    <section id="plans" className="py-16 bg-muted gradient-bg-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Investment <span className="text-primary">Plans</span>
          </h2>
          <p className="section-subtitle">
            Choose the perfect plan to grow your wealth and achieve your financial goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`plan-card ${plan.popular ? 'border-primary' : 'border-border'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-bl-lg">POPULAR</Badge>
                </div>
              )}
              <div className="py-6 px-6 text-center border-b border-border relative">
                <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                <div className="text-3xl font-bold text-primary mb-2">
                  {plan.roi}% <span className="text-sm text-muted-foreground">Daily ROI</span>
                </div>
                <p className="text-muted-foreground text-sm">{plan.subtitle}</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="text-green-500 h-4 w-4 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Invest Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
