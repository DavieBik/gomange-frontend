'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { FreeMode, Navigation } from 'swiper/modules'

interface CarouselProps {
  children: React.ReactNode[]
  className?: string
  slidesPerView?: number
  spaceBetween?: number
}

export default function Carousel({ children, className = '', slidesPerView = 1.2, spaceBetween = 16 }: CarouselProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <Swiper
        modules={[Navigation, FreeMode]}
        navigation
        freeMode
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
          1280: { slidesPerView: 4.5 },
        }}
        className="pb-6"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        {children.map((child, idx) => (
          <SwiperSlide key={idx} className="!h-auto flex items-stretch">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}