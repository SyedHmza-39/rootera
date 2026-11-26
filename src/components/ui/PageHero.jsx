import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Button from './Button'
import { resolveProductImage } from '../../utils/images'

const EASE = [0.2, 0.7, 0.2, 1]
const FADE_MASK = 'linear-gradient(to bottom, #000 60%, rgba(0,0,0,0) 100%)'

// A soft blurred colour glow that drifts slowly
function Blob({ className, drift, delay = 0, reduceMotion }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`absolute rounded-full ${className}`}
      animate={
        reduceMotion ? undefined : { x: [0, drift[0], 0], y: [0, drift[1], 0] }
      }
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

// A frosted-glass pill that floats gently
function GlassPill({ children, className, tilt, delay, reduceMotion }) {
  return (
    <motion.span
      className={`absolute z-[26] rounded-full border border-white/50 bg-white/20 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md ${className}`}
      style={{ rotate: tilt }}
      animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.span>
  )
}

function Ring({ r, stroke, delay, reduceMotion }) {
  return (
    <motion.circle
      cx="50"
      cy="50"
      r={r}
      stroke={stroke}
      strokeWidth="0.25"
      initial={reduceMotion ? false : { pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, delay, ease: EASE }}
    />
  )
}

/* ---------- Visual 1: a person (modes "cutout" and "arch") ---------- */

function PersonVisual({ visual }) {
  const src = resolveProductImage(visual.image)
  if (!src) return null

  return (
    <div className="absolute bottom-0 left-1/2 z-10 h-[27rem] w-[19rem] -translate-x-1/2 sm:h-[33rem] sm:w-[25rem] lg:h-[38rem] lg:w-[29rem]">
      {visual.mode === 'cutout' ? (
        <img
          src={src}
          alt={visual.alt}
          decoding="async"
          className="h-full w-full object-contain object-bottom"
          style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
        />
      ) : (
        <div
          className="h-full w-full overflow-hidden rounded-t-full"
          style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
        >
          <img
            src={src}
            alt={visual.alt}
            decoding="async"
            style={{ objectPosition: visual.position }}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  )
}

/* ---------- Visual 2: one bottle floating in two rings (mode "product") ---------- */

function ProductVisual({ visual, reduceMotion }) {
  const src = resolveProductImage(visual.image)
  if (!src) return null

  return (
    <div className="absolute left-1/2 top-[9%] z-[25] aspect-square h-[40%] -translate-x-1/2 sm:top-[11%] sm:h-[44%] lg:h-[46%]">
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        <Ring r={48} stroke="rgba(255,255,255,0.8)" delay={0.3} reduceMotion={reduceMotion} />
        <Ring r={38} stroke="#B99A55" delay={0.55} reduceMotion={reduceMotion} />
      </svg>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
      >
        <motion.img
          src={src}
          alt={visual.alt}
          decoding="async"
          className="h-[86%] w-auto object-contain"
          animate={
            reduceMotion ? { rotate: 8 } : { y: [0, -10, 0], rotate: [10, 7, 10] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 7, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      </motion.div>
    </div>
  )
}

/* ---------- Visual 3: several bottles standing together (mode "lineup") ---------- */

function LineupVisual({ visual, reduceMotion }) {
  const items = (visual.items ?? [])
    .map((item) => ({ ...item, src: resolveProductImage(item.image) }))
    .filter((item) => item.src)

  if (items.length === 0) return null

  return (
    <div className="absolute inset-x-0 top-[9%] z-[25] flex h-[38%] items-end justify-center -space-x-6 px-3 sm:top-[11%] sm:h-[44%] sm:-space-x-4 lg:h-[46%] lg:-space-x-3">
      {items.map((item, index) => (
        <motion.div
          key={item.image}
          className="relative flex items-end"
          style={{ height: `${item.height ?? 80}%` }}
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 + index * 0.12, ease: EASE }}
        >
          <motion.img
            src={item.src}
            alt={item.alt}
            decoding="async"
            className="h-full w-auto object-contain"
            animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
            transition={{
              duration: 6 + index * 0.7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.4,
            }}
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-2 left-1/2 h-3 w-4/5 -translate-x-1/2 rounded-full bg-charcoal/20 blur-md"
          />
        </motion.div>
      ))}
    </div>
  )
}

function HeroVisual({ visual, reduceMotion }) {
  if (!visual) return null
  if (visual.mode === 'lineup') {
    return <LineupVisual visual={visual} reduceMotion={reduceMotion} />
  }
  if (visual.mode === 'product') {
    return <ProductVisual visual={visual} reduceMotion={reduceMotion} />
  }
  return <PersonVisual visual={visual} />
}

// A call to action can go to a page (`to`) or to a place on the same page (`href`)
function ActionLink({ link }) {
  const className =
    'border-b border-gold pb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-warm-white transition-colors hover:text-[#D8C08A]'
  return link.to ? (
    <Link to={link.to} className={className}>
      {link.label}
    </Link>
  ) : (
    <a href={link.href} className={className}>
      {link.label}
    </a>
  )
}

/**
 * Props:
 *  - eyebrow, title, text: the words
 *  - wordmark: the large faint word behind the picture
 *  - cta: { label, to } or { label, href }  (button)
 *  - link: { label, to } or { label, href } (underlined link, optional)
 *  - badges: two short words for the glass pills
 *  - visual: { mode: 'cutout' | 'arch' | 'product' | 'lineup', ... }
 */
export default function PageHero({
  eyebrow,
  wordmark,
  title,
  text,
  cta,
  link,
  badges = [],
  visual,
}) {
  const reduceMotion = useReducedMotion()
  const isPerson = visual?.mode === 'cutout' || visual?.mode === 'arch'

  const fade = (delay) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  })

  // Short words can be larger and still fit
  const wordSize =
    wordmark.length <= 5
      ? 'text-[clamp(6rem,30vw,26rem)]'
      : 'text-[clamp(5rem,23vw,21rem)]'

  const pillPlaces = isPerson
    ? [
        'bottom-[40%] left-[6%] sm:left-[14%] lg:left-[27%]',
        'bottom-[33%] right-[5%] sm:right-[14%] lg:right-[27%]',
      ]
    : [
        'top-[24%] left-[4%] sm:left-[12%] lg:left-[19%]',
        'top-[36%] right-[4%] sm:right-[12%] lg:right-[19%]',
      ]

  return (
    <section className="px-3 pb-2 pt-3 sm:px-5 sm:pt-5">
      <div
        className={`relative isolate flex flex-col overflow-hidden rounded-[1.75rem] bg-[#E9E2D4] sm:rounded-[2.25rem] ${
          isPerson
            ? 'min-h-[50rem] sm:min-h-[54rem]'
            : visual
              ? 'min-h-[54rem]'
              : 'min-h-[38rem] sm:min-h-[44rem]'
        }`}
      >
        {/* Colour glow */}
        <Blob
          className="-left-16 -top-10 h-72 w-72 bg-[#D9BE82]/60 blur-[80px]"
          drift={[30, 20]}
          reduceMotion={reduceMotion}
        />
        <Blob
          className="-right-20 top-16 h-80 w-80 bg-[#D9BE82]/50 blur-[90px]"
          drift={[-24, 26]}
          delay={2}
          reduceMotion={reduceMotion}
        />
        <Blob
          className="-bottom-24 -left-16 h-[26rem] w-[26rem] bg-gold/80 blur-[90px]"
          drift={[34, -20]}
          delay={1}
          reduceMotion={reduceMotion}
        />
        <Blob
          className="-bottom-32 -right-10 h-[28rem] w-[28rem] bg-forest/90 blur-[90px]"
          drift={[-30, -24]}
          delay={3}
          reduceMotion={reduceMotion}
        />

        {/* Large faint word behind the picture */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-[5%] z-0 select-none text-center font-serif leading-none text-white/75 ${wordSize}`}
        >
          {wordmark}
        </span>

        <HeroVisual visual={visual} reduceMotion={reduceMotion} />

        {/* Deepens the bottom so the white text stays readable */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-20 h-3/5"
          style={{
            background:
              'linear-gradient(to top, rgba(24,61,43,0.96) 0%, rgba(24,61,43,0.72) 40%, rgba(24,61,43,0) 100%)',
          }}
        />

        {/* Glass pills */}
        {badges[0] && (
          <GlassPill
            tilt={-10}
            delay={0}
            reduceMotion={reduceMotion}
            className={pillPlaces[0]}
          >
            {badges[0]}
          </GlassPill>
        )}
        {badges[1] && (
          <GlassPill
            tilt={10}
            delay={1.5}
            reduceMotion={reduceMotion}
            className={pillPlaces[1]}
          >
            {badges[1]}
          </GlassPill>
        )}

        {/* Heading, text and buttons */}
        <div className="relative z-30 mt-auto grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:p-14">
          <div>
            <motion.p
              className="text-xs font-medium uppercase tracking-[0.28em] text-[#D8C08A]"
              {...fade(0.1)}
            >
              {eyebrow}
            </motion.p>
            <motion.h1
              className="mt-3 text-balance font-serif text-4xl leading-[1.05] text-warm-white sm:text-5xl lg:text-6xl"
              {...fade(0.25)}
            >
              {title}
            </motion.h1>
          </div>

          <motion.div {...fade(0.45)}>
            <p className="max-w-sm text-base leading-relaxed text-warm-white/85">
              {text}
            </p>
            {(cta || link) && (
              <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
                {cta &&
                  (cta.to ? (
                    <Button to={cta.to} variant="glass" shape="soft" size="large" arrow>
                      {cta.label}
                    </Button>
                  ) : (
                    <Button href={cta.href} variant="glass" shape="soft" size="large" arrow>
                      {cta.label}
                    </Button>
                  ))}
                {link && <ActionLink link={link} />}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}