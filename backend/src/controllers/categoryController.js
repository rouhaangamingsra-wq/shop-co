import categoryService from '../services/categoryService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const list = asyncHandler(async (_req, res) => {
  const items = await categoryService.listCategories();
  res.json({ success: true, items });
});

export const getOne = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategory(req.params.id);
  res.json({ success: true, category });
});

export const create = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(201).json({ success: true, category });
});

export const update = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(req.params.id, req.body);
  res.json({ success: true, category });
});

export const remove = asyncHandler(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);
  res.json({ success: true, id: req.params.id });
});

export default { list, getOne, create, update, remove };
