import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const pad = (number) => String(number).padStart(2, '0')

const arrowClass =
  'flex h-10 w-10 items-center justify-center rounded-xl border border-charcoal/25 text-forest transition-colors duration-300 hover:bg-forest hover:text-warm-white'

function Stars({ rating }) {
  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className="mb-4 flex justify-center gap-1 text-gold"
    >
      {[1, 2, 3, 4, 5].map((number) => (
        <Star
          key={number}
          size={16}
          strokeWidth={1.5}
          aria-hidden="true"
          fill={number <= rating ? 'currentColor' : 'none'}
        />
      ))}
    </span>
  )
}

/**
 * Props:
 *  - reviews: array of { id, name, rating, text }
 *  - confirmedReal: when false, reviews show as "Sample review" with no names or stars
 */
export default function ReviewSlider({ reviews, confirmedReal = false }) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = reviews.length

  const step = (direction) =>
    setIndex((current) => (current + direction + count) % count)

  if (count === 0) return null

  const autoplay = !reduceMotion && count > 1
  const kind = confirmedReal ? 'Customer review' : 'Sample review'

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={confirmedReal ? 'Customer reviews' : 'Sample customer reviews'}
      className="mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${index * 100}%` }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            ease: [0.2, 0.7, 0.2, 1],
          }}
        >
          {reviews.map((review, position) => {
            const name = confirmedReal ? review.name : 'Sample customer'

            return (
              <figure
                key={review.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${position + 1} of ${count}`}
                aria-hidden={position !== index}
                className="w-full shrink-0 px-0.5"
              >
                <div className="relative border border-t-2 border-charcoal/15 border-t-gold bg-warm-white px-6 pb-8 pt-14 text-center sm:px-14 sm:pb-9">
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-2 -translate-x-1/2 font-serif text-7xl leading-none text-gold/40"
                  >
                    &ldquo;
                  </span>

                  {confirmedReal && review.rating ? (
                    <Stars rating={review.rating} />
                  ) : null}

                  <blockquote className="text-balance font-serif text-xl leading-relaxed text-forest sm:text-2xl">
                    {review.text}
                  </blockquote>

                  <figcaption className="mt-7 flex items-center justify-center gap-3 border-t border-charcoal/15 pt-6 text-left">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-beige font-serif text-lg text-forest"
                    >
                      {name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-charcoal">
                        {name}
                      </span>
                      <span className="block text-[11px] uppercase tracking-[0.14em] text-gold">
                        {kind} {position + 1} of {count}
                      </span>
                    </span>
                  </figcaption>
                </div>
              </figure>
            )
          })}
        </motion.div>
      </div>

      <div className="mt-5 grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6">
        <span
          aria-hidden="true"
          className="font-serif text-base tracking-[0.14em] text-forest"
        >
          {pad(index + 1)} / {pad(count)}
        </span>

        <div aria-hidden="true" className="h-0.5 overflow-hidden bg-charcoal/15">
          {autoplay ? (
            <span
              key={index}
              className="review-progress block h-full origin-left bg-forest"
              style={{ animationPlayState: paused ? 'paused' : 'running' }}
              onAnimationEnd={() => step(1)}
            />
          ) : (
            <span
              className="block h-full bg-forest transition-all duration-300"
              style={{ width: `${((index + 1) / count) * 100}%` }}
            />
          )}
        </div>

        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous review"
            className={arrowClass}
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next review"
            className={arrowClass}
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  )
}