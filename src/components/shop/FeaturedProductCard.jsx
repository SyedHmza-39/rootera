import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import Button from '../ui/Button'
import ProductImage from '../ui/ProductImage'
import PriceDisplay from '../PriceDisplay'
import { PRODUCTS } from '../../data/products'
import { productPath } from '../../utils/product'

const EASE = [0.2, 0.7, 0.2, 1]
const INTERVAL = 6000

// Every product that has a bottle cut-out
const SLIDES = PRODUCTS.filter((product) => product.heroImage)

const pad = (number) => String(number).padStart(2, '0')

export default function FeaturedProductCard() {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [userPaused, setUserPaused] = useState(false)

  const count = SLIDES.length
  const paused = hovered || userPaused

  // Move to the next product on its own. Pauses on hover and focus, and does
  // not run for people who prefer reduced motion. `index` is a dependency, so
  // the timer restarts after any manual change.
  useEffect(() => {
    if (reduceMotion || paused || count < 2) return undefined
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % count)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [reduceMotion, paused, count, index])

  if (count === 0) return null

  const product = SLIDES[index]
  const fade = {
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -14 },
    transition: { duration: reduceMotion ? 0 : 0.45, ease: EASE },
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured products"
      className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-charcoal/15 bg-warm-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="grid md:grid-cols-[0.8fr_1.2fr]">
        {/* Bottle */}
        <div className="flex items-center justify-center bg-beige p-8 md:min-h-[26rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={product.id} {...fade}>
              <ProductImage
                name={product.heroImage}
                alt={`${product.brand} ${product.name}, ${product.size}`}
                transparent
                className="h-64 w-32 sm:h-72 sm:w-36"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Details and controls */}
        <div className="flex flex-col p-8 sm:p-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={product.id} className="min-h-[16rem] flex-1" {...fade}>
              <p className="eyebrow">Featured product</p>
              <h2 className="mt-3 text-balance font-serif text-3xl text-forest sm:text-4xl">
                {product.name}
              </h2>
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-charcoal/60">
                {product.size} · {product.formatShort}
              </p>
              <PriceDisplay product={product} className="mt-4" />
              <p className="body-text mt-4 text-sm">{product.shortDescription}</p>
              <div className="mt-6">
                <Button to={productPath(product)} arrow>
                  View product
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {count > 1 && (
            <div className="mt-6 flex items-center gap-4 border-t border-charcoal/10 pt-5">
              <span
                aria-hidden="true"
                className="font-serif text-sm tracking-[0.14em] text-forest"
              >
                {pad(index + 1)} / {pad(count)}
              </span>

              <ul className="flex items-center gap-1.5">
                {SLIDES.map((item, position) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setIndex(position)}
                      aria-label={`Show ${item.name}`}
                      aria-current={position === index}
                      className="group flex h-6 items-center"
                    >
                      <span
                        className={`block h-0.5 w-7 transition-colors duration-300 ${
                          position === index
                            ? 'bg-forest'
                            : 'bg-charcoal/25 group-hover:bg-gold'
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ul>

              {!reduceMotion && (
                <button
                  type="button"
                  onClick={() => setUserPaused((value) => !value)}
                  aria-label={userPaused ? 'Play product rotation' : 'Pause product rotation'}
                  className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-forest transition-colors hover:bg-forest/10"
                >
                  {userPaused ? (
                    <Play size={15} strokeWidth={1.5} />
                  ) : (
                    <Pause size={15} strokeWidth={1.5} />
                  )}
                </button>
              )}
            </div>
          )}

          <p className="sr-only" aria-live={paused || reduceMotion ? 'polite' : 'off'}>
            {product.name}
          </p>
        </div>
      </div>
    </div>
  )
}