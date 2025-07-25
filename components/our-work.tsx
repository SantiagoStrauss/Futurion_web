"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const projects = [
    {
        title: "GlobusScreen",
        description:
            "Nuestra plataforma de soluciones integradas de cumplimiento y verificación de antecedentes para organizaciones globales",
        image: "/globusscreen_logo.webp?height=400&width=600",
        link: "https://www.globusscreen.com",
    },
    {
        title: "ODOO",
        description:
            "Nuestras personalizaciones y módulos propietarios para el ERP ODOO, revolucionando la gestión empresarial con tecnología de vanguardia",
        image: "/odoo_logo.webp?height=400&width=600",
        link: "#",
    }
]

export default function OurWork() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const carouselRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
    }

    // Ajustado para mostrar solo los proyectos disponibles
    const itemsToDisplay = isMobile ? [0] : Array.from({ length: Math.min(projects.length, 3) }, (_, i) => i)

    return (
        <>
        <section className="py-20 bg-[#FFFCF2] relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-extralight tracking-wider mb-6 text-black">
                        Herramientas Proprietarias
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
                        <div className={`grid grid-cols-1 ${projects.length >= 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'} ${projects.length >= 3 ? 'lg:grid-cols-3' : ''} gap-6 justify-items-center`}>
                            {itemsToDisplay.map((offset) => {
                                const index = (currentIndex + offset) % projects.length
                                return (
                                    <motion.div
                                        key={`project-${index}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: offset * 0.1 }}
                                        className="relative overflow-hidden rounded-lg group cursor-pointer max-w-sm"
                                    >
                                        <div className="relative h-[300px] overflow-hidden rounded-lg">
                                            {/* Overlay with red tint */}
                                            <div className="absolute inset-0 z-10 pointer-events-none"></div>

                                            {/* Background image */}
                                            <img
                                                src={projects[index].image || "/placeholder.svg"}
                                                alt={projects[index].title}
                                                className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Content below the image */}
                                        <div className="pt-6 text-center">
                                            <h3 className="text-xl md:text-2xl font-bold tracking-wider text-black mb-3">
                                                {projects[index].title}
                                            </h3>
                                            <p className="text-black/70 text-sm md:text-base leading-relaxed mb-4">
                                                {projects[index].description}
                                            </p>
                                            {projects[index].link !== "#" && (
                                                <a 
                                                    href={projects[index].link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-block text-[#A51C30] hover:text-[#780000] font-serif font-medium text-lg underline transition-colors duration-200"
                                                >
                                                    Ingresa aquí
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Navigation buttons - Solo se muestran si hay más de 1 proyecto en mobile */}
                    {projects.length > 1 && isMobile && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full z-30"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full z-30"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        </>
                    )}
                </div>

                {/* Indicators - Solo se muestran si hay más de 1 proyecto en mobile */}
                {projects.length > 1 && isMobile && (
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
                )}
            </div>

        </section>
        
        {/* Partners band */}
        <div className="bg-white py-6 -mt-1">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-center space-x-8">
                    <h3 className="text-black text-xl font-serif font-medium">Somos parte de:</h3>
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center justify-center">
                            <Image
                                src="/aws.webp"
                                alt="AWS Activate"
                                width={140}
                                height={70}
                                className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <Image
                                src="/cloudflare.webp"
                                alt="Cloudflare for Startups"
                                width={140}
                                height={70}
                                className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}