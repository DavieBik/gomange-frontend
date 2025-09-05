'use client'
import useSWR, { mutate } from 'swr'
import { useEffect } from 'react'
import RestaurantGridWithFilters from '@/components/features/RestaurantGridWithFilters'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Loading from '@/components/ui/Loading'

const fetcher = () =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/restaurants`)
    .then(res => res.json())
    .then(data => data.restaurants)

export default function RestaurantsPage() {
  const { data: restaurants = [], isLoading } = useSWR('/api/restaurants', fetcher, { refreshInterval: 10000 })

  useEffect(() => {
    // Fuerza el refresco inmediato al montar la página
    mutate('/api/restaurants')
  }, [])

  return (
    <div className="relative min-h-screen bg-gray-50">
 
      <main className="container mx-auto px-4 py-32">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-8 text-center">All Restaurants</h1>
        {isLoading ? <Loading /> : <RestaurantGridWithFilters restaurants={restaurants} />}
      </main>

    </div>
  )
}
