import RestaurantGridWithFilters from '@/components/features/RestaurantGridWithFilters'
import { fetchRestaurants } from '@/lib/sanity'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default async function RestaurantsPage() {
  const restaurants = await fetchRestaurants()

  return (
    <div className="relative min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-8 text-center">All Restaurants</h1>
        <RestaurantGridWithFilters restaurants={restaurants} />
      </main>
      <Footer />
    </div>
  )
}
