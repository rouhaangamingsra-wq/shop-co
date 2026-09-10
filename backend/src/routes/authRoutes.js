import { Router } from 'express';
import authController from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/verify — accepts Bearer token, returns validity + user
router.post('/verify', authController.verifyToken);

// GET /api/auth/me — current user profile (requires auth)
router.get('/me', verifyToken, authController.getMe);

export default router;
