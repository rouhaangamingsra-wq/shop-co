import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../controllers/userController.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// All user management endpoints are admin-only
router.use(verifyToken, requireAdmin);

// GET /api/users
router.get('/', userController.list);

// GET /api/users/:id
router.get('/:id', userController.getOne);

// POST /api/users
router.post(
  '/',
  [body('email').isEmail().withMessage('a valid email is required')],
  validate,
  userController.create
);

// PUT /api/users/:id
router.put('/:id', userController.update);

// DELETE /api/users/:id
router.delete('/:id', userController.remove);

export default router;
