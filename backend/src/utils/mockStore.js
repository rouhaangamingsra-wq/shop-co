/**
 * In-memory data store used by services when running in mock mode
 * (i.e. when Firebase credentials are not configured).
 *
 * Seeded with a few sample products, users, orders and reviews so the API
 * returns realistic-looking data out of the box.
 */

const now = () => new Date().toISOString();

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`;

// ---- Seed products ---------------------------------------------------------
const seedProducts = [
  {
    id: 'p1',
    title: 'One Life Graphic T-Shirt',
    slug: 'one-life-graphic-tshirt',
    description: 'A soft cotton graphic tee with a relaxed fit. Designed for everyday wear with a bold front print.',
    price: 52,
    originalPrice: 80,
    discountPercentage: 35,
    category: 'T-Shirts',
    dressStyle: 'Casual',
    colors: ['#000000', '#6B7280', '#FFFFFF'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [img('photo-1521572163474-6864f9cf17ab'), img('photo-1583743814966-8936f5b7be1a')],
    featured: true,
    newArrival: true,
    topSelling: true,
    stock: 42,
    rating: 4.5,
    reviewCount: 128,
    createdAt: '2024-01-10T00:00:00.000Z',
    updatedAt: '2024-01-10T00:00:00.000Z',
  },
  {
    id: 'p2',
    title: 'Classic Denim Jacket',
    slug: 'classic-denim-jacket',
    description: 'Timeless denim jacket cut from durable cotton twill. A versatile layer that pairs with everything.',
    price: 120,
    originalPrice: 160,
    discountPercentage: 25,
    category: 'Jackets',
    dressStyle: 'Casual',
    colors: ['#1E3A8A', '#000000', '#9CA3AF'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [img('photo-1551028719-17967fc24d53'), img('photo-1591047139829-d91aecb6caea')],
    featured: true,
    newArrival: false,
    topSelling: true,
    stock: 18,
    rating: 4.8,
    reviewCount: 86,
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-02-01T00:00:00.000Z',
  },
  {
    id: 'p3',
    title: 'Premium Slim Fit Jeans',
    slug: 'premium-slim-fit-jeans',
    description: 'Stretch-comfort slim jeans with a clean silhouette. Crafted to hold shape wear after wear.',
    price: 75,
    originalPrice: 110,
    discountPercentage: 32,
    category: 'Jeans',
    dressStyle: 'Casual',
    colors: ['#1F2937', '#0EA5E9', '#6B7280'],
    sizes: ['28', '30', '32', '34', '36'],
    images: [img('photo-1542272604-787c3835535d'), img('photo-1604176354204-926874782d2a')],
    featured: false,
    newArrival: true,
    topSelling: true,
    stock: 60,
    rating: 4.3,
    reviewCount: 214,
    createdAt: '2024-03-05T00:00:00.000Z',
    updatedAt: '2024-03-05T00:00:00.000Z',
  },
  {
    id: 'p4',
    title: 'Polar Fleece Hoodie',
    slug: 'polar-fleece-hoodie',
    description: 'Cozy polar fleece hoodie with a kangaroo pocket and adjustable hood. Your go-to for off-duty days.',
    price: 90,
    originalPrice: 130,
    discountPercentage: 30,
    category: 'Hoodies',
    dressStyle: 'Gym',
    colors: ['#000000', '#9CA3AF', '#7C3AED'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [img('photo-1556821840-3a16393c20e0'), img('photo-1620799140408-edc6dcb6d633')],
    featured: true,
    newArrival: true,
    topSelling: false,
    stock: 33,
    rating: 4.6,
    reviewCount: 97,
    createdAt: '2024-02-20T00:00:00.000Z',
    updatedAt: '2024-02-20T00:00:00.000Z',
  },
  {
    id: 'p5',
    title: 'Linen Button-Up Shirt',
    slug: 'linen-button-up-shirt',
    description: 'Breathable linen shirt with a relaxed drape. Effortless styling for warm days and smart-casual evenings.',
    price: 68,
    originalPrice: 95,
    discountPercentage: 28,
    category: 'Shirts',
    dressStyle: 'Formal',
    colors: ['#FFFFFF', '#0EA5E9', '#FBBF24'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [img('photo-1602810318383-e386cc2a3ccf'), img('photo-1596755094554-fa8419a8b85f')],
    featured: false,
    newArrival: true,
    topSelling: true,
    stock: 27,
    rating: 4.4,
    reviewCount: 54,
    createdAt: '2024-02-15T00:00:00.000Z',
    updatedAt: '2024-02-15T00:00:00.000Z',
  },
];

// ---- Seed users ------------------------------------------------------------
const seedUsers = [
  {
    id: 'u1',
    uid: 'mock-admin-token',
    name: 'Admin User',
    email: 'admin@shopco.com',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'u2',
    uid: 'mock-user-token',
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'user',
    createdAt: '2024-01-12T00:00:00.000Z',
    updatedAt: '2024-01-12T00:00:00.000Z',
  },
  {
    id: 'u3',
    uid: 'mock-user2-token',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'user',
    createdAt: '2024-02-18T00:00:00.000Z',
    updatedAt: '2024-02-18T00:00:00.000Z',
  },
];

// ---- Seed orders -----------------------------------------------------------
const seedOrders = [
  {
    id: 'o1',
    userId: 'mock-user-token',
    customer: { name: 'Jane Doe', email: 'jane@example.com' },
    items: [
      { productId: 'p1', title: 'One Life Graphic T-Shirt', price: 52, quantity: 2, size: 'M', color: '#000000' },
      { productId: 'p5', title: 'Linen Button-Up Shirt', price: 68, quantity: 1, size: 'L', color: '#FFFFFF' },
    ],
    subtotal: 172,
    shipping: 15,
    discount: 0,
    total: 187,
    status: 'delivered',
    orderStatus: 'delivered',
    paymentStatus: 'paid',
    shippingAddress: { name: 'Jane Doe', line1: '123 Main St', city: 'NYC', zip: '10001', country: 'USA' },
    createdAt: '2024-02-10T00:00:00.000Z',
    updatedAt: '2024-02-10T00:00:00.000Z',
  },
  {
    id: 'o2',
    userId: 'mock-user2-token',
    customer: { name: 'John Smith', email: 'john@example.com' },
    items: [
      { productId: 'p3', title: 'Premium Slim Fit Jeans', price: 75, quantity: 1, size: '32', color: '#1F2937' },
    ],
    subtotal: 75,
    shipping: 0,
    discount: 0,
    total: 75,
    status: 'shipped',
    orderStatus: 'shipped',
    paymentStatus: 'paid',
    shippingAddress: { name: 'John Smith', line1: '45 Oak Ave', city: 'LA', zip: '90001', country: 'USA' },
    createdAt: '2024-03-01T00:00:00.000Z',
    updatedAt: '2024-03-01T00:00:00.000Z',
  },
  {
    id: 'o3',
    userId: 'mock-user-token',
    customer: { name: 'Jane Doe', email: 'jane@example.com' },
    items: [
      { productId: 'p2', title: 'Classic Denim Jacket', price: 120, quantity: 1, size: 'L', color: '#1E3A8A' },
    ],
    subtotal: 120,
    shipping: 15,
    discount: 0,
    total: 135,
    status: 'pending',
    orderStatus: 'pending',
    paymentStatus: 'paid',
    shippingAddress: { name: 'Jane Doe', line1: '123 Main St', city: 'NYC', zip: '10001', country: 'USA' },
    createdAt: '2024-03-12T00:00:00.000Z',
    updatedAt: '2024-03-12T00:00:00.000Z',
  },
];

// ---- Seed categories -------------------------------------------------------
const seedCategories = [
  { id: 'casual', name: 'Casual', slug: 'casual', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80', createdAt: now(), updatedAt: now() },
  { id: 'formal', name: 'Formal', slug: 'formal', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80', createdAt: now(), updatedAt: now() },
  { id: 'party', name: 'Party', slug: 'party', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=700&q=80', createdAt: now(), updatedAt: now() },
  { id: 'gym', name: 'Gym', slug: 'gym', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac2998?auto=format&fit=crop&w=700&q=80', createdAt: now(), updatedAt: now() },
];

// ---- Seed reviews ----------------------------------------------------------
const seedReviews = [
  {
    id: 'r1',
    productId: 'p1',
    userId: 'mock-user-token',
    userName: 'Jane Doe',
    rating: 5,
    title: 'Great tee!',
    comment: 'Super soft and fits perfectly.',
    createdAt: '2024-02-11T00:00:00.000Z',
  },
  {
    id: 'r2',
    productId: 'p1',
    userId: 'mock-user2-token',
    userName: 'John Smith',
    rating: 4,
    title: 'Good value',
    comment: 'Nice quality for the price.',
    createdAt: '2024-02-20T00:00:00.000Z',
  },
  {
    id: 'r3',
    productId: 'p3',
    userId: 'mock-user-token',
    userName: 'Jane Doe',
    rating: 4,
    title: 'Comfortable',
    comment: 'Great for running.',
    createdAt: '2024-03-06T00:00:00.000Z',
  },
];

class Store {
  constructor() {
    this.products = new Map(seedProducts.map((p) => [p.id, p]));
    this.categories = new Map(seedCategories.map((c) => [c.id, c]));
    this.users = new Map(seedUsers.map((u) => [u.id, u]));
    this.orders = new Map(seedOrders.map((o) => [o.id, o]));
    this.reviews = new Map(seedReviews.map((r) => [r.id, r]));
    this._counters = { product: 5, user: 3, order: 3, review: 3 };
  }

  nextId(prefix) {
    const key = { p: 'product', u: 'user', o: 'order', r: 'review' }[prefix];
    this._counters[key] += 1;
    return `${prefix}${this._counters[key]}`;
  }

  timestamp() {
    return now();
  }
}

export const mockStore = new Store();
export default mockStore;
