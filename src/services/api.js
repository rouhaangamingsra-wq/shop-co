const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

function getToken() {
  return localStorage.getItem('shopco_token')
}

export function setToken(token) {
  if (token) localStorage.setItem('shopco_token', token)
  else localStorage.removeItem('shopco_token')
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }
  let res
  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch (e) {
    throw new ApiError('Network error: unable to reach the server.', 0)
  }
  const text = await res.text()
  const data = text ? JSON.parse(text) : null
  if (!res.ok) {
    throw new ApiError(data?.message || `Request failed (${res.status})`, res.status, data)
  }
  return data
}

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message)
    this.status = status
    this.payload = payload
  }
}

export const api = {
  // Auth
  verifyToken: (token) => request('/auth/verify', { method: 'POST', body: { token } }),
  getMe: () => request('/auth/me', { auth: true }),

  // Products
  listProducts: (query = '') => request(`/products${query}`),
  getProduct: (id) => request(`/products/${id}`),

  // Orders
  listOrders: () => request('/orders', { auth: true }),
  getOrder: (id) => request(`/orders/${id}`, { auth: true }),
  createOrder: (payload) => request('/orders', { method: 'POST', body: payload, auth: true }),

  // Reviews
  listReviews: (productId) => request(`/reviews/${productId}`),
  createReview: (payload) => request('/reviews', { method: 'POST', body: payload, auth: true }),
}
