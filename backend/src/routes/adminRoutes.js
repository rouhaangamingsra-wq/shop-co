import { Router } from 'express';
import adminController from '../controllers/adminController.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

// All admin endpoints require auth + admin role
router.use(verifyToken, requireAdmin);

// GET /api/admin/stats
router.get('/stats', adminController.getStats);

export default router;
