'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { Restaurant } from '@/types/sanity'
import { MapPinIcon, PhoneIcon, GlobeAltIcon, DocumentTextIcon, StarIcon, ClockIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
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
  const [selectedMenuSection, setSelectedMenuSection] = useState<string | number>(
    restaurant.menu && restaurant.menu[0]?._key ? restaurant.menu[0]._key : 0
  )

  // Estado para desplegables
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})
  // Estado para desplegables de menú
  const [openMenuSections, setOpenMenuSections] = useState<Record<string | number, boolean>>({})

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

  const toggleGroup = (group: string) => {
    setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }))
  }
  const toggleMenuSection = (key: string | number) => {
    setOpenMenuSections(prev => ({ ...prev, [key]: !prev[key] }))
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
        {/* Instagram pequeño en About */}
        {tab === 'about' && restaurant.instagram && (
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
            <svg width="18" height="18" fill="currentColor" className="text-pink-500">
              <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
              <circle cx="9" cy="9" r="3" fill="currentColor"/>
              <rect x="13" y="4" width="2" height="2" rx="1" fill="currentColor"/>
            </svg>
            <a
              href={restaurant.instagram.startsWith('http') ? restaurant.instagram : `https://instagram.com/${restaurant.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 text-sm font-medium hover:underline"
            >
              {restaurant.instagram.replace('https://instagram.com/', '').replace('@', '')}
            </a>
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
                  {/* Info chips agrupados como desplegables */}
                  <div className="mb-4">
                    {/* Grupo helper */}
                    {[
                      {
                        key: 'tags',
                        label: 'Tags',
                        color: 'primary',
                        items: restaurant.tags,
                        chipClass: 'bg-gray-100 text-gray-700 border-gray-200'
                      },
                      {
                        key: 'amenities',
                        label: 'Amenities',
                        color: 'primary',
                        items: restaurant.amenities,
                        chipClass: 'bg-primary-50 text-primary-700 border-primary-100'
                      },
                      {
                        key: 'accessibility',
                        label: 'Accessibility',
                        color: 'secondary',
                        items: restaurant.accessibility,
                        chipClass: 'bg-secondary-50 text-secondary-700 border-secondary-100'
                      },
                      {
                        key: 'paymentMethods',
                        label: 'Payment Methods',
                        color: 'accent',
                        items: restaurant.paymentMethods,
                        chipClass: 'bg-accent-50 text-accent-700 border-accent-100'
                      },
                      {
                        key: 'serviceOptions',
                        label: 'Service Options',
                        color: 'primary',
                        items: restaurant.serviceOptions,
                        chipClass: 'bg-primary-50 text-primary-700 border-primary-100'
                      }
                    ].map(group => (
                      group.items?.length > 0 && (
                        <div key={group.key} className="mb-2 rounded-lg border border-gray-100 bg-gray-50 shadow-sm">
                          <button
                            type="button"
                            className={`w-full flex justify-between items-center px-4 py-2 font-bold text-${group.color}-700 text-sm focus:outline-none`}
                            onClick={() => toggleGroup(group.key)}
                          >
                            <span>{group.label}</span>
                            <ChevronDownIcon
                              className={`w-5 h-5 ml-2 transition-transform duration-300 ${openGroups[group.key] ? 'rotate-180' : ''}`}
                            />
                          </button>
                          <div
                            className={`overflow-hidden transition-all duration-300 ${openGroups[group.key] ? 'max-h-40 py-2 px-4' : 'max-h-0 px-4 py-0'}`}
                          >
                            <div className="flex flex-wrap gap-2">
                              {group.items.map((item: string, idx: number) => (
                                <span
                                  key={idx}
                                  className={`px-3 py-1 rounded-full border text-xs font-semibold shadow-sm ${group.chipClass}`}
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )
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
                
                  {Array.isArray(restaurant.menu) && restaurant.menu.length > 0 ? (
                    <>
                      {/* Chips de secciones alineadas a la izquierda y botón a la derecha */}
                      <div className="flex items-center justify-between mb-6 w-full">
                        {/* Chips de secciones */}
                        <div className="flex gap-2 flex-wrap">
                          {restaurant.menu.map((section: any, idx: number) => (
                           <span
  key={section._key || idx}
  className={`px-4 py-1 font-medium text-base cursor-pointer transition
    ${selectedMenuSection === (section._key || idx)
      ? 'text-primary-800 border-b-2 border-primary-600'
      : 'text-primary-700 hover:bg-primary-200'
    }`}
  onClick={() => setSelectedMenuSection(section._key || idx)}
>
  {section.section}
</span>
                          ))}
                        </div>
                        {/* Botón pequeño y simple */}
                        {restaurant.menuLink && (
                          <a
                            href={restaurant.menuLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 rounded-full bg-secondary-100 text-secondary-700 font-medium text-sm hover:bg-secondary-200 transition"
                          >
                            View Full Menu
                          </a>
                        )}
                      </div>
                      {/* Ítems de la sección activa */}
                      <div className="w-full">
                        {(() => {
                          const activeIdx = restaurant.menu.findIndex(
                            (section: any, idx: number) =>
                              (section._key || idx) === selectedMenuSection
                          )
                          const activeSection = restaurant.menu[activeIdx] || restaurant.menu[0]
                          return (
                            <div>
                              {Array.isArray(activeSection.items) && activeSection.items.length > 0 ? (
                                <div className="grid gap-4">
                                  {activeSection.items.map((item: any) => (
                                    <div key={item._key} className="flex items-center gap-4 p-3">
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
                                  ))}
                                </div>
                              ) : (
                                <div className="text-gray-400 italic">No items yet.</div>
                              )}
                            </div>
                          )
                        })()}
                      </div>
                    </>
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
              <div className="flex flex-col gap-3 mt-6">
                {/* Call */}
                {restaurant.phone ? (
                  <a
                    href={`tel:${restaurant.phone}`}
                    className="px-4 py-2 rounded bg-primary-600 text-white font-medium text-center hover:bg-primary-700 transition"
                  >
                    Call
                  </a>
                ) : (
                  <span className="px-4 py-2 rounded bg-gray-100 text-gray-400 text-center">Coming soon</span>
                )}

                {/* WhatsApp */}
                {restaurant.whatsappNumber ? (
                  <a
                    href={`https://wa.me/${restaurant.whatsappNumber.replace(/\D/g, '')}?text=Hi! I want to order or book at ${restaurant.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded bg-accent-600 text-white font-medium text-center hover:bg-accent-700 transition"
                  >
                    WhatsApp
                  </a>
                ) : (
                  <span className="px-4 py-2 rounded bg-gray-100 text-gray-400 text-center">Coming soon</span>
                )}

                {/* Order Online */}
                {restaurant.orderLink ? (
                  <a
                    href={restaurant.orderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded bg-secondary-600 text-white font-medium text-center hover:bg-secondary-700 transition"
                  >
                    Order Online
                  </a>
                ) : (
                  <span className="px-4 py-2 rounded bg-gray-100 text-gray-400 text-center">Coming soon</span>
                )}

                {/* Website */}
                {restaurant.website ? (
                  <a
                    href={restaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded bg-primary-100 text-primary-700 font-medium text-center hover:bg-primary-200 transition"
                  >
                    Visit Website
                  </a>
                ) : (
                  <span className="px-4 py-2 rounded bg-gray-100 text-gray-400 text-center">Coming soon</span>
                )}

               
              </div>
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