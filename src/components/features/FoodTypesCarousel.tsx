"use client";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";
import '../../../styles/embla.css'

export default function FoodTypesCarousel({ foodTypes }: { foodTypes: { name: string; image: string }[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    dragFree: true,
    slidesToScroll: 1,
  });

  // Manejar navegación por teclado
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!emblaApi) return;

    if (event.key === 'ArrowLeft') {
      emblaApi.scrollPrev();
    } else if (event.key === 'ArrowRight') {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  useEffect(() => {
    // Agregar event listener al montar
    window.addEventListener('keydown', handleKeyDown);
    
    // Limpiar al desmontar
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Scroll programático
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section 
      className="relative py-8 sm:py-16 bg-transparent w-full focus:outline-none" 
      tabIndex={0} // Hacer que la sección sea enfocable
    >
      <div className="w-full flex flex-col items-center">
        <div className="w-full bg-gradient-to-r from-primary-600 to-primary-800 flex flex-col items-center py-6 sm:py-12 shadow-lg">
          <div className="w-full mb-4 sm:mb-8 flex flex-col gap-2 sm:gap-4 items-center">
            <div className="w-full max-w-screen-xl mx-auto flex flex-row items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight text-left flex-1">Explore Cuisines</h3>
            <Link href="/restaurants"  className="hidden sm:inline btn btn-text text-secondary-400 font-semibold w-auto text-right text-xs sm:text-base">
            View all 
          </Link>
          <Link href="/restaurants" className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full bg-secondary-400 text-white text-xl font-bold shadow hover:bg-accent/80 transition-colors duration-150 ml-2" aria-label="See all">
            <span>+</span>
          </Link>
            </div>
          </div>
          <div className="w-full px-0 sm:px-6 overflow-hidden relative">
            {/* Botones de navegación para pantallas grandes */}
            <button 
              onClick={scrollPrev}
              className="hidden sm:block absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Previous cuisine"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div ref={emblaRef} className="embla w-full touch-pan-x focus:outline-none">
              <div 
                className="embla__container flex gap-6 sm:gap-10 items-center pb-6 relative px-4 sm:px-8" 
                style={{overflow: 'visible'}}
                role="list" // Mejora accesibilidad
              >
                {foodTypes.map((type, idx) => (
                  <div
                    className="embla__slide flex-shrink-0"
                    style={{ minWidth: '120px', maxWidth: '180px', overflow: 'visible' }}
                    key={type.name + idx}
                    role="listitem" // Mejora accesibilidad
                  >
                    <Link
                      href={`/restaurants?cuisine=${encodeURIComponent(type.name)}`}
                      className="group flex flex-col items-center justify-center cursor-pointer min-w-[120px] sm:min-w-[160px] max-w-[160px] sm:max-w-[180px] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-primary-600 rounded-lg"
                      tabIndex={0} // Hacer que los items sean enfocables
                    >
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-3 shadow-lg group-hover:shadow-xl group-focus-visible:shadow-xl transition-all duration-300">
                        <div className="absolute inset-0 rounded-full border-4 border-white/90 group-hover:border-white group-focus-visible:border-white transition-all duration-300 overflow-hidden z-10">
                          <img 
                            src={type.image} 
                            alt={type.name} 
                            className="object-cover w-full h-full group-hover:scale-110 group-focus-visible:scale-110 transition-transform duration-500 ease-out" 
                            loading="lazy" // Mejora performance
                          />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <span className="text-white font-semibold text-sm sm:text-base group-hover:font-bold group-focus-visible:font-bold text-center line-clamp-1 transition-all duration-200 tracking-tight relative">
                        {type.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full group-focus-visible:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="w-full max-w-md mx-auto mt-4">
                <div className="relative h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="absolute left-0 top-0 h-full bg-white/70 rounded-full animate-pulse" style={{ width: '40%' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="opacity-70" width="32" height="8" viewBox="0 0 32 8" fill="none">
                      <rect x="8" y="2" width="16" height="4" rx="2" fill="white"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={scrollNext}
              className="hidden sm:block absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Next cuisine"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}