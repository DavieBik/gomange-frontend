"use client";
import Link from "next/link";
import { urlFor } from '@/lib/sanity';
import type { Restaurant } from '@/types/sanity';

interface HandpickedCarouselProps {
  restaurants: Restaurant[];
}

export default function HandpickedCarousel({ restaurants }: HandpickedCarouselProps) {
  return (
    <section className="relative py-10 sm:py-16 bg-gradient-to-b from-white via-primary-50 to-white">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-row items-center justify-between mb-6 sm:mb-12 gap-2 w-full max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 items-start">
            <span className="inline-block bg-primary-100 text-primary-700 text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full mr-0 sm:mr-2 mb-1 sm:mb-0 tracking-wide">Editor's Picks</span>
            <h2 className="text-xl sm:text-2xl md:text-2xl font-black text-primary text-left drop-shadow-sm tracking-tight">Handpicked for You</h2>
          </div>
          <Link href="/restaurants"  className="hidden sm:inline btn btn-text text-secondary-400 font-semibold w-auto text-right text-xs sm:text-base">
            View all 
          </Link>
          <Link href="/restaurants" className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full bg-secondary-400 text-white text-xl font-bold shadow hover:bg-accent/80 transition-colors duration-150 ml-2" aria-label="See all">
            <span>+</span>
          </Link>
        </div>
        <div className="relative flex gap-3 sm:gap-5 md:gap-8 items-stretch w-full overflow-x-auto hide-scrollbar pb-4 sm:pb-8 max-w-6xl mx-auto">
          {restaurants.map((restaurant: Restaurant) => (
            <Link
              key={restaurant._id}
              href={`/restaurant/${restaurant._id}`}
              className="group min-w-[75vw] max-w-[80vw] xs:min-w-[260px] xs:max-w-[320px] sm:min-w-[260px] sm:max-w-xs md:min-w-[320px] md:max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-xl p-3 xs:p-4 sm:p-5 flex flex-col gap-2 xs:gap-3 sm:gap-3 border border-gray-100 hover:border-gray-200 transition-all duration-300 flex-shrink-0 relative overflow-hidden"
            >
              {/* Efecto de elevación al hacer hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              
              {/* Imagen con efecto de zoom sutil */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-2 xs:mb-2.5 sm:mb-3 shadow-md">
                <img
                  src={restaurant.mainImage?.asset ? urlFor(restaurant.mainImage.asset).width(800).url() : (restaurant.Image_URL || '/placeholder/default.jpg')}
                  alt={restaurant.name || 'Restaurant image'}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Badge de precio con efecto hover */}
                <span className="absolute top-2 right-2 bg-white/95 text-primary-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  {restaurant.priceRange || '—'}
                </span>
              </div>

              {/* Contenido de la card */}
              <div className="relative z-20">
                <h3 className="font-bold text-base xs:text-lg sm:text-xl text-gray-900 mb-1 leading-tight group-hover:text-primary-600 transition-colors duration-200">
                  {restaurant.name}
                </h3>
                <p className="text-xs xs:text-sm sm:text-sm text-gray-600 font-medium line-clamp-2 mb-2">
                  {restaurant.description || restaurant.cuisine}
                </p>
                
                {/* Tags con efecto hover */}
                <div className="flex gap-1.5 xs:gap-2 sm:gap-2 mt-auto flex-wrap">
                  {restaurant.tags && restaurant.tags.slice(0, 2).map((tag: string, tagIdx: number) => (
                    <span
                      key={tagIdx}
                      className="text-[10px] xs:text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700 group-hover:bg-primary-100 group-hover:text-primary-700 transition-colors duration-200"
                    >
                      #{tag.replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Borde sutil al hacer hover */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary-100/50 transition-all duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}