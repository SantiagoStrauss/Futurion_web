"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Layers, Rocket, Database, Globe, Cpu, Shield, Zap, ArrowRight } from "lucide-react"

// Hook para detectar el tamaño de la pantalla y adaptar la vista
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [matches, query])
  return matches
}

// Interfaces para tipado
interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  index: number
  position: { x: number; y: number }
  onHover: (index: number | null) => void
  isConnected: boolean
  isMobile: boolean
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

// Datos de los servicios con posiciones ajustadas para el nuevo contenedor
const services = [
  {
    title: "Desarrollo Web",
    description:
      "Creamos sitios web modernos, responsivos y optimizados para buscadores que destacan tu marca en el mercado digital.",
    icon: <Globe className="h-8 w-8" />,
    position: { x: 50, y: 5 },
  },
  {
    title: "Aplicaciones Móviles",
    description:
      "Desarrollamos apps nativas y multiplataforma con experiencias de usuario excepcionales que cautivan a tu audiencia.",
    icon: <Layers className="h-8 w-8" />,
    position: { x: 85, y: 25 },
  },
  {
    title: "Consultoría Tecnológica",
    description:
      "Asesoramos en la implementación de soluciones tecnológicas adaptadas a tus necesidades específicas de negocio.",
    icon: <Rocket className="h-8 w-8" />,
    position: { x: 85, y: 75 },
  },
  {
    title: "Bases de Datos",
    description:
      "Diseñamos e implementamos arquitecturas de datos eficientes, seguras y escalables para tu organización.",
    icon: <Database className="h-8 w-8" />,
    position: { x: 50, y: 95 },
  },
  {
    title: "Inteligencia Artificial",
    description:
      "Integramos soluciones de IA para automatizar procesos y obtener insights valiosos que impulsan tu crecimiento.",
    icon: <Cpu className="h-8 w-8" />,
    position: { x: 15, y: 75 },
  },
  {
    title: "Ciberseguridad",
    description: "Protegemos tu infraestructura digital con soluciones avanzadas contra amenazas y vulnerabilidades.",
    icon: <Shield className="h-8 w-8" />,
    position: { x: 15, y: 25 },
  },
]

const connections = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
  [0, 3], [1, 4], [2, 5],
]

// Componente ServiceCard adaptado para móvil
function ServiceCard({ title, description, icon, index, position, onHover, isConnected, isMobile }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100) // Animación más rápida en móvil
        }
      },
      { threshold: 0.1 }
    )
    const currentRef = cardRef.current
    if (currentRef) observer.observe(currentRef)
    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [index])

  const handleMouseEnter = useCallback(() => {
    if (isMobile) return
    setIsHovered(true)
    onHover(index)
  }, [index, onHover, isMobile])

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return
    setIsHovered(false)
    onHover(null)
  }, [onHover, isMobile])

  const showContent = isHovered || isMobile

  return (
    <div
      ref={cardRef}
      className={isMobile
        ? "w-full max-w-md transition-all duration-500 ease-out"
        : "absolute w-64 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
      }
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `scale(${isVisible ? 1 : 0.9})`,
        ...(!isMobile && {
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0}) ${isHovered ? 'scale(1.05)' : ''}`,
          zIndex: isHovered ? 30 : 10,
        }),
      }}
    >
      <div
        className={`relative group ${isMobile ? 'h-auto' : 'w-64 h-72 cursor-pointer'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600/20 to-red-600/5 blur-xl transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`} />
        <div className="relative h-full bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-red-600/30 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}><div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600/50 via-transparent to-red-600/50 animate-pulse" /></div>
          <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col">
            <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-600/30 to-red-600/10 border border-red-600/40 mb-6 mx-auto transition-transform duration-300 ${isHovered ? 'rotate-12 scale-110' : ''}`}><div className="text-red-600">{icon}</div></div>
            <h3 className="text-2xl font-bold text-center text-white mb-4 leading-tight">{title}</h3>
            <div className={`overflow-hidden flex-grow transition-all duration-400 ease-in-out ${showContent ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="text-white/80 text-sm leading-relaxed mb-6">{description}</p>
              <button className="flex items-center justify-center w-full py-3 px-6 bg-red-600/20 hover:bg-red-600/30 border border-red-600/40 rounded-lg text-red-600 font-medium transition-all duration-300 group transform hover:scale-105 active:scale-95">
                <span className="mr-2">Explorar</span><ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
            {!showContent && (<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2"><div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" style={{ animationDuration: '2s', animationIterationCount: 'infinite' }}/></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente ConnectionLines (Sin cambios)
function ConnectionLines({ hoveredIndex }: { hoveredIndex: number | null }) {
  const lineColor = "rgb(220, 38, 38)";
  if (hoveredIndex === null) return null;
  const { x, y } = services[hoveredIndex].position;
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
      <line
        x1={`${x}%`}
        y1={`${y}%`}
        x2="50%"
        y2="50%"
        stroke={lineColor}
        strokeWidth="2"
        strokeOpacity="0.8"
        strokeDasharray="5,5"
      />
    </svg>
  )
}

// Componente FloatingParticles (Sin cambios)
function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])
  const animationRef = useRef<number | null>(null)
  useEffect(() => {
    const initialParticles: Particle[] = Array.from({ length: 25 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, vx: (Math.random() - 0.5) * 0.02, vy: (Math.random() - 0.5) * 0.02, size: Math.random() * 2 + 0.5, opacity: Math.random() * 0.3 + 0.1 }))
    setParticles(initialParticles)
    const animate = () => { setParticles((prev) => prev.map((p) => ({ ...p, x: (p.x + p.vx + 100) % 100, y: (p.y + p.vy + 100) % 100 }))); animationRef.current = requestAnimationFrame(animate) }
    animationRef.current = requestAnimationFrame(animate)
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current) }
  }, [])
  return (<div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>{particles.map((p) => (<div key={p.id} className="absolute bg-red-600 rounded-full" style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`, opacity: p.opacity, transition: 'opacity 0.5s ease-in-out' }}/>))}</div>)
}

// Componente principal InteractiveCards con la ESTRUCTURA CORREGIDA Y RESPONSIVE
export default function InteractiveCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  // Usamos el breakpoint 'lg' (1024px) para cambiar a la vista móvil
  const isMobile = useMediaQuery('(max-width: 1023px)')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    const currentRef = sectionRef.current
    if (currentRef) observer.observe(currentRef)
    return () => { if (currentRef) observer.unobserve(currentRef) }
  }, [])

  const handleHover = useCallback((index: number | null) => {
    setHoveredIndex(index)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 px-4 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden"
    >
      <FloatingParticles />
      
      <div className="w-full max-w-7xl mx-auto">
        
        <div 
          className={`text-center relative z-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            Constelación de Servicios
          </h2>
          <div className={`w-24 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mb-6 transition-all duration-1000 delay-200 ${
            isVisible ? 'scale-x-100' : 'scale-x-0'
          }`} />
          <p className={`text-lg sm:text-xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Explora nuestro ecosistema tecnológico interconectado.
          </p>
        </div>

        {/* Contenedor adaptable para la constelación o la lista */}
        <div className={`relative mx-auto mt-20 sm:mt-28 ${isMobile ? 'h-auto' : 'h-[850px]'}`}>

          {/* Elementos solo para Desktop */}
          {!isMobile && (
            <>
              <div 
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-1000 delay-600 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
              >
                <div className="relative">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-red-600/30 to-red-600/10 border-2 border-red-600/50 flex items-center justify-center backdrop-blur-sm">
                    <Zap className="h-10 w-10 sm:h-12 sm:w-12 text-red-600" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-red-600/20 animate-ping" />
                </div>
              </div>
              <ConnectionLines hoveredIndex={hoveredIndex} />
            </>
          )}

          {/* Contenedor de layout para las cards */}
          <div className={isMobile ? 'flex flex-col items-center gap-8' : ''}>
            {services.map((service, index) => (
              <ServiceCard
                key={`service-${index}`}
                {...service}
                index={index}
                onHover={handleHover}
                isConnected={false}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>

        {/* Hint - Oculto en móvil */}
        <div 
          className={`text-center mt-12 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${isMobile ? 'hidden' : ''}`}
        >
          <p className="text-white/60 text-sm mb-2">
            Pasa el cursor sobre los servicios
          </p>
          <div className="w-5 h-5 border-2 border-red-600/50 rounded-full mx-auto animate-pulse" />
        </div>

      </div>
    </section>
  )
}