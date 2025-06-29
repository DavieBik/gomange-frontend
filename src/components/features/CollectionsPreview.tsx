// components/features/CollectionsPreview.tsx

import Link from 'next/link'
import { Sanity } from '@/types/sanity'

interface CollectionsPreviewProps {
  collections: Sanity.Collection[]
}

export default function CollectionsPreview({ collections }: CollectionsPreviewProps) {
  if (!collections.length) return null

  return (
    <section className="relative py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Custom header for the categories section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover <span className="text-primary font-extrabold">Unique Food Experiences</span>
          </h2>
          
          <p className="text-lg font-medium text-gray-800 max-w-2xl mx-auto mb-8">
            Explore our handpicked categories and find your next favorite spot, from cozy brunches to vibrant street food.
          </p>

          {/* New visual element: a simple grid of category cards with themed icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition">
              <img src="/placeholder/vegan.jpg" alt="Vegan" className="w-16 h-16 rounded-full mb-3 object-cover" />
              <h3 className="font-bold text-lg text-gray-800 mb-1">Vegan Delights</h3>
              <p className="text-gray-500 text-sm text-center">Discover the best plant-based restaurants in town.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition">
              <img src="/placeholder/barbecue.jpg" alt="Barbecue" className="w-16 h-16 rounded-full mb-3 object-cover" />
              <h3 className="font-bold text-lg text-gray-800 mb-1">BBQ & Grill</h3>
              <p className="text-gray-500 text-sm text-center">Savor smoky flavors and juicy classics for meat lovers.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition">
              <img src="/placeholder/coffee.jpg" alt="Coffee" className="w-16 h-16 rounded-full mb-3 object-cover" />
              <h3 className="font-bold text-lg text-gray-800 mb-1">Coffee Corners</h3>
              <p className="text-gray-500 text-sm text-center">Find cozy cafés and the perfect cup for every mood.</p>
            </div>
          </div>

          {/* Main button */}
          <Link 
            href="/collections"
            className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-primary-700 transition-all text-lg group"
          >
            Browse all categories
            <svg 
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
