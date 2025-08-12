// app/restaurant/[id]/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-8"></div>
        
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
          Restaurant Not Found
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the restaurant you're looking for. It might have been removed or the link is incorrect.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-primary hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            ← Back to Home
          </Link>
          
          <div className="text-gray-500">
            <p>or</p>
          </div>
          
          <Link
            href="/#restaurant-list"
            className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Browse All Restaurants
          </Link>
        </div>
      </div>
    </div>
  )
}
