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
  city?: string
  district?: string
}

interface RestaurantTabsProps {
  restaurants: Restaurant[]
}

export default function RestaurantTabs({ restaurants }: RestaurantTabsProps) {
  const [activeTab, setActiveTab] = useState('all')

  // Utility to get user's city/district (mock for now)
  const getUserLocation = () => {
    // In real app, use geolocation or user profile
    return {
      city: 'Kigali',
      district: 'Gasabo',
      neighbourhood: 'Kacyiru',
    }
  }

  const userLocation = getUserLocation()

  // Definir las tabs
  const tabs = [
    { id: 'all', label: 'All Restaurants', variant: 'primary' as const },
    { id: 'nearby', label: 'Nearby', variant: 'secondary' as const },
    { id: 'saved', label: 'Saved', variant: 'disabled' as const },
  ]

  // Filtrar restaurantes según la tab activa
  const getFilteredRestaurants = () => {
    if (activeTab === 'nearby') {
      // Show restaurants in user's city/district
      return restaurants.filter(r =>
        (r.city && r.city === userLocation.city) ||
        (r.district && r.district === userLocation.district)
      )
    }
    if (activeTab === 'saved') {
      // Placeholder for real favorites
      return restaurants.filter(r => r._id.includes('save'))
    }
    return restaurants
  }

  const filteredRestaurants = getFilteredRestaurants()

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">All Restaurants</h2>

        {/* Tabs */}
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
              <h3 className="text-xl font-semibold mb-4">
                Restaurants in {userLocation.city} {userLocation.district ? `/ ${userLocation.district}` : ''}
              </h3>
              <RestaurantListWithFilters restaurants={filteredRestaurants} />
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">
                {filteredRestaurants.length === 0
                  ? "You haven't saved any restaurants yet."
                  : `You have saved ${filteredRestaurants.length} restaurants.`}
              </p>
              <button className="mt-4 btn-secondary" onClick={() => setActiveTab('nearby')}>
                Browse Nearby
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}