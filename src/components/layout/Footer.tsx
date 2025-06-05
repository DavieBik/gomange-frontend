import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <Image
                src="/images/logo/logo-white.png" 
                alt="GoMange Logo"
                width={160}
                height={60}
                className="h-auto w-auto"
              />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Discover the best restaurants and culinary collections in your city.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'instagram'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social}
                >
                  <span className="sr-only">{social}</span>
                  <i className={`fab fa-${social} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Restaurants', 'Collections', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {['Terms', 'Privacy', 'Cookies'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} GoMange. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}