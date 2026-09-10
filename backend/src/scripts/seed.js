import 'dotenv/config'
import { admin, auth, db, firebaseEnabled } from '../config/firebase.js'

if (!firebaseEnabled) {
  console.error('No Firebase credentials found. Place service-account.json in the backend root, or set FIREBASE_* env vars.')
  process.exit(1)
}

const products = [
  {
    title: 'One Life Graphic T-Shirt',
    slug: 'one-life-graphic-tshirt',
    description:
      'A soft cotton graphic tee with a relaxed fit. Designed for everyday wear with a bold front print.',
    category: 'T-Shirts',
    dressStyle: 'Casual',
    price: 52,
    originalPrice: 80,
    discountPercentage: 35,
    rating: 4.5,
    reviewCount: 128,
    colors: ['#000000', '#6B7280', '#FFFFFF'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=700&q=80',
    ],
    stock: 42,
    featured: true,
    newArrival: true,
    topSelling: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: 'Classic Denim Jacket',
    slug: 'classic-denim-jacket',
    description: 'Timeless denim jacket cut from durable cotton twill. A versatile layer that pairs with everything.',
    category: 'Jackets',
    dressStyle: 'Casual',
    price: 120,
    originalPrice: 160,
    discountPercentage: 25,
    rating: 4.8,
    reviewCount: 86,
    colors: ['#1E3A8A', '#000000', '#9CA3AF'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1551028719-17967fc24d53?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=80',
    ],
    stock: 18,
    featured: true,
    newArrival: false,
    topSelling: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const categories = [
  { name: 'Casual', slug: 'casual', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80' },
  { name: 'Formal', slug: 'formal', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80' },
  { name: 'Party', slug: 'party', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=700&q=80' },
  { name: 'Gym', slug: 'gym', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac2998?auto=format&fit=crop&w=700&q=80' },
]

async function seedProducts() {
  const batch = db.batch()
  for (const p of products) {
    const ref = db.collection('products').doc()
    batch.set(ref, { ...p, id: ref.id })
  }
  await batch.commit()
  console.log(`Seeded ${products.length} products`)
}

async function seedCategories() {
  const batch = db.batch()
  for (const c of categories) {
    const ref = db.collection('categories').doc(c.slug)
    batch.set(ref, c)
  }
  await batch.commit()
  console.log(`Seeded ${categories.length} categories`)
}

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@shopco.dev'
  const password = process.env.ADMIN_PASSWORD || 'Admin123!'
  try {
    const user = await auth.getUserByEmail(email)
    await auth.setCustomUserClaims(user.uid, { role: 'admin' })
    await db.collection('users').doc(user.uid).update({ role: 'admin', updatedAt: new Date().toISOString() })
    console.log('Admin already exists, updated claims:', email)
  } catch {
    const u = await auth.createUser({ email, password, displayName: 'Admin' })
    await auth.setCustomUserClaims(u.uid, { role: 'admin' })
    await db.collection('users').doc(u.uid).set({
      uid: u.uid,
      name: 'Admin',
      email,
      role: 'admin',
      profileImage: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    console.log('Created admin:', email)
  }
}

async function main() {
  await seedCategories()
  await seedProducts()
  await createAdmin()
  console.log('Seed complete.')
  process.exit(0)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
