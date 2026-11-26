import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { resolveProductImage } from '../../utils/images'

export default function ProductStory({ product }) {
  const { about } = product
  if (!about) return null

  const src = resolveProductImage(about.image)

  return (
    <section className="grid md:grid-cols-2">
      {/* A square photo cell, so the whole bottle stays in view */}
      <div className="relative aspect-square bg-beige">
        {src ? (
          <img
            src={src}
            alt={about.alt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: about.position ?? '50% 40%' }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={about.alt}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <span className="font-serif text-2xl tracking-[0.25em] text-gold">
              ROOTERA
            </span>
            <span className="mt-2 text-[11px] uppercase tracking-[0.2em] text-charcoal/50">
              Image coming soon
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center bg-forest px-8 py-14 text-warm-white sm:px-14 lg:px-20">
        <Reveal>
          <p className="eyebrow">About the product</p>
          <h2 className="mt-4 text-balance font-serif text-3xl leading-tight text-warm-white sm:text-4xl">
            {about.title}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-warm-white/80">
            {about.text}
          </p>
          <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-gold">
            By {product.brand}
          </p>
          <div className="mt-6">
            <Button to="/about" variant="light">
              Learn more
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}