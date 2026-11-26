import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.2, 0.7, 0.2, 1]

/**
 * Wraps content (usually an image) with an offset gold outline that draws in
 * when it scrolls into view.
 *
 * Props:
 *  - side: "right" (default) offsets the frame right and down,
 *          "left" offsets it left and down
 */
export default function GoldFrame({ children, side = 'right', className = '' }) {
  const reduceMotion = useReducedMotion()

  const offset =
    side === 'left'
      ? '-translate-x-2 translate-y-2 sm:-translate-x-3 sm:translate-y-3'
      : 'translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3'

  return (
    <div className={`relative ${className}`}>
      <motion.span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 border border-gold ${offset}`}
        initial={reduceMotion ? false : { clipPath: 'inset(0 100% 100% 0)' }}
        whileInView={{ clipPath: 'inset(0 0% 0% 0%)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}