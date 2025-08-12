// app/components/RestaurantGridWithFilters.tsx
'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Pagination from '@/components/ui/Pagination'
import RestaurantCard from '../ui/RestaurantCard'


interface Restaurant {
  _id: string
  name: string
  neighbourhood?: string
  cuisine?: string
  priceRange?: string
  tags?: string[]
}

export default function RestaurantGridWithFilters({ restaurants }: { restaurants: Restaurant[] }) {
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get('searchTerm') || '';
  const initialLocation = searchParams.get('location') || '';
  const initialCuisine = searchParams.get('cuisine') || '';
  const initialPriceRange = searchParams.get('priceRange') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [location, setLocation] = useState(initialLocation)
  const [cuisine, setCuisine] = useState(initialCuisine)
  const [priceRange, setPriceRange] = useState(initialPriceRange)
  const [currentPage, setCurrentPage] = useState(1)

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

  // Extraer opciones únicas
  const locations = Array.from(new Set(restaurants.map(r => r.neighbourhood).filter(Boolean)))
  const cuisines = Array.from(new Set(restaurants.map(r => r.cuisine).filter(Boolean)))
  // Categorías de precio fijas
  const priceRanges = [
    'Affordable meals',
    'Standard pricing', 
    'Upscale dining',
    'Wide price range'
  ]

  // Filtrado
  const filteredRestaurants = restaurants.filter((r) => {
    const matchesSearch = !searchTerm || r.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = !location || r.neighbourhood === location
    const matchesCuisine = !cuisine || r.cuisine?.toLowerCase() === cuisine.toLowerCase()
    const matchesPrice = !priceRange || mapPriceRange(r.priceRange) === priceRange

    return matchesSearch && matchesLocation && matchesCuisine && matchesPrice
  })

  const ITEMS_PER_PAGE = 16
  const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentRestaurants = filteredRestaurants.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h3 className="text-lg font-semibold mb-4">Filter Restaurants</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
          />

          <select
            value={location}
            onChange={(e) => {
              setLocation(e.target.value)
              setCurrentPage(1)
            }}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white transition-shadow"
          >
            <option value="">All Locations</option>
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
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white transition-shadow"
          >
            <option value="">All Cuisines</option>
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
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white transition-shadow"
          >
            <option value="">All Price Ranges</option>
            {priceRanges.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentRestaurants.length > 0 ? (
          currentRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} layout="grid" />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-medium text-gray-900">No restaurants found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setLocation('')
                setCuisine('')
                setPriceRange('')
                setCurrentPage(1)
              }}
              className="mt-4 btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}

      {/* Contador de resultados */}
      <p className="text-sm text-gray-500 text-center mt-4">
        Showing <span className="font-medium">{currentRestaurants.length}</span> of{' '}
        <span className="font-medium">{filteredRestaurants.length}</span> results
        {filteredRestaurants.length !== restaurants.length && (
          <span> (filtered from <span className="font-medium">{restaurants.length}</span>)</span>
        )}
      </p>
    </div>
  )
}