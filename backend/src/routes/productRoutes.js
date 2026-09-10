import { Router } from 'express';
import { body } from 'express-validator';
import productController from '../controllers/productController.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// GET /api/products — public list with pagination/filter/sort
router.get('/', productController.list);

// GET /api/products/:id — public
router.get('/:id', productController.getOne);

// POST /api/products — admin
router.post(
  '/',
  verifyToken,
  requireAdmin,
  [
    body('name').notEmpty().withMessage('name is required'),
    body('price').isFloat({ min: 0 }).withMessage('price must be a non-negative number'),
  ],
  validate,
  productController.create
);

// PUT /api/products/:id — admin
router.put('/:id', verifyToken, requireAdmin, productController.update);

// DELETE /api/products/:id — admin
router.delete('/:id', verifyToken, requireAdmin, productController.remove);

export default router;
