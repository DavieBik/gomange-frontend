// src/types/sanity.d.ts

export namespace Sanity {
  // Base Types
  interface Reference {
    _ref: string
    _type: 'reference'
  }

  interface Slug {
    _type: 'slug'
    current: string
  }

  interface Image {
    _type: 'image'
    asset: Reference
    hotspot?: { x: number; y: number; width: number; height: number }
    crop?: { top: number; bottom: number; left: number; right: number }
  }

  interface Block {
    _type: 'block'
  }


 interface Restaurant {
  _id: string
  _createdAt: string
  _updatedAt: string
  _rev: string
  _type: 'restaurant'
  name: string
  slug: Slug
  neighbourhood?: string
  streetAddress?: string
  city?: string
  cuisine?: string
  priceRange?: string
  summary?: string
  description?: string
  website?: string
  phone?: string
  tags?: string[]
  Image_URL?: string
  galleryImages?: Array<Image>
  openingHours?: {
    monday?: string
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
    sunday?: string
  }
  facebook?: string
  instagram?: string
  twitter?: string
  youtube?: string
  metaKeywords?: string[]
  lgbtqFriendly: boolean
}

  interface Collection {
    _id: string
    _type: 'collection'
    title: string
    description?: string
    slug: Slug
    coverImage?: Image
    restaurants?: Array<Reference & { _key: string }>
    restaurantCount?: number
  }

  interface CollectionWithRestaurants extends Omit<Collection, 'restaurants'> {
    restaurants: Restaurant[]
  }

  interface Article {
    _id: string
    _type: 'article'
    title: string
    slug: Slug
    excerpt?: string
    coverImage?: Image
    publishedAt: string
    body?: Array<Block | Image>
  }
}

// Type aliases for easier imports
type SanityImage = Sanity.Image
type SanityRestaurant = Sanity.Restaurant
type SanityCollection = Sanity.Collection
type SanityCollectionWithRestaurants = Sanity.CollectionWithRestaurants
type SanityArticle = Sanity.Article
type SanityReference = Sanity.Reference
type SanitySlug = Sanity.Slug

export type {
  Sanity as SanityNamespace,
  SanityImage as Image,
  SanityRestaurant as Restaurant,
  SanityCollection as Collection,
  SanityCollectionWithRestaurants as CollectionWithRestaurants,
  SanityArticle as Article,
  SanityReference as Reference,
  SanitySlug as Slug,
} from '@/types/sanity'