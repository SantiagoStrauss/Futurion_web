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
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0A0A0A] z-0"></div>

      {/* Contenido */}
      <div className="max-w-5xl mx-auto text-center z-10 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#FFFCF2] mb-8">
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
            className="bg-[#780000] hover:bg-[#5d0000] text-[#FFFCF2] h-14 px-8 rounded-full font-medium"
          >
            Únete a la Lista
          </Button>
        </form>
      </div>
    </section>
  )
}

