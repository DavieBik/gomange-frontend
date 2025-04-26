// pages/index.js
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@sanity/client'
import { useRouter } from 'next/router'

const client = createClient({
  projectId: 'v0ejlvd9',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
})

export default function HomePage() {
  const [restaurants, setRestaurants] = useState([])
  const [article, setArticle] = useState(null)
  const [search, setSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Fetch Top Picks (featured restaurants)
    client
      .fetch(
        `*[_type == "restaurant" && featured == true][0...4]{
          _id,
          name,
          neighbourhood,
          streetAddress,
          cuisine,
          priceRange,
          description,
          tags,
          googleMapsLink,
          instagramOrWebsite,
          "photo": coalesce(photoUploads[0].asset->url, photoUrls[0])
        }`
      )
      .then(setRestaurants)
      .catch(console.error)

    // Fetch latest Article
    client
      .fetch(
        `*[_type == "article"]|order(publishedAt desc)[0]{
          _id,
          title,
          excerpt,
          "imageUrl": coverImage.asset->url,
          "author": author->name,
          slug
        }`
      )
      .then(setArticle)
      .catch(console.error)
  }, [])

  const onSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/restaurants?search=${encodeURIComponent(search)}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <Link href="/"><a className="text-xl font-bold text-green-700">GoMange</a></Link>
        <div className="space-x-6">
          <Link href="/restaurants"><a className="hover:text-green-700">Restaurants</a></Link>
          <Link href="/collections"><a className="hover:text-green-700">Collections</a></Link>
          <Link href="/suggest"><a className="hover:text-green-700">Suggest a Spot</a></Link>
          <Link href="/signin">
            <a className="px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800">
              Sign In
            </a>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center py-20 px-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Explore Kigali’s Best Restaurants</h1>
        <p className="text-gray-600 mb-8">Fork-meets-Kigali — curated local eats at your fingertips.</p>
        <form onSubmit={onSearch} className="max-w-xl mx-auto flex">
          <input
            type="text"
            placeholder="Search restaurants…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow px-4 py-3 rounded-l-full border border-gray-300 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 bg-green-700 text-white rounded-r-full hover:bg-green-800"
          >
            🔍
          </button>
        </form>
      </section>

      {/* TOP PICKS */}
      <section className="px-6 md:px-16 py-12">
        <h2 className="text-2xl font-semibold mb-6">Top Picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {restaurants.map((r) => (
            <Link key={r._id} href={`/restaurants/${r._id}`}>
              <a className="block bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
                <div className="relative h-40 w-full">
                  <Image
                    src={r.photo || 'https://source.unsplash.com/featured/?restaurant,food'}
                    alt={r.name}
                    layout="fill"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{r.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {r.cuisine} • {r.priceRange}
                  </p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      {article && (
        <section className="px-6 md:px-16 py-12 bg-white">
          <h2 className="text-2xl font-semibold mb-4">Traditional Food</h2>
          <Link href={`/articles/${article.slug.current}`}>
            <a className="block sm:flex bg-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition">
              <div className="relative sm:w-1/2 h-40 sm:h-auto">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  layout="fill"
                  className="object-cover"
                />
              </div>
              <div className="p-6 sm:w-1/2">
                <h3 className="font-bold text-xl">{article.title}</h3>
                <p className="text-gray-600 mt-2">{article.excerpt}</p>
                <p className="text-gray-500 text-sm mt-4">By {article.author}</p>
                <button className="mt-6 px-6 py-2 bg-green-700 text-white rounded-full hover:bg-green-800">
                  Read More
                </button>
              </div>
            </a>
          </Link>
        </section>
      )}
    </div>
)
}
