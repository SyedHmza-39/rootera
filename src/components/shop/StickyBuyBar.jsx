import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../ui/Button'
import { useCart } from '../../hooks/useCart'
import { isInStock, priceLabel } from '../../utils/product'

export default function StickyBuyBar({ product, visible }) {
  const { addItem, getQuantity } = useCart()
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!added) return undefined
    const timer = setTimeout(() => setAdded(false), 1800)
    return () => clearTimeout(timer)
  }, [added])

  const soldOut = !isInStock(product) || getQuantity(product.id) >= product.stock

  const handleAdd = () => {
    const { added: count } = addItem(product, 1)
    if (count > 0) setAdded(true)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-charcoal/15 bg-warm-white/95 backdrop-blur lg:hidden"
        >
          <div className="page-container flex items-center gap-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-lg text-forest">
                {product.name}
              </p>
              <p className="text-xs text-charcoal/60">{priceLabel(product)}</p>
            </div>
            <Button
              onClick={handleAdd}
              disabled={soldOut}
              className="shrink-0 px-5"
            >
              {added ? 'Added' : soldOut ? 'Unavailable' : 'Add to cart'}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}