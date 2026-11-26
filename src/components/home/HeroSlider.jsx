import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { resolveProductImage } from '../../utils/images'

const EASE = [0.2, 0.7, 0.2, 1]
const INTERVAL = 6500

// Direction 1 = next: the new slide enters from the right and the old one
// leaves to the left. Direction -1 reverses it.
const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%' }),
  center: { x: 0 },
  exit: (direction) => ({ x: direction > 0 ? '-100%' : '100%' }),
}

const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
}

const pad = (number) => String(number).padStart(2, '0')

function SlideImage({ slide, reduceMotion }) {
  const src = resolveProductImage(slide.image)
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={slide.alt}
        className="flex h-full w-full flex-col items-center justify-center bg-beige"
      >
        <span className="font-serif text-2xl tracking-[0.25em] text-gold">
          ROOTERA
        </span>
        <span className="mt-2 text-[11px] uppercase tracking-[0.2em] text-charcoal/50">
          Image coming soon
        </span>
      </div>
    )
  }

  return (
    <motion.img
      src={src}
      alt={slide.alt}
      draggable={false}
      decoding="async"
      onError={() => setFailed(true)}
      style={{ objectPosition: slide.position }}
      className="h-full w-full select-none object-cover"
      initial={reduceMotion ? false : { scale: 1.08 }}
      animate={{ scale: 1 }}
      transition={{ duration: 7, ease: 'easeOut' }}
    />
  )
}

/**
 * Props:
 *  - slides: array of { id, image, alt, position }
 */
export default function HeroSlider({ slides }) {
  const reduceMotion = useReducedMotion()
  const count = slides.length

  const [[index, direction], setPage] = useState([0, 1])
  const [hovered, setHovered] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const paused = hovered || userPaused

  const paginate = (step) =>
    setPage(([current]) => [(current + step + count) % count, step])

  const goTo = (target) =>
    setPage(([current]) => [target, target >= current ? 1 : -1])

  // Load every slide image up front so slides appear without a flash.
  useEffect(() => {
    slides.forEach((slide) => {
      const src = resolveProductImage(slide.image)
      if (src) {
        const image = new Image()
        image.src = src
      }
    })
  }, [slides])

  // Autoplay. Always moves right to left. `index` is a dependency, so the
  // timer restarts after any manual change.
  useEffect(() => {
    if (reduceMotion || paused || count < 2) return undefined
    const timer = setInterval(() => {
      setPage(([current]) => [(current + 1) % count, 1])
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [reduceMotion, paused, count, index])

  if (count === 0) return null

  const slide = slides[index]
  const autoplaying = !reduceMotion && !paused && count > 1

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="ROOTERA featured images"
      className="relative aspect-4/5 overflow-hidden bg-beige sm:aspect-4/5 lg:absolute lg:inset-0 lg:aspect-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={reduceMotion ? fadeVariants : slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduceMotion ? 0.3 : 0.9, ease: EASE }}
            drag={count > 1 ? 'x' : false}
            dragSnapToOrigin
            dragMomentum={false}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) paginate(1)
              else if (info.offset.x > 70) paginate(-1)
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            className="absolute inset-0 touch-pan-y"
          >
            <SlideImage slide={slide} reduceMotion={reduceMotion} />
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-5 z-20 lg:bottom-8">
          <div className="page-container flex justify-end">
            <div className="flex items-center gap-4 rounded-xl bg-warm-white/85 px-4 py-2.5 backdrop-blur-sm">
              <span
                aria-hidden="true"
                className="font-serif text-sm tabular-nums text-forest"
              >
                {pad(index + 1)} / {pad(count)}
              </span>

              <div className="flex items-center gap-1.5">
                {slides.map((item, position) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(position)}
                    aria-label={`Show slide ${position + 1}`}
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
                ))}
              </div>

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  aria-label="Previous slide"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-forest transition-colors hover:bg-forest/10 hover:text-forest"
                >
                  <ChevronLeft size={18} strokeWidth={1.5} />
                </button>

                {!reduceMotion && (
                  <button
                    type="button"
                    onClick={() => setUserPaused((value) => !value)}
                    aria-label={
                      userPaused ? 'Play slideshow' : 'Pause slideshow'
                    }
                    className="flex h-8 w-8 items-center justify-center text-forest transition-colors hover:text-gold"
                  >
                    {userPaused ? (
                      <Play size={15} strokeWidth={1.5} />
                    ) : (
                      <Pause size={15} strokeWidth={1.5} />
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => paginate(1)}
                  aria-label="Next slide"
                  className="flex h-8 w-8 items-center justify-center text-forest transition-colors hover:text-gold"
                >
                  <ChevronRight size={18} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="sr-only" aria-live={autoplaying ? 'off' : 'polite'}>
        Slide {index + 1} of {count}
      </p>
    </div>
  )
}