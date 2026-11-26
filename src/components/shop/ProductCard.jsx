import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal'
import ProductImage from '../ui/ProductImage'
import { useCart } from '../../hooks/useCart'
import { resolveProductImage } from '../../utils/images'
import { isInStock, priceLabel, productPath } from '../../utils/product'

export default function ProductCard({ product, delay = 0 }) {
  const { addItem, getQuantity } = useCart()
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!added) return undefined
    const timer = setTimeout(() => setAdded(false), 1800)
    return () => clearTimeout(timer)
  }, [added])

  // Bottle only, on a soft tile, when a cut-out exists. Otherwise the photo.
  const cutout =
    product.heroImage && resolveProductImage(product.heroImage)
      ? product.heroImage
      : null
  const photo = product.cardImage ?? product.gallery[0]?.image
  const altText = `${product.brand} ${product.name}, ${product.size}`

  const inStock = isInStock(product)
  const allInCart = inStock && getQuantity(product.id) >= product.stock
  const path = productPath(product)

  const handleAdd = () => {
    const { added: count } = addItem(product, 1)
    if (count > 0) setAdded(true)
  }

  const buttonLabel = !inStock
    ? 'Out of stock'
    : allInCart
      ? 'All in cart'
      : added
        ? 'Added'
        : 'Add to cart'

  return (
    <Reveal delay={delay} className="group text-center">
      <Link to={path} aria-label={`View ${product.name}`} className="block">
        <div className="frame-draw overflow-hidden rounded-2xl">
          <div className="transition-transform duration-1200 ease-out group-hover:scale-[1.05]">
            {cutout ? (
              <div className="relative aspect-4/5 w-full bg-[#EDE7DB]">
                <div className="absolute inset-0 p-8">
                  <ProductImage
                    name={cutout}
                    alt={altText}
                    transparent
                    className="h-full w-full"
                  />
                </div>
              </div>
            ) : (
              <ProductImage
                name={photo}
                alt={altText}
                fit="cover"
                className="aspect-4/5 w-full"
              />
            )}
          </div>
        </div>
      </Link>

      <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-gold">
        {product.category}
      </p>
      <h3 className="mt-1 font-serif text-2xl leading-snug text-forest">
        <Link to={path} className="transition-colors hover:text-gold">
          {product.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-charcoal/65">
        {product.size} · {priceLabel(product)}
      </p>

      <div className="mt-4 flex items-center justify-center gap-5">
        <Link
          to={path}
          className="border-b border-gold pb-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-forest transition-colors hover:text-gold"
        >
          View
        </Link>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!inStock || allInCart}
          className="border-b border-gold pb-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-forest transition-colors hover:text-gold disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-forest"
        >
          {buttonLabel}
        </button>
      </div>
    </Reveal>
  )
}