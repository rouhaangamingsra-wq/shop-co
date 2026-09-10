import productService from '../services/productService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * GET /api/products
 * List products with pagination / filtering / sorting.
 */
export const list = asyncHandler(async (req, res) => {
  const result = await productService.listProducts(req.query);
  res.json({ success: true, ...result });
});

/**
 * GET /api/products/:id
 */
export const getOne = asyncHandler(async (req, res) => {
  const product = await productService.getProduct(req.params.id);
  res.json({ success: true, product });
});

/**
 * POST /api/products  (admin)
 */
export const create = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(201).json({ success: true, product });
});

/**
 * PUT /api/products/:id  (admin)
 */
export const update = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  res.json({ success: true, product });
});

/**
 * DELETE /api/products/:id  (admin)
 */
export const remove = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.json({ success: true, id: req.params.id });
});

export default { list, getOne, create, update, remove };
