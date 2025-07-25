// app/restaurant/[id]/page.tsx
'use client'
import useSWR from 'swr'
import RestaurantDetail from '@/components/features/RestaurantDetail'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const fetcher = (id: string) =>
    fetch(`http://localhost:3001/api/restaurants/${id}`).then(res => res.json())

  const { data: restaurant, error, isLoading } = useSWR(params.id, fetcher, { refreshInterval: 10000 })

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
        <p className="text-gray-700 mb-2">{String(error)}</p>
        <p className="text-gray-500">Please try again or contact support.</p>
      </div>
    )
  }

  if (isLoading || !restaurant) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="relative">
      <div className="h-24"></div>
      <RestaurantDetail restaurant={restaurant} />
    </div>
  )
}
