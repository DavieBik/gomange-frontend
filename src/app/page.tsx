'use client'

import { useEffect, useState } from 'react'
import Loading from '@/components/ui/Loading'
import HomePageContent from '@/components/features/HomePageContent'

export default function HomePage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900) 
  }, [])

  return loading ? (
    <Loading />
  ) : (
    <HomePageContent />
  )
}