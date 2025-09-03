"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Globe,
  Smartphone,
  Rocket,
  Database,
  Cpu,
  Shield,
  Code,
  Cloud,
  Zap,
  CheckCircle,
  ArrowRight,
  Users,
  Target,
  Lightbulb,
  BarChart,
  Settings,
  Briefcase
} from "lucide-react"

// Datos de servicios actualizados con estilo profesional
const serviciosData = [
  {
    id: "desarrollo-web",
    title: "Desarrollo Web",
    subtitle: "Soluciones web modernas y escalables",
    description: "Creamos aplicaciones web responsivas y optimizadas que impulsan tu negocio hacia el futuro digital.",
    fullDescription: "Nuestro equipo de expertos en desarrollo web utiliza las últimas tecnologías para crear experiencias digitales excepcionales. Desde landing pages hasta aplicaciones empresariales complejas, garantizamos rendimiento, seguridad y una experiencia de usuario sobresaliente.",
    icon: <Globe className="h-6 w-6" />,
    features: [
      "Diseño responsive y mobile-first",
      "Optimización SEO avanzada",
      "Integración con APIs y servicios",
      "Performance optimizada",
      "Seguridad empresarial"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "AWS"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    color: "#2563eb"
  },
  {
    id: "aplicaciones-moviles",
    title: "Aplicaciones Móviles",
    subtitle: "Apps nativas y multiplataforma",
    description: "Desarrollamos aplicaciones móviles que ofrecen experiencias excepcionales en iOS y Android.",
    fullDescription: "Especializados en desarrollo móvil tanto nativo como híbrido, creamos aplicaciones que funcionan perfectamente en todas las plataformas. Utilizamos las mejores prácticas para ofrecer rendimiento óptimo y experiencias de usuario fluidas.",
    icon: <Smartphone className="h-6 w-6" />,
    features: [
      "Desarrollo nativo iOS y Android",
      "Apps híbridas con React Native",
      "Integración con servicios cloud",
      "Diseño UX/UI optimizado",
      "Testing automatizado"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    color: "#2563eb"
  },
  {
    id: "consultoria-ti",
    title: "Consultoría TI",
    subtitle: "Transformación digital estratégica",
    description: "Asesoramos en la implementación de soluciones tecnológicas que optimizan tus procesos de negocio.",
    fullDescription: "Ofrecemos consultoría estratégica para la transformación digital de tu empresa. Analizamos tus procesos actuales, identificamos oportunidades de mejora y diseñamos roadmaps tecnológicos que impulsen tu crecimiento.",
    icon: <Briefcase className="h-6 w-6" />,
    features: [
      "Auditoría tecnológica integral",
      "Roadmap de transformación digital",
      "Arquitectura de soluciones",
      "Migración a la nube",
      "Optimización de procesos"
    ],
    technologies: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    color: "#2563eb"
  }
]

// Componente de tarjeta de servicio principal
function MainServiceCard({ servicio, index }: { servicio: typeof serviciosData[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-black/5 border border-black/10 rounded-lg p-8 hover:shadow-lg hover:bg-black/10 transition-all duration-300"
    >
      <div className="flex items-center justify-center w-14 h-14 bg-[#A51C30]/10 rounded-lg mb-6">
        <div style={{ color: "#A51C30" }}>{servicio.icon}</div>
      </div>

      <h3 className="text-xl font-serif font-medium text-black mb-3">{servicio.title}</h3>
      <p className="text-black/70 leading-relaxed font-sans font-light">{servicio.description}</p>
    </motion.div>
  )
}

// Componente de tarjeta de servicio completo
function ServiceScopeCard({ servicio, index }: { servicio: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-black/5 border border-black/10 rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:bg-black/10 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={servicio.image}
          alt={servicio.title}
          className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="p-6">
        <h4 className="text-xl font-serif font-medium text-black mb-3">{servicio.title}</h4>
        <p className="text-black/70 mb-4 font-sans font-light">{servicio.description}</p>

        <button className="inline-flex items-center text-[#A51C30] hover:text-[#8A1727] font-sans font-medium transition-colors">
          <span className="mr-2">Más información</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}

// Componente principal
export default function ServiciosComponent() {
  const [activeTab, setActiveTab] = useState('implementation')

  // Servicios adicionales para la sección de alcance completo
  const serviciosCompletos = [
    {
      title: "Ingeniería de Software",
      description: "Desarrollo de software empresarial a medida con las mejores prácticas de la industria.",
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80"
    },
    {
      title: "Servicios en la Nube",
      description: "Migración, implementación y gestión de infraestructura cloud para máxima escalabilidad.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
    },
    {
      title: "DevOps & Automatización",
      description: "Implementación de prácticas DevOps para acelerar el desarrollo y mejorar la calidad.",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80"
    },
    {
      title: "Inteligencia Artificial",
      description: "Soluciones de IA y Machine Learning para automatizar procesos y obtener insights.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
    },
    {
      title: "Ciberseguridad",
      description: "Protección integral de tu infraestructura digital contra amenazas y vulnerabilidades.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"
    },
    {
      title: "Gestión de Datos",
      description: "Arquitecturas de datos modernas para análisis avanzado y toma de decisiones.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    }
  ]

  return (
    <div className="min-h-screen bg-[#FFFCF2]">
      {/* Hero Section */}
      <section className="relative bg-black">
        <div className="relative h-[500px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
            alt="IT Consulting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-5xl font-serif font-light text-[#FFFCF2] mb-4">Servicios de Consultoría TI</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Direcciones clave Section */}
      <section className="py-20 bg-[#FFFCF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-serif font-extralight text-black mb-6">Direcciones clave de consultoría tecnológica</h2>
            <p className="text-lg text-black/80 leading-relaxed font-sans font-light">
              Desde 2024, Futurion Partners ha estado guiando a empresas hacia operaciones más efectivas con soluciones
              tecnológicas personalizadas. Como empresa de consultoría tecnológica, nuestra misión es ayudar a las compañías
              a crear entornos digitales óptimos alineados con sus objetivos de negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviciosData.map((servicio, index) => (
              <MainServiceCard key={servicio.id} servicio={servicio} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro enfoque Section */}
      <section className="py-20 bg-black text-[#FFFCF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-extralight text-[#FFFCF2] mb-12">Consultoría tecnológica: nuestro enfoque</h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-[#FFFCF2]/80 mb-12 font-sans font-light">
              Nuestro equipo apoya a las empresas en diferentes etapas de sus proyectos de desarrollo e implementación
              de software. Tenemos las habilidades y experiencia para dar forma a conceptos tempranos en especificaciones
              detalladas de soluciones.
            </p>

            <div className="space-y-8">
              {[
                {
                  number: "1",
                  title: "De la idea a la tecnología",
                  description: "Apoyamos a empresas con nuevas ideas sobre su digitalización. Como empresa de consultoría tecnológica, evaluamos la viabilidad de la idea inicial y consideramos el stack tecnológico más óptimo."
                },
                {
                  number: "2",
                  title: "De la tecnología al plan de proyecto",
                  description: "Realizamos análisis de negocio para alinear la idea validada con las operaciones comerciales reales y elaboramos un plan de desarrollo e implementación relevante."
                },
                {
                  number: "3",
                  title: "Del plan de proyecto a la implementación",
                  description: "Siguiendo el plan del proyecto y el modelo de participación seleccionado, diseñamos y configuramos software personalizado según los requisitos discutidos."
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
                    <h3 className="text-xl font-serif font-medium text-[#FFFCF2] mb-2">{step.title}</h3>
                    <p className="text-[#FFFCF2]/70 font-sans font-light">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-xl font-serif font-medium text-[#FFFCF2] mb-4">¿Buscas consultores tecnológicos expertos?</p>
            <p className="text-[#FFFCF2]/70 mb-8 font-sans font-light">Permítenos evaluar tu proyecto ahora</p>
            <Link href="/contacto" className="inline-flex items-center bg-[#A51C30] hover:bg-[#8A1727] text-[#FFFCF2] px-8 py-3 rounded-lg font-sans font-medium transition-colors">
              Contáctanos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Alcance completo de servicios */}
      <section className="py-20 bg-[#FFFCF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-extralight text-black mb-4">Alcance completo de servicios</h2>
          <p className="text-lg text-black/70 mb-12 max-w-3xl font-sans font-light">
            Nuestros servicios de consultoría TI abarcan desarrollo web y móvil personalizado, migración de software,
            integración y soporte. También ayudamos a las empresas a configurar prácticas DevOps y proporcionamos
            gestión efectiva de proyectos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviciosCompletos.map((servicio, index) => (
              <ServiceScopeCard key={index} servicio={servicio} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Resultados Section */}
      <section className="py-20 bg-black text-[#FFFCF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-extralight text-[#FFFCF2] mb-4">Impulsados por resultados</h2>
          <p className="text-lg text-[#FFFCF2]/80 mb-12 max-w-3xl font-sans font-light">
            Las historias de éxito de nuestros clientes dan testimonio de nuestros logros en consultoría.
            Nos esforzamos por traducir nuestro esfuerzo de consultoría y desarrollo en resultados comerciales
            reales, como mejor rendimiento del sistema, más usuarios activos o TCO reducido.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                metric: "45%",
                label: "reducción de costos",
                title: "Transformación digital de una empresa retail",
                description: "El equipo de Futurion Partners gestionó una transformación digital importante que resultó en una reducción del 45% en costos operativos.",
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
              },
              {
                metric: "+15,000",
                label: "usuarios activos",
                title: "Plataforma de gestión empresarial",
                description: "Ayudamos a diseñar e implementar una suite de gestión integral que creció de 5,000 a más de 20,000 usuarios activos.",
                image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80"
              },
              {
                metric: "60%",
                label: "mejora en eficiencia",
                title: "Modernización de sistemas legacy",
                description: "La modernización de sistemas antiguos resultó en una mejora del 60% en la eficiencia operativa y reducción de fallos.",
                image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80"
              }
            ].map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#FFFCF2] border border-[#FFFCF2]/20 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="text-3xl font-serif font-light text-[#A51C30]">{result.metric}</div>
                    <div className="text-black/80 font-sans font-light">{result.label}</div>
                  </div>
                  <h4 className="font-serif font-medium text-black mb-2">{result.title}</h4>
                  <p className="text-black/70 text-sm font-sans font-light">{result.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-xl font-serif font-medium text-[#FFFCF2] mb-4">
              ¿Quieres que tu inversión en software genere resultados tangibles?
            </p>
            <Link href="/contacto" className="inline-flex items-center bg-[#A51C30] hover:bg-[#8A1727] text-[#FFFCF2] px-8 py-3 rounded-lg font-sans font-medium transition-colors">
              Hablemos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Transformando tu ecosistema tecnológico */}
      <section className="py-20 bg-[#FFFCF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-extralight mb-12 text-black">Transformando tu ecosistema tecnológico</h2>

          {/* Cloud Computing */}
          <div className="mb-16">
            <h3 className="text-2xl font-serif font-light mb-6 text-black">Computación en la nube</h3>
            <p className="text-black/80 mb-8 max-w-3xl font-sans font-light">
              Apoyamos el cambio global hacia tecnologías en la nube a través de nuestros servicios especializados
              de consultoría. Nuestro objetivo esencial es elaborar estrategias de adopción de la nube paso a paso
              y garantizar la implementación sin problemas de soluciones cloud en contextos empresariales específicos.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {['Implementación cloud', 'Migración cloud', 'Integración cloud', 'Seguridad cloud'].map((item, index) => (
                <div key={index} className="bg-black/5 border border-[#A51C30]/20 rounded-lg p-4 text-center font-sans font-light text-black hover:bg-[#A51C30]/5 transition-colors">
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {['Nube pública', 'Nube privada', 'Nube híbrida', 'Multi-nube', 'Microservicios', 'Contenedores'].map((tag, index) => (
                <span key={index} className="bg-[#A51C30]/10 border border-[#A51C30]/20 px-3 py-1 rounded-full text-sm font-sans font-light text-black">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Tecnologías inteligentes */}
          <div>
            <h3 className="text-2xl font-serif font-light mb-6 text-black">Tecnologías inteligentes</h3>
            <p className="text-black/80 mb-8 max-w-3xl font-sans font-light">
              Ayudamos a las empresas a obtener nuevas ventajas competitivas con soluciones basadas en las últimas
              innovaciones. Abogamos por una transición gradual a soluciones inteligentes y las incorporamos sin
              problemas en los entornos de TI existentes.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: <Cpu className="h-8 w-8 mb-2" />, label: "IA Empresarial" },
                { icon: <Database className="h-8 w-8 mb-2" />, label: "Big Data & Analytics" },
                { icon: <Shield className="h-8 w-8 mb-2" />, label: "Blockchain" },
                { icon: <Zap className="h-8 w-8 mb-2" />, label: "IoT & Edge Computing" }
              ].map((tech, index) => (
                <div key={index} className="text-center">
                  <div className="bg-[#A51C30]/10 border border-[#A51C30]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 text-[#A51C30] hover:bg-[#A51C30]/20 transition-colors">
                    {tech.icon}
                  </div>
                  <span className="text-sm font-sans font-light text-black">{tech.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Por qué Futurion Partners */}
      <section className="py-20 bg-[#FFFCF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-extralight text-black mb-12">Por qué consultoría tecnológica con Futurion Partners</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Experiencia arraigada en la práctica",
                description: "Las competencias y habilidades que tenemos hoy son el resultado de más de una década de práctica en desarrollo de software. Nuestro portafolio se expande constantemente con nuevos proyectos e historias de éxito."
              },
              {
                title: "Equipo multidisciplinario",
                description: "Al asociarte con Futurion Partners, puedes construir tu equipo de proyecto eligiendo entre ingenieros de software, arquitectos de soluciones, analistas de negocios y gerentes de proyecto."
              },
              {
                title: "Conocimiento de la industria",
                description: "Gestionamos proyectos de consultoría y desarrollo de software en múltiples industrias. Nuestro equipo incluye analistas de negocios experimentados que pueden traducir efectivamente los requisitos de la industria."
              },
              {
                title: "Asociación con proveedores globales",
                description: "Futurion Partners es socio a largo plazo de los principales proveedores de tecnología del mundo, incluidos Microsoft, AWS, Google Cloud, Cloudflare y más. Nuestros especialistas pasan por certificación regular."
              },
              {
                title: "Cumplimiento de estándares internacionales",
                description: "Futurion Partners sigue estándares reconocidos de seguridad y cumplimiento. Garantizamos flujos de trabajo seguros del proyecto y ayudamos a las empresas a implementar software alineado con las pautas específicas."
              },
              {
                title: "Enfoque en resultados medibles",
                description: "Nos comprometemos a entregar resultados tangibles y medibles. Establecemos KPIs claros desde el inicio y proporcionamos informes regulares sobre el progreso y el ROI de tu inversión tecnológica."
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
              ¿Listo para transformar tu negocio?
            </h2>
            <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto font-sans font-light">
              Permítenos ayudarte a alcanzar tus objetivos empresariales con soluciones tecnológicas innovadoras
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto" className="inline-flex items-center justify-center bg-[#A51C30] hover:bg-[#8A1727] text-[#FFFCF2] px-8 py-3 rounded-lg font-sans font-medium transition-colors">
                Solicitar consultoría
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <button className="inline-flex items-center justify-center border-2 border-[#A51C30] text-[#A51C30] hover:bg-[#A51C30] hover:text-[#FFFCF2] px-8 py-3 rounded-lg font-sans font-medium transition-colors">
                Ver casos de éxito
                <BarChart className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}