'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, X } from 'lucide-react'

interface ReviewFormProps {
  productId: string
  productName: string
  onClose: () => void
  onReviewSubmitted: () => void
}

export default function ReviewForm({
  productId,
  productName,
  onClose,
  onReviewSubmitted,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      setError('Please select a rating.')
      return
    }
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, rating, comment}),
      })

      if (!response.ok) {
        let errorMessage = 'Failed to submit review.'
        try {
          // Try to parse the error response as JSON
          const errorData = await response.json()
          console.log(response.json(), errorData.error)
          errorMessage = errorData.error || errorMessage
        } catch (e) {
          // If parsing fails, use the raw response text
          errorMessage = await response.text()
        }
        throw new Error(errorMessage)
      }

      onReviewSubmitted() // Notify parent component
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose} // Close on clicking the background
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onMouseDown={(e) => e.stopPropagation()} // Prevent background click from triggering when clicking on the form
        className="bg-white rounded-lg p-8 w-full max-w-md relative text-gray-800 shadow-xl"
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-light mb-1">Leave a review for</h2>
        <p className="text-lg font-semibold text-gray-600 mb-6">{productName}</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">Your Rating</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={28}
                  className={ star <= (hoverRating || rating) ? 'cursor-pointer text-amber-400 fill-amber-400' : ' cursor-pointer text-gray-300'}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your thoughts..." className="w-full p-3 border border-gray-300 rounded-md mb-4 h-28 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition" />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button type="submit" disabled={isSubmitting} className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-700 disabled:bg-gray-400 transition-colors font-semibold">{isSubmitting ? 'Submitting...' : 'Submit Review'}</button>
        </form>
      </motion.div>
    </motion.div>
  )
}