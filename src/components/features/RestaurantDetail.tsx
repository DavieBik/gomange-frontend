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
  // Unified color for all icons
  const iconColorClass = "bg-gradient-to-br from-red-400 to-red-600"

  // Initialize with available image immediately to avoid hydration issues
  const getInitialImage = () => {
    if (restaurant.mainImage?.asset) {
      return urlFor(restaurant.mainImage).width(800).height(600).url()
    } else if (restaurant.Image_URL) {
      return restaurant.Image_URL
    }
    return ''
  }

  const [mainImgSrc, setMainImgSrc] = useState<string>(getInitialImage())
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(!getInitialImage())
  const [activeTab, setActiveTab] = useState<'about' | 'menu' | 'reviews' | 'hours'>('about')

  const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
  const today = days[todayIdx]

  // State for open/closed days in hours accordion
  const [openDays, setOpenDays] = useState<Record<string, boolean>>(
    Object.fromEntries(days.map(day => [day, day === today]))
  )

  const toggleDay = (day: string) => {
    setOpenDays(prev => ({ ...prev, [day]: !prev[day] }))
  }

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

  // Price formatting helpers
  const formatPriceRange = (price: string | undefined): string => {
    if (!price) return 'Standard pricing'
    const lowerPrice = price.toLowerCase()
    if (lowerPrice.includes('$') && !lowerPrice.includes('$$')) return 'Affordable meals'
    if (lowerPrice.includes('$$$$') || lowerPrice.includes('expensive') || lowerPrice.includes('upscale')) return 'Upscale dining'
    if (lowerPrice.includes('$$$') || lowerPrice.includes('moderate')) return 'Standard pricing'
    if (lowerPrice.includes('varied') || lowerPrice.includes('range')) return 'Wide price range'
    return 'Standard pricing'
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <div className="container mx-auto pt-8">
        <button
          type="button"
          className="btn btn-secondary btn-xs flex items-center gap-1 mb-4"
          onClick={() => window.history.back()}
        >
          <span className="text-base">←</span>
          Back
        </button>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-2 text-primary-800 text-center md:text-left drop-shadow">
          {restaurant.name}
        </h1>
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-base md:text-lg font-medium text-gray-700 mb-4">
          {restaurant.streetAddress && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.streetAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm border border-gray-100 text-sm hover:shadow-md transition-shadow"
            >
              <MapPinIcon className="w-4 h-4 text-primary" />
              {restaurant.streetAddress}
            </a>
          )}
          {restaurant.phone && (
            <a
              href={`tel:${restaurant.phone}`}
              className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm border border-gray-100 text-sm hover:shadow-md transition-shadow"
            >
              <PhoneIcon className="w-4 h-4 text-primary" />
              {restaurant.phone}
            </a>
          )}
          {restaurant.website && (
            <a
              href={restaurant.website.startsWith('http') ? restaurant.website : `https://${restaurant.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm border border-gray-100 text-sm hover:shadow-md transition-shadow"
            >
              <GlobeAltIcon className="w-4 h-4 text-primary" />
              Website
            </a>
          )}
          {restaurant.instagram && (
            <a
              href={restaurant.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm border border-gray-100 text-sm hover:shadow-md transition-shadow"
            >
              <PhotoIcon className="w-4 h-4 text-primary" />
              Instagram
            </a>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
          {restaurant.neighbourhood && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.neighbourhood)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 bg-primary/10 text-primary font-semibold rounded-full border border-primary/20 text-xs hover:bg-primary/20 transition"
            >
              {restaurant.neighbourhood}
            </a>
          )}
          {restaurant.cuisine && (
            <a
              href="#menu"
              className="px-2 py-1 bg-primary/10 text-primary font-semibold rounded-full border border-primary/20 text-xs hover:bg-primary/20 transition"
            >
              {restaurant.cuisine}
            </a>
          )}
          {restaurant.priceRange && (
            <span
              className="px-2 py-1 bg-primary/10 text-primary font-semibold rounded-full border border-primary/20 text-xs"
            >
              {formatPriceRange(restaurant.priceRange)}
            </span>
          )}
        </div>
      </div>

      {/* Gallery Section */}
      <section className="container mx-auto mb-10">
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-2xl h-56 md:h-80 rounded-2xl overflow-hidden shadow-lg mb-4 bg-gray-100 border border-gray-200">
            {isLoading || !mainImgSrc ? (
              <div className="w-full h-full bg-gray-300 animate-pulse" />
            ) : (
              <Image
                src={
                  restaurant.galleryImages &&
                  restaurant.galleryImages[selectedImageIndex] &&
                  restaurant.galleryImages[selectedImageIndex].asset
                    ? urlFor(restaurant.galleryImages[selectedImageIndex]).width(800).height(450).url()
                    : mainImgSrc
                }
                alt={restaurant.name}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
          {restaurant.galleryImages && restaurant.galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {restaurant.galleryImages?.map((image: any, index: number) => (
                <button
                  key={index}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index
                      ? 'border-primary shadow-lg scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                  } transition-all duration-300`}
                  onClick={() => setSelectedImageIndex(index)}
                  type="button"
                >
                  <Image
                    src={
                      image.asset
                        ? urlFor(image).width(100).height(100).url()
                        : mainImgSrc
                    }
                    alt={`${restaurant.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Tabs & Content */}
        <div className="md:col-span-2">
          {/* Tabs - horizontal bar, underline, responsive */}
          <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
            {[
              { key: 'about', label: 'About', color: 'text-primary-600', underline: 'border-primary-600' },
              { key: 'menu', label: 'Menu', color: 'text-secondary-500', underline: 'border-secondary-500' },
              { key: 'reviews', label: 'Reviews', color: 'text-accent-500', underline: 'border-accent-500' },
              { key: 'hours', label: 'Hours', color: 'text-secondary-500', underline: 'border-secondary-500' }
            ].map(tab => (
              <button
                key={tab.key}
                className={`
                  whitespace-nowrap px-4 py-3 font-semibold text-base focus:outline-none transition-all
                  ${activeTab === tab.key
                    ? `${tab.color} border-b-4 ${tab.underline} bg-white`
                    : 'text-gray-500 hover:text-primary-600 border-b-4 border-transparent bg-transparent'
                  }
                `}
                style={{ minWidth: 100 }}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Tab Content */}
          <div>
            {activeTab === 'about' && (
              <section className="bg-white rounded-2xl p-8 shadow-card border border-gray-100 mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">About This Restaurant</h2>
                {restaurant.description && (
                  <div className="text-gray-600 leading-relaxed mb-8">
                    {restaurant.description.split('\n').map((paragraph: string, index: number) => (
                      <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
                    ))}
                  </div>
                )}
                {restaurant.streetAddress && (
                  <div className="mt-8">
                    <iframe
                      title="Google Maps"
                      src={`https://www.google.com/maps?q=${encodeURIComponent(restaurant.streetAddress)}&output=embed`}
                      width="100%"
                      height="300"
                      style={{ border: 0, borderRadius: '12px' }}
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                )}
              </section>
            )}
            {activeTab === 'menu' && (
              <section className="bg-white rounded-2xl p-8 shadow-card border border-gray-100 mb-8 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-secondary mb-4">Menu</h2>
                <div className="text-gray-600 text-base text-center">
                  <PhotoIcon className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <p>The menu will be available soon. You can upload a photo or add items from the admin panel.</p>
                </div>
              </section>
            )}
            {activeTab === 'reviews' && (
              <section className="bg-white rounded-2xl p-8 shadow-card border border-gray-100 mb-8 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-accent mb-4">Reviews</h2>
                <div className="text-gray-600 text-base text-center">
                  <HeartIcon className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p>Reviews will be available soon.</p>
                </div>
              </section>
            )}
            {activeTab === 'hours' && (
              <section className="bg-white rounded-2xl p-8 shadow-card border border-gray-100 mb-8 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-secondary mb-6">Hours</h2>
                <div className="w-full max-w-md mx-auto flex flex-col gap-3">
                  {days.map(day => {
                    const isCurrentDay = day === today
                    const rawHours = restaurant.openingHours?.[day] || 'Closed'
                    const hoursList = rawHours === 'Closed'
                      ? []
                      : rawHours.split(';').map((h: string) => h.trim()).filter(Boolean)

                    return (
                      <div key={day} className="rounded-lg border bg-gray-50 border-gray-200">
                        <button
                          className={`w-full flex items-center justify-between px-5 py-4 rounded-lg font-semibold text-base transition-all
                            ${isCurrentDay
                              ? 'bg-green-100 text-green-800 border-green-400'
                              : 'text-gray-700'
                            }`}
                          onClick={() => toggleDay(day)}
                          aria-expanded={openDays[day]}
                        >
                          <span>
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                          </span>
                          <span>
                            {rawHours === 'Closed'
                              ? <span className="text-red-500 font-bold">Closed</span>
                              : <span className="font-bold">{isCurrentDay ? 'Today' : ''}</span>
                            }
                            <svg className={`w-5 h-5 ml-2 transition-transform ${openDays[day] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </span>
                        </button>
                        {openDays[day] && (
                          <div className="px-5 pb-4">
                            {rawHours === 'Closed' ? (
                              <span className="text-red-500">This day is closed.</span>
                            ) : (
                              <ul className="flex flex-col gap-2 mt-2 bg-green-100 rounded-lg p-2">
                                {hoursList.map((h: string, idx: number) => (
                                  <li
                                    key={idx}
                                    className="px-3 py-2 rounded shadow-sm font-semibold bg-green-200 text-green-900"
                                  >
                                    {h}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
        {/* Sidebar */}
        <div className="space-y-8">
          {/* Book & Order buttons */}
          <section className="card flex flex-col items-center py-8 px-6">
            <h3 className="text-xl font-bold text-primary-600 mb-6">Book & Order</h3>
            <div className="flex flex-col gap-4 items-center">
              {restaurant.phone && (
                <a
                  href={`https://wa.me/${restaurant.phone.replace(/\D/g, '')}?text=Hi! I want to order from ${restaurant.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-md mx-auto text-base min-w-[180px] max-w-[220px]"
                >
                  Order via WhatsApp
                </a>
              )}
              {(restaurant.phone || restaurant.website) && (
                <a
                  href={restaurant.phone ? `https://wa.me/${restaurant.phone.replace(/\D/g, '')}?text=Hi! I want to book a table at ${restaurant.name}` : restaurant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-md mx-auto text-base min-w-[180px] max-w-[220px]"
                >
                  Book Table
                </a>
              )}
              <button
                className="btn btn-disabled btn-md mx-auto text-base min-w-[180px] max-w-[220px]"
                disabled
              >
                Order (coming soon)
              </button>
            </div>
          </section>
          {/* Features & Specialties */}
          <section className="card py-10 px-8">
            <h2 className="text-xl font-bold text-primary-600 mb-6">Features & Specialties</h2>
            <div className="flex flex-col gap-4">
              {/* Amenities */}
              {restaurant.amenities?.length ? restaurant.amenities.map((amenity: string, idx: number) => (
                <span
                  key={idx}
                  className="flex items-center gap-3 px-5 py-3 bg-primary-50 text-primary-700 font-semibold rounded-full border border-primary-100 whitespace-nowrap shadow-sm"
                >
                  {amenity === 'Wi-Fi' && <PhotoIcon className="w-5 h-5 text-primary-600" />}
                  {amenity === 'Parking' && <MapPinIcon className="w-5 h-5 text-primary-600" />}
                  {amenity === 'AC' && <HeartIcon className="w-5 h-5 text-primary-600" />}
                  {/* ...other icons... */}
                  {amenity}
                </span>
              )) : <span className="text-gray-400">No amenities listed.</span>}

              {/* Accessibility */}
              {restaurant.accessibility?.length ? restaurant.accessibility.map((item: string, idx: number) => (
                <span
                  key={idx}
                  className="flex items-center gap-3 px-5 py-3 bg-secondary-50 text-secondary-700 font-semibold rounded-full border border-secondary-100 whitespace-nowrap shadow-sm"
                >
                  {item === 'Wheelchair' && <HeartIcon className="w-5 h-5 text-secondary-600" />}
                  {/* ...other icons... */}
                  {item}
                </span>
              )) : <span className="text-gray-400">No accessibility features.</span>}

              {/* Offerings */}
              {restaurant.offerings?.length ? restaurant.offerings.map((offering: string, idx: number) => (
                <span
                  key={idx}
                  className="flex items-center gap-3 px-5 py-3 bg-accent-50 text-accent-700 font-semibold rounded-full border border-accent-100 whitespace-nowrap shadow-sm"
                >
                  <TagIcon className="w-5 h-5 text-accent-600" />
                  {offering}
                </span>
              )) : null}
            </div>
          </section>
          {/* LGBTQ Friendly Badge */}
          {restaurant.lgbtqFriendly && (
            <div className="card-featured text-center p-6 mt-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <HeartIcon className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-lg mb-1">LGBTQ+ Friendly</h4>
              <p className="text-pink-100 text-sm">
                This restaurant welcomes everyone
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}