// app/collections/[slug]/not-found.tsx

import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function CollectionNotFound() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      <Header />
      
      <div className="h-24"></div>
      
      <section className="relative py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-8xl mb-8">🔍</div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Collection Not Found
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              The collection you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="space-y-4">
              <Link href="/collections" className="btn-primary block">
                Browse All Collections
              </Link>
              
              <Link href="/" className="btn-secondary block">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
