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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        duration: 0.5
      },
    },
  }

  return (
    <section className="relative overflow-hidden  bg-primary-700  text-white py-24 md:py-32">


    <motion.div
  className="container mx-auto px-4 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Badge animado */}
        <motion.span
          variants={itemVariants}
          className="inline-block px-4 py-1 mb-6 text-sm font-semibold text-primary-700 bg-white rounded-full shadow-md"
        >
          Your Next Meal Starts Here
        </motion.span>

        {/* Título principal */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
          variants={itemVariants}
        >
          Welcome to <span className="text-secondary-400">Go Mange</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 mb-10 leading-relaxed"
          variants={itemVariants}
        >
          Discover the best restaurants in your city. From cozy local spots to gourmet experiences — we've got you covered.
        </motion.p>

        {/* Botones */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          variants={itemVariants}
        >
          <Link
            href="#restaurant-list"
            className="btn btn-lg btn-primary bg-white text-primary-700 hover:bg-gray-100 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            Find Restaurants
          </Link>
          <Link
            href="/about"
            className="btn btn-lg btn-outline border-white text-white hover:bg-white/10 backdrop-blur-sm font-medium border-opacity-30 transition-colors"
          >
            How It Works
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}