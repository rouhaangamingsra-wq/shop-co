import { api, ApiError } from './api'
import { sampleProducts, sampleReviews, sampleCategories } from '../data/mockData'

// Data access layer. Tries the backend API first; falls back to local mock data
// when the backend is unreachable (e.g. dev without Firebase credentials).

const sortMap = {
  popular: 'reviewCount:desc',
  newest: 'createdAt:desc',
  'price-asc': 'price:asc',
  'price-desc': 'price:desc',
  rating: 'rating:desc',
}

function buildQuery(params = {}) {
  const q = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      const key = k === 'sort' ? 'sort' : k
      const value = k === 'sort' ? (sortMap[v] || v) : v
      q.append(key, value)
    }
  })
  const s = q.toString()
  return s ? `?${s}` : ''
}

function sortProducts(list, sort) {
  const arr = [...list]
  switch (sort) {
    case 'newest':
      return arr.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
    case 'price-asc':
      return arr.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return arr.sort((a, b) => b.price - a.price)
    case 'rating':
      return arr.sort((a, b) => b.rating - a.rating)
    default: // popular
      return arr.sort((a, b) => b.reviewCount - a.reviewCount)
  }
}

function filterMock(params) {
  let list = [...sampleProducts]
  if (params.category) list = list.filter((p) => p.category === params.category)
  if (params.dressStyle) list = list.filter((p) => p.dressStyle === params.dressStyle)
  if (params.search) {
    const q = params.search.toLowerCase()
    list = list.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
  }
  if (params.minPrice) list = list.filter((p) => p.price >= Number(params.minPrice))
  if (params.maxPrice) list = list.filter((p) => p.price <= Number(params.maxPrice))
  if (params.color) list = list.filter((p) => p.colors.some((c) => c.toLowerCase() === String(params.color).toLowerCase()))
  if (params.size) list = list.filter((p) => p.sizes.includes(params.size))
  if (params.featured === 'true' || params.featured === true) list = list.filter((p) => p.featured)
  if (params.newArrival === 'true' || params.newArrival === true) list = list.filter((p) => p.newArrival)
  if (params.topSelling === 'true' || params.topSelling === true) list = list.filter((p) => p.topSelling)
  list = sortProducts(list, params.sort)
  const page = Number(params.page || 1)
  const limit = Number(params.limit || 12)
  const start = (page - 1) * limit
  return { items: list.slice(start, start + limit), total: list.length, page, limit }
}

export async function fetchProducts(params = {}) {
  try {
    return await api.listProducts(buildQuery(params))
  } catch (e) {
    if (e instanceof ApiError && e.status === 0) return filterMock(params)
    throw e
  }
}

export async function fetchProduct(id) {
  try {
    return await api.getProduct(id)
  } catch (e) {
    if (e instanceof ApiError && e.status === 0) {
      const p = sampleProducts.find((x) => x.id === id || x.slug === id)
      if (p) return p
      throw new ApiError('Product not found', 404)
    }
    throw e
  }
}

export async function fetchFeatured() {
  const res = await fetchProducts({ featured: true, limit: 8 })
  return res.items || res
}

export async function fetchNewArrivals() {
  const res = await fetchProducts({ newArrival: true, limit: 4 })
  return res.items || res
}

export async function fetchTopSelling() {
  const res = await fetchProducts({ topSelling: true, limit: 4 })
  return res.items || res
}

export async function fetchCategories() {
  return sampleCategories
}

export async function fetchReviews(productId) {
  try {
    return await api.listReviews(productId)
  } catch (e) {
    if (e instanceof ApiError && e.status === 0) {
      return sampleReviews.filter((r) => r.productId === productId)
    }
    throw e
  }
}
