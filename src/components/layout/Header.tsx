'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface NavLink {
  name: string
  href: string
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'Restaurants', href: '/restaurants' },
    { name: 'Collections', href: '/collections' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="mx-auto px-4 sm:px-6 w-full">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center h-full">
            <Image
              src="/images/logo/logo.png"
              alt="GoMange Logo"
              height={180}
              width={150}
              priority
              className="object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-gray-700 hover:text-primary font-medium transition-colors px-1 py-2 ${
                  pathname === link.href ? 'text-primary' : ''
                }`}
              >
                {link.name}
                {pathname === link.href && (
                  <span className="absolute left-0 bottom-0 w-full h-1 bg-primary rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Fondo sólido para mejor contraste */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white/95 backdrop-blur-md rounded-lg shadow-lg mt-2 transition-all duration-300`}>
          <div className="pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-md text-lg font-medium transition-colors relative ${
                  pathname === link.href 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
                {pathname === link.href && (
                  <span className="absolute left-4 right-4 bottom-2 h-0.5 bg-primary rounded-full"></span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}