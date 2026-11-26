import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import Button from './ui/Button'
import GoldDivider from './ui/GoldDivider'
import ProductImage from './ui/ProductImage'
import SocialIcon from './ui/SocialIcon'
import { NAV_LINKS, SITE } from '../data/site'
import { PRODUCT } from '../data/product'
import { isPlaceholder } from '../utils/placeholder'
import { resolveProductImage } from '../utils/images'

const EASE = [0.2, 0.7, 0.2, 1]
const columnTitle =
  'text-[11px] font-medium uppercase tracking-[0.26em] text-gold'

// A light fade-up. It uses no negative viewport margin on purpose: elements at
// the very bottom of the page must still be able to appear.
function FadeIn({ children, delay = 0, className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="group relative inline-block text-sm text-warm-white/75 transition-colors duration-300 hover:text-warm-white"
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
      />
    </Link>
  )
}

function Ring({ r, stroke, delay, reduceMotion }) {
  return (
    <motion.circle
      cx="130"
      cy="145"
      r={r}
      stroke={stroke}
      strokeWidth="1"
      initial={reduceMotion ? false : { pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 2, delay, ease: EASE }}
    />
  )
}

// Tilted bottle floating inside two thin rings.
function BottleStage({ reduceMotion }) {
  return (
    <div className="relative mx-auto flex h-[290px] w-[260px] items-center justify-center">
      <svg
        aria-hidden="true"
        viewBox="0 0 260 290"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        <Ring
          r={124}
          stroke="rgba(250,249,246,0.35)"
          delay={0}
          reduceMotion={reduceMotion}
        />
        <Ring r={98} stroke="#B99A55" delay={0.25} reduceMotion={reduceMotion} />
      </svg>

      <motion.div
        animate={
          reduceMotion ? { rotate: 8 } : { y: [0, -10, 0], rotate: [10, 7, 10] }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 7, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <ProductImage
          name={PRODUCT.showcaseImage}
          alt={`${PRODUCT.brand} ${PRODUCT.name}, ${PRODUCT.size} frosted glass dropper bottle with a black dropper`}
          transparent
          className="aspect-[359/897] w-24"
        />
      </motion.div>
    </div>
  )
}

export default function Footer() {
  const reduceMotion = useReducedMotion()
  const { email, address, hours } = SITE.contact

  // Only social profiles that have a link are shown
  const socials = (SITE.social ?? []).filter((item) => item.href)
  const hasSocial = socials.length > 0

  // Show the bottle only if the cutout image exists.
  const hasBottle = Boolean(resolveProductImage(PRODUCT.showcaseImage))

  const scrollToTop = () =>
    window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? 'auto' : 'smooth' })

  return (
    <footer>
      {/* Wavy top edge. The area above it shows the page background. */}
      <div aria-hidden="true" className="-mb-px leading-none text-forest">
        <svg
          viewBox="0 0 1440 84"
          preserveAspectRatio="none"
          fill="currentColor"
          className="block h-14 w-full sm:h-20"
        >
          <path d="M0 34 C220 6 470 14 720 44 C970 74 1200 80 1440 22 L1440 84 L0 84 Z" />
        </svg>
      </div>

      <div className="relative overflow-hidden bg-forest text-warm-white">
        {/* Faint oversized wordmark, cropped at the bottom edge */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-[26%] select-none whitespace-nowrap text-center font-serif text-[clamp(3rem,14vw,12rem)] leading-none tracking-[0.12em] text-gold/10"
        >
          {SITE.name}
        </span>

        <div className="relative">
          {/* Closing statement */}
          <div className="page-container grid items-center gap-8 py-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10 lg:py-20">
            <FadeIn
              className={hasBottle ? 'order-2 lg:order-1' : 'lg:col-span-2'}
            >
              <p className="eyebrow">{SITE.closing.eyebrow}</p>
              <p className="mt-4 text-balance font-serif text-4xl font-medium leading-[1.05] text-warm-white sm:text-5xl">
                {SITE.tagline}
              </p>
              <div aria-hidden="true" className="gold-rule mt-6" />
              <p className="mt-6 max-w-md text-base leading-relaxed text-warm-white/75">
                {SITE.closing.text}
              </p>
              <div className="mt-8">
                <Button to="/shop" variant="light">
                  {SITE.closing.cta}
                </Button>
              </div>
            </FadeIn>

            {hasBottle && (
              <FadeIn delay={0.15} className="order-1 lg:order-2">
                <BottleStage reduceMotion={reduceMotion} />
              </FadeIn>
            )}
          </div>

          <GoldDivider />

          <div className="page-container">
            {/* Columns */}
            <div
              className={`grid gap-12 py-12 sm:grid-cols-2 lg:gap-10 lg:py-14 ${
                hasSocial
                  ? 'lg:grid-cols-[1.3fr_0.8fr_1fr_1fr]'
                  : 'lg:grid-cols-[1.4fr_0.8fr_1fr]'
              }`}
            >
              <FadeIn className="sm:col-span-2 lg:col-span-1">
                <p className="font-serif text-3xl tracking-[0.22em] text-gold">
                  {SITE.name}
                </p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-warm-white/65">
                  Premium, minimalist hair and skincare. Lightweight formulas made
                  for a simple, consistent ritual.
                </p>
              </FadeIn>

              <FadeIn delay={0.08}>
                <nav aria-label="Footer">
                  <h2 className={columnTitle}>Explore</h2>
                  <ul className="mt-5 space-y-3">
                    {NAV_LINKS.map((link) => (
                      <li key={link.to}>
                        <FooterLink to={link.to}>{link.label}</FooterLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              </FadeIn>

              <FadeIn delay={0.16}>
                <h2 className={columnTitle}>Contact</h2>
                <ul className="mt-5 space-y-3 text-sm text-warm-white/70">
                  <li>
                    {isPlaceholder(email) ? (
                      'Email address coming soon'
                    ) : (
                      <a
                        href={`mailto:${email}`}
                        className="transition-colors hover:text-gold"
                      >
                        {email}
                      </a>
                    )}
                  </li>
                  {!isPlaceholder(address) && <li>{address}</li>}
                  {!isPlaceholder(hours) && <li>{hours}</li>}
                </ul>
              </FadeIn>

              {hasSocial && (
                <FadeIn delay={0.24}>
                  <h2 className={columnTitle}>Follow</h2>
                  <ul className="mt-5 flex flex-wrap gap-2.5">
                    {socials.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={item.label}
                          className="flex h-10 min-w-10 items-center justify-center rounded-full border border-warm-white/30 px-1 text-warm-white/80 transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-charcoal"
                        >
                          <SocialIcon label={item.label} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              )}
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col gap-5 border-t border-warm-white/20 py-6 text-xs text-warm-white/60 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p>
                  &copy; {new Date().getFullYear()} {SITE.name}. All rights
                  reserved.
                </p>
                <p>Orders are confirmed by ROOTERA. Payment is cash on delivery.</p>
              </div>

              <ul className="flex flex-wrap gap-x-6 gap-y-1">
                {SITE.legal.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="transition-colors hover:text-gold"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-warm-white/45">
                        {item.label} (coming soon)
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 self-start rounded-xl border border-warm-white/35 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-warm-white transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-charcoal md:self-auto"
              >
                <ArrowUp size={14} strokeWidth={1.5} aria-hidden="true" />
                Back to top
              </button>
            </div>

            {/* Space below the bar so the faint wordmark shows */}
            <div aria-hidden="true" className="h-14 sm:h-24" />
          </div>
        </div>
      </div>
    </footer>
  )
}