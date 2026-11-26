/**
 * Format a number as money. Whole amounts show without decimals
 * (PKR 2,500) and falls back gracefully if the currency code in the
 * product config is not valid.
 */
export function formatPrice(amount, currency = 'USD') {
  const value = Number(amount) || 0
  const isWhole = Number.isInteger(value)

  try {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency,
      minimumFractionDigits: isWhole ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(value)
  } catch {
    return `${currency} ${isWhole ? value : value.toFixed(2)}`
  }
}

/** Keep a number between a minimum and maximum. */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}