import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { planRates, planDays } from "@/lib/constants";

type Plan = 'starter' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'vip';

export default function Calculator() {
  const [investment, setInvestment] = useState<number>(1000);
  const [selectedPlan, setSelectedPlan] = useState<Plan>('starter');
  const [results, setResults] = useState({
    dailyProfit: 0,
    weeklyProfit: 0,
    monthlyProfit: 0,
    totalReturn: 0
  });

  const calculateEarnings = () => {
    const rate = planRates[selectedPlan] / 100;
    const days = planDays[selectedPlan];
    
    const dailyProfit = investment * rate;
    const weeklyProfit = dailyProfit * 7;
    const monthlyProfit = dailyProfit * 30;
    const totalReturn = (dailyProfit * days) + investment;
    
    setResults({
      dailyProfit,
      weeklyProfit,
      monthlyProfit,
      totalReturn
    });
  };

  useEffect(() => {
    calculateEarnings();
  }, [investment, selectedPlan]);

  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setInvestment(value);
  };

  const handlePlanChange = (value: string) => {
    setSelectedPlan(value as Plan);
  };

  return (
    <section id="calculator" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Investment <span className="text-primary">Calculator</span>
          </h2>
          <p className="section-subtitle">
            Calculate your potential earnings based on investment amount and plan.
          </p>
        </div>
        
        <div className="bg-muted rounded-xl p-8 border border-border max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="investment-amount">Investment Amount (PKR)</Label>
                  <div className="relative mt-2">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">PKR</span>
                    <Input 
                      type="number" 
                      id="investment-amount" 
                      className="bg-card border-border text-foreground text-lg pl-12" 
                      value={investment}
                      onChange={handleInvestmentChange}
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="block mb-2">Select Plan</Label>
                  <RadioGroup 
                    value={selectedPlan} 
                    onValueChange={handlePlanChange}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mt-2"
                  >
                    <div className="relative">
                      <RadioGroupItem value="starter" id="plan-starter" className="hidden peer" />
                      <Label htmlFor="plan-starter" className="block w-full p-3 bg-card border border-border rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-muted hover:border-muted-foreground">
                        <div className="font-medium">Starter Plan</div>
                        <div className="text-primary text-sm">1.5% Daily</div>
                      </Label>
                    </div>
                    
                    <div className="relative">
                      <RadioGroupItem value="silver" id="plan-silver" className="hidden peer" />
                      <Label htmlFor="plan-silver" className="block w-full p-3 bg-card border border-border rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-muted hover:border-muted-foreground">
                        <div className="font-medium">Silver Plan</div>
                        <div className="text-primary text-sm">2.2% Daily</div>
                      </Label>
                    </div>
                    
                    <div className="relative">
                      <RadioGroupItem value="gold" id="plan-gold" className="hidden peer" />
                      <Label htmlFor="plan-gold" className="block w-full p-3 bg-card border border-border rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-muted hover:border-muted-foreground">
                        <div className="font-medium">Gold Plan</div>
                        <div className="text-primary text-sm">3.0% Daily</div>
                      </Label>
                    </div>
                    
                    <div className="relative">
                      <RadioGroupItem value="platinum" id="plan-platinum" className="hidden peer" />
                      <Label htmlFor="plan-platinum" className="block w-full p-3 bg-card border border-border rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-muted hover:border-muted-foreground">
                        <div className="font-medium">Platinum Plan</div>
                        <div className="text-primary text-sm">3.8% Daily</div>
                      </Label>
                    </div>
                    
                    <div className="relative">
                      <RadioGroupItem value="diamond" id="plan-diamond" className="hidden peer" />
                      <Label htmlFor="plan-diamond" className="block w-full p-3 bg-card border border-border rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-muted hover:border-muted-foreground">
                        <div className="font-medium">Diamond Plan</div>
                        <div className="text-primary text-sm">4.5% Daily</div>
                      </Label>
                    </div>
                    
                    <div className="relative">
                      <RadioGroupItem value="vip" id="plan-vip" className="hidden peer" />
                      <Label htmlFor="plan-vip" className="block w-full p-3 bg-card border border-border rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-muted hover:border-muted-foreground">
                        <div className="font-medium">VIP Plan</div>
                        <div className="text-primary text-sm">5.5% Daily</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button 
                  className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  onClick={calculateEarnings}
                >
                  Calculate Earnings
                </Button>
              </div>
            </div>
            
            <div>
              <div className="calculator-card">
                <h3 className="text-xl font-semibold mb-4 text-center">Projected Earnings</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm text-muted-foreground mb-1">Daily Profit</Label>
                    <div className="text-2xl font-semibold text-primary">
                      {formatCurrency(results.dailyProfit)}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm text-muted-foreground mb-1">Weekly Profit</Label>
                    <div className="text-2xl font-semibold text-primary">
                      {formatCurrency(results.weeklyProfit)}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm text-muted-foreground mb-1">Monthly Profit</Label>
                    <div className="text-2xl font-semibold text-primary">
                      {formatCurrency(results.monthlyProfit)}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <Label className="block text-sm text-muted-foreground mb-1">Total Return</Label>
                    <div className="text-2xl font-semibold text-primary">
                      {formatCurrency(results.totalReturn)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
