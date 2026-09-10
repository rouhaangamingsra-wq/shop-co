import { Router } from 'express';
import categoryController from '../controllers/categoryController.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public read
router.get('/', categoryController.list);
router.get('/:id', categoryController.getOne);

// Admin write
router.post('/', verifyToken, requireAdmin, categoryController.create);
router.put('/:id', verifyToken, requireAdmin, categoryController.update);
router.delete('/:id', verifyToken, requireAdmin, categoryController.remove);

export default router;
