
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>
        <Card className="max-w-4xl mx-auto">
          <CardContent className="pt-6 prose prose-invert">
            <h2>1. Information Collection</h2>
            <p>We collect information that you provide directly to us when creating an account or making investments.</p>

            <h2>2. Use of Information</h2>
            <p>We use the collected information to provide, maintain, and improve our services, process your transactions, and communicate with you.</p>

            <h2>3. Information Security</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access or disclosure.</p>

            <h2>4. Data Sharing</h2>
            <p>We do not sell or share your personal information with third parties except as described in this policy or with your consent.</p>

            <h2>5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
