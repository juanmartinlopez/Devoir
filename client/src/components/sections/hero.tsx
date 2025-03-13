import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import logo from "../../assets/text.png";

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView();
    }
  };

  return (
    <section id="hero" className="relative min-h-[50vh] md:min-h-screen flex items-start pt-16 md:items-center md:pt-0 bg-[#F8F7F3]">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1445294211564-3ca59d999abd?q=80&w=2000&auto=format&fit=crop")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="container mx-auto px-4 pb-8 md:py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <img src={logo} alt="Devoir" className="w-3/4 md:w-auto mb-10 md:mb-8"/>
          <p className="text-lg md:text-2xl text-gray-600 mb-2 md:mb-4">
            Cultivamos soluciones digitales
          </p>
          <p className="text-lg md:text-2xl text-gray-600 mb-20 md:mb-8">
            Desarrollo de software a medida y marketing digital para hacer crecer tu negocio
          </p>
          <Button size="lg" className="group text-base md:text-lg px-6 py-3 h-auto" onClick={scrollToContact}>
            Consultá
            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}