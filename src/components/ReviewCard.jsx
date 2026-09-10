import RatingStars from './RatingStars'

export default function ReviewCard({ review }) {
  return (
    <div className="card w-[300px] shrink-0 p-5 sm:w-[360px]">
      <RatingStars value={review.rating} size={18} />
      <h4 className="mt-3 text-base font-semibold text-ink">{review.userName}</h4>
      <p className="mt-2 text-sm text-muted">{review.comment}</p>
      <p className="mt-3 text-xs text-faint">{new Date(review.createdAt).toLocaleDateString()}</p>
    </div>
  )
}
