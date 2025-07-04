'use client'

import HeroSection from '@/components/features/HeroSection'
import { motion } from 'framer-motion'

export default function AboutPage() {
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
        damping: 12,
        duration: 0.6
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col bg-primary text-white">
      {/* Hero About Section */}
      <div className="relative">
        <HeroSection
          badge={<span>Our Story</span>}
          title={
            <>
              Discover Rwanda{' '}
              <span className="text-secondary font-lobster font-light text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl inline-block">one bite</span>
              <br />
              <span className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">at a time</span>
            </>
          }
          className="relative overflow-hidden bg-primary text-white py-10 xs:py-12 sm:py-16 md:py-20 lg:py-24 min-h-[350px] xs:min-h-[350px] sm:min-h-[500px] flex items-center justify-center"
        />
      </div>

      {/* Content Sections */}
      <div className="bg-white text-gray-800">
        {/* Section 1 */}
        <motion.section 
          className="py-8 xs:py-10 sm:py-16 px-2 xs:px-4 sm:px-6 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xs:gap-8 sm:gap-12 items-center">
            <div className="space-y-3 xs:space-y-4 sm:space-y-6 text-base xs:text-lg">
              <p className="text-gray-700 leading-relaxed">
                There are plenty of restaurant directories out there. But most feel just lists that miss the heart of Rwanda's food culture. They don't tell you where to find the best Isombe, or that the little café with no name on a Kigali backstreet might serve the most unforgettable cup of coffee.
              </p>
              <p className="text-gray-800 font-medium">
                We created GoMange to change that.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-xl overflow-hidden shadow-xl border-4 border-secondary"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="/placeholder/restaurants.png" 
                alt="Rwandan street food"
                className="w-full h-auto xs:h-56 sm:h-[350px] object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Full Width Highlight */}
        <section className="bg-primary/5 py-8 xs:py-10 sm:py-12">
          <div className="max-w-4xl mx-auto px-2 xs:px-4 sm:px-6 text-center">
            <motion.div
              className="inline-block px-4 xs:px-6 py-2 xs:py-3 sm:px-8 sm:py-4 bg-primary text-white rounded-full mb-4 xs:mb-6 sm:mb-8 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold">GoMange is Rwanda's own</h2>
            </motion.div>
            <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">
              From brochettes in Nyamirambo to Sunday brunch in Kacyiru, or a dinner with drinks in Butare (un bon dîner avec apéro), we will spotlight everything from authentic Rwandan dishes to standout international cuisines across the country.
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mt-8 xs:mt-10 sm:mt-16 px-2 xs:px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 mb-8 xs:mb-10 sm:mb-12">
            <motion.div 
              className="rounded-xl overflow-hidden shadow-lg border-2 border-secondary/50 hover:border-secondary transition-colors duration-300 bg-white"
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-32 xs:h-48 sm:h-64 w-full overflow-hidden">
                <img 
                  src="/placeholder/restaurants-1.png" 
                  alt="Authentic Rwandan Flavors"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4 xs:p-5 sm:p-6">
                <h3 className="text-base xs:text-lg sm:text-xl font-bold text-primary mb-1 xs:mb-2">Authentic Rwandan Flavors</h3>
                <p className="text-gray-600 text-xs xs:text-sm sm:text-base">Discover traditional dishes passed down through generations</p>
              </div>
            </motion.div>

            <motion.div 
              className="rounded-xl overflow-hidden shadow-lg border-2 border-secondary/50 hover:border-secondary transition-colors duration-300 bg-white"
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="h-32 xs:h-48 sm:h-64 w-full overflow-hidden">
                <img 
                  src="/placeholder/restaurants-2.png" 
                  alt="Unforgettable Coffee Moments"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4 xs:p-5 sm:p-6">
                <h3 className="text-base xs:text-lg sm:text-xl font-bold text-primary mb-1 xs:mb-2">Unforgettable Coffee Moments</h3>
                <p className="text-gray-600 text-xs xs:text-sm sm:text-base">Experience Rwanda's world-renowned coffee culture</p>
              </div>
            </motion.div>
          </div>

          {/* Why GoMange Block */}
          <motion.div
            className="bg-primary/5 rounded-xl p-4 xs:p-6 sm:p-8 mb-4 xs:mb-6 shadow-inner text-center border-2 border-primary/20 hover:border-primary/30 transition-colors duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-primary font-semibold text-base xs:text-lg sm:text-xl mb-2 xs:mb-3">Why GoMange?</p>
            <p className="text-gray-700 text-xs xs:text-base sm:text-lg">
              Because food is culture. Food is memory. And Rwanda's rich culinary scene deserves to be seen, celebrated, and shared.
            </p>
          </motion.div>
        </section>

        {/* Final Section */}
        <section className="py-8 xs:py-10 sm:py-16 px-2 xs:px-4 sm:px-6 max-w-2xl mx-auto text-center">
          <motion.div 
            className="space-y-2 xs:space-y-4 sm:space-y-6 text-sm xs:text-base sm:text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-700 leading-relaxed">
              Our team is small, passionate, and local. We're not a big tech company. We're just people who love <span className="italic text-primary font-medium">gufungura neza</span> (eating well), and want to make it easier for others to do the same.
            </p>
            <p className="text-gray-700 leading-relaxed">
              So whether you're new in town or <span className="italic text-primary font-medium">umunyarwanda w'ukuri</span>, welcome to the GoMange community. Tell us your favourites. Try something new. Celebrate Rwandan food with us.
            </p>
            <motion.p
              className="font-semibold text-primary mt-4 xs:mt-6 text-lg xs:text-xl sm:text-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Bon appétit. Murakaza neza.
            </motion.p>
          </motion.div>
        </section>
      </div>

      {/* Closing Banner */}
      <section className="bg-primary py-8 xs:py-10 sm:py-12 text-center">
        <motion.div
          className="inline-block px-4 xs:px-6 py-2 xs:py-3 sm:px-8 sm:py-3 bg-white text-primary rounded-full text-base xs:text-lg sm:text-xl font-bold mb-2 xs:mb-4 shadow-md hover:shadow-lg transition-shadow duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join Our Community
        </motion.div>
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 xs:mb-3 sm:mb-4">
          Taste the <span className="font-lobster text-secondary">GoMange</span> Experience
        </h2>
        <p className="text-base xs:text-lg sm:text-xl text-white/90 max-w-2xl mx-auto px-2 xs:px-4">
          Discover the best of Rwandan cuisine with us
        </p>
      </section>
    </div>
  )
}