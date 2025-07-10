import { UserPlus, MousePointer, Coins } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <UserPlus className="text-primary h-6 w-6" />,
    title: "Create an account",
    description: "Start your investment journey by creating a secure account with InvestRO. Quick and easy registration process to get you started."
  },
  {
    id: 2,
    icon: <MousePointer className="text-primary h-6 w-6" />,
    title: "Choose plan",
    description: "Select from our range of investment plans tailored to meet your financial goals and investment capacity."
  },
  {
    id: 3,
    icon: <Coins className="text-primary h-6 w-6" />,
    title: "Get profit",
    description: "Watch your investments grow and receive consistent returns based on your chosen investment plan."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-muted gradient-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">
            How <span className="text-primary">It Works</span>
          </h2>
          <p className="section-subtitle">
            Start your investment journey with InvestRO in three simple steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div key={step.id} className="step-card">
              <div className="step-number">{step.id}</div>
              <div className="text-center pt-4">
                <div className="step-icon-container">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
