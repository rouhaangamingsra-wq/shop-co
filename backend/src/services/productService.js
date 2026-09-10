import { firebaseEnabled, db } from '../config/firebase.js';
import { mockStore } from '../utils/mockStore.js';
import ApiError from '../utils/ApiError.js';

const COLLECTION = 'products';

/**
 * Apply filter/sort/pagination options to a list of products.
 * @param {object[]} list
 * @param {object} q - query options
 * @returns {{items, total, page, limit, totalPages}}
 */
const applyQuery = (list, q = {}) => {
  let items = [...list];

  if (q.category) items = items.filter((p) => p.category === q.category);
  if (q.dressStyle) items = items.filter((p) => p.dressStyle === q.dressStyle);
  if (q.featured === 'true') items = items.filter((p) => p.featured);
  if (q.newArrival === 'true') items = items.filter((p) => p.newArrival);
  if (q.topSelling === 'true') items = items.filter((p) => p.topSelling);
  if (q.color) items = items.filter((p) => (p.colors || []).includes(q.color));
  if (q.size) items = items.filter((p) => (p.sizes || []).includes(q.size));
  if (q.minPrice != null) items = items.filter((p) => p.price >= Number(q.minPrice));
  if (q.maxPrice != null) items = items.filter((p) => p.price <= Number(q.maxPrice));
  if (q.search) {
    const s = String(q.search).toLowerCase();
    items = items.filter(
      (p) =>
        (p.title || p.name || '').toLowerCase().includes(s) ||
        (p.description || '').toLowerCase().includes(s) ||
        (p.category || '').toLowerCase().includes(s)
    );
  }

  // Sorting
  const sort = q.sort || 'createdAt:desc';
  const [field, dir] = sort.split(':');
  const factor = dir === 'asc' ? 1 : -1;
  items.sort((a, b) => {
    const av = a[field];
    const bv = b[field];
    if (av == null) return 1;
    if (bv == null) return -1;
    if (typeof av === 'string') return av.localeCompare(bv) * factor;
    return (av - bv) * factor;
  });

  const total = items.length;
  const page = Math.max(1, parseInt(q.page, 10) || 1);
  const limit = Math.max(1, parseInt(q.limit, 10) || 10);
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paged = items.slice(start, start + limit);

  return { items: paged, total, page, limit, totalPages };
};

/**
 * List products with filtering, sorting and pagination.
 * @param {object} query
 * @returns {Promise<object>}
 */
export async function listProducts(query) {
  if (firebaseEnabled) {
    let snap = await db.collection(COLLECTION).get();
    const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return applyQuery(all, query);
  }
  const all = Array.from(mockStore.products.values());
  return applyQuery(all, query);
}

/**
 * Get a single product by id.
 * @param {string} id
 * @returns {Promise<object>}
 */
export async function getProduct(id) {
  if (firebaseEnabled) {
    // Try direct doc lookup first, then by slug
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (doc.exists) return { id: doc.id, ...doc.data() };
    const slugSnap = await db.collection(COLLECTION).where('slug', '==', id).limit(1).get();
    if (!slugSnap.empty) return { id: slugSnap.docs[0].id, ...slugSnap.docs[0].data() };
    throw new ApiError(404, 'Product not found');
  }
  const byId = mockStore.products.get(id);
  if (byId) return byId;
  for (const p of mockStore.products.values()) {
    if (p.slug === id) return p;
  }
  throw new ApiError(404, 'Product not found');
}

/**
 * Create a new product.
 * @param {object} data
 * @returns {Promise<object>}
 */
export async function createProduct(data) {
  const ts = new Date().toISOString();
  const payload = {
    title: data.title || data.name || '',
    slug: data.slug || data.title?.toLowerCase().replace(/\s+/g, '-') || '',
    description: data.description || '',
    price: Number(data.price),
    originalPrice: data.originalPrice ? Number(data.originalPrice) : null,
    discountPercentage: data.discountPercentage ? Number(data.discountPercentage) : null,
    category: data.category || 'Misc',
    dressStyle: data.dressStyle || 'Casual',
    colors: data.colors || [],
    sizes: data.sizes || [],
    images: data.images || [],
    featured: Boolean(data.featured),
    newArrival: Boolean(data.newArrival),
    topSelling: Boolean(data.topSelling),
    stock: Number(data.stock ?? 0),
    rating: Number(data.rating ?? 0),
    reviewCount: Number(data.reviewCount ?? 0),
    createdAt: ts,
    updatedAt: ts,
  };

  if (firebaseEnabled) {
    const ref = await db.collection(COLLECTION).add(payload);
    return { id: ref.id, ...payload };
  }
  const id = mockStore.nextId('p');
  const product = { id, ...payload };
  mockStore.products.set(id, product);
  return product;
}

/**
 * Update an existing product.
 * @param {string} id
 * @param {object} data
 * @returns {Promise<object>}
 */
export async function updateProduct(id, data) {
  if (firebaseEnabled) {
    const ref = db.collection(COLLECTION).doc(id);
    const doc = await ref.get();
    if (!doc.exists) throw new ApiError(404, 'Product not found');
    const update = { ...data, updatedAt: new Date().toISOString() };
    await ref.update(update);
    return { id, ...doc.data(), ...update };
  }
  const product = mockStore.products.get(id);
  if (!product) throw new ApiError(404, 'Product not found');
  const updated = { ...product, ...data, updatedAt: new Date().toISOString() };
  mockStore.products.set(id, updated);
  return updated;
}

/**
 * Delete a product.
 * @param {string} id
 * @returns {Promise<{id:string}>}
 */
export async function deleteProduct(id) {
  if (firebaseEnabled) {
    const ref = db.collection(COLLECTION).doc(id);
    const doc = await ref.get();
    if (!doc.exists) throw new ApiError(404, 'Product not found');
    await ref.delete();
    return { id };
  }
  if (!mockStore.products.has(id)) throw new ApiError(404, 'Product not found');
  mockStore.products.delete(id);
  return { id };
}

export default { listProducts, getProduct, createProduct, updateProduct, deleteProduct };
