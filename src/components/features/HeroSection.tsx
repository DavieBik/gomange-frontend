// components/features/HeroSection.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
        duration: 0.6
      },
    },
  }

  const titleVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 10,
        duration: 0.8
      },
    },
  }

  return (
    <section className="relative overflow-hidden bg-primary text-white py-24 md:py-32">
      {/* Elementos animados de fondo simples */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-secondary/5 to-transparent"
          animate={{ 
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        />
      </div>

    <motion.div
      className="container mx-auto px-4 text-center relative z-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
        {/* Badge animado */}
        <motion.span
          variants={itemVariants}
          className="inline-block px-6 py-2 mb-8 text-base font-bold text-primary bg-white rounded-full shadow-lg border-2 border-secondary"
          whileHover={{ scale: 1.05, y: -2 }}
        >
        Premium Dining Experiences
        </motion.span>

        {/* Título principal */}
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 text-white"
          variants={titleVariants}
        >
          Taste the{' '}
          <motion.span 
            className="text-secondary font-lobster font-light text-6xl md:text-7xl lg:text-8xl inline-block"
            whileHover={{ 
              scale: 1.05,
              rotate: [-1, 1, -1, 0],
              transition: { duration: 0.3 }
            }}
          >
            GoMange
          </motion.span>
          <br />
          <span className="text-4xl md:text-5xl lg:text-6xl">Experience</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className="max-w-3xl mx-auto text-xl md:text-2xl text-white font-medium mb-10 leading-relaxed"
          variants={itemVariants}
        >
          Explore extraordinary dining experiences. From hidden gems to award-winning restaurants — your perfect meal awaits.
        </motion.p>

        {/* Botones */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          variants={itemVariants}
        >
          <motion.a
            href="#restaurant-list"
            className="px-6 py-3 bg-white text-primary font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Find Restaurants
          </motion.a>
          <motion.a
            href="/about"
            className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-primary transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            How It Works
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}