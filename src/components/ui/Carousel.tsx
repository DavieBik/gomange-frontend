// components/ui/Carousel.tsx
'use client'

import { useKeenSlider } from 'keen-slider/react'
import React, { useEffect, useRef } from 'react'
import 'keen-slider/keen-slider.min.css'

interface CarouselProps {
  children: React.ReactNode
  autoplay?: boolean
  delay?: number
}

export default function Carousel({
  children,
  autoplay = true,
  delay = 5000,
}: CarouselProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
    slides: {
      perView: 1.2,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 1.5, spacing: 20 },
      },
      '(min-width: 768px)': {
        slides: { perView: 2.2, spacing: 24 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 32 },
      },
      '(min-width: 1280px)': {
        slides: { perView: 3.5, spacing: 40 },
      },
    },
    created: () => {
      if (autoplay) startAutoplay()
    },
    updated: () => {
      if (autoplay) resetAutoplay()
    },
    animationEnded: () => {
      if (autoplay) {
        const currentIndex = slider.current?.track.details.rel || 0
        const nextIndex = currentIndex + 1
        slider.current?.moveToIdx(nextIndex)
        resetAutoplay()
      }
    },
  })

  const startAutoplay = () => {
    if (!intervalRef.current && slider.current) {
      intervalRef.current = setInterval(() => {
        const currentIndex = slider.current?.track.details.rel || 0
        const nextIndex = currentIndex + 1
        slider.current?.moveToIdx(nextIndex)
      }, delay)
    }
  }

  const resetAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      const currentIndex = slider.current?.track.details.rel || 0
      const nextIndex = currentIndex + 1
      slider.current?.moveToIdx(nextIndex)
    }, delay)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="relative w-full overflow-hidden">
      <div ref={sliderRef} className="keen-slider">
        {children}
      </div>

      {/* Gradientes laterales para efecto visual */}
      <div className="absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
    </div>
  )
}