"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

const clients = [
  { name: "Cliente 1", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Cliente 2", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Cliente 3", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Cliente 4", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Cliente 5", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Cliente 6", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Cliente 7", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Cliente 8", logo: "/placeholder.svg?height=60&width=120" },
]

export default function ClientSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const sliderVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-16 bg-[#FFFCF2] relative">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#A51C30]/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#A51C30]/20 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-serif font-extralight tracking-wider mb-4 text-black">Nuestros Clientes</h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#A51C30]/40 to-transparent mx-auto"></div>
        </div>

        <div ref={containerRef} className="overflow-hidden">
          <motion.div className="flex space-x-12 py-4" variants={sliderVariants} initial="hidden" animate={controls}>
            <motion.div
              className="flex space-x-12 animate-marquee"
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              }}
            >
              {clients.map((client, index) => (
                <motion.div
                  key={`client-${index}`}
                  className="flex flex-col items-center justify-center min-w-[150px]"
                  variants={itemVariants}
                >
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center justify-center h-20 w-40">
                    <img src={client.logo || "/placeholder.svg"} alt={client.name} className="max-h-12" />
                  </div>
                  <p className="mt-2 text-sm text-black">{client.name}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex space-x-12 animate-marquee"
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              }}
            >
              {clients.map((client, index) => (
                <motion.div
                  key={`client-duplicate-${index}`}
                  className="flex flex-col items-center justify-center min-w-[150px]"
                  variants={itemVariants}
                >
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center justify-center h-20 w-40">
                    <img src={client.logo || "/placeholder.svg"} alt={client.name} className="max-h-12" />
                  </div>
                  <p className="mt-2 text-sm text-black">{client.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

