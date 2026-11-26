import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import CartBody from './cart/CartBody'
import { useCart } from '../hooks/useCart'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { formatPrice } from '../utils/format'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'

export default function CartDrawer() {
  const { isOpen, closeCart, items, itemCount, subtotal, hasUnpriced, currency } =
    useCart()
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)

  useLockBodyScroll(isOpen)

  // Focus the close button, keep Tab inside the drawer, close on Escape,
  // and return focus to where it was when the drawer closes.
  useEffect(() => {
    if (!isOpen) return undefined

    const previous = document.activeElement
    closeButtonRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeCart()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll(FOCUSABLE)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      previous?.focus?.()
    }
  }, [isOpen, closeCart])

  const isEmpty = items.length === 0

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cart-overlay"
          aria-hidden="true"
          onClick={closeCart}
          className="fixed inset-0 z-50 bg-charcoal/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {isOpen && (
        <motion.aside
          key="cart-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-title"
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-warm-white"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-5">
            <h2 id="cart-title" className="font-serif text-2xl text-forest">
              Your cart{itemCount > 0 ? ` (${itemCount})` : ''}
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeCart}
              aria-label="Close cart"
              className="p-2 text-forest transition-colors hover:text-gold"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          <p className="sr-only" aria-live="polite">
            {isEmpty
              ? 'Your cart is empty.'
              : `${itemCount} ${itemCount === 1 ? 'item' : 'items'} in your cart. Subtotal ${
                  hasUnpriced ? 'to be confirmed' : formatPrice(subtotal, currency)
                }.`}
          </p>

          <CartBody />
        </motion.aside>
      )}
    </AnimatePresence>
  )
}