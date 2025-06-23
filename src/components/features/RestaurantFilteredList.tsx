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

  // Extraer opciones únicas con tipado correcto
  const locations = Array.from(new Set(restaurants.map(r => r.neighbourhood).filter((n): n is string => !!n)))
  const cuisines = Array.from(new Set(restaurants.map(r => r.cuisine).filter((c): c is string => !!c)))
  const priceRanges = Array.from(new Set(restaurants.map(r => r.priceRange).filter((p): p is string => !!p)))
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
      r.priceRange === priceRange
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
            placeholder="Search by restaurant name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-shadow"
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
            className="p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-shadow"
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
            className="p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-shadow"
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
            className="p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-shadow"
          >
            <option value="">All Price Ranges</option>
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
            className="p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-shadow"
          >
            <option value="">All Tags</option>
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
          <h3 className="text-xl font-semibold text-gray-800">No restaurants found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchTerm('')
              setLocation('')
              setCuisine('')
              setPriceRange('')
              setSelectedTag('')
              setCurrentPage(1)
            }}
            className="mt-4 px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Contador de resultados */}
      <div className="text-sm text-gray-500 text-center mt-4">
        Showing <span className="font-medium">{currentRestaurants.length}</span> of{' '}
        <span className="font-medium">{filteredRestaurants.length}</span> results
        {filteredRestaurants.length !== restaurants.length && (
          <span> (filtered from <span className="font-medium">{restaurants.length}</span> total)</span>
        )}
      </div>
    </div>
  )
}