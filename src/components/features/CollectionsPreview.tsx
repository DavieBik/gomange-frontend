// components/features/CollectionsPreview.tsx

import Link from 'next/link'
import type { Sanity } from '@/types/sanity'
import { urlFor } from '@/lib/sanity'

interface CollectionsPreviewProps {
  collections: Sanity.Collection[]
}

export default function CollectionsPreview({ collections }: CollectionsPreviewProps) {
  if (!collections.length) return null

  return (
    <section className="relative py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover <span className="text-primary font-extrabold">Unique Food Experiences</span>
          </h2>
          <p className="text-lg font-medium text-gray-800 max-w-2xl mx-auto mb-8">
            Explore our handpicked categories and find your next favorite spot, from cozy brunches to vibrant street food.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          {collections.map(col => (
            <Link
              key={col._id}
              href={`/collections/${typeof col.slug === 'object' && col.slug?.current ? col.slug.current : col.slug}`}
              className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition group border border-primary-50 hover:border-primary-200"
            >
              <div className="w-16 h-16 rounded-full mb-3 overflow-hidden bg-gray-100 flex items-center justify-center border border-primary-100">
                {col.coverImage?.asset ? (
                  <img
                    src={urlFor(col.coverImage).width(128).height(128).url()}
                    alt={col.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-2xl text-primary font-bold">🍽️</span>
                )}
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-primary transition-colors truncate w-full text-center">{col.title}</h3>
              {col.description && (
                <p className="text-gray-500 text-sm text-center line-clamp-2">{col.description}</p>
              )}
              {col.restaurantCount !== undefined && (
                <span className="mt-2 text-xs text-primary-700 font-semibold bg-primary-50 rounded-full px-3 py-1">{col.restaurantCount} places</span>
              )}
            </Link>
          ))}
        </div>
        <div className="text-center">
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
