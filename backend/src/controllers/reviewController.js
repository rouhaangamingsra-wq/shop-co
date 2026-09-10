import reviewService from '../services/reviewService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';

/**
 * GET /api/reviews/:productId
 * List all reviews for a product.
 */
export const listByProduct = asyncHandler(async (req, res) => {
  const reviews = await reviewService.listReviewsByProduct(req.params.productId);
  res.json({ success: true, reviews });
});

/**
 * POST /api/reviews  (auth)
 */
export const create = asyncHandler(async (req, res) => {
  const { productId, rating, title, comment } = req.body;
  if (!productId) throw new ApiError(400, 'productId is required.');
  if (rating == null || Number(rating) < 1 || Number(rating) > 5) {
    throw new ApiError(400, 'rating must be between 1 and 5.');
  }
  const review = await reviewService.createReview({
    productId,
    userId: req.user.uid,
    userName: req.user.name || req.user.email || 'Anonymous',
    rating: Number(rating),
    title,
    comment,
  });
  res.status(201).json({ success: true, review });
});

export default { listByProduct, create };
