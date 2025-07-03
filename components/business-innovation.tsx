"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const caseStudies = [
	{
		category: "Caso de estudio",
		title: "Protegiendo empresas mediante la conexión con proveedores de ciberseguridad adecuados",
		image: "/placeholder.svg?height=400&width=600",
		link: "#",
		color: "from-blue-900 to-blue-500",
	},
	{
		category: "Caso de estudio",
		title: "Del campo a la tablet: Construyendo un nuevo negocio para resolver un desafío antiguo",
		image: "/placeholder.svg?height=400&width=600",
		link: "#",
		color: "from-green-900 to-green-500",
	},
	{
		category: "Caso de estudio",
		title: "Desarrollando una plataforma de carbono de próxima generación para acelerar el camino hacia cero emisiones",
		image: "/placeholder.svg?height=400&width=600",
		link: "#",
		color: "from-teal-900 to-teal-500",
	},
]

export default function BusinessInnovation() {
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
					{caseStudies.map((study, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="flex flex-col"
						>
							<div className="relative h-64 mb-6 overflow-hidden rounded-lg">
								<div className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-30`}></div>
								<img
									src={study.image || "/placeholder.svg"}
									alt={study.title}
									className="w-full h-full object-cover"
								/>
							</div>

							<div className="flex flex-col">
								<span className="text-sm text-[#FFFCF2]/70 mb-2">{study.category}</span>
								<h3 className="text-xl font-serif font-medium mb-4">{study.title}</h3>
								<a
									href={study.link}
									className="inline-flex items-center text-[#FFFCF2] hover:text-[#A51C30] transition-colors duration-300 mt-auto group"
								>
									<span className="mr-2">Ver caso</span>
									<ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
								</a>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}

