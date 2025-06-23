// lib/utils.ts

import { CUISINE_PLACEHOLDERS } from './placeholders'

// lib/utils.ts

export function getPlaceholderImage(cuisine?: string): string {
  if (!cuisine) return '/placeholder/default.jpg'

  const cuisineLower = cuisine.toLowerCase().trim()

  // Limpia y separa palabras clave
  const words = cuisineLower
    .replace(/[^\w\s]/g, ' ') // Elimina &, /, etc.
    .split(/\s+/)
    .filter(Boolean)

  // Busca coincidencia exacta en keys del objeto
  for (const word of words) {
    if (word in CUISINE_PLACEHOLDERS) {
      return CUISINE_PLACEHOLDERS[word as keyof typeof CUISINE_PLACEHOLDERS]
    }
  }

  // Busca coincidencias parciales (ej: "grill" en "bar grill")
  for (const key of Object.keys(CUISINE_PLACEHOLDERS)) {
    if (words.some(word => word.includes(key))) {
      return CUISINE_PLACEHOLDERS[key as keyof typeof CUISINE_PLACEHOLDERS]
    }
  }

  // Fallback final
  return '/placeholder/default.jpg'
}