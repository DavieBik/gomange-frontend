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
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-03',
  useCdn: true
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

// API RESTAURANT ENDPOINTS
const apiBase = process.env.NEXT_PUBLIC_API_URL;

export const getAllRestaurants = async (): Promise<{ restaurants: Restaurant[], total: number }> => {
  const res = await fetch(`${apiBase}/api/restaurants`);
  if (!res.ok) throw new Error('Error al obtener restaurantes');
  const data = await res.json();
  // Asegúrate de devolver un objeto con restaurants y total
  if (Array.isArray(data.restaurants)) {
    return { restaurants: data.restaurants, total: data.total || data.restaurants.length };
  } else if (Array.isArray(data)) {
    return { restaurants: data, total: data.length };
  } else {
    return { restaurants: [], total: 0 };
  }
};

export const getRestaurantById = async (id: string): Promise<Restaurant> => {
  const res = await fetch(`${apiBase}/api/restaurants/${id}`);
  if (!res.ok) throw new Error('Error al obtener restaurante');
  return await res.json();
};

export const updateRestaurantAPI = async (
  id: string,
  data: Partial<Restaurant>,
  imageFile?: File,
  galleryFiles?: File[]
) => {
  let res;
  if (imageFile || (galleryFiles && galleryFiles.length > 0)) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
      }
    });
    if (imageFile) formData.append('mainImage', imageFile);
    if (galleryFiles && galleryFiles.length > 0) {
      galleryFiles.forEach(file => formData.append('galleryImages', file));
    }
    res = await fetch(`${apiBase}/api/restaurants/${id}`, {
      method: 'PUT',
      body: formData,
    });
  } else {
    res = await fetch(`${apiBase}/api/restaurants/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }
  if (!res.ok) throw new Error('Error updating restaurant');
  return await res.json();
};

export const createRestaurantAPI = async (data: Partial<Restaurant>) => {
  const res = await fetch(`${apiBase}/api/restaurants`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear restaurante');
  return await res.json();
};

export const deleteRestaurantAPI = async (id: string) => {
  const res = await fetch(`${apiBase}/api/restaurants/${id}`, { // <-- plural
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar restaurante');
  // Si tu backend responde con 204 No Content, no intentes hacer res.json()
  return res.status === 204 ? {} : await res.json();
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch(`${apiBase}/api/restaurant/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Error al subir imagen');
  return await res.json();
};

export type { Restaurant, Collection, Article } from '@/types/sanity'