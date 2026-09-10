import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

const STORAGE_KEY = 'shopco_cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = useCallback((product, { size, color, quantity = 1 } = {}) => {
    setItems((prev) => {
      const key = `${product.id}|${size || ''}|${color || ''}`
      const existing = prev.find((i) => i.key === key)
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + quantity } : i))
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images?.[0],
          size,
          color,
          quantity,
        },
      ]
    })
  }, [])

  const updateQuantity = useCallback((key, quantity) => {
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, quantity: Math.max(1, quantity) } : i))
        .filter((i) => i.quantity > 0),
    )
  }, [])

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const count = items.reduce((n, i) => n + i.quantity, 0)
  const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0)

  const value = { items, count, subtotal, addItem, updateQuantity, removeItem, clear }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
