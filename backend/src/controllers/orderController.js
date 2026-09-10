import orderService from '../services/orderService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';

/**
 * GET /api/orders  (auth; admin sees all, user sees own)
 */
export const list = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === 'admin';
  const orders = await orderService.listOrders({
    userId: req.user.uid,
    isAdmin,
  });
  res.json({ success: true, orders });
});

/**
 * GET /api/orders/:id  (auth)
 */
export const getOne = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === 'admin';
  const order = await orderService.getOrder(req.params.id, {
    userId: req.user.uid,
    isAdmin,
  });
  res.json({ success: true, order });
});

/**
 * POST /api/orders  (auth)
 */
export const create = asyncHandler(async (req, res) => {
  const { items, shippingAddress } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    throw new ApiError(400, 'Order must contain at least one item.');
  }
  const order = await orderService.createOrder({
    userId: req.user.uid,
    items,
    shippingAddress,
  });
  res.status(201).json({ success: true, order });
});

/**
 * PUT /api/orders/:id/status  (admin)
 */
export const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!status) throw new ApiError(400, 'status is required.');
  const order = await orderService.updateOrderStatus(req.params.id, status);
  res.json({ success: true, order });
});

export default { list, getOne, create, updateStatus };
