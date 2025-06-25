"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const projects = [
	{
		title: "MODA INCLUSIVA",
		description:
			"Transformando la industria de la moda con soluciones tecnológicas accesibles para todos",
		image: "/placeholder.svg?height=400&width=600",
	},
	{
		title: "TRANSFORMACIONES DIGITALES EN FINTECH",
		description:
			"Revolucionando el sector financiero con innovaciones tecnológicas de vanguardia",
		image: "/placeholder.svg?height=400&width=600",
	},
	{
		title: "INVERSIONES ESG",
		description:
			"Desarrollando plataformas para inversiones sostenibles y responsables",
		image: "/placeholder.svg?height=400&width=600",
	},
	{
		title: "CADENA DE SUMINISTRO",
		description:
			"Optimizando procesos logísticos con soluciones inteligentes y adaptativas",
		image: "/placeholder.svg?height=400&width=600",
	},
	{
		title: "VEHÍCULOS ELÉCTRICOS",
		description:
			"Impulsando la movilidad sostenible con sistemas de gestión avanzados",
		image: "/placeholder.svg?height=400&width=600",
	},
]

export default function OurWork() {
	const [currentIndex, setCurrentIndex] = useState(0)
	const carouselRef = useRef<HTMLDivElement>(null)

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
	}

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
	}

	return (
		<section className="py-32 bg-[#FFFCF2] relative">
			<div className="max-w-6xl mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-serif font-extralight tracking-wider mb-6 text-black">
						Nuestro Trabajo
					</h2>
					<div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#A51C30]/40 to-transparent mx-auto mb-6"></div>
					<p className="text-lg text-black max-w-3xl mx-auto font-light leading-relaxed mb-12">
						Además de nuestros servicios principales, hemos realizado
						investigaciones de mercado y desarrollado soluciones innovadoras
						para diversos sectores e industrias emergentes.
					</p>
				</div>

				<div className="relative">
					<div ref={carouselRef} className="overflow-hidden">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{[0, 1, 2].map((offset) => {
								const index = (currentIndex + offset) % projects.length
								return (
									<motion.div
										key={`project-${index}`}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: offset * 0.1 }}
										className="relative overflow-hidden rounded-lg group cursor-pointer"
									>
										<div className="relative h-[300px] overflow-hidden">
											{/* Overlay with red tint */}
											<div className="absolute inset-0 bg-[#780000]/70 z-10"></div>

											{/* Background image */}
											<img
												src={projects[index].image || "/placeholder.svg"}
												alt={projects[index].title}
												className="w-full h-full object-cover"
											/>

											{/* Content */}
											<div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-6">
												<h3 className="text-xl md:text-2xl font-bold tracking-wider text-[#FFFCF2] mb-4">
													{projects[index].title}
												</h3>
												<p className="text-[#FFFCF2] text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300">
													{projects[index].description}
												</p>
											</div>
										</div>
									</motion.div>
								)
							})}
						</div>
					</div>

					{/* Navigation buttons */}
					<button
						onClick={prevSlide}
						className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-0 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full z-30"
						aria-label="Previous slide"
					>
						<ChevronLeft className="h-6 w-6" />
					</button>
					<button
						onClick={nextSlide}
						className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-0 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full z-30"
						aria-label="Next slide"
					>
						<ChevronRight className="h-6 w-6" />
					</button>
				</div>

				{/* Indicators */}
				<div className="flex justify-center mt-8 space-x-2">
					{projects.map((_, index) => (
						<button
							key={`indicator-${index}`}
							onClick={() => setCurrentIndex(index)}
							className={`w-3 h-3 rounded-full ${
								index === currentIndex ? "bg-[#780000]" : "bg-gray-400"
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

