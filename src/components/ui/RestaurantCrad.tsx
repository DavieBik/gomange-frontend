'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { urlFor } from '@/lib/sanity'
import type { Sanity } from '../../types/sanity'

type RestaurantCardVariant = 'default' | 'featured' | 'traditional'

interface RestaurantCardProps {
  restaurant: Sanity.Restaurant
  layout?: 'grid' | 'list'
  variant?: RestaurantCardVariant
}

const CUISINE_PLACEHOLDERS: Record<string, string> = {
  italian: '/images/placeholders/italian.jpg',
  mexican: '/images/placeholders/mexican.jpg',
  asian: '/images/placeholders/asian.jpg',
  sushi: '/images/placeholders/asian.jpg',
  chinese: '/images/placeholders/asian.jpg',
  burger: '/images/placeholders/burger.jpg',
  american: '/images/placeholders/burger.jpg',
  vegetarian: '/images/placeholders/vegetarian.jpg',
  vegan: '/images/placeholders/vegetarian.jpg',
  seafood: '/images/placeholders/seafood.jpg',
  fish: '/images/placeholders/seafood.jpg',
  default: '/images/placeholders/default.jpg',
}

const getValidImageUrl = (url: string | null | undefined): string => {
  return url && typeof url === 'string' && url.trim() !== ''
    ? url
    : CUISINE_PLACEHOLDERS.default
}

const getPlaceholderImage = (cuisine?: string): string => {
  if (!cuisine) return CUISINE_PLACEHOLDERS.default

  const cuisineLower = cuisine.toLowerCase()
  const matchedKey = Object.keys(CUISINE_PLACEHOLDERS).find((key) =>
    cuisineLower.includes(key)
  )

  return matchedKey
    ? CUISINE_PLACEHOLDERS[matchedKey]
    : CUISINE_PLACEHOLDERS.default
}

export default function RestaurantCard({
  restaurant,
  layout = 'grid',
  variant = 'default',
}: RestaurantCardProps) {
  const [imgSrc, setImgSrc] = useState<string>(CUISINE_PLACEHOLDERS.default)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeImage = async () => {
      try {
        if (restaurant.photoUploads?.[0]?.asset) {
          const url = await urlFor(restaurant.photoUploads[0].asset)
            .width(800)
            .url()
          setImgSrc(getValidImageUrl(url))
        } else {
          setImgSrc(getPlaceholderImage(restaurant.cuisine))
        }
      } catch (error) {
        console.error('Error loading image:', error)
        setImgSrc(getPlaceholderImage(restaurant.cuisine))
      } finally {
        setIsLoading(false)
      }
    }

    initializeImage()
  }, [restaurant.photoUploads, restaurant.cuisine])

  const handleImageError = () => {
    setImgSrc(getPlaceholderImage(restaurant.cuisine))
  }

  // Estilos por variante
  const variantStyles = {
    default: 'bg-white border border-gray-200',
    featured: 'bg-primary/10 border-2 border-primary shadow-md',
    traditional: 'bg-gray-50 border border-gray-100',
  }

  // Colores de tags por variante
  const tagColors = {
    default: 'bg-green-100 text-green-800',
    featured: 'bg-white text-primary',
    traditional: 'bg-gray-200 text-gray-800',
  }

  return (
    <div
      className={`
        rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300
        ${layout === 'grid' ? '' : 'flex'}
        ${variantStyles[variant]}
        ${isLoading ? 'opacity-90' : 'opacity-100'}
      `}
    >
      <div
        className={`relative ${
          layout === 'grid' ? 'w-full h-48' : 'w-1/3 h-48'
        }`}
      >
        {/* Skeleton loader */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl"></div>
        )}

        {/* Imagen real */}
        <Image
          src={imgSrc}
          alt={restaurant.name || 'Restaurant'}
          fill
          className={`object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          priority={layout === 'grid'}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={handleImageError}
        />

        {/* Overlay con nombre del restaurante */}
        {!restaurant.photoUploads?.[0]?.asset && !isLoading && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <span className="text-white bg-black/60 px-3 py-1 rounded-lg text-sm font-medium">
              {restaurant.name}
            </span>
          </div>
        )}
      </div>

      <div className={`p-4 ${layout === 'grid' ? '' : 'flex-1'}`}>
        <h3 className="font-semibold text-lg">{restaurant.name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {restaurant.neighbourhood}
          {restaurant.streetAddress ? `, ${restaurant.streetAddress}` : ''}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          {restaurant.cuisine} · {restaurant.priceRange}
        </p>

        {/* Tags */}
        {restaurant.tags && restaurant.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {restaurant.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className={`text-xs font-semibold px-2 py-1 rounded-full ${tagColors[variant]}`}
              >
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>
        )}

        {/* Acciones */}
        <div className="mt-4 flex gap-4">
          {restaurant.instagramOrWebsite && (
            <Link
              href={
                restaurant.instagramOrWebsite.startsWith('http')
                  ? restaurant.instagramOrWebsite
                  : `https://${restaurant.instagramOrWebsite}` 
              }
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm hover:underline ${
                variant === 'featured' ? 'text-primary' : 'text-blue-600'
              }`}
            >
              Website
            </Link>
          )}
          {restaurant.googleMapsLink && (
            <Link
              href={restaurant.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm hover:underline ${
                variant === 'featured' ? 'text-primary' : 'text-blue-600'
              }`}
            >
              Maps
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}