// app/collections/[slug]/page.tsx

import { client, urlFor } from '@/lib/sanity'
import { Sanity } from '@/types/sanity'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { collectionThemes } from '@/lib/mockCollections'
import { notFound } from 'next/navigation'

interface CollectionPageProps {
  params: {
    slug: string
  }
}

async function fetchCollectionBySlug(slug: string): Promise<{
  collection: Sanity.CollectionWithRestaurants
} | null> {
  try {
    const result = await client.fetch(`
      *[_type == "collection" && slug.current == $slug][0] {
        _id,
        title,
        description,
        slug,
        coverImage {
          asset->
        },
        "restaurants": restaurants[]->{
          _id,
          name,
          neighbourhood,
          streetAddress,
          city,
          cuisine,
          priceRange,
          summary,
          description,
          website,
          phone,
          tags,
          Image_URL,
          galleryImages[]{
            asset->
          },
          openingHours,
          facebook,
          instagram,
          twitter,
          youtube,
          lgbtqFriendly
        }
      }
    `, { slug })

    if (result) {
      return { collection: result }
    }

    // Check if it's a mock collection
    const { mockCollections } = await import('@/lib/mockCollections')
    const mockCollection = mockCollections.find(c => c.slug.current === slug)
    
    if (mockCollection) {
      // Get some real restaurants to populate the mock collection
      const restaurants = await client.fetch(`
        *[_type == "restaurant"][0...${Math.min(mockCollection.restaurantCount || 6, 12)}] {
          _id,
          name,
          neighbourhood,
          streetAddress,
          city,
          cuisine,
          priceRange,
          summary,
          description,
          website,
          phone,
          tags,
          Image_URL,
          galleryImages[]{
            asset->
          },
          openingHours,
          facebook,
          instagram,
          twitter,
          youtube,
          lgbtqFriendly
        }
      `)

      return {
        collection: {
          ...mockCollection,
          coverImage: undefined,
          restaurants: restaurants || []
        }
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching collection:', error)
    return null
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const data = await fetchCollectionBySlug(params.slug)
  
  if (!data) {
    notFound()
  }

  const { collection } = data
  const slug = collection.slug.current
  const theme = collectionThemes[slug as keyof typeof collectionThemes] || 'from-primary-400 to-secondary-400'

  return (
    <div className="relative min-h-screen bg-gray-50">
      <Header />
      
      <div className="h-24"></div>
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background with theme colors */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme}`}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)]"></div>
        </div>
        
        {/* Background Image if available */}
        {collection.coverImage && (
          <div className="absolute inset-0">
            <Image
              src={urlFor(collection.coverImage).width(1920).height(800).url()}
              alt={collection.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full">
                <span className="font-bold">Collection</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              {collection.title}
            </h1>
            
            {collection.description && (
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
                {collection.description}
              </p>
            )}

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 text-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-xl">🏪</span>
                </div>
                <div>
                  <div className="font-bold text-2xl">{collection.restaurants?.length || 0}</div>
                  <div className="text-sm opacity-80">restaurants</div>
                </div>
              </div>
              
              <div className="w-px h-16 bg-white/30"></div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-xl">⭐</span>
                </div>
                <div>
                  <div className="font-bold text-2xl">Curated</div>
                  <div className="text-sm opacity-80">selection</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          {!collection.restaurants || collection.restaurants.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No Restaurants in This Collection Yet
              </h3>
              <p className="text-gray-600 mb-6">
                This collection is being curated. Check back soon for amazing restaurant recommendations!
              </p>
              <Link href="/collections" className="btn-primary">
                Browse Other Collections
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Featured Restaurants
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Handpicked dining experiences that define this collection
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {collection.restaurants.map((restaurant: any) => (
                  <Link
                    key={restaurant._id}
                    href={`/restaurant/${restaurant._id}`}
                    className="group"
                  >
                    <article className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-hard transition-all duration-300 group-hover:scale-105">
                      {/* Restaurant Image */}
                      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100">
                        {restaurant.Image_URL ? (
                          <Image
                            src={restaurant.Image_URL}
                            alt={restaurant.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-4xl text-primary-300">🍽️</div>
                          </div>
                        )}
                        
                        {/* Overlay with cuisine tag */}
                        <div className="absolute top-3 left-3">
                          {restaurant.cuisine && (
                            <span className="btn-card-outline">
                              {restaurant.cuisine}
                            </span>
                          )}
                        </div>

                        {/* Price range tag */}
                        <div className="absolute top-3 right-3">
                          {restaurant.priceRange && (
                            <span className="btn-card-secondary">
                              {restaurant.priceRange}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Restaurant Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                          {restaurant.name}
                        </h3>
                        
                        {(restaurant.neighbourhood || restaurant.streetAddress) && (
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <span className="text-primary">📍</span>
                            <span>
                              {restaurant.neighbourhood}
                              {restaurant.streetAddress && restaurant.neighbourhood && ', '}
                              {restaurant.streetAddress}
                            </span>
                          </div>
                        )}

                        {restaurant.summary && (
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {restaurant.summary}
                          </p>
                        )}

                        {/* Tags */}
                        {restaurant.tags && restaurant.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {restaurant.tags.slice(0, 3).map((tag: string, index: number) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                            {restaurant.tags.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{restaurant.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {restaurant.website && (
                              <span className="text-primary text-sm">🌐</span>
                            )}
                            {restaurant.phone && (
                              <span className="text-primary text-sm">📞</span>
                            )}
                            {restaurant.lgbtqFriendly && (
                              <span className="text-rainbow text-sm" title="LGBTQ+ Friendly">🏳️‍🌈</span>
                            )}
                          </div>
                          
                          <div className="btn-card-secondary">
                            View Details
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Back to Collections */}
      <section className="relative py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <Link href="/collections" className="btn-secondary">
            ← Browse All Collections
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Generate static paths for all collections
export async function generateStaticParams() {
  const collections = await client.fetch(`
    *[_type == "collection"] {
      "slug": slug.current
    }
  `)

  return collections.map((collection: { slug: string }) => ({
    slug: collection.slug,
  }))
}
