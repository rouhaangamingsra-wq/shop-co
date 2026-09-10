/**
 * Wraps an async Express route handler so rejected promises are forwarded
 * to Express' error-handling middleware via next(err).
 *
 * @param {Function} fn - Async controller function (req, res, next).
 * @returns {Function} Express middleware.
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
