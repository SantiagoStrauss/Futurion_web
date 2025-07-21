import Link from "next/link"
import { Mountain, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-black text-[#FFFCF2] pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <Link href="/" className="flex items-center mb-6">
              <img src="/3.png" alt="Futurion Partners Logo" className="h-16 w-16" />
              <span className="ml-2 text-xl font-medium">Futurion Partners</span>
            </Link>
            <p className="text-[#FFFCF2]/70 mb-6">
              Transformamos ideas en soluciones tecnológicas innovadoras que impulsan el crecimiento y la eficiencia de
              tu negocio.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#FFFCF2]/70 hover:text-[#FFFCF2] transition-colors duration-300">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-[#FFFCF2]/70 hover:text-[#FFFCF2] transition-colors duration-300">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-[#FFFCF2]/70 hover:text-[#FFFCF2] transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-[#FFFCF2]/70 hover:text-[#FFFCF2] transition-colors duration-300">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6">Enlaces rápidos</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-[#FFFCF2]/70 hover:text-[#FFFCF2] transition-colors duration-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="#servicios"
                  className="text-[#FFFCF2]/70 hover:text-[#FFFCF2] transition-colors duration-300"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/casos-de-estudio" className="text-[#FFFCF2]/70 hover:text-[#FFFCF2] transition-colors duration-300">
                  Casos de Estudio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#FFFCF2]/70 hover:text-[#FFFCF2] transition-colors duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="text-[#FFFCF2]/70 hover:text-[#FFFCF2] transition-colors duration-300"
                >
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-[#780000]" />
                <a
                  href="tel:+34911234567"
                  className="text-[#FFFCF2]/70 hover:text-[#FFFCF2] transition-colors duration-300"
                >
                  +57 3142547349
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-[#780000]" />
                <a
                  href="mailto:info@Futurion Partners.com"
                  className="text-[#FFFCF2]/70 hover:text-[#FFFCF2] transition-colors duration-300"
                >
                  ds.ramosv@globusscreen.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6">Suscríbete</h3>
            <p className="text-[#FFFCF2]/70 mb-4">
              Recibe nuestras últimas noticias y artículos directamente en tu bandeja de entrada.
            </p>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder="Tu email"
                className="bg-[#111] border-[#333] text-[#FFFCF2] focus:border-[#A51C30]"
                required
              />
              <Button className="w-full bg-[#780000] hover:bg-[#5d0000] text-[#FFFCF2]">Suscribirse</Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-[#333] text-center text-[#FFFCF2]/60 text-sm">
          <p>© {new Date().getFullYear()} Futurion Partners. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

