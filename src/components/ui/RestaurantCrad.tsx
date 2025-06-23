'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
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
  const [imgSrc, setImgSrc] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  // Cargar imagen principal o placeholder
  useEffect(() => {
    const initializeImage = async () => {
      try {
        let newImgSrc = ''

        if (restaurant.mainImage?.asset) {
          newImgSrc = await urlFor(restaurant.mainImage.asset).width(800).url()
        } else if (restaurant.Image_URL) {
          newImgSrc = restaurant.Image_URL
        } else if (restaurant.cuisine) {
          newImgSrc = getPlaceholderImage(restaurant.cuisine)
        } else {
          newImgSrc = '/placeholder/default.jpg'
        }

        setImgSrc(newImgSrc)
      } catch (error) {
        console.error('Error loading image:', error)
        setImgSrc(getPlaceholderImage(restaurant.cuisine))
      } finally {
        setIsLoading(false)
      }
    }

    initializeImage()
  }, [restaurant._id])

  const handleImageError = () => {
    setImgSrc(getPlaceholderImage(restaurant.cuisine))
  }

  // Estilos dinámicos por variante
  const variantStyles = {
    default:
      'bg-white rounded-xl shadow-card hover:shadow-card-hover overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1',
    featured:
      'bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-xl rounded-xl overflow-hidden flex flex-col h-full relative group',
    traditional:
      'bg-secondary-600 text-white shadow-md hover:shadow-lg rounded-xl overflow-hidden flex flex-col h-full',
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
    <div className={variantStyles[variant]}>
      {/* Imagen */}
      <div
        className={`relative ${layout === 'grid' ? 'aspect-[4/3]' : 'aspect-[16/9] md:aspect-[4/3]'}`}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {imgSrc && (
          <Image
            src={imgSrc}
            alt={restaurant.name || 'Restaurant image'}
            fill
            className={`object-cover transition-opacity duration-300 ${
              !isLoading ? 'opacity-100' : 'opacity-0'
            }`}
            onError={handleImageError}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {variant === 'featured' && (
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
        )}

        {!restaurant.mainImage?.asset && !restaurant.Image_URL && !isLoading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <span className="text-white font-semibold px-3 py-1.5 rounded-md text-sm">
              {restaurant.name}
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Título y ubicación */}
        <h3
          className={`font-bold text-lg ${
            variant === 'featured' ? 'text-white' : 'text-gray-900'
          } mb-1`}
        >
          {restaurant.name}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <p
            className={`text-sm ${
              variant === 'featured' ? 'text-primary-100' : 'text-gray-600'
            }`}
          >
            {restaurant.neighbourhood}
          </p>
          {restaurant.priceRange && (
            <span
              className={`text-xs px-1.5 py-0.5 rounded ${
                variant === 'featured'
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {restaurant.priceRange}
            </span>
          )}
        </div>

        {restaurant.cuisine && (
          <p
            className={`text-sm mb-4 ${
              variant === 'featured' ? 'text-primary-100' : 'text-gray-500'
            }`}
          >
            {restaurant.cuisine}
          </p>
        )}

        {/* Tags */}
        {restaurant.tags && restaurant.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {restaurant.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${tagColors[variant]}`}
              >
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="mt-auto flex flex-wrap gap-2">
          {restaurant.lgbtqFriendly && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-secondary-100 text-secondary-800 text-xs font-medium">
              🌈 LGBTQ+ Friendly
            </span>
          )}

          {restaurant.website && (
            <Link
              href={
                restaurant.website.startsWith('http')
                  ? restaurant.website
                  : `https://${restaurant.website}` 
              }
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                variant === 'featured'
                  ? 'bg-white/20 text-white hover:bg-white/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Visit Website
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}