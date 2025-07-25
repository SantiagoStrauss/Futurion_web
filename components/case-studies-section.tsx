"use client"

import { motion } from "framer-motion"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"

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
  excerpt?: string;
  image?: SanityImage;
  publishedAt: string;
  client?: string;
  category: string;
  featured?: boolean;
}

// GROQ query to fetch case studies
const caseStudiesQuery = `*[_type == "caseStudy"] | order(featured desc, publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  excerpt,
  image,
  publishedAt,
  client,
  category,
  featured
}`

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

export default function CaseStudiesSection() {
	const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchCaseStudies = async () => {
			try {
				console.log('Fetching case studies for home section...')
				const data = await client.fetch(caseStudiesQuery)
				console.log('Case studies received:', data)
				setCaseStudies(data || [])
			} catch (err) {
				console.error('Error fetching case studies:', err)
				setError('Error al cargar los casos de estudio')
				// Datos de fallback para desarrollo
				const fallbackData: CaseStudy[] = [
					{
						_id: '1',
						title: 'Transformación Digital en Retail',
						slug: { current: 'transformacion-digital-retail' },
						excerpt: 'Modernización completa de una cadena de retail líder.',
						client: 'Retail Corp',
						category: 'transformacion-digital',
						publishedAt: '2024-01-15T10:00:00Z',
						featured: true
					},
					{
						_id: '2',
						title: 'Automatización de Procesos',
						slug: { current: 'automatizacion-procesos' },
						excerpt: 'Optimización de procesos empresariales mediante automatización.',
						client: 'TechCorp',
						category: 'automatizacion',
						publishedAt: '2024-01-10T10:00:00Z',
						featured: false
					},
					{
						_id: '3',
						title: 'Migración a la Nube',
						slug: { current: 'migracion-nube' },
						excerpt: 'Migración exitosa de infraestructura on-premise a AWS.',
						client: 'CloudTech',
						category: 'cloud-computing',
						publishedAt: '2024-01-05T10:00:00Z',
						featured: false
					}
				]
				setCaseStudies(fallbackData)
			} finally {
				setIsLoading(false)
			}
		}

		fetchCaseStudies()
	}, [])

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('es-ES', { 
			day: 'numeric', 
			month: 'short', 
			year: 'numeric' 
		})
	}

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

	return (
		<section className="py-32 bg-[#FFFCF2] relative">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h2 className="text-3xl md:text-4xl font-serif font-light tracking-wider mb-4 text-black">
							Casos de Estudio
						</h2>
						<p className="text-lg text-black/80 max-w-2xl font-light">
							Descubre cómo hemos ayudado a nuestros clientes a transformar 
							sus negocios con soluciones tecnológicas innovadoras.
						</p>
					</motion.div>
					<Button
						variant="outline"
						className="mt-6 md:mt-0 bg-white border-[#A51C30] text-[#A51C30] hover:bg-[#A51C30] hover:text-white"
						asChild
					>
						<Link href="/casos-de-estudio">
							Ver todos los casos
						</Link>
					</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{isLoading ? (
						// Loading skeleton
						Array.from({ length: 3 }).map((_, index) => (
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
						<div className="col-span-3 text-center py-8">
							<p className="text-red-500">{error}</p>
						</div>
					) : caseStudies.length === 0 ? (
						<div className="col-span-3 text-center py-8">
							<p className="text-black/60">No hay casos de estudio disponibles</p>
						</div>
					) : (
						caseStudies.map((caseStudy, index) => (
							<motion.article
								key={caseStudy._id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="relative flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
							>
								{caseStudy.featured && (
									<div className="absolute top-4 right-4 z-10 bg-yellow-400 text-yellow-900 text-xs font-medium py-1 px-2 rounded">
										Destacado
									</div>
								)}
								<div className="relative h-48 overflow-hidden">
									<img
										src={getImageUrl(caseStudy.image)}
										alt={caseStudy.image?.alt || caseStudy.title}
										className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
									/>
									<div className="absolute top-4 left-4 bg-[#A51C30] text-white text-xs font-medium py-1 px-2 rounded">
										{getCategoryLabel(caseStudy.category)}
									</div>
								</div>

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

									<p className="text-black/70 mb-6 line-clamp-3">
										{caseStudy.excerpt || 'Sin descripción disponible'}
									</p>

									<Link
										href={`/casos-de-estudio/${caseStudy.slug?.current || caseStudy._id}`}
										className="inline-flex items-center text-[#A51C30] hover:text-[#8A1727] transition-colors duration-300 mt-auto group"
									>
										<span className="mr-2 font-medium">Ver caso</span>
										<ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
									</Link>
								</div>
							</motion.article>
						))
					)}
				</div>
			</div>
		</section>
	)
}
