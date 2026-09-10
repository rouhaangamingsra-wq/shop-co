import { firebaseEnabled, auth } from '../config/firebase.js';
import userService from '../services/userService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';

/**
 * POST /api/auth/verify
 * Verifies the Bearer token in the Authorization header and returns the
 * decoded user info. Creates a user record on first login (mock + firebase).
 */
export const verifyToken = asyncHandler(async (req, res) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';

  if (!token) {
    throw new ApiError(401, 'No token provided.');
  }

  let decoded;
  try {
    decoded = await auth.verifyIdToken(token);
  } catch {
    throw new ApiError(401, 'Invalid or expired token.');
  }

  // Ensure a user record exists (auto-provision on first verify).
  let user = await userService.findByUid(decoded.uid);
  if (!user) {
    user = await userService.createUser({
      uid: decoded.uid,
      email: decoded.email || 'mock@user.com',
      name: decoded.name || '',
      role: decoded.role || 'user',
    });
  }

  res.json({
    success: true,
    valid: true,
    user: {
      uid: decoded.uid,
      email: decoded.email || user.email,
      role: user.role || decoded.role || 'user',
      name: user.name,
    },
  });
});

/**
 * GET /api/auth/me
 * Returns the profile of the currently authenticated user.
 */
export const getMe = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  let user = await userService.findByUid(uid);

  if (!user) {
    // Provision a minimal profile from the token claims.
    user = await userService.createUser({
      uid,
      email: req.user.email,
      name: '',
      role: req.user.role,
    });
  }

  res.json({ success: true, user });
});

export default { verifyToken, getMe };
