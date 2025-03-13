import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView();
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-[#F8F7F3]">
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1445294211564-3ca59d999abd?q=80&w=2000&auto=format&fit=crop")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6">
            Cultivamos Soluciones Digitales
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Desarrollo de software a medida y marketing digital para hacer crecer tu negocio
          </p>
          <Button size="lg" className="group" onClick={scrollToContact}>
            Consulta Gratuita
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}