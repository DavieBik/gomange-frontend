import React, { useEffect, useState } from 'react';
import { createClient } from '@sanity/client';

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
      <h1 className="text-4xl font-bold text-center mb-10 text-green-700">
        🍽️ Discover Kigali’s Best Eats
      </h1>
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
                  {restaurant.neighborhood}
                  {restaurant.streetAddress ? `, ${restaurant.streetAddress}` : ''}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {restaurant.cuisine} • {restaurant.priceRange}
                </p>
                <p className="text-gray-700 mt-3 text-sm">{restaurant.description}</p>

                {restaurant.tags?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {restaurant.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  {restaurant.website && (
                    <a
                      href={
                        restaurant.website.startsWith('http')
                          ? restaurant.website
                          : `https://${restaurant.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Website
                    </a>
                  )}
                  {restaurant.googleMapLink && (
                    <a
                      href={restaurant.googleMapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Google Maps
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantsPage;

