import { firebaseEnabled, db } from '../config/firebase.js';
import { mockStore } from '../utils/mockStore.js';

/**
 * Aggregate dashboard statistics for the admin panel.
 *
 * Returns:
 *   - totalRevenue, totalOrders, totalUsers, totalProducts
 *   - recentOrders (latest 5)
 *   - recentUsers (latest 5)
 *   - salesOverTime (last 6 months, [{month, revenue}])
 *
 * @returns {Promise<object>}
 */
export async function getStats() {
  if (firebaseEnabled) {
    const [ordersSnap, usersSnap, productsSnap] = await Promise.all([
      db.collection('orders').get(),
      db.collection('users').get(),
      db.collection('products').get(),
    ]);

    const orders = ordersSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    const users = usersSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    const products = productsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

    return buildStats(orders, users, products);
  }

  const orders = Array.from(mockStore.orders.values());
  const users = Array.from(mockStore.users.values());
  const products = Array.from(mockStore.products.values());
  return buildStats(orders, users, products);
}

/**
 * Build the stats payload from in-memory arrays.
 * @param {object[]} orders
 * @param {object[]} users
 * @param {object[]} products
 * @returns {object}
 */
function buildStats(orders, users, products) {
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);
  const totalOrders = orders.length;
  const totalUsers = users.length;
  const totalProducts = products.length;

  const sortByDate = (a, b) =>
    new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();

  const recentOrders = [...orders].sort(sortByDate).slice(0, 5);
  const recentUsers = [...users].sort(sortByDate).slice(0, 5);

  // Sales over the last 6 months
  const salesOverTime = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleString('default', { month: 'short' });
    const revenue = orders
      .filter((o) => {
        const od = new Date(o.createdAt || 0);
        return od.getFullYear() === d.getFullYear() && od.getMonth() === d.getMonth();
      })
      .reduce((sum, o) => sum + Number(o.total || 0), 0);
    salesOverTime.push({ month: label, revenue });
  }

  return {
    totalRevenue,
    totalOrders,
    totalUsers,
    totalProducts,
    recentOrders,
    recentUsers,
    salesOverTime,
  };
}

export default { getStats };
