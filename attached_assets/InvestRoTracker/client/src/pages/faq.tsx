
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
        <Card className="max-w-3xl mx-auto">
          <CardContent className="pt-6">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I start investing?</AccordionTrigger>
                <AccordionContent>
                  Starting with InvestRO is simple. Create an account, choose your preferred investment plan, and make your first deposit. Our platform will guide you through each step.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>What are the minimum investment amounts?</AccordionTrigger>
                <AccordionContent>
                  Our plans start from as low as PKR 50 for the Starter Plan, making it accessible for everyone to begin their investment journey.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>How are returns calculated?</AccordionTrigger>
                <AccordionContent>
                  Returns are calculated daily based on your chosen plan's ROI percentage. You can use our calculator tool to estimate your potential earnings.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>When can I withdraw my earnings?</AccordionTrigger>
                <AccordionContent>
                  Withdrawals are processed instantly through our automated system. You can withdraw your earnings at any time, subject to your plan's terms.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
