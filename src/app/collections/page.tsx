// app/collections/page.tsx

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { fetchRestaurants } from '@/lib/sanity'
import RestaurantCard from '@/components/ui/RestaurantCrad'
import Carousel from '@/components/ui/Carousel'

const TYPE_LABELS: Record<string, string> = {
  italian: 'Italian',
  japanese: 'Japanese',
  vegan: 'Vegan',
  healthy: 'Healthy',
  other: 'Other',
}

const TYPE_ORDER = ['italian', 'japanese', 'vegan', 'healthy', 'other']

export default async function CollectionsPage() {
  const restaurants = await fetchRestaurants()

  // Agrupar restaurantes por tipo/cocina
  const grouped: Record<string, any[]> = { italian: [], japanese: [], vegan: [], healthy: [], other: [] }
  for (const r of restaurants) {
    const type = TYPE_ORDER.find(t => t !== 'other' && r.cuisine?.toLowerCase().includes(t))
    if (type) grouped[type].push(r)
    else grouped.other.push(r)
  }

  return (
    <div className="relative">
      <Header />
      <div className="h-24"></div>
      <section className="relative overflow-hidden bg-primary text-white py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-6 py-2 mb-8 text-base font-bold text-primary bg-white rounded-full shadow-lg border-2 border-secondary">
            Curated Collections
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 text-white">
            Discover by{' '}
            <span className="text-secondary font-lobster font-light text-6xl md:text-7xl lg:text-8xl inline-block">
              Type
            </span>
          </h1>
        </div>
      </section>
      <section className="relative py-20 bg-gray-50">
        <div className="container mx-auto px-4 space-y-16">
          {TYPE_ORDER.map(type => (
            grouped[type] && grouped[type].length > 0 && (
              <div key={type}>
                <div className="mb-6 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {TYPE_LABELS[type]}
                  </h2>
                </div>
                <Carousel className="mb-8">
                  {grouped[type].map((restaurant: any) => (
                    <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                  ))}
                </Carousel>
              </div>
            )
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}
