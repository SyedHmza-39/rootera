import { formatPrice } from '../utils/format'
import { isOnSale, isPriceConfigured } from '../utils/product'

export default function PriceDisplay({ product, className = '' }) {
  if (!isPriceConfigured(product)) {
    return (
      <p className={`font-serif text-2xl text-charcoal/70 ${className}`}>
        Price coming soon
      </p>
    )
  }

  if (isOnSale(product)) {
    return (
      <p className={`flex items-baseline gap-3 font-serif ${className}`}>
        <span className="sr-only">Sale price</span>
        <span className="text-3xl text-forest">
          {formatPrice(product.salePrice, product.currency)}
        </span>
        <span className="sr-only">Regular price</span>
        <s className="text-xl text-charcoal/45">
          {formatPrice(product.price, product.currency)}
        </s>
      </p>
    )
  }

  return (
    <p className={`font-serif text-3xl text-forest ${className}`}>
      {formatPrice(product.price, product.currency)}
    </p>
  )
}