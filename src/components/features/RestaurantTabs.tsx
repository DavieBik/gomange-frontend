// components/features/RestaurantTabs.tsx

'use client'

import { useState } from 'react'
import TabButtons from '@/components/ui/TabButtons'
import RestaurantListWithFilters from './RestaurantFilteredList'

interface Restaurant {
  _id: string
  name: string
  neighbourhood?: string
  cuisine?: string
  priceRange?: string
}

interface RestaurantTabsProps {
  restaurants: Restaurant[]
}

export default function RestaurantTabs({ restaurants }: RestaurantTabsProps) {
  const [activeTab, setActiveTab] = useState('all')

  // Definir las tabs
  const tabs = [
    { id: 'all', label: 'All Restaurants', variant: 'primary' as const },
    { id: 'nearby', label: 'Near Me', variant: 'secondary' as const },
    { id: 'saved', label: 'Saved', variant: 'disabled' as const },
  ]

  // Filtrar restaurantes según la tab activa
  const getFilteredRestaurants = () => {
    if (activeTab === 'nearby') {
      return restaurants.filter(r => r.neighbourhood === 'Kacyiru')
    }
    if (activeTab === 'saved') {
      return restaurants.filter(r => r._id.includes('save')) // Simulación de favoritos
    }
    return restaurants
  }

  const filteredRestaurants = getFilteredRestaurants()

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">All Restaurants</h2>

        {/* Botones */}
        <TabButtons
          tabs={tabs}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id)}
        />

        {/* Contenido dinámico según tab */}
        <div className="mt-10">
          {activeTab === 'all' && (
            <RestaurantListWithFilters restaurants={restaurants} />
          )}

          {activeTab === 'nearby' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Restaurants in Kacyiru</h3>
              <RestaurantListWithFilters restaurants={filteredRestaurants} />
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">You haven't saved any restaurants yet.</p>
              <button className="mt-4 btn-secondary">Browse Nearby</button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}