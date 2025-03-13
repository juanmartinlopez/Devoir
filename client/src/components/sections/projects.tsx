import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const projects = [
  {
    title: "Sistema de Gestión Empresarial",
    description: "Desarrollo de software personalizado para gestión de inventario y ventas",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Marketing Digital para Vinoteca",
    description: "Estrategia integral de redes sociales y e-commerce",
    image: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "App Web de Facturación",
    description: "Sistema de facturación electrónica integrado con AFIP",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-[#F8F7F3]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Proyectos Destacados</h2>
          <p className="text-lg text-gray-600">Soluciones que transforman negocios</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_25px_-5px_rgba(84,105,44,0.3)]">
                <AspectRatio ratio={16/9}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}