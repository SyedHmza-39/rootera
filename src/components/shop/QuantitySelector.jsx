import { Minus, Plus } from 'lucide-react'

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  label = 'Quantity',
}) {
  const buttonClass =
    'flex h-11 w-10 items-center justify-center text-charcoal transition-colors hover:bg-beige disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent'

  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center overflow-hidden rounded-xl border border-charcoal/30 bg-warm-white/60"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={buttonClass}
      >
        <Minus size={14} strokeWidth={1.5} />
      </button>
      <span aria-live="polite" className="min-w-8 text-center text-sm">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={buttonClass}
      >
        <Plus size={14} strokeWidth={1.5} />
      </button>
    </div>
  )
}