import { useState } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { addReviewAPI } from '@/lib/sanity' // <-- Importa la función

interface AddReviewModalProps {
  restaurantId: string
  onClose: () => void
  onReviewAdded?: () => void 
}

export default function AddReviewModal({ restaurantId, onClose, onReviewAdded }: AddReviewModalProps) {
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const cleanId = restaurantId.startsWith('drafts.') ? restaurantId.replace('drafts.', '') : restaurantId;
      console.log('Sending review to:', cleanId)
      const data = await addReviewAPI(cleanId, author, rating, comment)
      console.log('Backend response:', data)
      setSuccess(true)
      if (onReviewAdded) onReviewAdded()
    } catch (err: any) {
      console.error('Error submitting review:', err)
      setError('Could not submit review. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl"
          onClick={onClose}
          aria-label="Close"
        >×</button>
        <h3 className="text-lg font-bold mb-3 text-primary-700 text-center">Add Review</h3>
        {success ? (
          <div className="text-primary-600 font-semibold text-center mb-2">Thank you for your review!</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your name"
              className="border rounded px-3 py-2"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              required
            />
            <div className="flex items-center gap-1 justify-center mb-2">
              {[1,2,3,4,5].map(val => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setRating(val)}
                  className="focus:outline-none"
                  aria-label={`Rate ${val} star${val > 1 ? 's' : ''}`}
                >
                  <StarIcon
                    className={`w-7 h-7 ${val <= rating ? 'text-secondary-400' : 'text-gray-300'}`}
                  />
                </button>
              ))}
            </div>
            <textarea
              placeholder="Your comment"
              className="border rounded px-3 py-2"
              value={comment}
              onChange={e => setComment(e.target.value)}
              required
              rows={3}
            />
            <button
              type="submit"
              className="bg-primary-600 text-white font-bold rounded-full px-4 py-2 mt-2 hover:bg-primary-700 transition"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Submit'}
            </button>
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          </form>
        )}
      </div>
    </div>
  )
}