import { formatPrice } from './format'

/** True once a real price (greater than 0) has been set in the config. */
export function isPriceConfigured(product) {
  return Number.isFinite(product.price) && product.price > 0
}

/** True only when a valid sale price lower than the normal price is set. */
export function isOnSale(product) {
  return (
    isPriceConfigured(product) &&
    Number.isFinite(product.salePrice) &&
    product.salePrice > 0 &&
    product.salePrice < product.price
  )
}

/** The price a customer actually pays per unit. */
export function getUnitPrice(product) {
  return isOnSale(product) ? product.salePrice : product.price
}

export function isInStock(product) {
  return Number.isFinite(product.stock) && product.stock > 0
}

/** The page address for a product, for example /shop/advanced-skin-glow-serum */
export function productPath(product) {
  return `/shop/${product.slug}`
}

/** Short price text for cards and bars. */
export function priceLabel(product) {
  if (!isPriceConfigured(product)) return 'Price coming soon'
  return formatPrice(getUnitPrice(product), product.currency)
}