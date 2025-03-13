import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import imageFede from "../../assets/fotoFede.jpg";
import imageJuanma from "../../assets/fotoJuanma.png";
import imageMora from "../../assets/fotoMora.jpeg";
import imageLeo from "../../assets/fotoLeo.jpeg";

const team = [
  {
    name: "Federico Ruiz Castilla",
    image: imageFede,
    description: "Desarrollador & Especialista en estrategias de marketing digital."
  },
  {
    name: "Juan Cruz Mora",
    image: imageMora,
    description: "Desarrollador & Especialista en estrategias de marketing digital."
  },
  {
    name: "Leonardo Cricco",
    image: imageLeo,
    description: "Desarrollador & Especialista en estrategias de marketing digital."
  },
  {
    name: "Juan Martín López Frau",
    image: imageJuanma,
    description: "Desarrollador & Especialista en estrategias de marketing digital."
  }
];

export default function Team() {
  return (
    <section id="team" className="py-24 bg-[#F8F7F3]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Nuestro Equipo</h2>
          <p className="text-lg text-gray-600">Profesionales apasionados por la innovación</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="text-center transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_25px_-5px_rgba(84,105,44,0.3)]">
                <CardContent className="pt-6">
                  <Avatar className="h-32 w-32 mx-auto mb-4">
                    <AvatarImage src={member.image} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
