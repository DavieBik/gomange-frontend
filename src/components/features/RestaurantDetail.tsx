'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { Restaurant } from '@/types/sanity'
import { MapPinIcon, PhoneIcon, GlobeAltIcon, DocumentTextIcon, StarIcon, ClockIcon } from '@heroicons/react/24/solid'
import AddReviewModal from './AddReviewModal'

interface RestaurantDetailProps {
  restaurant: Restaurant
}

const placeholderImages = [
  '/placeholder/indian.jpg',
  '/placeholder/african.jpg',
  '/placeholder/afro-fusion.jpg',
  '/placeholder/asian.jpg',
  '/placeholder/bar.jpg',
  '/placeholder/barbecue.jpg',
  '/placeholder/burger.jpg',
  '/placeholder/cafe.jpg',
  '/placeholder/fast-food.jpg',
  '/placeholder/fine-dining.jpg',
  '/placeholder/food-truck.jpg',
  '/placeholder/italian.jpg',
  '/placeholder/mexican.jpg',
  '/placeholder/pizza.jpg',
  '/placeholder/sushi.jpg',
  '/placeholder/vegan.jpg',
  '/placeholder/pizza.jpg',
  '/placeholder/sushi.jpg',
  '/placeholder/vegan.jpg',
  '/placeholder/vegetarian.jpg',
  '/placeholder/food-stall.jpg'
]
const mainPlaceholder = '/placeholder/restaurant-main.jpg'

export default function RestaurantDetail({ restaurant }: RestaurantDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [tab, setTab] = useState<'about' | 'menu' | 'reviews' | 'hours'>('about')
  const [alert, setAlert] = useState<string | null>(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [galleryImages, setGalleryImages] = useState<{ url: string }[]>([])


      function getRandomPlaceholders(arr: string[], count: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

  useEffect(() => {
    const mainImgSanityUrl = restaurant.mainImage?.asset?._ref
      ? urlFor(restaurant.mainImage).width(800).height(600).url()
      : null;

    const hasSanityImages =
      restaurant.mainImage?.asset?._ref ||
      (restaurant.galleryImages?.length &&
        restaurant.galleryImages.some((img: { asset?: any }) => img.asset?._ref));

    // Si NO hay imágenes de Sanity, SIEMPRE muestra los placeholders
    if (!hasSanityImages) {
      setGalleryImages([
        { url: mainPlaceholder },
        ...getRandomPlaceholders(placeholderImages, 3).map((url: string) => ({ url }))
      ]);
      setSelectedImageIndex(0);
      return;
    }

    // Si hay imágenes de Sanity, muestra solo esas
    const gallerySanityImages = restaurant.galleryImages?.length
      ? restaurant.galleryImages
          .map((img: { asset?: any; url?: string }) =>
            img.asset
              ? urlFor(img.asset).width(800).height(600).url()
              : undefined
          )
          .filter((url: string | undefined) => url && url !== mainImgSanityUrl)
      : [];

    const images: { url: string }[] = [
      ...(mainImgSanityUrl ? [{ url: mainImgSanityUrl }] : []),
      ...gallerySanityImages.map((url: string) => ({ url }))
    ];

    setGalleryImages(images);
    setSelectedImageIndex(0);
  }, [restaurant]);

  // Horarios
  const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
  const today = days[todayIdx]
  const formatDayHours = (dayObj: any) => {
    if (!dayObj) return 'No info'
    if (dayObj.closed) return 'Closed'
    if (dayObj.from && dayObj.to) return `${dayObj.from} - ${dayObj.to}`
    return 'No info'
  }

  // WhatsApp link
  const whatsappLink = restaurant.whatsappNumber
    ? `https://wa.me/${restaurant.whatsappNumber.replace(/\D/g, '')}?text=Hi! I want to order or book at ${restaurant.name}`
    : null

  // Google Maps embed
  const mapsEmbedUrl = restaurant.gmbUrl
    ? `${restaurant.gmbUrl.replace('/maps/place/', '/maps/embed?pb=')}`
    : restaurant.latitude && restaurant.longitude
      ? `https://maps.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}&z=15&output=embed`
      : null

  // Handler para botones "Coming soon"
  const handleSoon = (msg: string) => {
    setAlert(msg)
    setTimeout(() => setAlert(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto pt-8 px-2">
        {/* Name and address */}
        <h1 className="text-3xl md:text-4xl font-black mb-2 text-primary-800 text-center md:text-left drop-shadow">
          {restaurant.name}
        </h1>
        {restaurant.streetAddress && (
          <div className="flex items-center gap-2 text-gray-700 mb-4 justify-center md:justify-start">
            <MapPinIcon className="w-5 h-5 text-primary" />
            <span className="font-medium">{restaurant.streetAddress}</span>
          </div>
        )}

        {/* Main layout: info + sidebar */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main info */}
          <div className="flex-1 min-w-0">
            {/* Gallery */}
            <div className="w-full max-w-2xl mx-auto mb-4">
              <div className="flex gap-2 overflow-x-auto">
                {galleryImages.map((img: { url: string }, idx: number) =>
                  idx !== selectedImageIndex ? (
                    <button
                      key={idx}
                      className={`relative aspect-[4/3] w-40 md:w-56 rounded-xl overflow-hidden border-2 ${
                        selectedImageIndex === idx
                          ? 'border-primary shadow-lg scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      } transition-all duration-300`}
                      onClick={() => setSelectedImageIndex(idx)}
                      type="button"
                    >
                      <Image
                        src={img.url}
                        alt={`${restaurant.name} gallery ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </button>
                  ) : null
                )}
              </div>
              {/* Imagen principal grande */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg mt-4 border border-gray-200">
                {galleryImages.length > 0 && galleryImages[selectedImageIndex] ? (
                  <Image
                    src={galleryImages[selectedImageIndex].url}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    No image available
                  </div>
                )}
              </div>
            </div>

            {/* Tabs as chips */}
            <div className="flex gap-6 mt-6 mb-6 justify-center md:justify-start flex-wrap">
              {['about', 'menu', 'reviews', 'hours'].map(tabKey => (
                <div
                  key={tabKey}
                  className={`pb-2 cursor-pointer font-semibold text-base transition-colors duration-150
                    ${tab === tabKey
                      ? 'border-b-2 border-primary-600 text-primary-800'
                      : 'text-gray-500 hover:text-primary-600'
                    }
                  `}
                  onClick={() => setTab(tabKey as typeof tab)}
                  role="tab"
                  aria-selected={tab === tabKey}
                  tabIndex={0}
                >
                  {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
                </div>
              ))}
            </div>

            {/* Tab content */}
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 mb-8">
              {tab === 'about' && (
                <>
                  {/* Google Maps */}
                  {mapsEmbedUrl && (
                    <div className="mb-6 rounded-xl overflow-hidden border border-gray-200 shadow">
                      <iframe
                        src={mapsEmbedUrl}
                        width="100%"
                        height="220"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  )}
                  {/* Info chips */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {restaurant.neighbourhood && (
                      <span className="px-2 py-1 bg-primary/10 text-primary font-semibold rounded-full border border-primary/20 text-xs">
                        {restaurant.neighbourhood}
                      </span>
                    )}
                    {restaurant.district && (
                      <span className="px-2 py-1 bg-primary/10 text-primary font-semibold rounded-full border border-primary/20 text-xs">
                        {restaurant.district}
                      </span>
                    )}
                    {restaurant.cuisine && (
                      <span className="px-2 py-1 bg-primary/10 text-primary font-semibold rounded-full border border-primary/20 text-xs">
                        {restaurant.cuisine}
                      </span>
                    )}
                    {restaurant.priceRange && (
                      <span className="px-2 py-1 bg-white text-primary font-bold rounded-xl border border-primary/30 text-xs shadow">
                        {restaurant.priceRange}
                      </span>
                    )}
                  </div>
                  {/* Summary & Description */}
                  {restaurant.summary && (
                    <p className="text-gray-700 text-base mb-4">{restaurant.summary}</p>
                  )}
                  {restaurant.description && (
                    <div className="text-gray-600 leading-relaxed mb-8">
                      {restaurant.description.split('\n').map((paragraph: string, index: number) => (
                        <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
                      ))}
                    </div>
                  )}
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {restaurant.tags?.map((tag: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200 text-xs font-semibold shadow-sm">
                        {tag}
                      </span>
                    ))}
                    {restaurant.amenities?.map((amenity: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-100 text-xs font-semibold shadow-sm">
                        {amenity}
                      </span>
                    ))}
                    {restaurant.accessibility?.map((item: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-secondary-50 text-secondary-700 border border-secondary-100 text-xs font-semibold shadow-sm">
                        {item}
                      </span>
                    ))}
                    {restaurant.paymentMethods?.map((method: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-accent-50 text-accent-700 border border-accent-100 text-xs font-semibold shadow-sm">
                        {method}
                      </span>
                    ))}
                    {restaurant.offerings?.map((offering: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 border border-primary-200 text-xs font-semibold shadow-sm">
                        {offering}
                      </span>
                    ))}
                    {restaurant.crowd && (
                      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200 text-xs font-semibold shadow-sm">
                        {restaurant.crowd}
                      </span>
                    )}
                    {restaurant.serviceOptions?.map((option: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-100 text-xs font-semibold shadow-sm">
                        {option}
                      </span>
                    ))}
                  </div>
                  {/* Owner Note */}
                  {restaurant.ownerNote && (
                    <div className="bg-primary-50 border-l-4 border-primary-400 p-4 rounded mb-6">
                      <span className="font-semibold text-primary-700">Chef/Owner's Note:</span>
                      <p className="text-primary-900 mt-2">{restaurant.ownerNote}</p>
                    </div>
                  )}
                </>
              )}
              {tab === 'menu' && (
                <div className="flex flex-col items-center justify-center min-h-[180px] w-full">
                  {restaurant.menuLink && (
                    <a
                      href={restaurant.menuLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 rounded-full bg-secondary-600 text-white font-semibold shadow hover:bg-secondary-700 transition mb-4"
                    >
                      View Full Menu
                    </a>
                  )}
                  {Array.isArray(restaurant.menu) && restaurant.menu.length > 0 ? (
                    <div className="w-full">
                      {restaurant.menu.map((section: any, idx: number) => (
                        <div key={section._key || idx} className="mb-6">
                          <h4 className="text-lg font-bold text-primary-700 mb-2">{section.section}</h4>
                          <div className="grid gap-4">
                            {Array.isArray(section.items) && section.items.length > 0 ? (
                              section.items.map((item: any) => (
                                <div key={item._key} className="flex items-center gap-4 bg-gray-50 rounded-lg p-3 border border-gray-100 shadow-sm">
                                  {item.image?.asset?._ref && (
                                    <Image
                                      src={urlFor(item.image).width(80).height(80).url()}
                                      alt={item.name}
                                      width={80}
                                      height={80}
                                      className="rounded-lg object-cover border"
                                    />
                                  )}
                                  <div className="flex-1">
                                    <div className="font-semibold text-primary-800">{item.name}</div>
                                    {item.description && (
                                      <div className="text-gray-600 text-sm">{item.description}</div>
                                    )}
                                  </div>
                                  <div className="font-bold text-secondary-700 text-lg whitespace-nowrap">
                                    {item.price ? `$${item.price}` : ''}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-gray-400 italic">No items yet.</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-base">Menu not available.</p>
                  )}
                </div>
              )}
              {tab === 'reviews' && (
                <div className="flex flex-col items-center justify-center min-h-[220px]">
                  <button
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 text-white font-bold shadow hover:bg-primary-700 transition text-lg mb-4"
                    onClick={() => setShowReviewModal(true)}
                  >
                    + Add Review
                  </button>
                  {restaurant.reviews && restaurant.reviews.length > 0 ? (
                    <div className="w-full max-w-md overflow-x-auto flex gap-4 pb-2 scrollbar-hide">
                      {restaurant.reviews.map((review: any, idx: number) => (
                        <div key={idx} className="min-w-[260px] bg-primary-50 border border-primary-200 rounded-lg p-4 flex-shrink-0">
                          <div className="flex items-center gap-2 mb-1">
                            {[1,2,3,4,5].map(val => (
                              <StarIcon
                                key={val}
                                className={`w-5 h-5 ${val <= review.rating ? 'text-secondary-400' : 'text-gray-300'}`}
                              />
                            ))}
                            <span className="ml-2 font-semibold text-primary-700">{review.author}</span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                          <div className="text-xs text-gray-400 mt-1">{review.date ? new Date(review.date).toLocaleDateString() : ''}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 w-full max-w-md text-center text-gray-600 mx-auto">
                      <p className="mb-2 font-semibold">No reviews yet.</p>
                      <p className="text-sm">Be the first to review this restaurant!</p>
                    </div>
                  )}
                  {showReviewModal && (
                    <AddReviewModal
                      restaurantId={restaurant._id}
                      onClose={() => setShowReviewModal(false)}
                    />
                  )}
                </div>
              )}
              {tab === 'hours' && (
                <section>
                  <h2 className="text-lg font-bold text-secondary mb-2">Opening Hours</h2>
                  {restaurant.openingHours ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {days.map(day => {
                        const dayObj = restaurant.openingHours[day]
                        const isToday = day === today
                        return (
                          <div key={day} className={`rounded-lg border px-4 py-3 ${isToday ? 'bg-green-50 border-green-400' : 'bg-gray-50 border-gray-200'}`}>
                            <span className="font-semibold">{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                            <span className="block mt-1 text-sm">
                              {formatDayHours(dayObj)}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500">No hours information available.</p>
                  )}
                  {restaurant.hoursSummary && (
                    <div className="mt-4 text-gray-500 text-sm">{restaurant.hoursSummary}</div>
                  )}
                </section>
              )}
            </div>
          </div>
          {/* Sidebar */}
          <aside className="w-full md:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 flex flex-col gap-4 sticky top-8">
              <h3 className="text-lg font-bold text-primary-700 mb-2">Contact & Order</h3>
              {/* Phone */}
              <button
                className="btn btn-primary btn-md"
                onClick={() =>
                  restaurant.phone
                    ? window.open(`tel:${restaurant.phone}`)
                    : handleSoon('Coming soon')
                }
              >
                {restaurant.phone ? 'Call' : 'Coming soon'}
              </button>
              {/* WhatsApp */}
              <button
                className="btn btn-secondary btn-md"
                onClick={() =>
                  whatsappLink
                    ? window.open(whatsappLink, '_blank')
                    : handleSoon('Coming soon')
                }
              >
                {whatsappLink ? 'Order/Book by WhatsApp' : 'Coming soon'}
              </button>
              {/* Order Online */}
              <button
                className="btn btn-primary btn-md"
                onClick={() =>
                  restaurant.orderLink
                    ? window.open(restaurant.orderLink, '_blank')
                    : handleSoon('Coming soon')
                }
              >
                {restaurant.orderLink ? 'Order Online' : 'Coming soon'}
              </button>
              {/* Website */}
              <button
                className="btn btn-accent btn-md"
                onClick={() =>
                  restaurant.website
                    ? window.open(
                        restaurant.website.startsWith('http')
                          ? restaurant.website
                          : `https://${restaurant.website}`,
                        '_blank'
                      )
                    : handleSoon('Coming soon')
                }
              >
                {restaurant.website ? 'Visit Website' : 'Coming soon'}
              </button>
            </div>
            {/* Alert/Toast */}
            {alert && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-primary-700 text-white px-6 py-3 rounded-xl shadow-lg z-50 text-center font-semibold transition">
                {alert}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}