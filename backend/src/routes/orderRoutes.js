import { Router } from 'express';
import { body } from 'express-validator';
import orderController from '../controllers/orderController.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// All order endpoints require authentication
router.use(verifyToken);

// GET /api/orders — admin sees all, user sees own
router.get('/', orderController.list);

// GET /api/orders/:id
router.get('/:id', orderController.getOne);

// POST /api/orders
router.post(
  '/',
  [body('items').isArray({ min: 1 }).withMessage('items must be a non-empty array')],
  validate,
  orderController.create
);

// PUT /api/orders/:id/status — admin only
router.put('/:id/status', requireAdmin, orderController.updateStatus);

export default router;
