import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import ProductImage from '../ui/ProductImage'
import QuantitySelector from '../shop/QuantitySelector'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/format'
import { resolveProductImage } from '../../utils/images'
import {
  getUnitPrice,
  isPriceConfigured,
  priceLabel,
  productPath,
} from '../../utils/product'

export default function CartItem({ item }) {
  const { product, quantity } = item
  const { setQuantity, removeItem, closeCart } = useCart()

  const path = productPath(product)
  const priced = isPriceConfigured(product)
  const unit = getUnitPrice(product)

  const cutout =
    product.heroImage && resolveProductImage(product.heroImage)
      ? product.heroImage
      : null
  const photo = product.cardImage ?? product.gallery[0]?.image
  const atMax = quantity >= product.stock

  return (
    <li className="flex gap-4 border-b border-charcoal/10 py-5">
      <Link
        to={path}
        onClick={closeCart}
        aria-label={`View ${product.name}`}
        className="block h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-[#EDE7DB]"
      >
        {cutout ? (
          <div className="h-full w-full p-2">
            <ProductImage
              name={cutout}
              alt=""
              transparent
              className="h-full w-full"
            />
          </div>
        ) : (
          <ProductImage name={photo} alt="" fit="cover" className="h-full w-full" />
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.18em] text-gold">
              {product.category}
            </p>
            <h3 className="font-serif text-xl leading-snug text-forest">
              <Link
                to={path}
                onClick={closeCart}
                className="transition-colors hover:text-gold"
              >
                {product.name}
              </Link>
            </h3>
            <p className="text-xs text-charcoal/60">{product.size}</p>
          </div>

          <div className="shrink-0 text-right">
            <p className="font-serif text-lg text-charcoal">
              {priced
                ? formatPrice(unit * quantity, product.currency)
                : priceLabel(product)}
            </p>
            {priced && quantity > 1 && (
              <p className="text-xs text-charcoal/55">
                {formatPrice(unit, product.currency)} each
              </p>
            )}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <QuantitySelector
            label={`Quantity for ${product.name}`}
            value={quantity}
            min={1}
            max={product.stock}
            onChange={(next) => setQuantity(product.id, next)}
          />
          <button
            type="button"
            onClick={() => removeItem(product.id)}
            aria-label={`Remove ${product.name} from cart`}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-charcoal/60 transition-colors hover:text-forest"
          >
            <Trash2 size={14} strokeWidth={1.5} aria-hidden="true" />
            Remove
          </button>
        </div>

        {atMax && (
          <p className="mt-2 text-xs text-charcoal/60">
            Maximum available quantity.
          </p>
        )}
      </div>
    </li>
  )
}