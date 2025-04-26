// pages/index.js
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'v0ejlvd9',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
})

export default function HomePage() {
  const [restaurants, setRestaurants] = useState([])
  const [collections, setCollections] = useState([])
  const [article, setArticle] = useState(null)
  const [filters, setFilters] = useState({
    location: 'All locations',
    cuisine: 'All cuisines',
    price: 'All prices',
  })

  useEffect(() => {
    // Top 4 restaurants
    client
      .fetch(`*[_type=="restaurant"][0...4]{
        _id,name,neighbourhood,streetAddress,
        cuisine,priceRange,photoUrls[0]
      }`)
      .then(setRestaurants)

    // 3 collections
    client
      .fetch(`*[_type=="collection"][0...3]{
        _id,title,"slug":slug.current,
        "cover":coverImage.asset->url
      }`)
      .then(setCollections)

    // Latest article
    client
      .fetch(`*[_type=="article"] | order(publishedAt desc)[0]{
        _id,title,"slug":slug.current,
        excerpt, "cover":coverImage.asset->url,
        publishedAt
      }`)
      .then(setArticle)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* — Header / Hero — */}
      <header className="py-8 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold">
          Discover Rwanda’s Best Restaurants
        </h1>
        <p className="mt-2 text-gray-700 text-lg md:text-xl">
          Explore our curated list of the finest dining experiences Rwanda has to offer.
        </p>
      </header>

      {/* — Filters — */}
      <section className="px-4 md:px-20 mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          {[
            { key: 'location', label: ['All locations', ...Array.from(new Set(restaurants.map(r => r.neighbourhood)))] },
            { key: 'cuisine', label: ['All cuisines', ...Array.from(new Set(restaurants.map(r => r.cuisine)))] },
            { key: 'price',   label: ['All prices',   ...Array.from(new Set(restaurants.map(r => r.priceRange)))] },
          ].map(({ key, label }) => (
            <select
              key={key}
              className="border rounded-md px-3 py-2 bg-white"
              value={filters[key]}
              onChange={e => setFilters(f => ({ ...f, [key]: e.target.value }))}
            >
              {label.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ))}
          <button className="mt-2 md:mt-0 px-6 py-2 bg-green-600 text-white rounded-md">
            Search
          </button>
        </div>
      </section>

      {/* — Top Picks — */}
      <section className="px-4 md:px-20 mb-16">
        <h2 className="text-2xl font-semibold mb-6">Top Picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map(r => (
            <Link key={r._id} href={`/restaurants/${r._id}`}>
              <a className="block bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                {r.photoUrls && (
                  <Image
                    src={r.photoUrls}
                    alt={r.name}
                    width={400}
                    height={240}
                    className="object-cover w-full h-48"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{r.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {r.cuisine} · {r.priceRange}
                  </p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </section>

      {/* — Collections — */}
      <section className="px-4 md:px-20 mb-16">
        <h2 className="text-2xl font-semibold mb-6">Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map(c => (
            <Link key={c._id} href={`/collections/${c.slug}`}>
              <a className="block bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                <Image
                  src={c.cover}
                  alt={c.title}
                  width={400}
                  height={240}
                  className="object-cover w-full h-48"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{c.title}</h3>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </section>

      {/* — Featured Article — */}
      {article && (
        <section className="px-4 md:px-20 mb-20">
          <h2 className="text-2xl font-semibold mb-6">Traditional Food</h2>
          <Link href={`/articles/${article.slug}`}>
            <a className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
              <div className="flex-1 p-6">
                <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <p className="text-sm text-gray-500">
                  Published {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="w-full md:w-1/3 relative">
                <Image
                  src={article.cover}
                  alt={article.title}
                  width={400}
                  height={240}
                  className="object-cover w-full h-full"
                />
              </div>
            </a>
          </Link>
        </section>
      )}
    </div>
  )
}
