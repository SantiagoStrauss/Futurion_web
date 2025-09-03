"use client"

import type React from "react"

import { Button } from "@/components/ui/button"

export default function HeroSection() {
  // Eliminado formulario de email: ahora solo CTA dobles

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
      {/* Contenedor de fondo: agrupa gradiente, video y overlay */}
      <div className="absolute inset-0 z-0">
        {/* Gradiente como fallback (se renderiza debajo del video) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0A0A0A]" />
        
        {/* Video de fondo */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay oscuro (se renderiza encima del video) */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Contenido (encima de todo el fondo) */}
      <div className="max-w-5xl mx-auto text-center z-10 relative px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight text-[#FFFCF2] mb-8">
          Soluciones tecnológicas innovadoras para tu negocio
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-[#FFFCF2] mb-12 max-w-4xl mx-auto">
          Transformamos ideas en realidad digital
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
          <Button
            asChild
            className="bg-[#A51C30] hover:bg-[#8A1727] text-[#FFFCF2] h-14 px-10 rounded-full font-medium shadow-lg shadow-[#A51C30]/30 hover:shadow-[#A51C30]/40 transition-all"
          >
            <a href="/contacto">¡Hablemos!</a>
          </Button>
          <Button
            variant="outline"
            asChild
            className="h-14 px-10 rounded-full font-medium border-[#FFFCF2] text-[#FFFCF2] hover:text-[#A51C30] hover:bg-[#FFFCF2] bg-transparent transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <a href="/servicios">Servicios</a>
          </Button>
        </div>
      </div>
    </section>
  )
}