'use client'

import { useState } from 'react'
import Pagination from '@/components/ui/Pagination'
import RestaurantCard from '../ui/RestaurantCrad'


interface Restaurant {
  _id: string
  name: string
  neighbourhood?: string
  cuisine?: string
  priceRange?: string
  tags?: string[]
  lgbtqFriendly?: boolean
  Image_URL?: string
  mainImage?: any
  streetAddress?: string
}

export default function RestaurantFilteredList({ restaurants }: { restaurants: Restaurant[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  // Función para mapear precios existentes a las nuevas categorías
  const mapPriceRange = (price: string | undefined): string => {
    if (!price) return 'Standard pricing'
    
    const lowerPrice = price.toLowerCase()
    if (lowerPrice.includes('$') && !lowerPrice.includes('$$')) return 'Affordable meals'
    if (lowerPrice.includes('$$$$') || lowerPrice.includes('expensive') || lowerPrice.includes('upscale')) return 'Upscale dining'
    if (lowerPrice.includes('$$$') || lowerPrice.includes('moderate')) return 'Standard pricing'
    if (lowerPrice.includes('varied') || lowerPrice.includes('range')) return 'Wide price range'
    
    return 'Standard pricing' // default
  }

  // Extraer opciones únicas con tipado correcto
  const locations = Array.from(new Set(restaurants.map(r => r.neighbourhood).filter((n): n is string => !!n)))
  const cuisines = Array.from(new Set(restaurants.map(r => r.cuisine).filter((c): c is string => !!c)))
  // Categorías de precio fijas
  const priceRanges = [
    'Affordable meals',
    'Standard pricing', 
    'Upscale dining',
    'Wide price range'
  ]
  const allTags = Array.from(new Set(restaurants.flatMap(r => r.tags || []).filter((t): t is string => !!t)))

  // Filtrado
  const filteredRestaurants = restaurants.filter((r) => {
    const matchesSearch = searchTerm === '' || 
      r.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = location === '' || 
      r.neighbourhood === location
    const matchesCuisine = cuisine === '' || 
      r.cuisine?.toLowerCase().includes(cuisine.toLowerCase())
    const matchesPrice = priceRange === '' || 
      mapPriceRange(r.priceRange) === priceRange
    const matchesTag = selectedTag === '' || 
      (r.tags && r.tags.includes(selectedTag))

    return matchesSearch && matchesLocation && matchesCuisine && matchesPrice && matchesTag
  })

  const ITEMS_PER_PAGE = 8
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentRestaurants = filteredRestaurants.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Búsqueda y Filtros */}
      <div className="bg-white rounded-xl shadow-card p-6 space-y-6 transition-all duration-300 hover:shadow-card-hover">
        {/* Barra de búsqueda */}
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search restaurants by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow placeholder-gray-600 font-medium text-gray-900"
          />
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            value={location}
            onChange={(e) => {
              setLocation(e.target.value)
              setCurrentPage(1)
            }}
            className="p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow font-medium text-gray-900"
          >
            <option value="">📍 All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <select
            value={cuisine}
            onChange={(e) => {
              setCuisine(e.target.value)
              setCurrentPage(1)
            }}
            className="p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow font-medium text-gray-900"
          >
            <option value="">🍽️ All Cuisines</option>
            {cuisines.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={priceRange}
            onChange={(e) => {
              setPriceRange(e.target.value)
              setCurrentPage(1)
            }}
            className="p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow font-medium text-gray-900"
          >
            <option value="">💰 All Price Ranges</option>
            {priceRanges.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <select
            value={selectedTag}
            onChange={(e) => {
              setSelectedTag(e.target.value)
              setCurrentPage(1)
            }}
            className="p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow font-medium text-gray-900"
          >
            <option value="">🏷️ All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resultados */}
      {currentRestaurants.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentRestaurants.map((restaurant) => (
              <RestaurantCard 
                key={restaurant._id} 
                restaurant={restaurant} 
                layout="grid" 
                variant={restaurant.lgbtqFriendly ? 'featured' : 'default'}
              />
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center">
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl shadow-sm">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Restaurants Found</h3>
          <p className="text-lg font-medium text-gray-700 mb-6">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchTerm('')
              setLocation('')
              setCuisine('')
              setPriceRange('')
              setSelectedTag('')
              setCurrentPage(1)
            }}
            className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Contador de resultados */}
      <div className="text-base font-semibold text-gray-800 text-center mt-4 bg-white rounded-lg py-3 shadow-sm">
        Showing <span className="font-bold text-primary">{currentRestaurants.length}</span> of{' '}
        <span className="font-bold text-primary">{filteredRestaurants.length}</span> restaurants
        {filteredRestaurants.length !== restaurants.length && (
          <span className="text-gray-600"> (filtered from <span className="font-bold text-gray-900">{restaurants.length}</span> total)</span>
        )}
      </div>
    </div>
  )
}