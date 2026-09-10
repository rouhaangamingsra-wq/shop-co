import userService from '../services/userService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * GET /api/users  (admin)
 */
export const list = asyncHandler(async (_req, res) => {
  const users = await userService.listUsers();
  res.json({ success: true, users });
});

/**
 * GET /api/users/:id  (admin)
 */
export const getOne = asyncHandler(async (req, res) => {
  const user = await userService.getUser(req.params.id);
  res.json({ success: true, user });
});

/**
 * POST /api/users  (admin)
 */
export const create = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json({ success: true, user });
});

/**
 * PUT /api/users/:id  (admin)
 */
export const update = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.json({ success: true, user });
});

/**
 * DELETE /api/users/:id  (admin)
 */
export const remove = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.json({ success: true, id: req.params.id });
});

export default { list, getOne, create, update, remove };
