import { validationResult } from 'express-validator';
import ApiError from '../utils/ApiError.js';

/**
 * Express middleware that checks express-validator results and throws an
 * ApiError(422) with the aggregated validation errors when validation fails.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} _res
 * @param {Function} next
 */
export const validate = (req, _res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const formatted = errors.array().map((e) => ({
    field: e.path,
    message: e.msg,
  }));

  const err = new ApiError(422, 'Validation failed');
  err.errors = formatted;
  next(err);
};

export default validate;
