import { firebaseEnabled, auth } from '../config/firebase.js';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Extract a Bearer token from the Authorization header.
 * @param {import('express').Request} req
 * @returns {string|null}
 */
const extractToken = (req) => {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  if (scheme === 'Bearer' && token) return token.trim();
  return null;
};

/**
 * Require a valid Firebase ID token (or any non-empty token in mock mode).
 * Sets `req.user = { uid, email, role }`.
 */
export const verifyToken = asyncHandler(async (req, _res, next) => {
  const token = extractToken(req);
  if (!token) {
    throw new ApiError(401, 'Authentication required. Provide a Bearer token.');
  }

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email || 'mock@user.com',
      role: decoded.role || (decoded.admin === true ? 'admin' : 'user'),
    };
    next();
  } catch (err) {
    throw new ApiError(401, 'Invalid or expired token.');
  }
});

/**
 * Optional auth: attach `req.user` if a valid token is present, but never fail.
 */
export const optionalAuth = asyncHandler(async (req, _res, next) => {
  const token = extractToken(req);
  if (!token) return next();
  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email || 'mock@user.com',
      role: decoded.role || (decoded.admin === true ? 'admin' : 'user'),
    };
  } catch {
    // ignore — leave req.user unset
  }
  next();
});

/**
 * Require the authenticated user to have role "admin".
 */
export const requireAdmin = (req, _res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new ApiError(403, 'Admin access required.'));
  }
  next();
};

export { firebaseEnabled };
