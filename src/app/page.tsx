import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import RestaurantCard from '../components/ui/RestaurantCrad'
import { fetchRestaurants } from '../lib/sanity'
import { Search } from 'lucide-react'

export const revalidate = 60

export default async function HomePage() {
  const restaurants = await fetchRestaurants()
  const featuredRestaurants = restaurants.slice(0, 4)
  const traditionalRestaurants = restaurants.filter(r => r.category === 'traditional').slice(0, 2)

  return (
    <>
      <Header />
      <main className="pt-24 bg-white">
        {/* Hero Section - Solid green */}
             <section className="bg-primary py-20 text-white"> 
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-6">Explore Kigali's Best Restaurants</h1>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <input 
                type="text" 
                placeholder="Search restaurants..." 
                className="w-full py-4 px-6 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Search className="absolute right-6 top-4 text-gray-500" size={24} />
            </div>
          </div>
        </section>


        {/* Top Picks Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Top Picks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredRestaurants.map((restaurant) => (
                <RestaurantCard 
                  key={restaurant._id} 
                  restaurant={restaurant}
                  variant="featured"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Traditional Food Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Traditional Food</h2>
                <h3 className="text-2xl font-semibold mb-6 text-primary">What is Isombe?</h3>
                <p className="text-gray-600 mb-8">
                  Isombe is a traditional Rwandan dish made from mashed cassava leaves, 
                  often cooked with eggplant, spinach and peanut sauce. A delicious 
                  representation of East African culinary heritage.
                </p>
                <button className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-full transition-colors">
                  Sign up for cooking class
                </button>
              </div>
              
              <div className="md:w-1/2 grid gap-6">
                {traditionalRestaurants.map((restaurant) => (
                  <RestaurantCard 
                    key={restaurant._id} 
                    restaurant={restaurant}
                    variant="traditional"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}