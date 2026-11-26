import { motion, useReducedMotion } from 'framer-motion'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ProductImage from '../ui/ProductImage'
import GoldFrame from '../ui/GoldFrame'
import { PRODUCT } from '../../data/product'
import { HOME } from '../../data/home'
import { productPath } from '../../utils/product'

const EASE = [0.2, 0.7, 0.2, 1]

export default function HowToUseSection() {
  const reduceMotion = useReducedMotion()
  const { howToUse } = HOME
  const { directions } = PRODUCT
  const steps = directions.steps

  return (
    <section className="section">
      <div className="page-container grid items-center gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <Reveal className="mx-auto w-full max-w-md lg:ml-0">
          <GoldFrame side="left">
            <div className="group overflow-hidden">
              <div className="transition-transform duration-1400 ease-out group-hover:scale-[1.06]">
                <ProductImage
                  name={howToUse.image}
                  alt={howToUse.alt}
                  fit="cover"
                  className="aspect-square w-full"
                />
              </div>
            </div>
          </GoldFrame>
        </Reveal>

        <div>
          <SectionHeading eyebrow={howToUse.eyebrow} title={howToUse.title} />

          {/* Steps hang from a gold line that draws down, one segment per step */}
          <ol className="mt-10">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1

              return (
                <li key={step} className="relative pb-8 last:pb-0">
                  {!isLast && (
                    <>
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-5 top-10 w-px bg-gold/30"
                      />
                      <motion.span
                        aria-hidden="true"
                        className="absolute bottom-0 left-5 top-10 w-px origin-top bg-gold"
                        initial={reduceMotion ? false : { scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{
                          duration: 0.9,
                          delay: 0.4 + index * 0.25,
                          ease: EASE,
                        }}
                      />
                    </>
                  )}

                  <Reveal delay={index * 0.12} className="group flex gap-5">
                    <span
                      aria-hidden="true"
                      className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold bg-warm-white font-serif text-base text-gold transition-colors duration-500 group-hover:border-forest group-hover:bg-forest group-hover:text-warm-white"
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="mt-1 font-serif text-2xl text-forest">
                        {howToUse.stepTitles[index] ?? `Step ${index + 1}`}
                      </h3>
                      <p className="body-text mt-1 text-[0.95rem]">{step}</p>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ol>

          {!directions.confirmed && directions.note && (
            <p className="mt-10 border-l-2 border-gold bg-beige px-4 py-3.5 text-sm leading-relaxed text-charcoal/75">
              {directions.note}
            </p>
          )}

          <div className="mt-8">
            <Button to={productPath(PRODUCT)} variant="outline">
              See product details
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}