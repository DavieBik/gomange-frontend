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
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 font-medium mt-4">
            Browse our handpicked restaurant collections by cuisine. Whether you crave Italian classics, healthy vegan options, or something new, you’ll find the perfect spot for every occasion.
          </p>
        </div>
      </section>
      <section className="relative py-20 bg-gray-50">
        <div className="container mx-auto px-4 space-y-16">
          {TYPE_ORDER.map((type, idx) => (
            grouped[type] && grouped[type].length > 0 && (
              <div key={type} className={`rounded-3xl shadow-lg p-8 md:p-12 transition-all duration-300 relative overflow-hidden ${idx % 2 === 0 ? 'bg-white' : 'bg-gradient-to-r from-primary/10 to-secondary/10'}`}> 
                {/* Badge for all sections, different color for featured */}
                <div className={`absolute top-6 right-6 z-10`}>
                  <span className={`inline-flex items-center gap-2 px-4 py-2 font-bold rounded-full shadow border-2 text-base ${idx === 0 ? 'bg-yellow-400 text-yellow-900 border-yellow-500' : 'bg-secondary/90 text-white border-secondary/80'}`}>
                    <svg className={`w-5 h-5 ${idx === 0 ? 'text-yellow-700' : 'text-white/80'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.388-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                    {idx === 0 ? 'Featured' : 'Collection'}
                  </span>
                </div>
                <div className="mb-6 text-center flex flex-col items-center">
                  <div className={`w-16 h-16 mb-4 flex items-center justify-center rounded-full shadow-lg ${idx % 2 === 0 ? 'bg-primary/90' : 'bg-secondary/90'}`}> 
                    <span className="text-3xl font-bold text-white">{TYPE_LABELS[type][0]}</span>
                  </div>
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

    </div>
  )
}
