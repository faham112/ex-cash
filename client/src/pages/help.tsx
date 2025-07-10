
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageCircle } from "lucide-react";

export default function HelpCenter() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Help Center</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="hover-card">
            <CardContent className="pt-6">
              <Mail className="w-8 h-8 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Email Support</h2>
              <p className="text-muted-foreground mb-4">Get help via email within 24 hours</p>
              <Button className="w-full">
                <a href="mailto:support@investro.online">Contact Support</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-card">
            <CardContent className="pt-6">
              <Phone className="w-8 h-8 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Phone Support</h2>
              <p className="text-muted-foreground mb-4">Talk to our support team directly</p>
              <Button className="w-full">
                <a href="tel:+923001234567">Call Now</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-card">
            <CardContent className="pt-6">
              <MessageCircle className="w-8 h-8 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Live Chat</h2>
              <p className="text-muted-foreground mb-4">Get instant help via chat</p>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
