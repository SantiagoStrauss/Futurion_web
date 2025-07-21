"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowLeft, ExternalLink, Clock, Building, Tag, Code, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { PortableText } from '@portabletext/react'
import Link from "next/link"
import { useParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const runtime = 'edge';

// Types
interface SanityImage {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
}

interface CaseStudy {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  category: string;
  excerpt?: string;
  image?: SanityImage;
  client?: string;
  industry?: string;
  body?: any; // blockContent array
  technologies?: string[];
  duration?: string;
  link?: string;
  color?: string;
  publishedAt: string;
}

// GROQ queries
const caseStudyQuery = `*[_type == "caseStudy" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  excerpt,
  image,
  client,
  industry,
  body,
  technologies,
  duration,
  link,
  color,
  publishedAt
}`

const relatedCaseStudiesQuery = `*[_type == "caseStudy" && slug.current != $slug && category == *[_type == "caseStudy" && slug.current == $slug][0].category] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  image,
  category,
  publishedAt
}`

export default function CaseStudyPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null)
  const [relatedCaseStudies, setRelatedCaseStudies] = useState<CaseStudy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Progress bar animation
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return

      try {
        console.log('Fetching case study data from Sanity...')
        
        const [caseStudyData, relatedData] = await Promise.all([
          client.fetch(caseStudyQuery, { slug }),
          client.fetch(relatedCaseStudiesQuery, { slug })
        ])
        
        console.log('Case study received:', caseStudyData)
        console.log('Related case studies received:', relatedData)
        
        if (!caseStudyData) {
          setError('Caso de estudio no encontrado')
          return
        }
        
        setCaseStudy(caseStudyData)
        setRelatedCaseStudies(relatedData || [])
        
      } catch (err) {
        console.error('Error fetching case study:', err)
        setError('Error al cargar el caso de estudio')
        
        // Datos de fallback para desarrollo
        const fallbackData: CaseStudy = {
          _id: '1',
          title: 'Transformación Digital en Retail',
          slug: { current: slug },
          category: 'transformacion-digital',
          excerpt: 'Modernización completa de la infraestructura tecnológica de una cadena de retail líder.',
          client: 'Retail Corp',
          industry: 'retail',
          body: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'La empresa enfrentaba problemas con sistemas legacy, falta de integración entre canales de venta y una experiencia de cliente fragmentada. Para abordar estos desafíos, implementamos una solución integral que incluye migración a la nube, desarrollo de una plataforma e-commerce moderna, y sistemas de gestión integrados que unifican todos los canales de venta.'
                }
              ]
            }
          ],
          technologies: [
            'React', 'Node.js', 'AWS', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'
          ],
          duration: '6 meses',
          link: 'https://example.com/case-1',
          color: 'from-blue-600 to-blue-400',
          publishedAt: '2024-01-15T10:00:00Z'
        }
        setCaseStudy(fallbackData)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [slug])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  const getImageUrl = (image: SanityImage | undefined) => {
    if (!image || !image.asset || !image.asset._ref) {
      return "/placeholder.svg?height=600&width=1200"
    }
    
    try {
      return urlFor(image).width(1200).height(600).url()
    } catch (err) {
      console.error('Error generating image URL:', err)
      return "/placeholder.svg?height=600&width=1200"
    }
  }

  const getBackgroundClass = (color?: string) => {
    if (!color) return "from-gray-600 to-gray-400"
    return color.startsWith('from-') ? color : `from-${color}-600 to-${color}-400`
  }

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      'transformacion-digital': 'Transformación Digital',
      'automatizacion': 'Automatización',
      'cloud-computing': 'Cloud Computing',
      'e-commerce': 'E-commerce',
      'mobile-apps': 'Mobile Apps',
      'web-development': 'Web Development',
      'consultoria': 'Consultoría',
      'otros': 'Otros'
    }
    return categories[category] || category
  }

  const getIndustryLabel = (industry: string) => {
    const industries: Record<string, string> = {
      'retail': 'Retail',
      'salud': 'Salud',
      'fintech': 'Fintech',
      'educacion': 'Educación',
      'manufactura': 'Manufactura',
      'tecnologia': 'Tecnología',
      'servicios': 'Servicios',
      'logistica': 'Logística',
      'otros': 'Otros'
    }
    return industries[industry] || industry
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A51C30]"></div>
        </div>
        <Footer />
      </>
    )
  }

  if (error && !caseStudy) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <Link href="/casos-de-estudio">
              <Button className="bg-[#A51C30] text-white hover:bg-[#8A1727]">Volver a Casos de Estudio</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!caseStudy) {
    return null
  }

  return (
    <>
      <Navbar />
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#A51C30] origin-[0%] z-50" 
        style={{ scaleX }} 
      />
      
      <main className="bg-black">
        {/* Back Button */}
        <div className="max-w-6xl mx-auto px-4 pt-24">
          <Link href="/casos-de-estudio">
            <Button variant="ghost" className="mb-6 text-white/70 hover:text-[#A51C30] hover:bg-white/5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Casos de Estudio
            </Button>
          </Link>
        </div>

        {/* Header */}
        <section className="pb-12 bg-black">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center mb-12"
            >
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <Badge variant="secondary" className="text-xs bg-[#A51C30] text-white hover:bg-[#8A1727]">
                  <Tag className="w-3 h-3 mr-1" />
                  {getCategoryLabel(caseStudy.category)}
                </Badge>
                {caseStudy.industry && (
                  <Badge variant="outline" className="text-xs border-white/20 text-white/70">
                    <Building className="w-3 h-3 mr-1" />
                    {getIndustryLabel(caseStudy.industry)}
                  </Badge>
                )}
                {caseStudy.duration && (
                  <Badge variant="outline" className="text-xs border-white/20 text-white/70">
                    <Clock className="w-3 h-3 mr-1" />
                    {caseStudy.duration}
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-light tracking-wider text-white mb-6">
                {caseStudy.title}
              </h1>

              {caseStudy.excerpt && (
                <p className="text-xl text-white/80 font-light mb-8 leading-relaxed">
                  {caseStudy.excerpt}
                </p>
              )}

              {caseStudy.client && (
                <p className="text-base text-white/70">
                  Cliente: <span className="font-medium text-white">{caseStudy.client}</span>
                </p>
              )}
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-6xl mx-auto mb-16"
            >
              <div className={`relative rounded-lg overflow-hidden shadow-lg bg-gradient-to-br ${getBackgroundClass(caseStudy.color)}`}>
                {caseStudy.image ? (
                  <img
                    src={getImageUrl(caseStudy.image)}
                    alt={caseStudy.image?.alt || caseStudy.title}
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                ) : (
                  <div className="h-[400px] md:h-[500px] flex items-center justify-center">
                    <h2 className="text-white text-2xl md:text-3xl font-serif font-medium text-center px-8">
                      {caseStudy.title}
                    </h2>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-black">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Body Content */}
              {caseStudy.body && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-black rounded-lg p-8 mb-16"
                >
                  <h2 className="text-2xl font-serif font-medium text-white mb-6">
                    Caso de Estudio
                  </h2>
                  <div className="text-white/80 leading-relaxed font-light text-lg prose prose-lg max-w-none">
                    <PortableText 
                      value={caseStudy.body}
                      components={{
                        block: {
                          h1: ({children}) => <h1 className="text-3xl font-serif font-bold text-white mb-6 mt-8">{children}</h1>,
                          h2: ({children}) => <h2 className="text-2xl font-serif font-semibold text-white mb-4 mt-6">{children}</h2>,
                          h3: ({children}) => <h3 className="text-xl font-serif font-medium text-white mb-3 mt-4">{children}</h3>,
                          h4: ({children}) => <h4 className="text-lg font-serif font-medium text-white mb-2 mt-3">{children}</h4>,
                          normal: ({children}) => <p className="text-white/80 mb-4 leading-relaxed">{children}</p>,
                        },
                        marks: {
                          strong: ({children}) => <strong className="font-semibold text-white">{children}</strong>,
                          em: ({children}) => <em className="italic text-white">{children}</em>,
                          code: ({children}) => <code className="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-[#A51C30]">{children}</code>,
                        },
                        list: {
                          bullet: ({children}) => <ul className="list-disc list-inside mb-4 space-y-2 text-white/80">{children}</ul>,
                          number: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-2 text-white/80">{children}</ol>,
                        },
                        listItem: {
                          bullet: ({children}) => <li className="mb-1">{children}</li>,
                          number: ({children}) => <li className="mb-1">{children}</li>,
                        }
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Technologies */}
              {caseStudy.technologies && caseStudy.technologies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-black rounded-lg p-8 mb-16"
                >
                  <h2 className="text-xl font-serif font-medium text-white mb-6 flex items-center gap-2">
                    <Code className="w-6 h-6 text-[#A51C30]" />
                    Tecnologías Utilizadas
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {caseStudy.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-sm py-2 px-3 border-white/20 text-white/80">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* External Link */}
              {caseStudy.link && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-center"
                >
                  <Button 
                    size="lg"
                    asChild 
                    className="bg-[#A51C30] hover:bg-[#8A1727] text-white font-medium"
                  >
                    <a
                      href={caseStudy.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      Ver Proyecto Completo
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Related Case Studies */}
        {relatedCaseStudies.length > 0 && (
          <section className="py-32 bg-[#FFFCF2]">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wider text-black mb-4">
                  Casos Relacionados
                </h2>
                <p className="text-lg text-black/80 font-light">
                  Descubre otros proyectos similares
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedCaseStudies.map((relatedCase, index) => (
                  <motion.div
                    key={relatedCase._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/casos-de-estudio/${relatedCase.slug?.current || relatedCase._id}`}>
                      <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="relative h-48 overflow-hidden">
                          {relatedCase.image ? (
                            <img
                              src={getImageUrl(relatedCase.image)}
                              alt={relatedCase.title}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-200 to-gray-300">
                              <h3 className="text-black/60 text-lg font-serif font-medium text-center px-4">
                                {relatedCase.title}
                              </h3>
                            </div>
                          )}
                          <div className="absolute top-4 left-4 bg-[#A51C30] text-white text-xs font-medium py-1 px-2 rounded">
                            {getCategoryLabel(relatedCase.category)}
                          </div>
                        </div>
                        <div className="flex flex-col p-6 flex-grow">
                          <div className="flex items-center text-sm text-black/60 mb-3">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{formatDate(relatedCase.publishedAt)}</span>
                          </div>
                          <h3 className="text-lg font-serif font-medium text-black mb-3 group-hover:text-[#A51C30] transition-colors">
                            {relatedCase.title}
                          </h3>
                          <div className="inline-flex items-center text-[#A51C30] hover:text-[#8A1727] transition-colors duration-300 mt-auto group">
                            <span className="mr-2 font-medium">Ver caso</span>
                            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-32 bg-[#FFFCF2]">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wider text-black mb-6">
                ¿Te inspiró este caso de éxito?
              </h2>
              <p className="text-lg text-black/80 font-light mb-8 max-w-2xl mx-auto">
                Conversemos sobre cómo podemos ayudar a tu empresa a alcanzar
                resultados similares o superiores.
              </p>
              <Button 
                variant="outline"
                className="bg-white border-[#A51C30] text-[#A51C30] hover:bg-[#A51C30] hover:text-white font-medium px-8 py-3"
                asChild
              >
                <Link href="/contacto">
                  Solicitar Consulta Gratuita
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
