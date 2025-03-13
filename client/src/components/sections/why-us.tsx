import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Timer, Target, Lightbulb, Users } from "lucide-react";

const features = [
  {
    icon: Timer,
    title: "Eficiencia Optimizada",
    description: "Automatizamos procesos repetitivos y optimizamos flujos de trabajo para maximizar la productividad de tu empresa."
  },
  {
    icon: Target,
    title: "Soluciones a Medida",
    description: "Desarrollamos software que se adapta perfectamente a tus necesidades específicas, no soluciones genéricas."
  },
  {
    icon: Lightbulb,
    title: "Innovación Continua",
    description: "Implementamos las últimas tecnologías para mantener tu negocio a la vanguardia del mercado."
  },
  {
    icon: Users,
    title: "Equipo Local",
    description: "Somos un equipo argentino que entiende las necesidades y el contexto local de tu negocio."
  }
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">¿Por Qué Elegirnos?</h2>
          <p className="text-lg text-gray-600">Nuestro compromiso con la excelencia nos distingue</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
