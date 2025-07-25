"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Github, Mail } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const teamMembers = [
  {
    name: "Santiago Ramos",
    role: "CEO & Co-fundador",
    description: "Experto en transformación digital y estrategia empresarial de la Universidad de los Andes. Miembro del McKinsey & Company Forward Alumni Network.",
    skills: ["Estrategia Digital", "Liderazgo", "Innovación", "Consultoría"],
    image: "/santiago.webp",
    linkedin: "https://www.linkedin.com/in/santiago-ramos-vargas-b703b0142/",
    github: "https://github.com/SantiagoStrauss",
    email: "ds.ramosv@globusscreen.com"
  },
  {
    name: "Robinson Beltrán",
    role: "CTO & Co-fundador",
    description: "Ingeniero mecatrónico de la Universidad Uniagustiniana con más de 8 años de experiencia en desarrollo Full-Stack, arquitecto de software y especialista en tecnologías emergentes. Apasionado por crear soluciones escalables que impulsen el crecimiento empresarial.",
    skills: ["Desarrollo Full-Stack", "Cloud Computing", "AI/ML", "DevOps"],
    image: "/placeholder-user.jpg",
    linkedin: "https://www.linkedin.com/in/robinson-dario-beltran-ni%C3%B1o-071727179/",
    github: "https://github.com/robinsondbn",
    email: "david@futurionpartners.com"
  },
  {
    name: "Harrison Pinto",
    role: "COO & Co-fundador",
    description: "Ingeniero de Sistemas y Computación de la Universidad Nacional de Colombia con más de 5 años de experiencia en desarrollo web/móvil. Especialista en operaciones y gestión de proyectos. Enfocado en optimizar procesos y garantizar la excelencia en la entrega de soluciones.",
    skills: ["Desarrollo Full-Stack", "Operaciones", "Análisis de Datos", "Optimización"],
    image: "/placeholder-user.jpg",
    linkedin: "https://www.linkedin.com/in/harrison-pinto/",
    github: "https://github.com/HASPIMA",
    email: "harrison@futurionpartners.com"
  }
]

export default function NosotrosComponent() {
  return (
    <div className="min-h-screen bg-black text-[#FFFCF2]">
      {/* Hero Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight mb-8 text-[#FFFCF2]">
              Nosotros
            </h1>
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#A51C30]/40 to-transparent mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl font-sans font-light max-w-4xl mx-auto text-[#FFFCF2]/90 leading-relaxed">
              Somos Futurion Partners, un equipo de visionarios comprometidos con transformar el futuro empresarial a través de la innovación tecnológica.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-32 bg-[#FFFCF2] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-extralight tracking-wider mb-6 text-black text-center">
              Nuestra Historia
            </h2>
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#A51C30]/40 to-transparent mx-auto mb-12"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-serif font-medium mb-4 text-[#A51C30]">¿Cómo nació Futurion Partners?</h3>
              <p className="text-black/80 mb-6 leading-relaxed font-light">
                Futurion Partners nació de la visión compartida de tres profesionales apasionados por la tecnología y la innovación. En 2023, tras años de experiencia en el sector tecnológico, decidimos unir nuestras fortalezas para crear algo más grande: una consultora que no solo implementa soluciones, sino que reimagina el futuro de los negocios.
              </p>
              <p className="text-black/80 leading-relaxed font-light">
                Observamos que muchas empresas luchaban por adaptarse al ritmo acelerado de la transformación digital. Vimos la oportunidad de crear un puente entre las necesidades empresariales actuales y las posibilidades tecnológicas del mañana.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-2xl font-serif font-medium mb-4 text-[#A51C30]">¿Para qué existimos?</h3>
              <p className="text-black/80 mb-6 leading-relaxed font-light">
                Nuestra misión es democratizar el acceso a la innovación tecnológica, especialmente para pequeñas y medianas empresas que tradicionalmente no tenían acceso a consultorías de primer nivel. Estamos comprometidos con usar y aportar al ecosistema Open Source, creyendo firmemente en el poder de la colaboración y el conocimiento compartido.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#A51C30] rounded-full"></div>
                  <span className="text-black/80 font-light">Acelerar la transformación digital</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#A51C30] rounded-full"></div>
                  <span className="text-black/80 font-light">Impulsar la innovación empresarial</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#A51C30] rounded-full"></div>
                  <span className="text-black/80 font-light">Crear soluciones sostenibles y escalables</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#A51C30] rounded-full"></div>
                  <span className="text-black/80 font-light">Contribuir al ecosistema Open Source</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-32 bg-black text-[#FFFCF2] relative">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight mb-8 text-center">
              Acreditaciones y Certificados
            </h2>
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#A51C30]/40 to-transparent mx-auto mb-8"></div>
            <p className="text-xl font-sans font-light max-w-3xl mx-auto text-[#FFFCF2]/90 leading-relaxed text-center">
              Nuestras alianzas estratégicas y certificaciones que respaldan nuestra experiencia y compromiso con la excelencia tecnológica.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              {
                title: "AWS Activate",
                description: "Miembros del programa AWS Activate, que nos proporciona acceso a recursos, herramientas y soporte técnico para acelerar el crecimiento de startups en la nube de Amazon Web Services.",
                image: "/aws.webp", // Placeholder for AWS Activate logo
                delay: 0.1
              },
              {
                title: "Cloudflare for Startups", 
                description: "Participantes del programa Cloudflare for Startups, que nos brinda acceso a la plataforma de rendimiento y seguridad web líder en la industria para potenciar nuestras soluciones.",
                image: "/cloudflare.webp", // Placeholder for Cloudflare for Startups logo
                delay: 0.2
              }
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: cert.delay }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative w-80 h-48 mb-6 overflow-hidden rounded-lg bg-[#FFFCF2]/10 flex items-center justify-center">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={320}
                    height={192}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-2xl font-serif font-medium mb-4 text-[#A51C30]">{cert.title}</h3>
                  <p className="text-[#FFFCF2]/70 leading-relaxed font-light">{cert.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-[#FFFCF2] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-extralight tracking-wider mb-6 text-black">
              Nuestro Equipo
            </h2>
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#A51C30]/40 to-transparent mx-auto mb-6"></div>
            <p className="text-lg text-black max-w-3xl mx-auto font-light leading-relaxed">
              Conoce a los visionarios que están transformando el futuro de los negocios a través de la innovación tecnológica.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg group cursor-pointer max-w-sm mx-auto"
              >
                <div className="relative h-[400px] overflow-hidden rounded-lg">
                  {/* Background image */}
                  <img
                    src={member.image || "/placeholder-user.jpg"}
                    alt={member.name}
                    className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  
                  {/* Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl md:text-2xl font-bold tracking-wider mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[#A51C30] font-serif font-medium text-lg mb-3">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Content below the image */}
                <div className="pt-6 text-center">
                  <p className="text-black/70 text-sm md:text-base leading-relaxed mb-4 font-light">
                    {member.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="bg-[#A51C30]/10 text-[#A51C30] border-[#A51C30]/20 font-light">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/60 hover:text-[#A51C30] transition-colors"
                      aria-label={`LinkedIn de ${member.name}`}
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/60 hover:text-[#A51C30] transition-colors"
                      aria-label={`GitHub de ${member.name}`}
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-black/60 hover:text-[#A51C30] transition-colors"
                      aria-label={`Email de ${member.name}`}
                    >
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black text-[#FFFCF2] relative">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight mb-8">
              ¿Listo para transformar tu negocio?
            </h2>
            <p className="text-xl md:text-2xl font-sans font-light max-w-3xl mx-auto text-[#FFFCF2]/90 leading-relaxed mb-12">
              Únete a nosotros en este viaje hacia el futuro. Descubre cómo podemos impulsar tu empresa hacia nuevas alturas.
            </p>
            <button className="inline-flex items-center text-[#FFFCF2] hover:text-[#A51C30] transition-colors duration-300 group border border-[#A51C30] px-8 py-4 rounded-lg hover:bg-[#A51C30]/10">
              <span className="mr-2 font-serif font-medium text-lg">Contáctanos</span>
              <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}