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
  const restaurant = await fetchRestaurantById(params.id)
  
  if (!restaurant) {
    notFound()
  }

  return (
    <div className="relative">
      <Header />
      <div className="h-24"></div>
      
      <RestaurantDetail restaurant={restaurant} />
      
      <Footer />
    </div>
  )
}
