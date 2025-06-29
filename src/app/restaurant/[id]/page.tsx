// app/restaurant/[id]/page.tsx
import { fetchRestaurantById } from '@/lib/sanity'
import RestaurantDetail from '@/components/features/RestaurantDetail'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { notFound } from 'next/navigation'

interface RestaurantPageProps {
  params: {
    id: string
  }
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  let restaurant = null
  let error = null
  try {
    // Debug output
    console.log('RestaurantPage params.id:', params.id)
    restaurant = await fetchRestaurantById(params.id)
    console.log('Fetched restaurant:', restaurant)
  } catch (err) {
    error = err
    console.error('Error fetching restaurant:', err)
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
        <p className="text-gray-700 mb-2">{String(error)}</p>
        <p className="text-gray-500">Please try again or contact support.</p>
      </div>
    )
  }

  if (!restaurant) {
    notFound()
  }

  return (
    <div className="relative">

      <div className="h-24"></div>
      
      <RestaurantDetail restaurant={restaurant} />
 
    </div>
  )
}
