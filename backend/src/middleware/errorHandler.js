import ApiError from '../utils/ApiError.js';

/**
 * Central error-handling middleware.
 * Converts unknown errors into a generic 500 and renders ApiError payloads
 * consistently.
 *
 * @param {Error|ApiError} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} _next
 */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, _next) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err instanceof ApiError ? err.message : 'Internal server error';

  if (statusCode >= 500) {
    // eslint-disable-next-line no-console
    console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(err.errors ? { errors: err.errors } : {}),
    ...(process.env.NODE_ENV !== 'production' && statusCode >= 500
      ? { stack: err.stack }
      : {}),
  });
};

export default errorHandler;
