'use client'

import React, { useRef } from 'react'

interface CarouselProps {
  children: React.ReactNode
  className?: string
}

export default function Carousel({ children, className = '' }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -width : width,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Flechas solo en desktop */}
      <button
        type="button"
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 items-center justify-center shadow-md"
        aria-label="Scroll left"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-2"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {React.Children.map(children, (child, idx) => (
          <div className="snap-center shrink-0 w-full md:w-1/2 lg:w-1/4 max-w-xs md:max-w-none" key={idx}>
            {child}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 items-center justify-center shadow-md"
        aria-label="Scroll right"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}