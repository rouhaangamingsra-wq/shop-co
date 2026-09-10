import { firebaseEnabled, db } from '../config/firebase.js';
import { mockStore } from '../utils/mockStore.js';
import ApiError from '../utils/ApiError.js';

const COLLECTION = 'reviews';

/**
 * List all reviews for a given product.
 * @param {string} productId
 * @returns {Promise<object[]>}
 */
export async function listReviewsByProduct(productId) {
  if (firebaseEnabled) {
    const snap = await db.collection(COLLECTION).where('productId', '==', productId).get();
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
  return Array.from(mockStore.reviews.values()).filter((r) => r.productId === productId);
}

/**
 * Create a new review.
 * @param {object} data
 * @param {string} data.productId
 * @param {string} data.userId
 * @param {string} [data.userName]
 * @param {number} data.rating
 * @param {string} [data.title]
 * @param {string} [data.comment]
 * @returns {Promise<object>}
 */
export async function createReview(data) {
  const ts = new Date().toISOString();
  const payload = {
    productId: data.productId,
    userId: data.userId,
    userName: data.userName || 'Anonymous',
    rating: Number(data.rating),
    title: data.title || '',
    comment: data.comment || '',
    createdAt: ts,
  };

  if (firebaseEnabled) {
    const ref = await db.collection(COLLECTION).add(payload);
    return { id: ref.id, ...payload };
  }
  const id = mockStore.nextId('r');
  const review = { id, ...payload };
  mockStore.reviews.set(id, review);
  return review;
}

export default { listReviewsByProduct, createReview };
