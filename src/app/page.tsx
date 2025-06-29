// app/page.tsx

import Header from '@/components/layout/Header'
import HeroSection from '@/components/features/HeroSection'
import Footer from '@/components/layout/Footer'
import { fetchRestaurants, fetchCollections } from '../lib/sanity'
import RestaurantGridWithFilters from '@/components/features/RestaurantGridWithFilters'
import CollectionsPreview from '@/components/features/CollectionsPreview'

export default async function HomePage() {
  const allRestaurants = await fetchRestaurants()
  const collections = await fetchCollections()

  return (
    <div className="relative">

      <div className="h-24"></div>
      {/* Hero Section */}
      <HeroSection />

      {/* Sección de restaurantes */}
      <section id="restaurant-list" className="relative py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header llamativo */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover <span className="text-primary font-extrabold">Amazing</span> Restaurants
            </h2>
            
            <p className="text-lg font-medium text-gray-800 max-w-2xl mx-auto">
              Find the perfect dining experience — from cozy cafes to fine dining
            </p>
          </div>

          <RestaurantGridWithFilters restaurants={allRestaurants} />
        </div>
      </section>

      {/* Divisor elegante */}
      <div className="relative py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="mx-6 px-4 py-2 bg-white rounded-full border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-sm font-medium">Collections</span>
                <span className="w-2 h-2 rounded-full bg-primary"></span>
              </div>
            </div>
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Collections Preview Section */}
      <CollectionsPreview collections={collections} />


    </div>
  )
}