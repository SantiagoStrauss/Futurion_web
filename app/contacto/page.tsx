"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulamos el envío del formulario
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Teléfono",
      content: "+57 3142547349",
      action: "tel:+573142547349"
    },
    {
      icon: Mail,
      title: "Email",
      content: "ds.ramosv@globusscreen.com",
      action: "mailto:ds.ramosv@globusscreen.com"
    },
    {
      icon: MapPin,
      title: "Ubicación",
      content: "Bogotá, Colombia",
      action: null
    },
    {
      icon: Clock,
      title: "Horarios",
      content: "Lun - Vie: 8:00 AM - 6:00 PM",
      action: null
    }
  ]

  const services = [
    "Transformación Digital",
    "Desarrollo Web/Móvil",
    "Cloud Computing",
    "E-commerce",
    "Consultoría IT",
    "Automatización",
    "Otro"
  ]

  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-black">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-wider text-white mb-6">
                Contacto
              </h1>
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#A51C30]/40 to-transparent mx-auto mb-8"></div>
              <p className="text-xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed">
                ¿Tienes un proyecto en mente? Nos encantaría escuchar sobre él. 
                Conversemos sobre cómo podemos ayudarte a llevarlo al siguiente nivel.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-black">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#A51C30] rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">{info.title}</h3>
                  {info.action ? (
                    <a 
                      href={info.action}
                      className="text-white/70 hover:text-[#A51C30] transition-colors duration-300"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-white/70">{info.content}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-[#FFFCF2]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-serif font-light tracking-wider text-black mb-6">
                  Envíanos un mensaje
                </h2>
                <p className="text-black/70 mb-8">
                  Completa el formulario y nos pondremos en contacto contigo en las próximas 24 horas.
                </p>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-8 text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium text-green-800 mb-2">¡Mensaje enviado!</h3>
                    <p className="text-green-700">
                      Gracias por contactarnos. Nos pondremos en contacto contigo pronto.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-black/80">Nombre completo *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-2 bg-white border-black/20 text-black focus:border-[#A51C30]"
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-black/80">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-2 bg-white border-black/20 text-black focus:border-[#A51C30]"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="text-black/80">Teléfono</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-2 bg-white border-black/20 text-black focus:border-[#A51C30]"
                          placeholder="+57 123 456 7890"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company" className="text-black/80">Empresa</Label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          className="mt-2 bg-white border-black/20 text-black focus:border-[#A51C30]"
                          placeholder="Nombre de tu empresa"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="service" className="text-black/80">Servicio de interés</Label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="mt-2 w-full px-3 py-2 bg-white border border-black/20 rounded-md text-black focus:border-[#A51C30] focus:outline-none"
                      >
                        <option value="">Selecciona un servicio</option>
                        {services.map(service => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-black/80">Mensaje *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-2 bg-white border-black/20 text-black focus:border-[#A51C30] min-h-[120px]"
                        placeholder="Cuéntanos sobre tu proyecto o consulta..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-[#A51C30] hover:bg-[#8A1727] text-white font-medium py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Enviar mensaje
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </motion.div>

              {/* Info Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-serif font-light text-black mb-4">
                    ¿Por qué elegirnos?
                  </h3>
                  <ul className="space-y-4 text-black/70">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#A51C30] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Respuesta garantizada en menos de 24 horas</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#A51C30] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Consulta inicial gratuita</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#A51C30] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Soluciones personalizadas para cada negocio</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#A51C30] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Equipo experto con amplia experiencia</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-black/5 rounded-lg p-6">
                  <h4 className="text-xl font-medium text-black mb-3">¿Necesitas ayuda inmediata?</h4>
                  <p className="text-black/70 mb-4">
                    Si tienes una emergencia tecnológica o necesitas asistencia urgente, no dudes en llamarnos.
                  </p>
                  <Button 
                    className="bg-[#A51C30] hover:bg-[#8A1727] text-white"
                    asChild
                  >
                    <a href="tel:+573142547349">
                      <Phone className="w-4 h-4 mr-2" />
                      Llamar ahora
                    </a>
                  </Button>
                </div>

                <div className="bg-[#A51C30]/10 rounded-lg p-6">
                  <h4 className="text-xl font-medium text-black mb-3">Proceso de trabajo</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="bg-[#A51C30] text-white text-sm font-medium w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">1</span>
                      <span className="text-black/70">Análisis inicial de tus necesidades</span>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-[#A51C30] text-white text-sm font-medium w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">2</span>
                      <span className="text-black/70">Propuesta personalizada y presupuesto</span>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-[#A51C30] text-white text-sm font-medium w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">3</span>
                      <span className="text-black/70">Desarrollo e implementación</span>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-[#A51C30] text-white text-sm font-medium w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">4</span>
                      <span className="text-black/70">Seguimiento y soporte continuo</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-black">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wider text-white mb-6">
                ¿Listo para transformar tu negocio?
              </h2>
              <p className="text-lg text-white/80 font-light mb-8 max-w-2xl mx-auto">
                No esperes más. El futuro de tu empresa comienza con una conversación.
              </p>
              <Button 
                className="bg-[#A51C30] hover:bg-[#8A1727] text-white font-medium px-8 py-3"
                asChild
              >
                <a href="#contact-form">
                  Comenzar ahora
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
