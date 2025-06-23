// app/page.tsx
'use client'

import Header from '@/components/layout/Header'
import HeroSection from '@/components/features/HeroSection'
import Footer from '@/components/layout/Footer'
import { fetchRestaurants } from '../lib/sanity'
import RestaurantGridWithFilters from '@/components/features/RestaurantGridWithFilters'

export default async function HomePage() {
  const allRestaurants = await fetchRestaurants()

  return (
    <div className="relative">
      <Header />
      
      <div className="h-24"></div>
      {/* Hero Section */}
      <HeroSection />

      {/* Sección de restaurantes */}
      <section id="restaurant-list" className="relative py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            All Restaurants
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-center">
            Explore the best restaurants in your city — filter by cuisine, location or price range.
          </p>

          <RestaurantGridWithFilters restaurants={allRestaurants} />
        </div>
      </section>

      <Footer />
    </div>
  )
}