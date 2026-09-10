/**
 * Custom API error class carrying an HTTP status code.
 */
export class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code.
   * @param {string} message - Human-readable error message.
   */
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
