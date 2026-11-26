import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CartContext } from './cartContext'
import { PRODUCTS } from '../data/products'
import { getUnitPrice, isPriceConfigured } from '../utils/product'

const STORAGE_KEY = 'rootera-cart-v1'
const PRODUCTS_BY_ID = Object.fromEntries(PRODUCTS.map((product) => [product.id, product]))

/**
 * Reads the saved cart. Unknown products and invalid quantities are ignored,
 * and quantities are limited to the product's stock.
 */
function loadCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const saved = JSON.parse(raw)
    if (!saved || typeof saved !== 'object') return {}

    const cart = {}
    for (const [id, value] of Object.entries(saved)) {
      const product = PRODUCTS_BY_ID[id]
      if (!product) continue
      const quantity = Math.min(Math.floor(Number(value)), product.stock ?? 0)
      if (Number.isFinite(quantity) && quantity > 0) cart[id] = quantity
    }
    return cart
  } catch {
    return {}
  }
}

export default function CartProvider({ children }) {
  const { pathname } = useLocation()

  // The drawer is open only while you stay on the page where it was opened,
  // so it closes by itself when you navigate.
  const [openPath, setOpenPath] = useState(null)
  const isOpen = openPath === pathname
  const openCart = useCallback(() => setOpenPath(pathname), [pathname])
  const closeCart = useCallback(() => setOpenPath(null), [])

  // { [productId]: quantity }
  const [quantities, setQuantities] = useState(loadCart)
  // Always holds the latest cart, so two quick clicks never overwrite each other.
  const latest = useRef(quantities)

  const commit = useCallback((next) => {
    latest.current = next
    setQuantities(next)
  }, [])

  // Save the cart whenever it changes
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities))
    } catch {
      // Storage may be blocked (private mode). The cart still works for this visit.
    }
  }, [quantities])

  // Keep several open tabs in sync
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key !== STORAGE_KEY) return
      const next = loadCart()
      latest.current = next
      setQuantities(next)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  /**
   * Adds a product, never going past its stock.
   * Returns { added, limited }: how many were added, and whether the request
   * was cut short by the stock limit.
   */
  const addItem = useCallback(
    (product, quantity = 1) => {
      const wanted = Math.max(1, Math.floor(quantity))
      const current = latest.current[product.id] ?? 0
      const room = Math.max(0, (product.stock ?? 0) - current)
      const added = Math.min(wanted, room)

            if (added > 0) {
        commit({ ...latest.current, [product.id]: current + added })
        // Open the cart so the customer can see what was added
        setOpenPath(pathname)
      }
      return { added, limited: added < wanted }
    },
    [commit, pathname],
  )

  /** Sets an exact quantity. Zero or less removes the product. Capped at stock. */
  const setQuantity = useCallback(
    (productId, quantity) => {
      const product = PRODUCTS_BY_ID[productId]
      if (!product) return
      const next = Math.min(Math.floor(quantity), product.stock ?? 0)
      const copy = { ...latest.current }
      if (next > 0) copy[productId] = next
      else delete copy[productId]
      commit(copy)
    },
    [commit],
  )

  const removeItem = useCallback(
    (productId) => {
      const copy = { ...latest.current }
      delete copy[productId]
      commit(copy)
    },
    [commit],
  )

  const clearCart = useCallback(() => commit({}), [commit])

  const getQuantity = useCallback(
    (productId) => quantities[productId] ?? 0,
    [quantities],
  )

  const summary = useMemo(() => {
    const items = Object.entries(quantities)
      .map(([id, quantity]) => ({ product: PRODUCTS_BY_ID[id], quantity }))
      .filter((item) => item.product)

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce(
      (sum, item) => sum + getUnitPrice(item.product) * item.quantity,
      0,
    )
    const hasUnpriced = items.some((item) => !isPriceConfigured(item.product))
    const currency = items[0]?.product.currency ?? PRODUCTS[0].currency

    return { items, itemCount, subtotal, hasUnpriced, currency }
  }, [quantities])

  const value = useMemo(
    () => ({
      isOpen,
      openCart,
      closeCart,
      quantities,
      getQuantity,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      ...summary,
    }),
    [
      isOpen,
      openCart,
      closeCart,
      quantities,
      getQuantity,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      summary,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}