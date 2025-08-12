import Link from 'next/link'
import TabButtons from './TabButtons'

interface EditorialCollectionCardProps {
  title: string
  description: string
  image: string
  restaurantCount: number
  slug: string
  restaurants: { _id: string; name: string }[]
}

export default function EditorialCollectionCard({
  title,
  description,
  image,
  restaurantCount,
  slug,
  restaurants,
}: EditorialCollectionCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-primary-50 min-w-[260px] max-w-xs flex-shrink-0 flex flex-col items-center p-6 hover:shadow-xl transition-all">
      <div className="w-20 h-20 rounded-full overflow-hidden mb-4 bg-gray-100 border border-primary-100 flex items-center justify-center">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>
      <h3 className="font-bold text-lg text-primary mb-1 text-center">{title}</h3>
      <p className="text-gray-500 text-sm text-center mb-2 line-clamp-2">{description}</p>
      <span className="text-xs text-primary-700 font-semibold bg-primary-50 rounded-full px-3 py-1 mb-2">{restaurantCount} places</span>
      <div className="flex flex-col gap-1 w-full mt-2">
        {restaurants.slice(0, 2).map(r => (
          <span key={r._id} className="text-xs text-gray-700 truncate">• {r.name}</span>
        ))}
        {restaurantCount > 2 && (
          <span className="text-xs text-primary-500">+{restaurantCount - 2} more</span>
        )}
      </div>
     
    </div>
  )
}
