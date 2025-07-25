// app/page.tsx

import Header from '@/components/layout/Header'
import HeroSection from '@/components/features/HeroSection'
import Footer from '@/components/layout/Footer'
import { fetchRestaurants, fetchCollections } from '../lib/sanity'
import RestaurantCard from '@/components/ui/RestaurantCard'
import FoodTypesCarousel from '@/components/features/FoodTypesCarousel'
import HandpickedCarousel from '@/components/features/HandpickedCarousel'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { getPlaceholderImage } from '@/lib/utils'
import {
  getUniqueLocations,
  getUniqueCuisines,
} from '@/lib/restaurantFilters'

export default async function HomePage() {
  // Fetch data in parallel
  const [allRestaurants, collections] = await Promise.all([
    fetchRestaurants(),
    fetchCollections()
  ])

  // Memoize derived data
  const locations = getUniqueLocations(allRestaurants)
  const cuisines = getUniqueCuisines(allRestaurants)

  const foodTypes = cuisines.map((cuisine) => {
    const match = allRestaurants.find(r => r.cuisine === cuisine)
    let image = ''
    if (match?.mainImage?.asset) {
      image = urlFor(match.mainImage.asset).width(800).url()
    } else if (match?.Image_URL) {
      image = match.Image_URL
    } else {
      image = getPlaceholderImage(cuisine)
    }
    return { name: cuisine, image }
  })

  const previewRestaurants = allRestaurants.slice(0, 6)
  const featuredCollection = collections && collections.length > 0 ? collections[0] : null

  const articles = [
    {
      title: 'The Best New Restaurants in Kigali',
      summary: 'Discover the latest openings and must-try spots in the city.',
      image: '/placeholder/african.jpg',
      href: '#'
    },
    {
      title: 'A Guide to Vegan Dining',
      summary: 'Explore Kigali’s top vegan and plant-based restaurants.',
      image: '/placeholder/vegan.jpg',
      href: '#'
    },
    {
      title: 'Coffee Culture in Rwanda',
      summary: 'Where to find the best brews and cozy cafés.',
      image: '/placeholder/coffee.jpg',
      href: '#'
    }
  ]

  return (
    <div className="relative">
      <div className="h-12 md:h-20"></div>
      {/* Hero Section */}
      <HeroSection
        badge={<span>Premium Dining Experiences</span>}
        title={
          <>
            Taste the{' '}
            <span className="text-secondary font-lobster font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block">GoMange</span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Experience</span>
          </>
        }
        subtitle={<>Explore extraordinary dining experiences. From hidden gems to award-winning restaurants — your perfect meal awaits.</>}
        buttons={
          <>
            <a
              href="#restaurant-list"
              className="px-5 sm:px-6 py-2 sm:py-3 bg-white text-primary font-medium rounded-lg shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
            >
              Find Restaurants
            </a>
            <a
              href="/about"
              className="px-5 sm:px-6 py-2 sm:py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-primary transition-colors text-sm sm:text-base"
            >
              How It Works
            </a>
          </>
        }
      />

      {/* Minimal Search Bar for Home */}
      <div className="relative z-20 -mt-8 sm:-mt-12 flex justify-center">
        <form
          className="w-full max-w-md sm:max-w-2xl bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 flex flex-col md:flex-row items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-6"
          action="/restaurants"
          method="get"
        >
          <div className="flex-1 w-full">
            <label htmlFor="location" className="block text-sm font-semibold text-primary-700 mb-2">Neighborhood / Area</label>
            <select
              id="location"
              name="location"
              className="w-full bg-white border border-primary-800 rounded-lg px-4 py-3 text-lg text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
              defaultValue={''}
            >
              <option value="">All</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 w-full">
            <label htmlFor="cuisine" className="block text-sm font-semibold text-primary-700 mb-2">Type of Food</label>
            <select
              id="cuisine"
              name="cuisine"
              className="w-full bg-white border border-primary-800 rounded-lg px-4 py-3 text-lg text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
              defaultValue={''}
            >
              <option value="">All</option>
              {foodTypes.map(ft => (
                <option key={ft.name} value={ft.name}>{ft.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-tertiary text-lg font-bold px-8 py-3 rounded-lg w-full md:w-auto mt-2 md:mt-7 md:ml-4">
            Search
          </button>
        </form>
      </div>

      {/* Featured Restaurants Carousel */}
      <section className="relative py-6 sm:py-10 bg-white">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-bold text-primary">Featured Restaurants</h2>
            <Link href="/restaurants" className="hidden sm:inline btn btn-text text-secondary-400 font-semibold w-auto text-right text-xs sm:text-base">View all</Link>
            <Link href="/restaurants" className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full bg-secondary-400 text-white text-xl font-bold shadow hover:bg-accent/80 transition-colors duration-150 ml-2" aria-label="View all">
              <span>+</span>
            </Link>
          </div>
          <div className="flex gap-6 sm:gap-8 pb-2 hide-scrollbar overflow-x-auto">
            {previewRestaurants.map((restaurant) => (
              <div key={restaurant._id} className="flex-shrink-0">
                <div className="relative z-10 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl  min-w-[260px] max-w-[260px] h-[370px] flex flex-col items-center justify-between mx-1">
                  <RestaurantCard restaurant={restaurant} layout="grid" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Food Section */}
      <FoodTypesCarousel foodTypes={foodTypes} />

      {/* Handpicked for You */}
      <HandpickedCarousel restaurants={previewRestaurants} />

      {/* Dish Spotlight Section  */}
      <section className="relative py-8 sm:py-14 bg-primary-100">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-row items-center justify-between mb-4 sm:mb-8 gap-2 w-full max-w-lg mx-auto sm:max-w-none">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 items-start">
              <span className="inline-block bg-primary-200 text-primary-800 text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full mr-0 sm:mr-2 mb-1 sm:mb-0">Signature Dishes</span>
              <h2 className="text-lg sm:text-2xl font-bold text-primary text-left drop-shadow-sm">Dish Spotlight</h2>
            </div>
            <Link href="/restaurants" className="hidden sm:inline btn btn-text text-secondary-400 font-semibold underline underline-offset-4 w-auto text-center mt-2 sm:mt-0 text-xs sm:text-lg">View all</Link>
            <Link href="/restaurants" className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full bg-secondary-400 text-white text-xl font-bold shadow hover:bg-secondary-500 transition-colors duration-150" aria-label="View all">
              <span>+</span>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-4 sm:gap-8 md:gap-10 items-stretch">
            {/* Main Dish Card - asymmetric, premium */}
            <div className="flex-1 max-w-xs sm:max-w-md bg-primary rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-8 flex flex-col items-center justify-center relative group border border-primary-100 hover:border-accent transition-all duration-300">
              <img src="/placeholder/pizza.jpg" alt="Pizza" className="w-28 h-28 sm:w-44 sm:h-44 md:w-56 md:h-56 object-cover rounded-full mb-4 sm:mb-6 border-2 sm:border-4 border-secondary-400 shadow-lg group-hover:scale-105 transition-transform duration-200" />
              <h3 className="text-base sm:text-xl md:text-1xl font-extrabold text-white mb-1 sm:mb-2 group-hover:underline text-center">Wood-fired Pizza</h3>
              <span className="inline-block bg-secondary-400 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow mb-1 sm:mb-2">Chef's Choice</span>
              <p className="text-xs sm:text-base md:text-base text-white text-center mb-1 sm:mb-2">Crispy, cheesy, and made with local ingredients. A must-try from our Italian partners.</p>
              <div className="flex gap-1 sm:gap-2 mt-1 sm:mt-2">
                <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-2 py-1 rounded-full">Italian</span>
                <span className="inline-block bg-primary-50 text-primary-600 text-xs font-semibold px-2 py-1 rounded-full">Wood-fired</span>
              </div>
            </div>
            {/* Side Dish Cards - editorial, modern */}
            <div className="flex flex-1 flex-col gap-4 sm:gap-8 justify-between">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-7 flex flex-col items-center group relative border border-primary hover:border-accent transition-all duration-300">
                <img src="/placeholder/sushi.jpg" alt="Sushi" className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-full mb-2 sm:mb-3 border border-secondary-200 group-hover:scale-105 transition-transform duration-200" />
                <h4 className="font-semibold text-primary text-base sm:text-xl mb-1 group-hover:underline text-center">Signature Sushi</h4>
                <span className="inline-block bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full shadow mb-1">Popular</span>
                <p className="text-xs sm:text-sm text-gray-500 text-center mb-1">Fresh and creative rolls from Kigali’s best sushi chefs.</p>
                <div className="flex gap-1 sm:gap-2 mt-1">
                  <span className="inline-block bg-primary-50 text-primary-700 text-xs font-semibold px-2 py-1 rounded-full">Japanese</span>
                  <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-2 py-1 rounded-full">Seafood</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-7 flex flex-col items-center group relative border border-primary hover:border-accent transition-all duration-300">
                <img src="/placeholder/vegan.jpg" alt="Vegan Bowl" className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-full mb-2 sm:mb-3 border border-secondary-200 group-hover:scale-105 transition-transform duration-200" />
                <h4 className="font-semibold text-primary text-base sm:text-xl mb-1 group-hover:underline text-center">Vegan Bowl</h4>
                <span className="inline-block bg-secondary-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow mb-1">Vegan</span>
                <p className="text-xs sm:text-sm text-gray-500 text-center mb-1">A colorful, healthy bowl for plant-based foodies.</p>
                <div className="flex gap-1 sm:gap-2 mt-1">
                  <span className="inline-block bg-primary-50 text-primary-700 text-xs font-semibold px-2 py-1 rounded-full">Vegan</span>
                  <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-2 py-1 rounded-full">Healthy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placement Section - mejorada y antes de artículos */}
      <section className="relative py-6 sm:py-10 bg-white">
        <div className="container mx-auto px-2 sm:px-4 flex justify-center">
          <div className="bg-white border border-accent rounded-xl sm:rounded-2xl shadow-xl px-4 sm:px-8 py-6 sm:py-8 w-full max-w-md sm:max-w-lg flex flex-col items-center">
            <span className="uppercase tracking-wider text-xs font-bold text-accent mb-2">Promote with us</span>
            <div className="text-lg sm:text-2xl font-extrabold text-primary mb-2">Advertise your restaurant or service</div>
            <p className="text-xs sm:text-base text-gray-600 mb-4 text-center">Reach thousands of food lovers in Kigali. Fill out the form and our team will contact you soon.</p>
            <form className="flex flex-col gap-2 sm:gap-3 w-full" action="/api/contact" method="post">
              <div className="relative">
                <input type="email" name="email" placeholder="Your email" required className="rounded-md px-4 py-3 text-black text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-400 w-full pl-10" />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M2 4l10 7 10-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/></svg>
                </span>
              </div>
              <div className="relative">
                <textarea name="message" placeholder="How can we help you?" required rows={2} className="rounded-md px-4 py-3 text-black text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-400 w-full pl-10" />
                <span className="absolute left-3 top-3 text-gray-400">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M21 15V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 10h.01M12 10h.01M17 10h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
              <button type="submit" className="btn btn-secondary btn-lg mt-2 self-center">Send</button>
            </form>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="relative py-6 sm:py-12 bg-secondary-100">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-bold text-primary">Latest Articles</h2>
            <Link href="/articles" className="btn btn-text text-accent-yellow font-semibold underline underline-offset-4 text-xs sm:text-base">View all</Link>
          </div>
          <div className="flex gap-3 sm:gap-8 overflow-x-auto pb-2 hide-scrollbar">
            {articles.map((article, idx) => (
              <div key={idx} className="bg-white rounded-lg sm:rounded-xl shadow-card p-3 sm:p-6 min-w-[180px] max-w-[200px] sm:min-w-[320px] sm:max-w-sm flex-shrink-0 flex flex-col">
                <div className="h-24 sm:h-40 bg-gray-200 rounded-md sm:rounded-lg mb-2 sm:mb-4 overflow-hidden">
                  <img src={article.image} alt={article.title} className="object-cover w-full h-full" />
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-primary">{article.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4 flex-1">{article.summary}</p>
                <Link href={article.href} className="btn btn-secondary btn-xs sm:btn-sm mt-auto self-start">Read More</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}