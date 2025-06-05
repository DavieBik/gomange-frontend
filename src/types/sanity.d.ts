// src/types/sanity.d.ts

declare namespace Sanity {
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
    cuisine?: string
    priceRange?: string
    description?: string
    googleMapsLink?: string
    instagramOrWebsite?: string
    tags?: string[]
    photoUploads?: Array<{ _key: string; asset: Reference }>
  }

  interface Collection {
    _id: string
    _type: 'collection'
    title: string
    description?: string
    slug: Slug
    coverImage?: Image
    restaurants?: Array<Reference & { _key: string }>
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


export type {
  Sanity as SanityNamespace,
  SanityImage as Image,
  SanityRestaurant as Restaurant,
  SanityCollection as Collection,
  SanityArticle as Article,
  SanityReference as Reference,
  SanitySlug as Slug,
} from '@/types/sanity'