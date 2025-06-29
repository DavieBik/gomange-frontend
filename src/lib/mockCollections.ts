// lib/mockCollections.ts

export const mockCollections = [
  {
    _id: '1',
    title: 'Italian Delights',
    description: 'The best Italian restaurants in town.',
    restaurants: [
      {
        _id: 'r1',
        name: 'Trattoria Roma',
        cuisine: 'italian',
        neighbourhood: 'Downtown',
        priceRange: '$$ - $$$',
        tags: ['pasta', 'pizza', 'wine'],
        lgbtqFriendly: true,
        website: 'trattoriaroma.com',
      },
      {
        _id: 'r2',
        name: 'Pasta e Basta',
        cuisine: 'italian',
        neighbourhood: 'Old Town',
        priceRange: '$$',
        tags: ['pasta', 'family'],
        lgbtqFriendly: false,
        website: 'pastaebasta.com',
      },
    ],
  },
  {
    _id: '2',
    title: 'Asian Fusion',
    description: 'A mix of the best Asian cuisines.',
    restaurants: [
      {
        _id: 'r3',
        name: 'Sushi Zen',
        cuisine: 'japanese',
        neighbourhood: 'Midtown',
        priceRange: '$$$',
        tags: ['sushi', 'japanese', 'fish'],
        lgbtqFriendly: true,
        website: 'sushizen.com',
      },
      {
        _id: 'r4',
        name: 'Thai Spice',
        cuisine: 'thai',
        neighbourhood: 'East Side',
        priceRange: '$$',
        tags: ['thai', 'spicy'],
        lgbtqFriendly: false,
        website: 'thaispice.com',
      },
    ],
  },
  {
    _id: '3',
    title: 'Healthy Eats',
    description: 'Nutritious and delicious options.',
    restaurants: [
      {
        _id: 'r5',
        name: 'Green Bowl',
        cuisine: 'vegan',
        neighbourhood: 'West End',
        priceRange: '$$',
        tags: ['vegan', 'salad', 'organic'],
        lgbtqFriendly: true,
        website: 'greenbowl.com',
      },
      {
        _id: 'r6',
        name: 'Fit Kitchen',
        cuisine: 'healthy',
        neighbourhood: 'City Center',
        priceRange: '$$',
        tags: ['healthy', 'protein'],
        lgbtqFriendly: false,
        website: 'fitkitchen.com',
      },
    ],
  },
]

// Collection color themes
export const collectionThemes = {
  'mejores-sitios-brunch': 'from-orange-400 to-amber-500',
  'dia-de-la-madre': 'from-pink-400 to-rose-500',
  'sopas-temporada': 'from-orange-500 to-red-500',
  'platos-locales-estrella': 'from-green-400 to-emerald-500',
  'quedadas-viernes': 'from-purple-400 to-indigo-500',
  'cenas-romanticas': 'from-pink-500 to-red-500',
  'comida-callejera': 'from-yellow-400 to-orange-500',
  'opciones-saludables': 'from-lime-400 to-green-500',
  'almuerzos-negocios': 'from-gray-400 to-slate-500',
  'celebraciones-familiares': 'from-blue-400 to-cyan-500',
  'experiencias-unicas': 'from-purple-600 to-pink-600',
  'desayunos-temprano': 'from-yellow-300 to-orange-400'
}
