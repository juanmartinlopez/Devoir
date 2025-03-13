import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Información de la empresa */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Devoir</h3>
            <p className="text-gray-200 mb-4">
              Soluciones digitales personalizadas para hacer crecer tu negocio
            </p>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contacto</h3>
            <div className="space-y-2">
              <a
                href="tel:+542644000000"
                className="flex items-center text-gray-200 hover:text-white"
              >
                <Phone className="h-5 w-5 mr-2" />
                +54 264 570-4903
              </a>
              <a
                href="mailto:contacto@devoir.com"
                className="flex items-center text-gray-200 hover:text-white"
              >
                <Mail className="h-5 w-5 mr-2" />
                contacto@devoir.com
              </a>
              <div className="flex items-center text-gray-200">
                <MapPin className="h-5 w-5 mr-2" />
                San Juan, Argentina
              </div>
              <div className="flex items-center text-gray-200">
                <MapPin className="h-5 w-5 mr-2" />
                Buenos Aires, Argentina
              </div>
            </div>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/devoir.pro/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200/20 mt-8 pt-8 text-center text-gray-200">
          <p>
            &copy; {new Date().getFullYear()} Devoir. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
