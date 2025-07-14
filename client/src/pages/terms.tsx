
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Terms of Service</h1>
        <Card className="max-w-4xl mx-auto">
          <CardContent className="pt-6 prose prose-invert">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using InvestRO's services, you agree to be bound by these Terms of Service.</p>

            <h2>2. Investment Risks</h2>
            <p>All investments carry risks. Users should carefully consider their investment objectives.</p>

            <h2>3. Account Registration</h2>
            <p>Users must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account.</p>

            <h2>4. Investment Plans</h2>
            <p>Investment plans and their terms are subject to change. Any modifications will be communicated to users in advance.</p>

            <h2>5. Withdrawals</h2>
            <p>Withdrawal requests are processed according to the terms specified in each investment plan. Processing times may vary.</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
