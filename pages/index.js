import React, { useEffect, useState } from 'react';
import { createClient } from '@sanity/client';
import Image from 'next/image';

const client = createClient({
  projectId: 'v0ejlvd9',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
});

export default function HomePage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(`*[_type == "restaurant"][0...9]{
          _id,
          name,
          neighborhood,
          streetAddress,
          cuisine,
          priceRange,
          description,
          tags,
          googleMapLink,
          website,
          photoUrl
        }`);
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero */}
      <section className="bg-green-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">🍽️ Discover Kigali’s Best Restaurants</h1>
        <p className="text-lg">Curated. Local. Delicious. Powered by GoMange.</p>
      </section>

      {/* Featured Restaurants */}
      <section className="px-6 md:px-16 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">🌟 Featured This Week</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((r) => (
            <div
              key={r._id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition"
            >
              {r.photoUrl && (
                <Image
                  src={r.photoUrl}
                  alt={r.name}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{r.name}</h3>
                <p className="text-sm text-gray-500">
                  {r.neighborhood}
                  {r.streetAddress ? `, ${r.streetAddress}` : ''}
                </p>
                <p className="text-sm mt-1 text-gray-700">
                  {r.cuisine} • {r.priceRange}
                </p>
                <p className="text-sm mt-2 text-gray-600">{r.description}</p>

                {/* Tags */}
                {r.tags?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {r.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  {r.website && (
                    <a
                      href={r.website.startsWith('http') ? r.website : `https://${r.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Instagram / Website
                    </a>
                  )}
                  {r.googleMapLink && (
                    <a
                      href={r.googleMapLink}
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
      </section>
    </div>
  );
}
