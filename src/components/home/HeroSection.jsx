import { motion, useReducedMotion } from 'framer-motion'
import Button from '../ui/Button'
import HeroSlider from './HeroSlider'
import { HOME } from '../../data/home'

const EASE = [0.2, 0.7, 0.2, 1]

// One line of the headline. It slides up from behind a mask.
function HeadlineLine({ children, delay, reduceMotion }) {
  return (
    <span className="block overflow-hidden pb-2">
      <motion.span
        className="block"
        initial={reduceMotion ? false : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function HeroSection() {
  const reduceMotion = useReducedMotion()
  const { hero } = HOME

  const fade = (delay) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  })

  return (
    <section className="relative overflow-hidden bg-beige lg:h-[clamp(560px,calc(100svh-8rem),780px)]">
      <HeroSlider slides={hero.slides} />

      {/* Text: below the photo on mobile, over the photo on desktop */}
      <div className="pointer-events-none relative z-10 lg:h-full">
        <div className="page-container py-12 sm:py-16 lg:flex lg:h-full lg:items-center lg:py-0">
          <div className="pointer-events-auto lg:max-w-md xl:max-w-lg">
            <motion.p
              className="text-xs font-medium uppercase tracking-[0.28em] text-forest"
              {...fade(0.1)}
            >
              {hero.eyebrow}
            </motion.p>

            <h1 className="display-heading mt-5 text-forest lg:text-5xl xl:text-6xl">
              <HeadlineLine delay={0.25} reduceMotion={reduceMotion}>
                {hero.lines[0]}
              </HeadlineLine>
              <HeadlineLine delay={0.4} reduceMotion={reduceMotion}>
                {hero.lines[1]}
              </HeadlineLine>
            </h1>

            <motion.div
              aria-hidden="true"
              className="gold-rule mt-6 origin-left"
              initial={reduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            />

            <motion.p
              className="mt-6 max-w-md text-base leading-relaxed text-charcoal/85"
              {...fade(0.7)}
            >
              {hero.text}
            </motion.p>

            <motion.div className="mt-8 flex flex-wrap gap-4" {...fade(0.9)}>
              <Button to="/shop" shape="soft" size="large" arrow>Shop Now</Button>
              <Button to="/about" variant="outline" shape="soft" size="large">
                Discover Our Story
              </Button>
            </motion.div>

            <motion.ul
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.16em] text-charcoal/70"
              {...fade(1.05)}
            >
              {hero.points.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1.5 w-1.5 bg-gold" />
                  {point}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  )
}