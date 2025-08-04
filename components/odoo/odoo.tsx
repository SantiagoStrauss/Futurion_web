"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Settings,
  Users,
  ShoppingCart,
  BarChart3,
  Database,
  Cloud,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Package,
  CreditCard,
  Calendar,
  FileText,
  Truck,
  UserCheck,
  Building2,
  Globe,
  Code
} from "lucide-react"

// Servicios de Odoo que ofrecemos
const serviciosOdoo = [
  {
    id: "consultoria",
    title: "Consultoría",
    description: "Nuestros expertos en consultoría ERP Odoo comienzan analizando las necesidades de tu negocio y los flujos de trabajo existentes para evaluar la forma más efectiva de automatizarlos con el software Odoo.",
    icon: <Settings className="h-6 w-6" />,
    features: [
      "Análisis de necesidades empresariales",
      "Evaluación de flujos de trabajo existentes",
      "Plan paso a paso para implementación",
      "Cálculo de TCO y ROI",
      "Cronogramas de proyecto y entregables"
    ]
  },
  {
    id: "personalizacion",
    title: "Personalización",
    description: "Adaptamos Odoo completamente a tus procesos de negocio específicos, desarrollando módulos personalizados y funcionalidades únicas.",
    icon: <Code className="h-6 w-6" />,
    features: [
      "Desarrollo de módulos personalizados",
      "Adaptación de flujos de trabajo",
      "Personalización de interfaces",
      "Campos y formularios customizados",
      "Reportes específicos del negocio"
    ]
  },
  {
    id: "implementacion",
    title: "Implementación",
    description: "Implementación completa de Odoo con configuración detallada, migración de datos y puesta en marcha exitosa.",
    icon: <Zap className="h-6 w-6" />,
    features: [
      "Configuración de módulos",
      "Migración segura de datos",
      "Capacitación de usuarios",
      "Pruebas exhaustivas",
      "Go-live asistido"
    ]
  },
  {
    id: "integracion",
    title: "Integración",
    description: "Conectamos Odoo con tus sistemas existentes para crear un ecosistema tecnológico unificado y eficiente.",
    icon: <Database className="h-6 w-6" />,
    features: [
      "APIs y conectores personalizados",
      "Integración con sistemas legacy",
      "Sincronización de datos en tiempo real",
      "Conectores con servicios externos",
      "Middleware personalizado"
    ]
  },
  {
    id: "migracion",
    title: "Migración",
    description: "Migramos tus datos desde sistemas existentes hacia Odoo de manera segura, preservando la integridad de la información.",
    icon: <ArrowRight className="h-6 w-6" />,
    features: [
      "Análisis de datos existentes",
      "Mapeo de datos estructurado",
      "Migración por fases",
      "Validación de integridad",
      "Backup y rollback automático"
    ]
  },
  {
    id: "soporte",
    title: "Soporte",
    description: "Soporte técnico continuo, mantenimiento proactivo y actualizaciones para asegurar el óptimo funcionamiento de tu sistema Odoo.",
    icon: <Shield className="h-6 w-6" />,
    features: [
      "Soporte técnico 24/7",
      "Mantenimiento preventivo",
      "Actualizaciones de versión",
      "Monitoreo de rendimiento",
      "Resolución proactiva de incidencias"
    ]
  }
]

// Beneficios de implementar Odoo
const beneficios = [
  {
    title: "Integración Total",
    description: "Todos tus procesos empresariales en una sola plataforma integrada.",
    icon: <Database className="h-8 w-8" />
  },
  {
    title: "Escalabilidad",
    description: "Crece con tu negocio agregando módulos según tus necesidades.",
    icon: <BarChart3 className="h-8 w-8" />
  },
  {
    title: "Personalización",
    description: "Adaptamos Odoo completamente a tus procesos de negocio específicos.",
    icon: <Settings className="h-8 w-8" />
  },
  {
    title: "Cloud & On-Premise",
    description: "Flexible implementación en la nube o en tus propios servidores.",
    icon: <Cloud className="h-8 w-8" />
  }
]

// Casos de éxito
const casosExito = [
  {
    empresa: "Empresa de Reparación y Mantenimiento",
    industria: "Servicios de Mantenimiento",
    resultado: "90% de tareas manuales automatizadas",
    descripcion: "Futurion Partners implementó una solución ERP basada en Odoo que ayudó a acelerar los procesos comerciales principales, reducir el tiempo de aprobación de órdenes de compra en un 50% y optimizar la gestión de órdenes de trabajo en un 100%.",
    metric: "90%",
    label: "tareas automatizadas"
  },
  {
    empresa: "Sistema de Gestión de Flotas",
    industria: "Logística y Transporte",
    resultado: "80% de tareas manuales automatizadas",
    descripcion: "Futurion Partners construyó un sistema ERP utilizando la plataforma Odoo que permitió al cliente reducir los gastos operativos en un 50% y aumentar la satisfacción del cliente debido a la transparencia de las operaciones comerciales.",
    metric: "80%",
    label: "tareas automatizadas"
  },
  {
    empresa: "Solución ERP/LMS para Empresa de eLearning",
    industria: "Educación y Tecnología",
    resultado: "10% reducción en costos DevOps",
    descripcion: "Futurion Partners entregó una suite ERP/LMS basada en la plataforma Odoo.sh para ayudar a una empresa de eLearning a optimizar las funciones administrativas, incluyendo entrada de datos de estudiantes, inscripciones y programación.",
    metric: "10%",
    label: "reducción de costos"
  },
  {
    empresa: "Solución BPM para Servicios de Personal Médico",
    industria: "Servicios de Salud",
    resultado: "Procesos comerciales optimizados",
    descripcion: "Futurion Partners construyó una solución integral Odoo-based CRM/ERP/HR que optimiza los flujos de trabajo de licitaciones, reclutamiento y gestión de proyectos con potente gestión y sincronización de datos.",
    metric: "100%",
    label: "procesos optimizados"
  }
]

// Componente de tarjeta de servicio
function ServiceCard({ servicio, index }: { servicio: typeof serviciosOdoo[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-black/5 border border-black/10 rounded-lg p-6 hover:shadow-lg hover:bg-black/10 transition-all duration-300"
    >
      <div className="flex items-center justify-center w-12 h-12 bg-[#A51C30]/10 rounded-lg mb-4">
        <div style={{ color: "#A51C30" }}>{servicio.icon}</div>
      </div>

      <h3 className="text-lg font-serif font-medium text-black mb-3">{servicio.title}</h3>
      <p className="text-black/70 mb-4 font-sans font-light">{servicio.description}</p>

      <ul className="space-y-2">
        {servicio.features.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-center text-sm text-black/80 font-sans font-light">
            <CheckCircle className="h-4 w-4 text-[#A51C30] mr-2 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

// Componente principal
export default function OdooComponent() {
  const [activeTab, setActiveTab] = useState('modules')

  return (
    <div className="min-h-screen bg-[#FFFCF2]">
      {/* Hero Section */}
      <section className="relative bg-black">
        <div className="relative h-[500px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1920&q=80"
            alt="Odoo ERP"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center mb-6">
                <img 
                  src="/odoo_logo.webp" 
                  alt="Odoo" 
                  className="h-12 mr-4"
                />
                <h1 className="text-5xl font-serif font-light text-[#FFFCF2]">Consultoría y Desarrollo Odoo</h1>
              </div>
              <p className="text-xl text-[#FFFCF2]/80 max-w-3xl font-sans font-light mb-8">
                Los servicios de consultoría y desarrollo de Odoo tienen como objetivo apoyar a las empresas con la personalización, 
                implementación, mantenimiento y actualización de la plataforma Odoo. Como partner certificado de Odoo, 
                Futurion Partners proporciona una gama completa de servicios relacionados con la plataforma.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-serif font-light text-[#A51C30] mb-1">10+</div>
                  <div className="text-sm text-[#FFFCF2]/80 font-sans font-light">años de experiencia ERP</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-serif font-light text-[#A51C30] mb-1">50+</div>
                  <div className="text-sm text-[#FFFCF2]/80 font-sans font-light">proyectos ERP exitosos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-serif font-light text-[#A51C30] mb-1">15+</div>
                  <div className="text-sm text-[#FFFCF2]/80 font-sans font-light">países atendidos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-serif font-light text-[#A51C30] mb-1">15+</div>
                  <div className="text-sm text-[#FFFCF2]/80 font-sans font-light">años en TI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Por qué las empresas deberían elegir Odoo? */}
      <section className="py-20 bg-[#FFFCF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-serif font-extralight text-black mb-6">¿Por qué las empresas deberían elegir Odoo?</h2>
            <p className="text-lg text-black/80 leading-relaxed font-sans font-light mb-8">
              Odoo es una plataforma ERP de código abierto escalable que se ha convertido en una opción viable para empresas 
              de alto crecimiento. El sistema, disponible en versiones de código abierto (Odoo Community) y con licencia 
              (Odoo Enterprise), facilita la automatización de todos los flujos de trabajo y procesos comerciales principales 
              y es utilizado activamente por más de siete millones de usuarios en todo el mundo.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {[
                {
                  title: "Flexibilidad",
                  description: "Odoo tiene un diseño modular y consta de aplicaciones específicas para funciones comerciales separadas, que pueden implementarse por separado o en una configuración personalizada.",
                  icon: <Settings className="h-8 w-8" />
                },
                {
                  title: "Costo total de propiedad optimizado",
                  description: "Odoo Community está disponible de forma gratuita. En cuanto a la versión paga, tiene un precio más bajo que muchos otros sistemas ERP en la misma categoría del mercado.",
                  icon: <BarChart3 className="h-8 w-8" />
                },
                {
                  title: "Facilidad de uso",
                  description: "Odoo ofrece una interfaz de usuario elegante e intuitiva, que no requiere un aprendizaje y capacitación extensos. Puede adaptarse a los flujos de trabajo únicos de una empresa.",
                  icon: <Users className="h-8 w-8" />
                },
                {
                  title: "Comunidad activa",
                  description: "Como software de código abierto, Odoo tiene una comunidad grande y activa que contribuye constantemente con nuevas características y mejoras de la plataforma.",
                  icon: <Globe className="h-8 w-8" />
                }
              ].map((beneficio, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-left p-6 bg-black/5 rounded-lg"
                >
                  <div className="bg-[#A51C30]/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <div style={{ color: "#A51C30" }}>{beneficio.icon}</div>
                  </div>
                  <h3 className="font-serif font-medium text-black mb-3">{beneficio.title}</h3>
                  <p className="text-black/70 font-sans font-light">{beneficio.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Servicios de Odoo que ofrecemos */}
      <section className="py-20 bg-black text-[#FFFCF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-extralight text-[#FFFCF2] mb-4">Servicios de Odoo que ofrecemos</h2>
          <p className="text-lg text-[#FFFCF2]/80 mb-12 max-w-3xl font-sans font-light">
            Proporcionamos una gama completa de servicios relacionados con Odoo para empresas que eligen 
            Odoo como su solución de automatización empresarial.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviciosOdoo.map((servicio, index) => (
              <div key={servicio.id} className="bg-[#FFFCF2] rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-[#A51C30]/10 rounded-lg mb-4">
                  <div style={{ color: "#A51C30" }}>{servicio.icon}</div>
                </div>

                <h3 className="text-lg font-serif font-medium text-black mb-3">{servicio.title}</h3>
                <p className="text-black/70 mb-4 font-sans font-light">{servicio.description}</p>

                <ul className="space-y-2">
                  {servicio.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-center text-sm text-black/80 font-sans font-light">
                      <CheckCircle className="h-4 w-4 text-[#A51C30] mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro proceso de implementación */}
      <section className="py-20 bg-[#FFFCF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-extralight text-black mb-12">Nuestro proceso de implementación</h2>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  number: "1",
                  title: "Análisis y planificación",
                  description: "Analizamos tus procesos actuales, identificamos necesidades específicas y diseñamos la arquitectura de tu sistema Odoo personalizado."
                },
                {
                  number: "2",
                  title: "Configuración y personalización",
                  description: "Configuramos los módulos necesarios, desarrollamos personalizaciones específicas y adaptamos Odoo a tus procesos de negocio únicos."
                },
                {
                  number: "3",
                  title: "Migración de datos",
                  description: "Migramos de forma segura todos tus datos existentes, garantizando la integridad y continuidad de tu información empresarial."
                },
                {
                  number: "4",
                  title: "Capacitación y go-live",
                  description: "Capacitamos a tu equipo, realizamos pruebas exhaustivas y acompañamos el lanzamiento para garantizar una transición exitosa."
                },
                {
                  number: "5",
                  title: "Soporte continuo",
                  description: "Ofrecemos soporte técnico continuo, mantenimiento y actualizaciones para asegurar el óptimo funcionamiento de tu sistema."
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[#A51C30] text-[#FFFCF2] rounded-full flex items-center justify-center font-bold">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-medium text-black mb-2">{step.title}</h3>
                    <p className="text-black/70 font-sans font-light">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Casos de éxito */}
      <section className="py-20 bg-black text-[#FFFCF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-extralight text-[#FFFCF2] mb-4">Casos de éxito con Odoo</h2>
          <p className="text-lg text-[#FFFCF2]/80 mb-12 max-w-3xl font-sans font-light">
            Hemos ayudado a empresas de diferentes industrias a transformar sus operaciones con Odoo, 
            logrando mejoras significativas en eficiencia y productividad.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {casosExito.map((caso, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#FFFCF2] rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">
                  <div className="text-3xl font-serif font-light text-[#A51C30]">{caso.metric}</div>
                  <div className="text-black/80 font-sans font-light">{caso.label}</div>
                </div>
                <h4 className="font-serif font-medium text-black mb-2">{caso.empresa}</h4>
                <div className="text-sm text-[#A51C30] mb-2 font-sans font-medium">{caso.industria}</div>
                <p className="text-black/70 text-sm font-sans font-light">{caso.descripcion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ¿Por qué elegir Futurion Partners como consultor Odoo? */}
      <section className="py-20 bg-[#FFFCF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-extralight text-black mb-12">¿Por qué elegir Futurion Partners como consultor Odoo?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Centro de Excelencia ERP",
                description: "La consultoría e implementación de ERP es una de las competencias clave de Futurion Partners. Además de Odoo, trabajamos con otras plataformas ERP y desarrollamos sistemas y módulos ERP personalizados para ofrecer los stacks tecnológicos más adecuados."
              },
              {
                title: "Experiencia Multi-industria",
                description: "Nuestro equipo tiene experiencia práctica con soluciones ERP de diferentes escalas y en varios dominios. Creamos soluciones Odoo enfocadas en la industria para que las empresas maximicen el retorno de las inversiones tecnológicas."
              },
              {
                title: "Transparencia",
                description: "Habilitamos una colaboración transparente, otorgando visibilidad completa de los procesos en curso durante el ciclo de vida del proyecto. Nuestros gerentes de proyecto se comunican y mantienen actualizados a nuestros clientes mediante informes regulares y demostraciones."
              },
              {
                title: "Riesgos de Proyecto Minimizados",
                description: "Garantizamos una implementación, personalización, integración o migración de Odoo ERP sin problemas con una gestión de proyectos exhaustiva y soporte calificado en todas las etapas del proyecto."
              },
              {
                title: "Valor Empresarial Garantizado",
                description: "Futurion Partners asegura la mejor utilización de la plataforma Odoo y mejoras en los procesos comerciales debido al mapeo preciso de las necesidades de los clientes con las capacidades de Odoo."
              },
              {
                title: "Ahorro de Costos",
                description: "Ayudamos a nuestros clientes a reducir los gastos tecnológicos y minimizar el riesgo de interrupción del negocio mediante la implementación de acciones y prácticas sostenibles."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-l-4 border-[#A51C30] pl-6"
              >
                <h3 className="text-xl font-serif font-medium text-black mb-3">{item.title}</h3>
                <p className="text-black/70 font-sans font-light">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFFCF2] rounded-2xl shadow-xl p-12 text-center">
            <h2 className="text-3xl font-serif font-extralight text-black mb-4">
              Confía tu proyecto Odoo a nuestro equipo de expertos
            </h2>
            <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto font-sans font-light">
              Garantiza el éxito de tu proyecto Odoo con Futurion Partners
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center bg-[#A51C30] hover:bg-[#8A1727] text-[#FFFCF2] px-8 py-3 rounded-lg font-sans font-medium transition-colors">
                Contáctanos
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button className="inline-flex items-center justify-center border-2 border-[#A51C30] text-[#A51C30] hover:bg-[#A51C30] hover:text-[#FFFCF2] px-8 py-3 rounded-lg font-sans font-medium transition-colors">
                Ver casos de éxito
                <UserCheck className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
