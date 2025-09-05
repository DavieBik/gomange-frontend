'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { Restaurant } from '@/types/sanity'
import { getPlaceholderImage } from '@/lib/utils'
import { useRouter } from 'next/navigation'

type RestaurantCardProps = {
  restaurant: Restaurant
  children?: React.ReactNode
  layout?: 'grid' | 'list' | 'carousel'
  variant?: 'default' | 'featured' | 'traditional'
}

export default function RestaurantCard({
  restaurant,
  layout = 'grid',
  variant = 'default',
}: RestaurantCardProps) {
  const router = useRouter()

  let imgSrc = ''
  if (
    restaurant.mainImage?.asset &&
    (restaurant.mainImage.asset._ref || restaurant.mainImage.asset._id)
  ) {
    const url = urlFor(restaurant.mainImage.asset).width(800).url()
    imgSrc = url || '/placeholder/default.jpg'
  } else if (restaurant.Image_URL) {
    imgSrc = restaurant.Image_URL
  } else if (restaurant.cuisine) {
    imgSrc = getPlaceholderImage(restaurant.cuisine)
  } else {
    imgSrc = '/placeholder/default.jpg'
  }

  // Utilidad para mostrar la ubicación según ciudad/distrito
  const getLocationDisplay = (restaurant: Restaurant) => {
    if (!restaurant.neighbourhood) return ''
    if (restaurant.city && restaurant.city.toLowerCase() === 'kigali') {
      return `${restaurant.neighbourhood}, ${restaurant.city}`
    } else if (restaurant.district) {
      return `${restaurant.neighbourhood}, ${restaurant.district}`
    }
    return restaurant.neighbourhood
  }

  // Normalizar tags
  const normalizedTags = restaurant.tags
    ? restaurant.tags.flatMap((tag: string) => tag.split(';').map((t: string) => t.trim()).filter(Boolean))
    : [];
  const otherTags = normalizedTags;

  return (
    <Link
      href={`/restaurant/${restaurant._id}`}
      className="block bg-white rounded-2xl shadow-soft hover:shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] group border border-gray-100"
      aria-label={`View details for ${restaurant.name}`}
    >
      {/* Imagen principal */}
      <div className="relative aspect-[4/3] w-full bg-gray-100">
        <Image
          src={imgSrc}
          alt={restaurant.name || 'Restaurant image'}
          fill
          className="object-cover rounded-2xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        {!restaurant.mainImage?.asset && !restaurant.Image_URL && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <span className="text-white font-semibold px-3 py-1.5 rounded-md text-sm">
              {restaurant.name}
            </span>
          </div>
        )}
        {/* Precio destacado */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-4 py-2 rounded-xl text-sm font-bold bg-white text-primary-700 shadow-lg border border-primary-200"
            style={{ letterSpacing: '0.5px' }}
          >
            {restaurant.priceRange || 'Precio no disponible'}
          </span>
        </div>
      </div>
      {/* Contenido */}
      <div className="p-4 flex-1 flex flex-col space-y-2">
        {/* Nombre */}
        <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-primary transition-colors duration-300">
          {restaurant.name}
        </h3>
        {/* Ubicación (siempre muestra algo) */}
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <p className="text-xs font-medium text-gray-600">
            {getLocationDisplay(restaurant) || 'Ubicación no disponible'}
          </p>
        </div>
        {/* Precio (siempre muestra algo) */}
        <div className="mt-1">
          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-secondary-100 text-primary-700 shadow">
            {restaurant.priceRange || 'Precio no disponible'}
          </span>
        </div>
        {/* Resumen */}
        {layout !== 'carousel' && restaurant.summary && (
          <p className="text-sm font-medium text-gray-600 line-clamp-2">{restaurant.summary}</p>
        )}
        {/* Tags principales */}
        {layout !== 'carousel' && otherTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {otherTags.slice(0, 5).map((tag: string, index: number) => (
              <span
                key={index}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200 shadow-sm whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
            {otherTags.length > 5 && (
              <span className="text-xs font-medium px-3 py-1 rounded-full text-gray-500 whitespace-nowrap">
                +{otherTags.length - 5}
              </span>
            )}
          </div>
        )}
        {/* Footer compacto */}
        <div className="mt-auto pt-3 flex items-center justify-end">
          {restaurant.website && (
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                window.open(
                  restaurant.website.startsWith('http')
                    ? restaurant.website
                    : `https://${restaurant.website}`,
                  '_blank',
                  'noopener,noreferrer'
                );
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 bg-secondary text-white hover:bg-secondary-600 hover:scale-105 shadow-sm hover:shadow-md"
              aria-label={`Visit ${restaurant.name} website`}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
              Visit
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}