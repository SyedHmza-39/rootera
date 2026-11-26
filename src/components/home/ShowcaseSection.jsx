import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ProductImage from '../ui/ProductImage'
import { PRODUCTS } from '../../data/products'
import { SHOWCASE } from '../../data/showcase'
import { productPath } from '../../utils/product'

const EASE = [0.2, 0.7, 0.2, 1]
const INTERVAL = 5500

// Background tone: 'sage' (soft green) or 'gold' (soft gold).
const TONE = 'gold'

// Every product that has a bottle cut-out and showcase points
const SLIDES = PRODUCTS.filter(
  (product) => product.heroImage && SHOWCASE[product.slug],
)

function BenefitColumn({ items, startIndex, label }) {
  return (
    <ul aria-label={label} className="flex flex-col gap-10 lg:gap-16">
      {items.map((item, index) => (
        <li key={item.id}>
          <Reveal delay={index * 0.12} className="group text-center">
            <span
              aria-hidden="true"
              className="font-serif text-base tracking-[0.2em] text-gold"
            >
              {String(startIndex + index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-1 font-serif text-2xl text-forest transition-colors duration-300 group-hover:text-gold">
              {item.title}
            </h3>
            <span
              aria-hidden="true"
              className="mx-auto my-3 block h-px w-7 bg-gold transition-all duration-500 group-hover:w-16"
            />
            <p className="mx-auto max-w-[15rem] text-sm leading-relaxed text-charcoal/75">
              {item.text}
            </p>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}

function Ring({ r, stroke, delay, reduceMotion }) {
  return (
    <motion.circle
      cx="180"
      cy="260"
      r={r}
      stroke={stroke}
      strokeWidth="1"
      initial={reduceMotion ? false : { pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 2, delay, ease: EASE }}
    />
  )
}

function BottleStage({ product, reduceMotion }) {
  const stageRef = useRef(null)

  // The bottle turns a little as the section scrolls through the screen.
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end start'],
  })
  const scrollRotate = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-9, 9],
  )

  return (
    <div
      ref={stageRef}
      className="relative mx-auto flex h-[460px] w-[300px] items-center justify-center sm:h-[520px] sm:w-[360px]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 360 520"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        <Ring r={165} stroke="#FAF9F6" delay={0} reduceMotion={reduceMotion} />
        <Ring r={132} stroke="#B99A55" delay={0.25} reduceMotion={reduceMotion} />
      </svg>

      <motion.div style={{ rotate: scrollRotate }} className="relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={product.id}
            initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.96 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
          >
            <motion.div
              animate={
                reduceMotion ? { rotate: 9 } : { y: [0, -12, 0], rotate: [11, 7, 11] }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 7, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              <ProductImage
                name={product.heroImage}
                alt={`${product.brand} ${product.name}, ${product.size}`}
                transparent
                className="h-[22rem] w-52 sm:h-[26rem] sm:w-60"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function FadeSwap({ id, children, reduceMotion, className = '' }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={id}
        className={className}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default function ShowcaseSection() {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [userPaused, setUserPaused] = useState(false)

  const count = SLIDES.length
  const paused = hovered || userPaused

  // Move to the next bottle on its own. Pauses on hover and focus, and
  // does not run for people who prefer reduced motion.
  // `index` is a dependency, so the timer restarts after any manual change.
  useEffect(() => {
    if (reduceMotion || paused || count < 2) return undefined
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % count)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [reduceMotion, paused, count, index])

  if (count === 0) return null

  const product = SLIDES[index]
  const items = SHOWCASE[product.slug]
  const left = items.slice(0, 3)
  const right = items.slice(3)

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Our products"
      className={`section ${TONE === 'gold' ? 'showcase-gold' : 'showcase-sage'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="page-container">
        <SectionHeading
          align="center"
          eyebrow={product.tagline}
          title="Designed for a simple daily ritual"
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          <div className="order-2 lg:order-1">
            <FadeSwap id={product.id} reduceMotion={reduceMotion}>
              <BenefitColumn items={left} startIndex={0} label="Benefits, part one" />
            </FadeSwap>
          </div>

          <div className="order-1 lg:order-2">
            <BottleStage product={product} reduceMotion={reduceMotion} />
          </div>

          <div className="order-3">
            <FadeSwap id={product.id} reduceMotion={reduceMotion}>
              <BenefitColumn
                items={right}
                startIndex={left.length}
                label="Benefits, part two"
              />
            </FadeSwap>
          </div>
        </div>

        {/* Product name, link and controls */}
        <div className="mt-14 text-center">
          <FadeSwap id={product.id} reduceMotion={reduceMotion}>
            <h3 className="font-serif text-3xl text-forest">{product.name}</h3>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-charcoal/60">
              {product.size} · {product.formatShort}
            </p>
            <Link
              to={productPath(product)}
              className="mt-4 inline-block border-b border-gold pb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-forest transition-colors hover:text-gold"
            >
              View product
            </Link>
          </FadeSwap>

          {count > 1 && (
            <div className="mt-8 flex items-center justify-center gap-5">
              <ul className="flex items-center gap-2">
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
                        className={`block h-0.5 w-8 transition-colors duration-300 ${
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
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-forest transition-colors hover:bg-forest/10"
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
    </section>
  )
}