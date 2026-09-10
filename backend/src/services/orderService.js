import { firebaseEnabled, db } from '../config/firebase.js';
import { mockStore } from '../utils/mockStore.js';
import ApiError from '../utils/ApiError.js';

const COLLECTION = 'orders';

/**
 * List orders. Admins see all; regular users see only their own orders.
 * @param {object} options
 * @param {string} [options.userId] - restrict to a user's orders
 * @param {boolean} [options.isAdmin] - whether caller is admin
 * @returns {Promise<object[]>}
 */
export async function listOrders({ userId, isAdmin } = {}) {
  if (firebaseEnabled) {
    let snap;
    if (isAdmin) {
      snap = await db.collection(COLLECTION).get();
    } else {
      snap = await db.collection(COLLECTION).where('userId', '==', userId).get();
    }
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
  let orders = Array.from(mockStore.orders.values());
  if (!isAdmin) orders = orders.filter((o) => o.userId === userId);
  return orders;
}

/**
 * Get a single order by id. Regular users may only fetch their own orders.
 * @param {string} id
 * @param {object} [opts]
 * @param {string} [opts.userId]
 * @param {boolean} [opts.isAdmin]
 * @returns {Promise<object>}
 */
export async function getOrder(id, { userId, isAdmin } = {}) {
  if (firebaseEnabled) {
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (!doc.exists) throw new ApiError(404, 'Order not found');
    const order = { id: doc.id, ...doc.data() };
    if (!isAdmin && order.userId !== userId) {
      throw new ApiError(403, 'You do not have access to this order.');
    }
    return order;
  }
  const order = mockStore.orders.get(id);
  if (!order) throw new ApiError(404, 'Order not found');
  if (!isAdmin && order.userId !== userId) {
    throw new ApiError(403, 'You do not have access to this order.');
  }
  return order;
}

/**
 * Create a new order.
 * @param {object} data
 * @param {string} data.userId
 * @param {object[]} data.items
 * @param {object} [data.shippingAddress]
 * @returns {Promise<object>}
 */
export async function createOrder(data) {
  const ts = new Date().toISOString();
  const items = (data.items || []).map((it) => ({
    productId: it.productId,
    name: it.name || '',
    price: Number(it.price) || 0,
    quantity: Number(it.quantity) || 1,
    size: it.size || null,
    color: it.color || null,
  }));
  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const payload = {
    userId: data.userId,
    items,
    total,
    status: data.status || 'pending',
    shippingAddress: data.shippingAddress || {},
    createdAt: ts,
    updatedAt: ts,
  };

  if (firebaseEnabled) {
    const ref = await db.collection(COLLECTION).add(payload);
    return { id: ref.id, ...payload };
  }
  const id = mockStore.nextId('o');
  const order = { id, ...payload };
  mockStore.orders.set(id, order);
  return order;
}

/**
 * Update the status of an order.
 * @param {string} id
 * @param {string} status
 * @returns {Promise<object>}
 */
export async function updateOrderStatus(id, status) {
  if (firebaseEnabled) {
    const ref = db.collection(COLLECTION).doc(id);
    const doc = await ref.get();
    if (!doc.exists) throw new ApiError(404, 'Order not found');
    const update = { status, updatedAt: new Date().toISOString() };
    await ref.update(update);
    return { id, ...doc.data(), ...update };
  }
  const order = mockStore.orders.get(id);
  if (!order) throw new ApiError(404, 'Order not found');
  const updated = { ...order, status, updatedAt: new Date().toISOString() };
  mockStore.orders.set(id, updated);
  return updated;
}

export default { listOrders, getOrder, createOrder, updateOrderStatus };
