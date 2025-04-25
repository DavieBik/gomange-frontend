import React, { useEffect, useState } from 'react';
import { createClient } from '@sanity/client';
import Image from 'next/image';

const client = createClient({
  projectId: 'v0ejlvd9',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
});

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(`*[_type == "restaurant"]{
          _id,
          name,
          neighborhood,
          streetAddress,
          cuisine,
          priceRange,
          description,
          googleMapLink,
          website,
          tags,
          photoUrl
        }`);
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-700">🍽️ Discover Kigali’s Best Eats</h1>
      
      {restaurants.length === 0 ? (
        <p className="text-center text-gray-500">Loading restaurants...</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border hover:shadow-xl transition"
            >
              {restaurant.photoUrl && (
                <img
                  src={restaurant.photoUrl}
                  alt={restaurant.name}
                  className="w-full h-56 object-cover"
                />
              )}

              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800">{restaurant.name}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {restaurant.neighborhood}{restaurant.streetAddress ? `, ${restaurant.streetAddress}` : ''}
                </p>
                <p className="text-sm text-gray-600 mt-2">{restaurant.cuisine} • {restaurant.priceRange}</p>
