import { Shield, CreditCard, TrendingUp, Headphones } from "lucide-react";

const features = [
  {
    icon: <Shield className="text-primary h-6 w-6" />,
    title: "Secure Platform",
    description: "Your investments are protected with state-of-the-art security measures"
  },
  {
    icon: <CreditCard className="text-primary h-6 w-6" />,
    title: "Quick Withdrawals",
    description: "Get your earnings instantly with our automated withdrawal system"
  },
  {
    icon: <TrendingUp className="text-primary h-6 w-6" />,
    title: "High Returns",
    description: "Earn competitive daily returns on your investments"
  },
  {
    icon: <Headphones className="text-primary h-6 w-6" />,
    title: "24/7 Support",
    description: "Our dedicated team is always here to help you"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Why Choose <span className="text-primary">InvestPro</span>
          </h2>
          <p className="section-subtitle">
            Experience the benefits of smart investing with our secure platform designed to maximize your returns.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card hover-card">
              <div className="feature-icon-container">
                <div className="card-icon">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
