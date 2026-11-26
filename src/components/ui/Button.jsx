import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const BASE =
  'group relative z-0 inline-flex items-center justify-center gap-3 overflow-hidden border ' +
  'text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ' +
  'before:absolute before:inset-0 before:-z-10 before:translate-y-full ' +
  'before:transition-transform before:duration-500 before:ease-out ' +
  'hover:before:translate-y-0 focus-visible:before:translate-y-0 ' +
  'disabled:pointer-events-none disabled:opacity-50'

const SIZES = {
  default: 'px-7 py-3.5',
  large: 'px-9 py-4',
}

// "soft" gives gently rounded corners. Used on the hero buttons.
const SHAPES = {
  square: '',
  soft: 'rounded-xl',
}

const VARIANTS = {
  // Solid forest button. A gold fill slides up on hover.
  primary:
    'border-forest bg-forest text-warm-white before:bg-gold hover:border-gold hover:text-charcoal focus-visible:text-charcoal',
  // Outlined button. Fills with forest on hover.
  outline:
    'border-forest bg-transparent text-forest before:bg-forest hover:text-warm-white focus-visible:text-warm-white',
  // For dark (forest) backgrounds.
  light:
    'border-warm-white bg-transparent text-warm-white before:bg-warm-white hover:text-forest focus-visible:text-forest',
  // Frosted glass, for buttons that sit on a photo or a colour glow.
  glass:
    'border-white/60 bg-white/10 text-warm-white backdrop-blur-md before:bg-warm-white hover:text-forest focus-visible:text-forest',
}

/**
 * Props:
 *  - variant: "primary" | "outline" | "light" | "glass"
 *  - shape: "square" (default) | "soft"
 *  - size: "default" | "large"
 *  - arrow: shows a small arrow that slides forward on hover
 *  - to: internal route (renders a router Link)
 *  - href: external link or #section (renders <a>)
 *  - otherwise renders a <button>
 */
export default function Button({
  variant = 'primary',
  shape = 'soft',
  size = 'default',
  arrow = false,
  to,
  href,
  className = '',
  children,
  type = 'button',
  ...rest
}) {
  const classes = `${BASE} ${SIZES[size] ?? SIZES.default} ${SHAPES[shape] ?? ''} ${
    VARIANTS[variant] ?? VARIANTS.primary
  } ${className}`

  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          size={15}
          strokeWidth={1.5}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  )
}