import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Plans from "@/components/Plans";
import Calculator from "@/components/Calculator";
import HowItWorks from "@/components/HowItWorks";
import Community from "@/components/Community";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Plans />
        <Calculator />
        <HowItWorks />
        <Community />
      </main>
      <Footer />
    </div>
  );
}
