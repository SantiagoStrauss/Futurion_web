"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Layers, Rocket, Database, Globe, Cpu, Shield } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  index: number
}

const services = [
  {
    title: "Desarrollo Web",
    description:
      "Creamos sitios web modernos, responsivos y optimizados para buscadores que destacan tu marca en el mercado digital.",
    icon: <Globe className="h-6 w-6" />,
  },
  {
    title: "Aplicaciones Móviles",
    description:
      "Desarrollamos apps nativas y multiplataforma con experiencias de usuario excepcionales que cautivan a tu audiencia.",
    icon: <Layers className="h-6 w-6" />,
  },
  {
    title: "Consultoría Tecnológica",
    description:
      "Asesoramos en la implementación de soluciones tecnológicas adaptadas a tus necesidades específicas de negocio.",
    icon: <Rocket className="h-6 w-6" />,
  },
  {
    title: "Bases de Datos",
    description:
      "Diseñamos e implementamos arquitecturas de datos eficientes, seguras y escalables para tu organización.",
    icon: <Database className="h-6 w-6" />,
  },
  {
    title: "Inteligencia Artificial",
    description:
      "Integramos soluciones de IA para automatizar procesos y obtener insights valiosos que impulsan tu crecimiento.",
    icon: <Cpu className="h-6 w-6" />,
  },
  {
    title: "Ciberseguridad",
    description: "Protegemos tu infraestructura digital con soluciones avanzadas contra amenazas y vulnerabilidades.",
    icon: <Shield className="h-6 w-6" />,
  },
]

function ServiceCard({ title, description, icon, index }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
        <motion.div
          className="group relative bg-gradient-to-b from-[#161616] to-[#0a0a0a] border border-[#444444] rounded-lg overflow-hidden cursor-pointer shadow-[0_0_20px_rgba(120,0,0,0.1)]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{
            scale: 1.03,
            zIndex: 10,
            boxShadow: "0 0 30px rgba(120, 0, 0, 0.25)"
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
        {/* Enhanced accent line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#780000]/80 to-transparent"></div>

        <div className="p-8 relative z-10">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#100808] border border-[#2a1a1a] mr-4 backdrop-blur-sm text-[#FFFCF2]">
              {icon}
            </div>
            <h3 className="text-xl font-light tracking-wide text-[#FFFCF2]">{title}</h3>
          </div>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isHovered ? "auto" : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-[#FFFCF2] font-light leading-relaxed mb-6">{description}</p>
            <div className="flex items-center">
              <button className="text-[#ff3333] hover:text-[#ff6666] text-sm font-medium tracking-wider uppercase flex items-center gap-2 transition-colors duration-300">
                Descubrir <span className="text-xs">→</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/0 via-gray-900/0 to-[#780000]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Add subtle glow on hover */}
        <div className={`absolute inset-0 bg-[#780000]/5 blur-md transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      </motion.div>
    </motion.div>
  )
}

export default function InteractiveCards() {
  return (
    <section className="py-32 px-4 bg-black relative">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#1A1A1A] to-transparent"></div>
      <div className="absolute top-40 -left-40 w-80 h-80 rounded-full bg-[#780000]/5 blur-[100px]"></div>
      <div className="absolute bottom-40 -right-40 w-80 h-80 rounded-full bg-[#780000]/5 blur-[100px]"></div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-extralight tracking-wider mb-6 text-[#FFFCF2]">
            Nuestros Servicios
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#780000]/40 to-transparent mx-auto mb-6"></div>
          <p className="text-lg text-[#FFFCF2] max-w-2xl mx-auto font-light leading-relaxed">
            Soluciones tecnológicas de vanguardia diseñadas para transformar tu visión en realidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

