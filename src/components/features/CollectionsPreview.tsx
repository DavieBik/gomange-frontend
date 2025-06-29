// components/features/CollectionsPreview.tsx

import Link from 'next/link'
import { Sanity } from '@/types/sanity'

interface CollectionsPreviewProps {
  collections: Sanity.Collection[]
}

export default function CollectionsPreview({ collections }: CollectionsPreviewProps) {
  if (!collections.length) return null

  const totalRestaurants = collections.reduce((total, c) => total + (c.restaurantCount || 0), 0)

  return (
    <section className="relative py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header siguiendo el estilo de la sección de restaurantes */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore <span className="text-primary font-extrabold">Curated</span> Collections
          </h2>
          
          <p className="text-lg font-medium text-gray-800 max-w-2xl mx-auto mb-8">
            From romantic dinners to family brunches — find the perfect restaurant for every occasion
          </p>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{collections.length}</div>
              <div className="text-gray-600 font-medium">Curated Collections</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{totalRestaurants}</div>
              <div className="text-gray-600 font-medium">Featured Restaurants</div>
            </div>
          </div>

          {/* Botón principal */}
          <Link 
            href="/collections"
            className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-primary-700 transition-all text-lg group"
          >
            Explore All Collections
            <svg 
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
