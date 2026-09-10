import { Router } from 'express';
import { body } from 'express-validator';
import reviewController from '../controllers/reviewController.js';
import { verifyToken } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// GET /api/reviews/:productId — public
router.get('/:productId', reviewController.listByProduct);

// POST /api/reviews — auth required
router.post(
  '/',
  verifyToken,
  [
    body('productId').notEmpty().withMessage('productId is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('rating must be 1-5'),
  ],
  validate,
  reviewController.create
);

export default router;
