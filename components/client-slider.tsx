"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

const clients = [
  { 
    id: 1, 
    logo: "https://futurionpartnersweb.s3.us-east-1.amazonaws.com/ANKER+CURVAS.webp",
    size: "h-16" 
  },
  { 
    id: 2, 
    logo: "https://futurionpartnersweb.s3.us-east-1.amazonaws.com/Inversiones_sagalo.webp",
    size: "h-25"
  },
  { 
    id: 3, 
    logo: "https://futurionpartnersweb.s3.us-east-1.amazonaws.com/logo+R%26c.webp",
    size: "h-14" 
  },
  { 
    id: 4, 
    logo: "https://futurionpartnersweb.s3.us-east-1.amazonaws.com/Xenital_Logo2-transformed.webp",
    size: "h-12" 
  },
  { 
    id: 5, 
    logo: "https://futurionpartnersweb.s3.us-east-1.amazonaws.com/yupana_logo.webp",
    size: "h-14" 
  },
]

// Constantes de animación
const ANIMATION_DURATION = 25
const STAGGER_DELAY = 0.1

// Variantes de animación optimizadas
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_DELAY,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.9 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const marqueeVariants = {
  animate: {
    x: "-100%",
    transition: {
      repeat: Infinity,
      repeatType: "loop" as const,
      duration: ANIMATION_DURATION,
      ease: "linear",
    },
  },
}

interface ClientLogoProps {
  client: typeof clients[0]
  index: number
  isDuplicate?: boolean
}

const ClientLogo = ({ client, index, isDuplicate = false }: ClientLogoProps) => (
  <motion.div
    key={`client-${isDuplicate ? 'dup-' : ''}${client.id}`}
    className="flex items-center justify-center min-w-[160px] flex-shrink-0"
    variants={itemVariants}
  >
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center h-20 w-36 group">
      <img 
        src={client.logo} 
        alt={`Cliente ${client.id}`}
        className={`${client.size} max-w-full object-contain transition-all duration-300 hover:scale-110`}
        loading="lazy"
      />
    </div>
  </motion.div>
)

export default function ClientSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { 
    once: false, 
    amount: 0.3,
    margin: "0px 0px -100px 0px"
  })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <section className="py-12 bg-gradient-to-b from-[#FFFCF2] to-white relative overflow-hidden">
      {/* Elementos decorativos mejorados */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#A51C30]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#A51C30]/30 to-transparent" />
      
      {/* Efectos de fondo sutiles */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#A51C30]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-[#A51C30]/5 rounded-full blur-2xl" />

      <div className="max-w-7xl mx-auto px-4">
        {/* Header mejorado */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-2xl md:text-4xl font-serif font-light tracking-wider mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Confían en Nosotros
          </motion.h2>
          <motion.div 
            className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#A51C30]/50 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        {/* Slider container */}
        <div ref={containerRef} className="relative overflow-hidden">
          <motion.div 
            className="flex"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {/* Primera fila de logos */}
            <motion.div
              className="flex space-x-8"
              variants={marqueeVariants}
              animate="animate"
            >
              {clients.map((client, index) => (
                <ClientLogo key={client.id} client={client} index={index} />
              ))}
            </motion.div>

            {/* Segunda fila (duplicada para efecto continuo) */}
            <motion.div
              className="flex space-x-8 ml-8"
              variants={marqueeVariants}
              animate="animate"
            >
              {clients.map((client, index) => (
                <ClientLogo 
                  key={`dup-${client.id}`} 
                  client={client} 
                  index={index} 
                  isDuplicate 
                />
              ))}
            </motion.div>
          </motion.div>
        </div>  
      </div>
    </section>
  )
}