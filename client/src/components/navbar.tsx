import { Link } from "wouter";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "../assets/brand.png";

export default function Navbar() {
  const sections = [
    { name: "Inicio", href: "hero" },
    { name: "Por Qué Elegirnos", href: "why-us" },
    { name: "Servicios", href: "services" },
    { name: "Proyectos", href: "projects" },
    { name: "Equipo", href: "team" },
    { name: "Testimonios", href: "testimonials" },
    { name: "Contacto", href: "contact" }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView();
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => scrollToSection('hero')}
            className="font-bold text-xl text-primary"
          >
            <img src={logo} alt="Devoir" className="h-10" />
          </button>

          {/* Menú de escritorio - solo visible en pantallas grandes (>1000px) */}
          <div className="hidden lg:flex space-x-6">
            {sections.map((section) => (
              <button
                key={section.href}
                onClick={() => scrollToSection(section.href)}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {section.name}
              </button>
            ))}
          </div>

          {/* Menú móvil - visible en pantallas hasta 1000px */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                {sections.map((section) => (
                  <button
                    key={section.href}
                    onClick={() => {
                      scrollToSection(section.href);
                      // Cerrar el menú después de hacer clic
                      const closeButton = document.querySelector('[data-radix-collection-item]');
                      if (closeButton instanceof HTMLElement) {
                        closeButton.click();
                      }
                    }}
                    className="text-left py-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    {section.name}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}