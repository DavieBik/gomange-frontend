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
  const result = await client.fetch(`
    *[_type == "restaurant"] {
      _id,
      name,
      slug,
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
      mainImage { asset-> },
      galleryImages[] { asset-> },
      openingHours,
      email,
      gmbUrl,
      latitude,
      longitude,
      menuLink,
      phoneStandard,
      crowd,
      serviceOptions,
      amenities,
      accessibility,
      paymentMethods,
      offerings,
      ownerNote,
      hoursSummary,
      whatsappNumber,
      orderLink,
      bookingLink
    }
  `)
  return result
}

export const fetchRestaurantById = async (id: string): Promise<Restaurant | null> => {
  const result = await client.fetch(`
    *[_type == "restaurant" && _id == $id][0] {
      _id,
      name,
      slug,
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
      mainImage { asset-> },
      galleryImages[] { asset-> },
      openingHours,
      email,
      gmbUrl,
      latitude,
      longitude,
      menuLink,
      phoneStandard,
      crowd,
      serviceOptions,
      amenities,
      accessibility,
      paymentMethods,
      offerings,
      ownerNote,
      hoursSummary,
      whatsappNumber,
      orderLink,
      bookingLink,
      reviews[] {
        _key,
        author,
        rating,
        comment,
        date
      }
    }
  `, { id })
  return result
}

export const fetchCollections = async (): Promise<Collection[]> => {
  console.log('fetchCollections: fetching collections')
  const result = await client.fetch(`
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
  console.log('fetchCollections: result', result)
  return result
}

// API RESTAURANT ENDPOINTS
const apiBase = process.env.NEXT_PUBLIC_API_URL;

export const getAllRestaurants = async (): Promise<{ restaurants: Restaurant[], total: number }> => {
  console.log('getAllRestaurants: fetching from', `${apiBase}/api/restaurants`)
  const res = await fetch(`${apiBase}/api/restaurants`);
  console.log('getAllRestaurants: response status', res.status)
  if (!res.ok) throw new Error('Error al obtener restaurantes');
  const data = await res.json();
  console.log('getAllRestaurants: data', data)
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
  const data = await res.json();
  return data; // <-- Aquí debe venir mainImage, galleryImages, openingHours, tags, etc.
};

export const updateRestaurantAPI = async (
  id: string,
  data: Partial<Restaurant>,
  imageFile?: File,
  galleryFiles?: File[]
) => {
  console.log('updateRestaurantAPI: id', id)
  console.log('updateRestaurantAPI: data', data)
  let res;
  const allowedFields = [
    'name', 'neighbourhood', 'streetAddress', 'district', 'cuisine', 'priceRange',
    'summary', 'description', 'website', 'phone', 'email', 'gmbUrl',
    'latitude', 'longitude', 'menuLink', 'phoneStandard', 'crowd',
    'serviceOptions', 'amenities', 'accessibility', 'paymentMethods', 'offerings',
    'ownerNote', 'openingHours', 'hoursSummary', 'tags',
    // NO incluyas mainImage ni galleryImages aquí, los archivos se agregan abajo
    'whatsappNumber', 'orderLink', 'bookingLink'
  ];
  if (imageFile || (galleryFiles && galleryFiles.length > 0)) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      // SOLO CAMPOS PERMITIDOS Y NO IMÁGENES
      if (
        allowedFields.includes(key) &&
        value !== undefined &&
        value !== null
      ) {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
      }
    });
    if (imageFile) formData.append('mainImage', imageFile);
    if (galleryFiles && galleryFiles.length > 0) {
      galleryFiles.forEach(file => formData.append('galleryImages', file));
    }
    // LOGS DETALLADOS
    console.log('updateRestaurantAPI: FormData keys', Array.from(formData.keys()))
    console.log('updateRestaurantAPI: FormData name', formData.get('name'))
    res = await fetch(`${apiBase}/api/restaurants/${id}`, {
      method: 'PUT',
      body: formData,
    });
  } else {
    console.log('updateRestaurantAPI: JSON body', data)
    res = await fetch(`${apiBase}/api/restaurants/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }
  console.log('updateRestaurantAPI: response status', res.status)
  if (!res.ok) throw new Error('Error updating restaurant');
  const result = await res.json();
  console.log('updateRestaurantAPI: result', result)
  return result;
};

export const createRestaurantAPI = async (
  data: Partial<Restaurant>,
  imageFile?: File,
  galleryFiles?: File[]
) => {
  console.log('createRestaurantAPI: data', data)
  const allowedFields = [
    'name', 'neighbourhood', 'streetAddress', 'district', 'cuisine', 'priceRange',
    'summary', 'description', 'website', 'phone', 'email', 'gmbUrl',
    'latitude', 'longitude', 'menuLink', 'phoneStandard', 'crowd',
    'serviceOptions', 'amenities', 'accessibility', 'paymentMethods', 'offerings',
    'ownerNote', 'openingHours', 'hoursSummary', 'tags',
    'whatsappNumber', 'orderLink', 'bookingLink', 'menu'
  ];
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (!allowedFields.includes(key)) return;
    if (key === 'mainImage' || key === 'galleryImages') return;
    if (key === 'openingHours') {
      formData.append(key, JSON.stringify(value));
      } else if (key === 'menu' && Array.isArray(value)) {
      formData.append('menu', JSON.stringify(value));
    } else if (Array.isArray(value) && value.length > 0) {
      formData.append(key, value.join(','));
    } else if (typeof value === 'object' && value !== null) {
      // Solo openingHours como JSON
    } else if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value as string);
    }
  });
  if (imageFile) formData.append('mainImage', imageFile);
  if (galleryFiles && galleryFiles.length > 0) {
    galleryFiles.forEach(file => formData.append('galleryImages', file));
  }
  // LOGS DETALLADOS
  for (let pair of formData.entries()) {
    console.log(pair[0]+ ': ' + pair[1]);
  }
  const res = await fetch(`${apiBase}/api/restaurants`, {
    method: 'POST',
    body: formData,
  });
  console.log('createRestaurantAPI: response status', res.status)
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.log('Error response:', errorData);
    throw new Error(errorData?.error || errorData?.details || 'Error al crear restaurante');
  }
  const result = await res.json();
  console.log('createRestaurantAPI: result', result)
  return result;
};

export const deleteRestaurantAPI = async (id: string) => {
  console.log('deleteRestaurantAPI: id', id)
  const res = await fetch(`${apiBase}/api/restaurants/${id}`, {
    method: 'DELETE',
  });
  console.log('deleteRestaurantAPI: response status', res.status)
  if (!res.ok) throw new Error('Error al eliminar restaurante');
  const result = res.status === 204 ? {} : await res.json();
  console.log('deleteRestaurantAPI: result', result)
  return result;
};

export const uploadImage = async (file: File) => {
  console.log('uploadImage: file', file)
  const formData = new FormData();
  formData.append('image', file);
  console.log('uploadImage: FormData keys', Array.from(formData.keys()))
  const res = await fetch(`${apiBase}/api/restaurant/upload`, {
    method: 'POST',
    body: formData,
  });
  console.log('uploadImage: response status', res.status)
  if (!res.ok) throw new Error('Error al subir imagen');
  const result = await res.json();
  console.log('uploadImage: result', result)
  return result;
};



export const getCoordinates = async (address: string): Promise<{ latitude: number; longitude: number }> => {
  const res = await fetch(`${apiBase}/api/restaurants/geocode?address=${encodeURIComponent(address)}`);
  if (!res.ok) throw new Error('No se pudo obtener coordenadas');
  return await res.json();
};

export const deleteReviewAPI = async (restaurantId: string, reviewKey: string) => {
  const res = await fetch(`${apiBase}/api/restaurants/${restaurantId}/reviews/${reviewKey}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error deleting review');
  return await res.json();
};

export const addReviewAPI = async (
  restaurantId: string,
  author: string,
  rating: number,
  comment: string
) => {
  const res = await fetch(`${apiBase}/api/restaurants/${restaurantId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      author,
      rating,
      comment,
      date: new Date().toISOString()
    })
  });
  if (!res.ok) throw new Error('Error adding review');
  return await res.json();
};


export const updateRestaurantMenu = async (id: string, menu: any[]) => {
  const res = await fetch(`${apiBase}/api/restaurants/${id}/menu`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ menu }),
  });
  if (!res.ok) throw new Error('Error updating menu');
  return await res.json();
};

export const addMenuSectionAPI = async (restaurantId: string, section: string) => {
  const res = await fetch(`${apiBase}/api/restaurants/${restaurantId}/menu`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ section, items: [] }),
  });
  if (!res.ok) throw new Error('Error adding menu section');
  return await res.json(); // { sectionKey, section, menu }
};

export const addMenuItemAPI = async (
  restaurantId: string,
  sectionKey: string,
  name: string,
  description: string,
  price: number,
  imageFile?: File
) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('price', String(price));
  if (imageFile) formData.append('image', imageFile);

  const res = await fetch(`${apiBase}/api/restaurants/${restaurantId}/menu/${sectionKey}/item`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Error adding menu item');
  return await res.json();
};

export const deleteMenuSectionAPI = async (restaurantId: string, sectionKey: string) => {
  const res = await fetch(`${apiBase}/api/restaurants/${restaurantId}/menu/${sectionKey}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error deleting menu section');
  return await res.json();
};

export const deleteMenuItemAPI = async (restaurantId: string, itemKey: string) => {
  const res = await fetch(`${apiBase}/api/restaurants/${restaurantId}/menu/item/${itemKey}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error deleting menu item');
  return await res.json();
};

export const editMenuSectionAPI = async (
  restaurantId: string,
  sectionKey: string,
  section: string,
  sectionImage?: any // Puede ser asset ref o null
) => {
  const body: any = { section };
  if (sectionImage) body.sectionImage = sectionImage;

  const res = await fetch(`${apiBase}/api/restaurants/${restaurantId}/menu/${sectionKey}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Error editing menu section');
  return await res.json();
};

export const editMenuItemAPI = async (
  restaurantId: string,
  itemKey: string,
  name?: string,
  description?: string,
  price?: number,
  image?: any // Puede ser asset ref o null
) => {
  const body: any = {};
  if (name) body.name = name;
  if (description) body.description = description;
  if (price !== undefined) body.price = price;
  if (image) body.image = image;

  const res = await fetch(`${apiBase}/api/restaurants/${restaurantId}/menu/item/${itemKey}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Error editing menu item');
  return await res.json();
};



export type { Restaurant, Collection, Article } from '@/types/sanity'