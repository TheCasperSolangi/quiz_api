import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Clients from "@/components/Clients";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Clients />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
