'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { Restaurant } from '@/types/sanity'
import { getPlaceholderImage } from '@/lib/utils'

type RestaurantCardVariant = 'default' | 'featured' | 'traditional'

interface RestaurantCardProps {
  restaurant: Restaurant
  layout?: 'grid' | 'list'
  variant?: RestaurantCardVariant
}

export default function RestaurantCard({
  restaurant,
  layout = 'grid',
  variant = 'default',
}: RestaurantCardProps) {
  // Determinar la imagen a mostrar en el primer render (sin useEffect)
  let imgSrc = ''
  if (restaurant.mainImage?.asset) {
    imgSrc = urlFor(restaurant.mainImage.asset).width(800).url()
  } else if (restaurant.Image_URL) {
    imgSrc = restaurant.Image_URL
  } else if (restaurant.cuisine) {
    imgSrc = getPlaceholderImage(restaurant.cuisine)
  } else {
    imgSrc = '/placeholder/default.jpg'
  }

  // Estilos dinámicos por variante
  const variantStyles = {
    default:
      'bg-white rounded-2xl shadow-soft hover:shadow-hard overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-2 hover:scale-105 group border border-gray-100',
    featured:
      'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-xl rounded-2xl overflow-hidden flex flex-col h-full relative group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2',
    traditional:
      'bg-gradient-to-br from-secondary-500 to-secondary-600 text-white shadow-lg hover:shadow-xl rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1',
  }

  const textClass = {
    default: 'text-gray-600',
    featured: 'text-white',
    traditional: 'text-white',
  }[variant]

  const tagColors = {
    default: 'bg-primary-100 text-primary-800',
    featured: 'bg-white text-primary-700',
    traditional: 'bg-secondary-500 text-white',
  }

  return (
    <Link
      href={`/restaurant/${restaurant._id}`}
      className={`block ${variantStyles[variant]} ${layout === 'list' ? 'md:flex-row md:h-auto' : ''}`}
    >
      {/* Imagen */}
      <div
        className={`relative ${
          layout === 'grid' 
            ? 'aspect-[4/3]' 
            : layout === 'list'
            ? 'aspect-[4/3] md:aspect-[3/2] md:w-80 md:flex-shrink-0'
            : 'aspect-[16/9] md:aspect-[4/3]'
        }`}
      >
        <Image
          src={imgSrc}
          alt={restaurant.name || 'Restaurant image'}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => { (e.target as HTMLImageElement).src = getPlaceholderImage(restaurant.cuisine) }}
        />
        {variant === 'featured' && (
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
        )}
        {!restaurant.mainImage?.asset && !restaurant.Image_URL && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <span className="text-white font-semibold px-3 py-1.5 rounded-md text-sm">
              {restaurant.name}
            </span>
          </div>
        )}
        {/* Badge de precio flotante */}
        {restaurant.priceRange && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 text-primary-700 backdrop-blur-sm shadow-lg">
              {restaurant.priceRange}
            </span>
          </div>
        )}
      </div>
      {/* Contenido */}
      <div className={`p-4 flex-1 flex flex-col space-y-2 ${layout === 'list' ? 'md:p-6' : ''}`}>
        {/* Título y ubicación */}
        <div className={`space-y-1 ${layout === 'list' ? 'md:space-y-2' : ''}`}>
          <h3
            className={`font-bold ${layout === 'list' ? 'text-lg md:text-xl' : 'text-lg'} ${
              variant === 'featured' ? 'text-white' : 'text-gray-900'
            } leading-tight group-hover:text-primary transition-colors duration-300`}
          >
            {restaurant.name}
          </h3>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <svg className={`w-3 h-3 ${variant === 'featured' ? 'text-primary-200' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <p
                className={`text-xs font-medium ${layout === 'list' ? 'md:text-sm' : ''} ${
                  variant === 'featured' ? 'text-primary-100' : 'text-gray-600'
                }`}
              >
                {restaurant.neighbourhood}
              </p>
            </div>
          </div>
        </div>

        {restaurant.cuisine && (
          <div className="flex items-center gap-1">
            <svg className={`w-3 h-3 ${variant === 'featured' ? 'text-primary-200' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <p
              className={`text-xs font-medium capitalize ${
                variant === 'featured' ? 'text-primary-100' : 'text-gray-500'
              }`}
            >
              {restaurant.cuisine}
            </p>
          </div>
        )}

        {/* Tags compactos */}
        {restaurant.tags && restaurant.tags.length > 0 && (
          <div className={`flex flex-wrap gap-1 ${layout === 'list' ? 'md:gap-2' : ''}`}>
            {restaurant.tags.slice(0, layout === 'list' ? 3 : 2).map((tag: string, index: number) => (
              <span
                key={index}
                className={`text-xs font-semibold px-2 py-1 rounded-full transition-all duration-300 ${layout === 'list' ? 'md:text-sm md:px-3 md:py-1.5' : ''} ${
                  variant === 'featured'
                    ? 'bg-white/20 text-white hover:bg-white/30'
                    : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                }`}
              >
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
            {restaurant.tags.length > (layout === 'list' ? 3 : 2) && (
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${layout === 'list' ? 'md:text-sm md:px-3 md:py-1.5' : ''} ${
                variant === 'featured' ? 'text-primary-200' : 'text-gray-500'
              }`}>
                +{restaurant.tags.length - (layout === 'list' ? 3 : 2)}
              </span>
            )}
          </div>
        )}

        {/* Footer compacto */}
        <div className="mt-auto pt-3 flex items-center justify-between">
          {restaurant.lgbtqFriendly && (
            <span className="inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold">
              🌈
            </span>
          )}

          {/* Botón para visitar el sitio web, evitando <a> dentro de <Link> */}
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
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                variant === 'featured'
                  ? 'bg-white/20 text-white hover:bg-white/30 hover:scale-105'
                  : 'bg-secondary text-white hover:bg-secondary-600 hover:scale-105 shadow-sm hover:shadow-md'
              }`}
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