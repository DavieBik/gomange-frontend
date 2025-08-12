// components/layout/Footer.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary-800 text-white pt-16 pb-10">
      <div className="container mx-auto px-4">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Logo + Descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <Image
                src="/images/logo-1-black.png"
                alt="GoMange Logo"
                width={180}
                height={60}
                className="h-auto w-auto"
              />
            </div>
            <p className="text-gray-200 mb-6 max-w-md font-medium text-lg">
              Find amazing restaurants and curated dining experiences in your city — all in one place.
            </p>

            {/* Redes sociales */}
            <div className="flex space-x-4 mb-6">
              {[
                { name: 'Instagram', icon: 'fa-instagram', href: '#' },
                { name: 'Twitter', icon: 'fa-twitter', href: '#' },
                { name: 'Facebook', icon: 'fa-facebook', href: '#' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-secondary transition-colors p-2 rounded-full hover:bg-secondary/10"
                  aria-label={social.name}
                >
                  <i className={`fab ${social.icon} text-xl`}></i>
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>

            {/* Newsletter (opcional) */}
            <div className="mt-6">
              <h4 className="text-base font-bold text-white uppercase tracking-wider mb-3">
                Stay Updated
              </h4>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="px-4 py-3 rounded-lg bg-primary-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-white placeholder-gray-400 font-medium"
                />
                <button
                  type="submit"
                  className="bg-secondary hover:bg-secondary-600 text-white font-bold px-6 py-3 rounded-lg whitespace-nowrap transition-colors shadow-md hover:shadow-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Restaurants', href: '/restaurants' },
                { label: 'Collections', href: '/collections' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors font-medium text-base hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Legal</h3>
            <ul className="space-y-3">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Accessibility'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors font-medium text-base hover:translate-x-1 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Información adicional */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-base font-medium text-center md:text-left mb-4 md:mb-0">
            © {new Date().getFullYear()} <span className="font-bold text-white">GoMange</span>. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-base text-gray-300">
            <Link href="/terms" className="hover:text-white transition-colors font-medium hover:underline">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors font-medium hover:underline">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors font-medium hover:underline">
              Cookie Preferences
            </Link>
            <Link href="/support" className="hover:text-white transition-colors font-medium hover:underline">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}