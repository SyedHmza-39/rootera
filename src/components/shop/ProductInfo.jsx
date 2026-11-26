import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { BENEFITS } from '../../data/benefits'

const EASE = [0.2, 0.7, 0.2, 1]
const pad = (number) => String(number).padStart(2, '0')

export default function ProductInfo({ product }) {
  const reduceMotion = useReducedMotion()
  const {
    keyIngredients,
    directions,
    fullIngredientList,
    ingredientListPlaceholder,
    allergyNote,
  } = product
  const benefits = BENEFITS[product.slug] ?? []
  const steps = directions.steps

  return (
    <>
      {/* Benefits */}
      {benefits.length > 0 && (
        <section className="section">
          <div className="page-container">
            <SectionHeading
              align="center"
              eyebrow="Benefits"
              title="What It Is Designed To Do"
            />

            <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
              {benefits.map((benefit, index) => (
                <li key={benefit}>
                  <Reveal
                    delay={index * 0.08}
                    className="h-full border-t border-charcoal/20 pt-5 transition-colors duration-500 hover:border-gold"
                  >
                    <span
                      aria-hidden="true"
                      className="font-serif text-base tracking-[0.2em] text-gold"
                    >
                      {pad(index + 1)}
                    </span>
                    <p className="mt-3 text-balance text-[0.95rem] leading-relaxed text-charcoal/85">
                      {benefit}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Ingredients, directions and the full list */}
      <section className="section bg-beige">
        <div className="page-container">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <div id="ingredients" className="scroll-mt-28">
              <SectionHeading eyebrow="Ingredients" title="What is Inside" />

              <ul className="mt-10 space-y-6">
                {keyIngredients.map((ingredient, index) => (
                  <li key={ingredient.name}>
                    <Reveal
                      delay={index * 0.1}
                      className="border-l-2 border-gold/40 pl-5 transition-colors duration-500 hover:border-gold"
                    >
                      <h3 className="font-serif text-2xl text-forest">
                        {ingredient.name}
                      </h3>
                      <p className="body-text mt-1 text-sm">{ingredient.note}</p>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            <div id="directions" className="scroll-mt-28">
              <SectionHeading eyebrow="Directions for use" title="A Simple Ritual" />

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
                          className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold bg-beige font-serif text-base text-gold transition-colors duration-500 group-hover:border-forest group-hover:bg-forest group-hover:text-warm-white"
                        >
                          {index + 1}
                        </span>
                        <p className="body-text pt-1.5 text-[0.95rem]">{step}</p>
                      </Reveal>
                    </li>
                  )
                })}
              </ol>

              {!directions.confirmed && directions.note && (
                <p className="mt-8 border-l-2 border-gold bg-warm-white px-4 py-3.5 text-sm leading-relaxed text-charcoal/75">
                  {directions.note}
                </p>
              )}
            </div>
          </div>

          <Reveal className="mx-auto mt-20 max-w-4xl border border-t-2 border-charcoal/15 border-t-gold bg-warm-white p-8 sm:p-12">
            <p className="eyebrow">Full ingredient list</p>
            <h2 className="mt-3 text-balance font-serif text-3xl text-forest">
              Complete Ingredients (INCI)
            </h2>
            <div className="gold-rule mt-5" />

            <p className="mt-6 text-base leading-loose text-charcoal/80">
              {fullIngredientList || ingredientListPlaceholder}
            </p>

            {fullIngredientList && (
              <div className="mt-8 border-l-2 border-gold bg-beige px-4 py-3 text-sm leading-relaxed text-charcoal/80">
                {allergyNote && (
                  <p className="font-medium text-forest">{allergyNote}</p>
                )}
                <p className={allergyNote ? 'mt-1' : ''}>
                  If you have allergies or sensitivities, please check this list
                  before use.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}