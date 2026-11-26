import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import Button from '../ui/Button'
import PriceDisplay from '../PriceDisplay'
import QuantitySelector from './QuantitySelector'
import { useCart } from '../../hooks/useCart'
import { isInStock } from '../../utils/product'

const DEFAULT_NOTE = 'Payment will be cash on delivery. Online ordering is not connected yet.'

export default function BuyPanel({ product }) {
  const { addItem, openCart, getQuantity } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')

  const inStock = isInStock(product)
  const inCart = getQuantity(product.id)
  const remaining = Math.max(0, product.stock - inCart)
  const maxQuantity = Math.max(1, remaining)
  const shownQuantity = Math.min(quantity, maxQuantity)
  const allInCart = inStock && remaining === 0

  const handleAdd = () => {
    const { added, limited } = addItem(product, shownQuantity)
    if (added === 0) {
      setMessage('All available stock is already in your cart.')
    } else if (limited) {
      setMessage(`Added ${added}. That is all the stock available.`)
    } else {
      setMessage('Added to cart.')
    }
    setQuantity(1)
  }

  const handleBuyNow = () => {
    handleAdd()
    setMessage(
      'Added to your cart. Press "Order now" in the cart to send your order request.',
    )
    openCart()
  }

  return (
    <div>
      <PriceDisplay product={product} />
      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-charcoal/60">
        {product.name}
      </p>

      <p className="mt-3 flex items-center gap-2 text-xs text-forest">
        <span
          aria-hidden="true"
          className={`h-1.75 w-1.75 rounded-full ${
            inStock ? 'bg-[#2F6B4A]' : 'bg-charcoal/40'
          }`}
        />
        {inStock ? 'In stock' : 'Out of stock'}
      </p>

      <div className="mt-5 flex gap-2">
        <div className="flex flex-1 items-center rounded-xl border border-charcoal/30 bg-warm-white/60 px-3 text-xs text-charcoal">
          <span className="mr-2 uppercase tracking-[0.14em] text-charcoal/50">
            Size
          </span>
          {product.size}
        </div>
        <QuantitySelector
          value={shownQuantity}
          onChange={setQuantity}
          max={maxQuantity}
        />
      </div>

      <Button
        variant="outline"
        className="mt-3 w-full"
        onClick={handleAdd}
        disabled={!inStock || allInCart}
      >
        Add to cart
        <ShoppingBag size={16} strokeWidth={1.5} aria-hidden="true" />
      </Button>
      <Button className="mt-3 w-full" onClick={handleBuyNow} disabled={!inStock}>
        Buy now
      </Button>

      <p
        aria-live="polite"
        className="mt-3 min-h-10 text-xs leading-relaxed text-charcoal/65"
      >
        {message || (allInCart ? 'All available stock is in your cart.' : DEFAULT_NOTE)}
      </p>
    </div>
  )
}