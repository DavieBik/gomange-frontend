// components/features/HeroCarousel.tsx
'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation, EffectFade, Autoplay } from 'swiper/modules'

interface Slide {
  image: string
  title: string
  subtitle?: string
  cta?: { label: string; href: string }
}

interface HeroCarouselProps {
  slides: Slide[]
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  return (
    <div className="relative w-full h-[340px] md:h-[480px] lg:h-[600px] rounded-3xl overflow-hidden shadow-xl mb-12">
      <Swiper
        modules={[Navigation, EffectFade, Autoplay]}
        navigation
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx} className="relative h-full">
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
            <div className="absolute left-0 bottom-0 p-8 z-20 text-white max-w-xl">
              <h2 className="text-2xl md:text-4xl font-extrabold mb-2 drop-shadow-lg">{slide.title}</h2>
              {slide.subtitle && <p className="text-lg md:text-2xl mb-4 drop-shadow">{slide.subtitle}</p>}
              {slide.cta && (
                <a href={slide.cta.href} className="btn btn-secondary btn-lg shadow-lg">{slide.cta.label}</a>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
