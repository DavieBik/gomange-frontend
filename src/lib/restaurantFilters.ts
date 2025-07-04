// src/lib/restaurantFilters.ts

export function mapPriceRange(price: string | undefined): string {
  if (!price) return 'Standard pricing'
  const lowerPrice = price.toLowerCase()
  if (lowerPrice.includes('$') && !lowerPrice.includes('$$')) return 'Affordable meals'
  if (lowerPrice.includes('$$$$') || lowerPrice.includes('expensive') || lowerPrice.includes('upscale')) return 'Upscale dining'
  if (lowerPrice.includes('$$$') || lowerPrice.includes('moderate')) return 'Standard pricing'
  if (lowerPrice.includes('varied') || lowerPrice.includes('range')) return 'Wide price range'
  return 'Standard pricing'
}

export function getUniqueLocations(restaurants: any[]) {
  return Array.from(new Set(restaurants.map(r => r.neighbourhood).filter(Boolean)))
}

export function getUniqueCuisines(restaurants: any[]) {
  return Array.from(new Set(restaurants.map(r => r.cuisine).filter(Boolean)))
}

export function getAllTags(restaurants: any[]) {
  return Array.from(new Set(restaurants.flatMap(r => r.tags || []).filter(Boolean)))
}

export function filterRestaurants(restaurants: any[], {
  searchTerm = '',
  location = '',
  cuisine = '',
  priceRange = '',
  tag = ''
}: {
  searchTerm?: string,
  location?: string,
  cuisine?: string,
  priceRange?: string,
  tag?: string
}) {
  return restaurants.filter(r => {
    const matchesSearch = !searchTerm || r.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = !location || r.neighbourhood === location
    const matchesCuisine = !cuisine || r.cuisine?.toLowerCase().includes(cuisine.toLowerCase())
    const matchesPrice = !priceRange || mapPriceRange(r.priceRange) === priceRange
    const matchesTag = !tag || (r.tags && r.tags.includes(tag))
    return matchesSearch && matchesLocation && matchesCuisine && matchesPrice && matchesTag
  })
}

export const priceRanges = [
  'Affordable meals',
  'Standard pricing',
  'Upscale dining',
  'Wide price range'
]
