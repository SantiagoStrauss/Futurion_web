"use client"



import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface CaseStudy {
  _id: string;
  category: string;
  title: string;
  image?: any;
  link?: string;
  color?: string;
}

const caseStudiesQuery = `*[_type == "caseStudy"] | order(_createdAt desc)[0...3] {
  _id,
  category,
  title,
  image,
  link,
  color
}`

export default function BusinessInnovation() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
	const fetchCaseStudies = async () => {
	  try {
		const data = await client.fetch(caseStudiesQuery)
		setCaseStudies(data || [])
	  } catch (err) {
		setError("Error al cargar los casos de estudio")
		setCaseStudies([])
	  } finally {
		setIsLoading(false)
	  }
	}
	fetchCaseStudies()
  }, [])

  const getImageUrl = (image: any) => {
	if (!image || !image.asset || !image.asset._ref) {
	  return "/placeholder.svg?height=400&width=600"
	}
	try {
	  return urlFor(image).width(600).height(400).url()
	} catch {
	  return "/placeholder.svg?height=400&width=600"
	}
  }

  return (
	<section className="py-32 bg-black text-[#FFFCF2] relative">
	  <div className="max-w-6xl mx-auto px-4">
		<motion.div
		  initial={{ opacity: 0, y: 20 }}
		  whileInView={{ opacity: 1, y: 0 }}
		  transition={{ duration: 0.5 }}
		  className="mb-16"
		>
		  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight mb-8">
			Inventamos y escalamos nuevos negocios
		  </h2>
		  <p className="text-xl md:text-2xl font-sans font-light max-w-4xl">
			Nuestros expertos trabajan con organizaciones para imaginar, construir y escalar nuevos
			negocios que prosperan. Equipamos a los equipos de nuestros clientes con el software, herramientas y
			capacidades que necesitarán para tener éxito por sí mismos.
		  </p>
		</motion.div>

		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
		  {isLoading ? (
			Array.from({ length: 3 }).map((_, idx) => (
			  <div key={idx} className="h-64 bg-gray-800 rounded-lg animate-pulse mb-6" />
			))
		  ) : error ? (
			<div className="col-span-3 text-red-500">{error}</div>
		  ) : caseStudies.length === 0 ? (
			<div className="col-span-3 text-gray-400">No hay casos de estudio disponibles.</div>
		  ) : (
			caseStudies.map((study, index) => (
			  <motion.div
				key={study._id}
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: index * 0.1 }}
				className="flex flex-col"
			  >
				<div className="relative h-64 mb-6 overflow-hidden rounded-lg">
				  <div className={`absolute inset-0 bg-gradient-to-br ${study.color || ''} opacity-30`}></div>
				  <img
					src={getImageUrl(study.image)}
					alt={study.title}
					className="w-full h-full object-cover"
				  />
				</div>

				<div className="flex flex-col">
				  <span className="text-sm text-[#FFFCF2]/70 mb-2">{study.category}</span>
				  <h3 className="text-xl font-serif font-medium mb-4">{study.title}</h3>
				  {study.link && (
					<a
					  href={study.link}
					  className="inline-flex items-center text-[#FFFCF2] hover:text-[#A51C30] transition-colors duration-300 mt-auto group"
					  target="_blank" rel="noopener noreferrer"
					>
					  <span className="mr-2">Ver caso</span>
					  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
					</a>
				  )}
				</div>
			  </motion.div>
			))
		  )}
		</div>
	  </div>
	</section>
  )
}

