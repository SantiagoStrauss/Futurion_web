"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Search, Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

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
  link?: string;
  color?: string;
  publishedAt: string;
  featured?: boolean;
}

// GROQ query
const allCaseStudiesQuery = `*[_type == "caseStudy"] | order(publishedAt desc, featured desc) {
  _id,
  title,
  slug,
  category,
  excerpt,
  image,
  client,
  industry,
  link,
  color,
  publishedAt,
  featured
}`

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [filteredCaseStudies, setFilteredCaseStudies] = useState<CaseStudy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching case studies data from Sanity...')
        
        const caseStudiesData = await client.fetch(allCaseStudiesQuery)
        
        console.log('Case studies received:', caseStudiesData)
        
        setCaseStudies(caseStudiesData || [])
        setFilteredCaseStudies(caseStudiesData || [])
        
      } catch (err) {
        console.error('Error fetching case studies:', err)
        setError('Error al cargar los casos de estudio')
        // Datos de fallback para desarrollo
        const fallbackData: CaseStudy[] = [
          {
            _id: '1',
            title: 'Transformación Digital en Retail',
            slug: { current: 'transformacion-digital-retail' },
            category: 'transformacion-digital',
            excerpt: 'Modernización completa de una cadena de retail líder.',
            image: undefined,
            client: 'Retail Corp',
            industry: 'retail',
            link: 'https://example.com/case-1',
            color: 'from-blue-600 to-blue-400',
            publishedAt: '2024-01-15T10:00:00Z',
            featured: true
          },
          {
            _id: '2',
            title: 'Automatización de Procesos',
            slug: { current: 'automatizacion-procesos' },
            category: 'automatizacion',
            excerpt: 'Optimización de procesos empresariales mediante automatización.',
            image: undefined,
            client: 'TechCorp',
            industry: 'manufactura',
            link: 'https://example.com/case-2',
            color: 'from-green-600 to-green-400',
            publishedAt: '2024-01-10T10:00:00Z',
            featured: false
          },
          {
            _id: '3',
            title: 'Migración a la Nube',
            slug: { current: 'migracion-nube' },
            category: 'cloud-computing',
            excerpt: 'Migración exitosa de infraestructura on-premise a AWS.',
            image: undefined,
            client: 'CloudTech',
            industry: 'tecnologia',
            link: 'https://example.com/case-3',
            color: 'from-purple-600 to-purple-400',
            publishedAt: '2024-01-05T10:00:00Z',
            featured: false
          }
        ]
        setCaseStudies(fallbackData)
        setFilteredCaseStudies(fallbackData)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let filtered = caseStudies

    if (searchTerm) {
      filtered = filtered.filter(caseStudy =>
        caseStudy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseStudy.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(caseStudy =>
        getCategoryLabel(caseStudy.category) === selectedCategory
      )
    }

    setFilteredCaseStudies(filtered)
  }, [caseStudies, searchTerm, selectedCategory])

  const getImageUrl = (image: SanityImage | undefined) => {
    if (!image || !image.asset || !image.asset._ref) {
      return "/placeholder.svg?height=300&width=500"
    }
    
    try {
      return urlFor(image).width(500).height(300).url()
    } catch (err) {
      console.error('Error generating image URL:', err)
      return "/placeholder.svg?height=300&width=500"
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#FFFCF2]">
        {/* Header Section */}
        <section className="py-32 bg-black relative">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-serif font-light tracking-wider mb-6 text-white">
                Casos de Estudio
              </h1>
              <p className="text-lg text-white/80 font-light mb-8 max-w-2xl mx-auto">
                Descubre cómo hemos ayudado a nuestros clientes a transformar sus negocios
                con soluciones tecnológicas innovadoras.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-16 -mt-20">
          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 p-6 bg-white rounded-lg shadow-lg"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar casos de estudio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-black border-2"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null 
                  ? "bg-[#A51C30] text-white" 
                  : "self-start md:self-auto text-white hover:bg-[#A51C30] hover:text-white"
                }
              >
                Todos
              </Button>
              {Object.entries({
                'transformacion-digital': 'Transformación Digital',
                'automatizacion': 'Automatización',
                'cloud-computing': 'Cloud Computing',
                'e-commerce': 'E-commerce',
                'mobile-apps': 'Mobile Apps',
                'web-development': 'Web Development',
                'consultoria': 'Consultoría',
                'otros': 'Otros'
              }).map(([key, label]) => (
                <Button
                  key={key}
                  variant={selectedCategory === label ? "default" : "outline"}
                  onClick={() => setSelectedCategory(
                    selectedCategory === label ? null : label
                  )}
                  className={selectedCategory === label 
                    ? "bg-[#A51C30] text-white" 
                    : "self-start md:self-auto text-white hover:bg-[#A51C30] hover:text-white"
                  }
                >
                  {label}
                </Button>
              ))}
            </div>
          </motion.div>

        {/* Search and Filter Section */}
        <section className="py-12 bg-[#FFFCF2] hidden">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar casos de estudio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 text-lg border-black/20 focus:border-[#A51C30] focus:ring-[#A51C30] bg-white"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))
          ) : error && caseStudies.length === 0 ? (
            <div className="col-span-3 text-center py-16">
              <p className="text-red-500 text-lg mb-4">{error}</p>
              <p className="text-black/60">
                No se pudieron cargar los casos de estudio en este momento.
              </p>
            </div>
          ) : filteredCaseStudies.length === 0 ? (
            <div className="col-span-3 text-center py-16">
              <p className="text-black/60 text-lg">
                {searchTerm || selectedCategory
                  ? "No se encontraron casos de estudio que coincidan con los filtros aplicados."
                  : "No hay casos de estudio disponibles en este momento."
                }
              </p>
            </div>
          ) : (
            filteredCaseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/casos-de-estudio/${caseStudy.slug?.current || caseStudy._id}`}>
                  <div className="relative flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    {/* Featured Badge */}
                    {caseStudy.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-[#A51C30] text-white text-xs font-medium py-1 px-2 rounded">
                          Destacado
                        </span>
                      </div>
                    )}

                    {/* Image or Gradient Background */}
                    <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${getBackgroundClass(caseStudy.color)}`}>
                      {caseStudy.image ? (
                        <img
                          src={getImageUrl(caseStudy.image)}
                          alt={caseStudy.image?.alt || caseStudy.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <h3 className="text-white text-xl font-serif font-medium text-center px-4">
                            {caseStudy.title}
                          </h3>
                        </div>
                      )}
                      {caseStudy.category && (
                        <div className="absolute top-4 left-4 bg-[#A51C30] text-white text-xs font-medium py-1 px-2 rounded">
                          {getCategoryLabel(caseStudy.category)}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col p-6 flex-grow">
                      <div className="flex items-center text-sm text-black/60 mb-3">
                        <div className="flex items-center mr-4">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(caseStudy.publishedAt)}</span>
                        </div>
                        {caseStudy.client && (
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            <span>{caseStudy.client}</span>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-serif font-medium mb-3 text-black">
                        {caseStudy.title}
                      </h3>

                      {caseStudy.excerpt && (
                        <p className="text-black/70 mb-6 line-clamp-3">
                          {caseStudy.excerpt}
                        </p>
                      )}

                      <div className="inline-flex items-center text-[#A51C30] hover:text-[#8A1727] transition-colors duration-300 mt-auto group">
                        <span className="mr-2 font-medium">Ver caso</span>
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
        </div>

        {/* CTA Section */}
        <section className="py-32 bg-[#FFFCF2]">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wider text-black mb-6">
                ¿Listo para ser nuestro próximo caso de éxito?
              </h2>
              <p className="text-lg text-black/80 font-light mb-8 max-w-2xl mx-auto">
                Contáctanos hoy y descubre cómo podemos transformar tu negocio
                con soluciones tecnológicas innovadoras.
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
