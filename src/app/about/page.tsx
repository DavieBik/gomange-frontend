// app/about/page.tsx

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-20 px-4 pt-32">
      <div className="max-w-2xl w-full flex flex-col items-center">
        <img
          src="/images/logo-1.png"
          alt="GoMange Team"
          className="w-40 h-40 object-contain rounded-full shadow-lg mb-8 border-4 border-primary bg-white"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 text-center">About <span className="text-secondary font-lobster font-light text-5xl md:text-6xl lg:text-7xl inline-block align-middle">GoMange</span></h1>
        <p className="max-w-xl text-lg text-gray-700 mb-6 text-center">
          A platform created for food lovers and culinary explorers. Our mission is to connect people with unique, authentic, and memorable restaurants and experiences.
        </p>
        <div className="bg-primary/5 rounded-xl p-6 mb-6 shadow-inner text-center">
          <p className="text-primary font-semibold text-xl mb-2">Why choose us?</p>
          <p className="text-gray-700">We believe every meal can be an adventure. From hidden gems to award-winning spots, we want you to discover the best of local and international cuisine.</p>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-8 mt-10 items-center justify-center">
          <div className="flex-1 flex flex-col items-center">
            <img src="/placeholder/chinese.jpg" alt="Chinese cuisine" className="rounded-2xl shadow-xl object-cover w-full max-w-md h-64 mb-4" />
            <p className="text-lg text-gray-700 font-semibold text-center">Exquisite Asian Flavors</p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <img src="/placeholder/coffee.jpg" alt="Coffee experience" className="rounded-2xl shadow-xl object-cover w-full max-w-md h-64 mb-4" />
            <p className="text-lg text-gray-700 font-semibold text-center">Cozy Cafés & Coffee Moments</p>
          </div>
        </div>
        <div className="mt-10 max-w-xl text-gray-600 text-center space-y-4">
          <p>
            Our team is made up of people passionate about food, diversity, and technology. We aim to inspire, connect, and celebrate food culture in all its forms.
          </p>
          <p>
            Have questions or suggestions? <span className="font-semibold text-primary">Contact us and become part of the GoMange community!</span>
          </p>
        </div>
      </div>
    </div>
  )
}
