"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HeroSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí puedes implementar la lógica para guardar el email
    console.log("Email enviado:", email)
    alert("¡Gracias por unirte a nuestra lista de espera!")
    setEmail("")
  }

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

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
          <Input
            type="email"
            placeholder="Tu Email"
            className="bg-[#2A2A2A] border-[#3A3A3A] text-[#FFFCF2] h-14 px-6 rounded-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="bg-[#A51C30] hover:bg-[#8A1727] text-[#FFFCF2] h-14 px-8 rounded-full font-medium"
          >
            Únete a la Lista
          </Button>
        </form>
      </div>
    </section>
  )
}