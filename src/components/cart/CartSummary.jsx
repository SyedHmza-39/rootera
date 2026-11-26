import Button from '../ui/Button'
import { formatPrice } from '../../utils/format'

export default function CartSummary({
  subtotal,
  currency,
  hasUnpriced,
  onOrder,
  onContinue,
}) {
  return (
    <div className="border-t border-charcoal/10 bg-warm-white px-6 py-5">
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-charcoal/70">
          Subtotal
        </span>
        <span className="font-serif text-2xl text-forest">
          {hasUnpriced ? 'To be confirmed' : formatPrice(subtotal, currency)}
        </span>
      </div>

      <p className="mt-2 text-xs leading-relaxed text-charcoal/60">
        Delivery cost depends on your order. Payment will be cash on delivery.
      </p>

      <Button className="mt-4 w-full" onClick={onOrder} arrow>
        Order now
      </Button>

      <Button
        variant="outline"
        to="/shop"
        onClick={onContinue}
        className="mt-3 w-full"
      >
        Continue shopping
      </Button>
    </div>
  )
}