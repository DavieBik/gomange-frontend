// components/features/HeroSection.tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HeroSectionProps {
  badge?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  buttons?: ReactNode
  className?: string // para custom bg, etc.
}

export default function HeroSection({
  badge,
  title,
  subtitle,
  buttons,
  className = 'relative overflow-hidden bg-primary text-white py-12 sm:py-16 md:py-20 lg:py-24',
}: HeroSectionProps) {
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
        stiffness: 100,
        damping: 12
      },
    },
  }

  const titleVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        stiffness: 80,
        damping: 10
      },
    },
  }

  return (
    <section className={className}>
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
        className="container mx-auto px-4 sm:px-6 text-center mt-10 sm:mt-10 md:mt-0 relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Badge animado */}
        {badge && (
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 sm:px-6 py-1 sm:py-2 mb-6 sm:mb-8 text-sm sm:text-base font-bold text-primary bg-white rounded-full shadow-lg border-2"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            {badge}
          </motion.span>
        )}

        {/* Título principal */}
        <motion.h1
          className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-black leading-tight mb-4 sm:mb-6 text-white"
          variants={titleVariants}
        >
          {title}
        </motion.h1>

        {/* Subtítulo */}
        {subtitle && (
          <motion.p
            className="max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl text-white font-medium mb-8 sm:mb-10 leading-relaxed"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Botones */}
        {buttons && (
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
            variants={itemVariants}
          >
            {buttons}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}