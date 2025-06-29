/*import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'v0ejlvd9',         // ✅ Your actual project ID
  dataset: 'production',         // ✅ Your dataset
  useCdn: true,
  apiVersion: '2023-01-01'       // ✅ Or today's date
})

export default client */

// src/lib/sanity.ts

// lib/sanity.ts

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

import type { Restaurant, Collection, Article } from '@/types/sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'v0ejlvd9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: SanityImageSource) => builder.image(source)


export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  return await client.fetch(`
    *[_type == "restaurant"] {
      _id,
      name,
      neighbourhood,
      streetAddress,
      city,
      cuisine,
      priceRange,
      summary,
      description,
      website,
      phone,
      tags,
      mainImage {
        asset->
      },
      galleryImages[]{
        asset->
      },
      Image_URL,
      openingHours,
      facebook,
      instagram,
      twitter,
      youtube,
      metaKeywords,
      lgbtqFriendly
    }
  `)
}

export const fetchRestaurantById = async (id: string): Promise<Restaurant | null> => {
  return await client.fetch(`
    *[_type == "restaurant" && _id == $id][0] {
      _id,
      name,
      neighbourhood,
      streetAddress,
      city,
      cuisine,
      priceRange,
      summary,
      description,
      website,
      phone,
      tags,
      mainImage {
        asset->
      },
      galleryImages[]{
        asset->
      },
      Image_URL,
      openingHours,
      facebook,
      instagram,
      twitter,
      youtube,
      metaKeywords,
      lgbtqFriendly
    }
  `, { id })
}

export const fetchCollections = async (): Promise<Collection[]> => {
  return await client.fetch(`
    *[_type == "collection"] | order(_createdAt desc) {
      _id,
      title,
      description,
      slug,
      coverImage {
        asset->
      },
      "restaurantCount": count(restaurants),
      restaurants[]->{
        _id,
        name
      }
    }
  `)
}

export type { Restaurant, Collection, Article } from '@/types/sanity'