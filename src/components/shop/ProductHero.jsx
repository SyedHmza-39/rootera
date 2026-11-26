import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Reveal from '../ui/Reveal'
import ProductImage from '../ui/ProductImage'
import BuyPanel from './BuyPanel'
import { resolveProductImage } from '../../utils/images'

// The cut-out bottle (if there is one) comes first, then the photos that exist.
function buildGallery(product) {
  const photos = product.gallery.filter((item) => resolveProductImage(item.image))
  const items = photos.length ? photos : product.gallery.slice(0, 1)

    // Bottle only: when a cut-out exists, the hero shows just the bottle
  if (product.heroImage && resolveProductImage(product.heroImage)) {
    return [
      {
        id: 'cutout',
        label: 'Bottle',
        image: product.heroImage,
        transparent: true,
        alt: `${product.brand} ${product.name}, ${product.size} bottle`,
      },
    ]
  }
  return items
}

export default function ProductHero({ product, buyRef }) {
  const reduceMotion = useReducedMotion()
  const items = useMemo(() => buildGallery(product), [product])
  const [activeId, setActiveId] = useState(items[0]?.id)

  const active = items.find((item) => item.id === activeId) ?? items[0]
  if (!active) return null

  return (
    <section className="bg-[#EDE7DB]">
      <div className="page-container grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_0.95fr_1fr] lg:gap-12 lg:py-20">
        {/* Title and short text */}
        <Reveal className="order-2 lg:order-1">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-charcoal/60 transition-colors hover:text-forest"
          >
            <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" />
            All products
          </Link>

          <p className="eyebrow mt-6">
            {product.brand} · {product.category}
          </p>
          <h1 className="mt-4 text-balance font-serif text-4xl leading-[1.05] text-forest sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 font-serif text-xl italic text-gold">
            {product.tagline}
          </p>
          <div className="gold-rule mt-5" />
          <p className="body-text mt-5 max-w-xs">{product.shortDescription}</p>
        </Reveal>

        {/* Product image and thumbnails */}
        <Reveal delay={0.1} className="order-1 mx-auto w-full max-w-md lg:order-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#E4DCCD]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="absolute inset-0"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.35 }}
              >
                {active.transparent ? (
                  <motion.div
                    className="h-full w-full p-8 sm:p-10"
                    animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ProductImage
                      name={active.image}
                      alt={active.alt}
                      transparent
                      priority
                      className="h-full w-full"
                    />
                  </motion.div>
                ) : (
                  <ProductImage
                    name={active.image}
                    alt={active.alt}
                    fit="cover"
                    priority
                    className="h-full w-full"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {items.length > 1 && (
            <ul className="mt-3 flex flex-wrap justify-center gap-2">
              {items.map((item) => {
                const isActive = item.id === active.id
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      aria-label={`Show image: ${item.label}`}
                      aria-pressed={isActive}
                      className={`block h-14 w-14 overflow-hidden border-b-2 bg-warm-white transition-all duration-300 ${
                        isActive
                          ? 'border-forest opacity-100'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <ProductImage
                        name={item.image}
                        alt={item.label}
                        transparent={item.transparent}
                        fit={item.transparent ? 'contain' : 'cover'}
                        className="h-full w-full"
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </Reveal>

        {/* Buy panel */}
        <Reveal delay={0.2} className="order-3">
          <div ref={buyRef}>
            <BuyPanel product={product} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}