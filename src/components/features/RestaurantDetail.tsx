'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/sanity'
import { getPlaceholderImage } from '@/lib/utils'
import type { Restaurant } from '@/types/sanity'
import { 
  MapPinIcon, 
  BuildingStorefrontIcon, 
  CurrencyDollarIcon,
  PhoneIcon,
  GlobeAltIcon,
  TagIcon,
  PhotoIcon,
  HeartIcon
} from '@heroicons/react/24/solid'

interface RestaurantDetailProps {
  restaurant: Restaurant
}

export default function RestaurantDetail({ restaurant }: RestaurantDetailProps) {
  // Unified color for all icons - change here to try different colors
  const iconColorClass = "bg-gradient-to-br from-red-400 to-red-600" // Unified red
  // Other options to try:
  // const iconColorClass = "bg-gradient-to-br from-blue-500 to-blue-700" // Blue
  // const iconColorClass = "bg-gradient-to-br from-green-500 to-green-700" // Green
  // const iconColorClass = "bg-gradient-to-br from-purple-500 to-purple-700" // Purple
  // const iconColorClass = "bg-gradient-to-br from-orange-500 to-orange-700" // Orange

  // Initialize with available image immediately to avoid hydration issues
  const getInitialImage = () => {
    if (restaurant.mainImage?.asset) {
      return urlFor(restaurant.mainImage).width(800).height(600).url()
    } else if (restaurant.Image_URL) {
      return restaurant.Image_URL
    }
    return '' // Placeholder will be loaded later
  }

  const [mainImgSrc, setMainImgSrc] = useState<string>(getInitialImage())
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(!getInitialImage()) // Only loading if no initial image

  useEffect(() => {
    const loadMainImage = async () => {
      try {
        let imgSrc = ''
        
        if (restaurant.mainImage?.asset) {
          imgSrc = urlFor(restaurant.mainImage).width(800).height(600).url()
        } else if (restaurant.Image_URL) {
          imgSrc = restaurant.Image_URL
        } else {
          imgSrc = await getPlaceholderImage(restaurant.cuisine || 'default')
        }
        
        setMainImgSrc(imgSrc)
      } catch (error) {
        const fallback = await getPlaceholderImage('default')
        setMainImgSrc(fallback)
      } finally {
        setIsLoading(false)
      }
    }

    // Only load if we don't have initial image
    if (!getInitialImage()) {
      loadMainImage()
    }
  }, [restaurant])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  }

  const formatPriceRange = (price: string | undefined): string => {
    if (!price) return 'Standard pricing'
    
    const lowerPrice = price.toLowerCase()
    if (lowerPrice.includes('$') && !lowerPrice.includes('$$')) return 'Affordable meals'
    if (lowerPrice.includes('$$$$') || lowerPrice.includes('expensive') || lowerPrice.includes('upscale')) return 'Upscale dining'
    if (lowerPrice.includes('$$$') || lowerPrice.includes('moderate')) return 'Standard pricing'
    if (lowerPrice.includes('varied') || lowerPrice.includes('range')) return 'Wide price range'
    
    return 'Standard pricing'
  }

  const getPriceIconStyle = (price: string | undefined): string => {
    const formatted = formatPriceRange(price)
    switch (formatted) {
      case 'Affordable meals': return 'bg-gradient-to-br from-green-400 to-green-600'
      case 'Upscale dining': return 'bg-gradient-to-br from-purple-400 to-purple-600'
      case 'Wide price range': return 'bg-gradient-to-br from-blue-400 to-blue-600'
      default: return 'bg-gradient-to-br from-gray-400 to-gray-600'
    }
  }

  return (
    <motion.div
      className="min-h-screen "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Restaurant Hero Section */}
      <motion.section
        className="relative h-auto md:h-[500px] bg-white overflow-hidden mt-4"
        variants={itemVariants}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row min-h-[400px] md:min-h-[500px]">
            {/* Image - Left on desktop */}
            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
              {isLoading || !mainImgSrc ? (
                <div className="w-full h-full bg-gray-300 animate-pulse" />
              ) : (
                <Image
                  src={mainImgSrc}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent md:hidden" />
            </div>
            
            {/* Information - Right on desktop */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 bg-white">
              <motion.div
                className="text-center md:text-left max-w-lg w-full"
                variants={itemVariants}
              >
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 leading-tight">
                  {restaurant.name}
                </h1>
                
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-base md:text-lg font-medium text-gray-700 mb-8">
                  <span className="flex items-center gap-3 bg-white px-4 py-3 rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className={`w-5 h-5 ${iconColorClass} rounded-full flex items-center justify-center`}>
                      <MapPinIcon className="w-3 h-3 text-white" />
                    </div>
                    {restaurant.neighbourhood || restaurant.city}
                  </span>
                  
                  <span className="flex items-center gap-3 bg-white px-4 py-3 rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className={`w-5 h-5 ${iconColorClass} rounded-full flex items-center justify-center`}>
                      <BuildingStorefrontIcon className="w-3 h-3 text-white" />
                    </div>
                    {restaurant.cuisine}
                  </span>
                  
                  <span className="flex items-center gap-3 bg-white px-4 py-3 rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className={`w-5 h-5 ${iconColorClass} rounded-full flex items-center justify-center`}>
                      <CurrencyDollarIcon className="w-3 h-3 text-white" />
                    </div>
                    {formatPriceRange(restaurant.priceRange)}
                  </span>
                </div>

                {/* Quick summary if exists */}
                {restaurant.summary && (
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {restaurant.summary}
                  </p>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start mt-8">
                  {restaurant.website && (
                    <a
                      href={restaurant.website.startsWith('http') ? restaurant.website : `https://${restaurant.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary !bg-white !text-primary-600 !border-primary-600"
                    >
                      Visit Website
                    </a>
                  )}
                  
                  {restaurant.phone && (
                    <a
                      href={`tel:${restaurant.phone}`}
                      className="btn-primary"
                    >
                      Call Now
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="w-full px-4 py-12 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Information */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            variants={itemVariants}
          >
            {/* Description */}
            <div className="bg-white rounded-xl p-8 shadow-card">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Restaurant
              </h2>
              
              {restaurant.summary && (
                <p className="text-lg font-medium text-gray-700 mb-4">
                  {restaurant.summary}
                </p>
              )}
              
              {restaurant.description && (
                <div className="text-gray-600 leading-relaxed">
                  {restaurant.description.split('\n').map((paragraph: string, index: number) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            {restaurant.tags && restaurant.tags.length > 0 && (
              <div className="bg-white rounded-xl p-8 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-8 h-8 ${iconColorClass} rounded-xl flex items-center justify-center`}>
                    <TagIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Features & Specialties
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {restaurant.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary/10 text-primary font-semibold rounded-lg border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {restaurant.galleryImages && restaurant.galleryImages.length > 0 && (
              <div className="bg-white rounded-xl p-8 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-8 h-8 ${iconColorClass} rounded-xl flex items-center justify-center`}>
                    <PhotoIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Gallery
                  </h3>
                </div>
                
                {/* Main selected image */}
                <div className="mb-6">
                  <motion.div
                    className="relative aspect-video rounded-lg overflow-hidden bg-gray-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={selectedImageIndex}
                  >
                    <Image
                      src={urlFor(restaurant.galleryImages[selectedImageIndex]).width(800).height(450).url()}
                      alt={`${restaurant.name} gallery ${selectedImageIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                {/* Horizontal thumbnails */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {restaurant.galleryImages.map((image: any, index: number) => (
                    <motion.div
                      key={index}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                        selectedImageIndex === index 
                          ? 'border-primary shadow-lg scale-105' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: selectedImageIndex === index ? 1.05 : 1.1 }}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image
                        src={urlFor(image).width(100).height(100).url()}
                        alt={`${restaurant.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            {/* Contact Information */}
            <div className="bg-white rounded-xl p-6 shadow-card sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 ${iconColorClass} rounded-xl flex items-center justify-center`}>
                  <PhoneIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Contact Information
                </h3>
              </div>
              
              <div className="space-y-6">
                {(restaurant.streetAddress || restaurant.phone || restaurant.website) && (
                  <div className="grid grid-cols-1 gap-4">
                    {restaurant.streetAddress && (
                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className={`w-6 h-6 ${iconColorClass} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                          <MapPinIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 mb-1">Address</p>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {restaurant.streetAddress}
                            {restaurant.neighbourhood && `, ${restaurant.neighbourhood}`}
                            {restaurant.city && `, ${restaurant.city}`}
                          </p>
                        </div>
                      </div>
                    )}

                    {restaurant.phone && (
                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className={`w-6 h-6 ${iconColorClass} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                          <PhoneIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 mb-1">Phone</p>
                          <a 
                            href={`tel:${restaurant.phone}`}
                            className="text-primary font-medium hover:underline text-sm"
                          >
                            {restaurant.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {restaurant.website && (
                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className={`w-6 h-6 ${iconColorClass} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                          <GlobeAltIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 mb-1">Website</p>
                          <a 
                            href={restaurant.website.startsWith('http') ? restaurant.website : `https://${restaurant.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary font-medium hover:underline break-words text-sm"
                          >
                            Visit Website
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Social Media */}
                {(restaurant.facebook || restaurant.instagram || restaurant.twitter) && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="font-semibold text-gray-900 mb-3">Follow Us</p>
                    <div className="flex gap-3">
                      {restaurant.facebook && (
                        <a
                          href={restaurant.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                          title="Facebook"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                      {restaurant.instagram && (
                        <a
                          href={restaurant.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-center w-10 h-10 ${iconColorClass} text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300`}
                          title="Instagram"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 0C7.284 0 6.944.012 5.877.06 2.246.227.227 2.242.06 5.877.012 6.944 0 7.284 0 10s.012 3.056.06 4.123c.167 3.632 2.182 5.65 5.817 5.817C6.944 19.988 7.284 20 10 20s3.056-.012 4.123-.06c3.629-.167 5.652-2.182 5.817-5.817C19.988 13.056 20 12.716 20 10s-.012-3.056-.06-4.123C19.833 2.245 17.815.227 14.183.06 13.056.012 12.716 0 10 0zm0 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.975 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.009 2.988-.057 4.042-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.718-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zM10 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                      {restaurant.twitter && (
                        <a
                          href={restaurant.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-center w-10 h-10 ${iconColorClass} text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300`}
                          title="Twitter"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Back button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link
                  href="/"
                  className="btn-primary w-full"
                >
                  ← Back to Restaurants
                </Link>
              </div>
            </div>

            {/* Badge LGBTQ Friendly */}
            {restaurant.lgbtqFriendly && (
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl p-6 text-center shadow-card hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <HeartIcon className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-bold text-lg mb-1">LGBTQ+ Friendly</h4>
                <p className="text-pink-100 text-sm">
                  This restaurant welcomes everyone
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      </div>
    </motion.div>
  )
}
