// components/features/CollectionsCarousel.tsx
'use client'

import Carousel from '@/components/ui/Carousel'
import Link from 'next/link'
import type { Collection } from '@/types/sanity'

interface CollectionsCarouselProps {
  collections: Collection[]
  seeAllHref?: string
}

// Agrupa las colecciones por tipo/cocina
function groupCollections(collections: Collection[]) {
  const groups: Record<string, Collection[]> = {}
  collections.forEach(col => {
    const type = col.type || col.cuisine || 'Otras';
    if (!groups[type]) groups[type] = [];
    groups[type].push(col);
  });
  return groups;
}

export default function CollectionsCarousel({ collections, seeAllHref = '/collections' }: CollectionsCarouselProps) {
  const grouped = groupCollections(collections)
  const ORDER = ['Italian', 'Japanese', 'Vegan', 'Healthy', 'Otras']

  return (
    <div className="relative">
      {ORDER.map(type =>
        grouped[type] && grouped[type].length > 0 ? (
          <div key={type} className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-2xl md:text-3xl font-black text-primary tracking-tight drop-shadow-sm uppercase">{type}</h3>
              {seeAllHref && (
                <Link href={seeAllHref + `?type=${encodeURIComponent(type.toLowerCase())}`} className="inline-block bg-primary text-white rounded-full px-5 py-2 text-sm md:text-base font-bold shadow hover:bg-secondary transition">
                  Ver más &gt;
                </Link>
              )}
            </div>
            <Carousel
              slidesPerView={1.2}
              spaceBetween={20}
              className="md:slidesPerView-2.5"
            >
              {grouped[type].map((col) => (
                <Link
                  key={col._id}
                  href={`/collections/${col.slug}`}
                  className="group flex flex-col items-center justify-center border-2 border-primary-100 bg-white rounded-3xl p-6 min-w-[200px] max-w-[240px] mx-auto hover:bg-primary-50 hover:border-secondary hover:shadow-xl transition-all duration-200 text-center shadow relative"
                >
                  <div className="w-20 h-20 rounded-2xl overflow-hidden mb-4 bg-gray-100 flex items-center justify-center border-2 border-primary-50 group-hover:border-secondary transition-all duration-200 shadow-md">
                    {col.image ? (
                      <img src={col.image} alt={col.title} className="object-cover w-full h-full" />
                    ) : (
                      <span className="text-3xl text-primary font-bold">🍽️</span>
                    )}
                  </div>
                  <span className="font-extrabold text-primary text-lg md:text-xl truncate w-full mb-1 group-hover:text-secondary transition-colors duration-200">
                    {col.title}
                  </span>
                  {col.cuisine && <span className="text-xs text-gray-500 italic mb-1">{col.cuisine}</span>}
                  {col.description && <span className="text-xs text-gray-600 line-clamp-2 mb-2">{col.description}</span>}
                </Link>
              ))}
            </Carousel>
          </div>
        ) : null
      )}
    </div>
  )
}
