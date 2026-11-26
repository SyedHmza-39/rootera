import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.2, 0.7, 0.2, 1]

/** A thin gold line with a small diamond. Decorative only. */
export default function GoldDivider() {
  const reduceMotion = useReducedMotion()

  const draw = (origin) => ({
    className: `h-px flex-1 bg-gold/40 ${origin}`,
    initial: reduceMotion ? false : { scaleX: 0 },
    whileInView: { scaleX: 1 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 1.1, ease: EASE },
  })

  return (
    <div aria-hidden="true" className="page-container">
      <div className="flex items-center justify-center">
        <motion.span {...draw('origin-right')} />
        <span className="mx-4 h-1.5 w-1.5 rotate-45 bg-gold" />
        <motion.span {...draw('origin-left')} />
      </div>
    </div>
  )
}