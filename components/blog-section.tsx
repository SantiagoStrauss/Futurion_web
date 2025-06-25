"use client"

import { motion } from "framer-motion"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const blogPosts = [
	{
		title: "Cómo la IA está transformando el desarrollo de software en 2023",
		excerpt:
			"Descubre las últimas tendencias en inteligencia artificial y cómo están revolucionando la forma en que desarrollamos software.",
		author: "María González",
		date: "12 Oct 2023",
		category: "Inteligencia Artificial",
		image: "/placeholder.svg?height=300&width=500",
		link: "#",
	},
	{
		title: "5 estrategias de ciberseguridad que toda empresa debería implementar",
		excerpt:
			"Protege tu negocio con estas estrategias esenciales de ciberseguridad que pueden marcar la diferencia ante un ataque.",
		author: "Carlos Mendoza",
		date: "28 Sep 2023",
		category: "Ciberseguridad",
		image: "/placeholder.svg?height=300&width=500",
		link: "#",
	},
	{
		title: "El futuro del trabajo remoto: tecnologías que facilitan la colaboración",
		excerpt:
			"Analizamos las herramientas y plataformas que están definiendo el futuro del trabajo distribuido y la colaboración a distancia.",
		author: "Laura Sánchez",
		date: "15 Sep 2023",
		category: "Productividad",
		image: "/placeholder.svg?height=300&width=500",
		link: "#",
	},
]

export default function BlogSection() {
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
							Nuestro Blog
						</h2>
						<p className="text-lg text-black/80 max-w-2xl font-light">
							Compartimos nuestras ideas, investigaciones y perspectivas sobre
							tecnología, innovación y transformación digital.
						</p>
					</motion.div>
					<Button
						variant="outline"
						className="mt-6 md:mt-0 bg-white border-[#A51C30] text-[#A51C30] hover:bg-[#A51C30] hover:text-white"
					>
						Ver todos los artículos
					</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{blogPosts.map((post, index) => (
						<motion.article
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
						>
							<div className="relative h-48 overflow-hidden">
								<img
									src={post.image || "/placeholder.svg"}
									alt={post.title}
									className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
								/>
								<div className="absolute top-4 left-4 bg-[#A51C30] text-white text-xs font-medium py-1 px-2 rounded">
									{post.category}
								</div>
							</div>

							<div className="flex flex-col p-6 flex-grow">
								<div className="flex items-center text-sm text-black/60 mb-3">
									<div className="flex items-center mr-4">
										<Calendar className="h-4 w-4 mr-1" />
										<span>{post.date}</span>
									</div>
									<div className="flex items-center">
										<User className="h-4 w-4 mr-1" />
										<span>{post.author}</span>
									</div>
								</div>

								<h3 className="text-xl font-serif font-medium mb-3 text-black">
									{post.title}
								</h3>

								<p className="text-black/70 mb-6 line-clamp-3">
									{post.excerpt}
								</p>

								<a
									href={post.link}
									className="inline-flex items-center text-[#A51C30] hover:text-[#8A1727] transition-colors duration-300 mt-auto group"
								>
									<span className="mr-2 font-medium">Leer más</span>
									<ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
								</a>
							</div>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	)
}

