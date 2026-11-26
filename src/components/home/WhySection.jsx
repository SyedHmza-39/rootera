import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ProductImage from '../ui/ProductImage'
import GoldFrame from '../ui/GoldFrame'
import { PRODUCT } from '../../data/product'
import { HOME } from '../../data/home'

export default function WhySection() {
  const { why } = HOME

  return (
    <section className="section bg-forest">
      <div className="page-container grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionHeading eyebrow={why.eyebrow} title={why.title} tone="dark">
            {why.text}
          </SectionHeading>

          <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
            {why.points.map((point, index) => (
              <li key={point.id}>
                <Reveal
                  delay={index * 0.1}
                  className="group border-t border-warm-white/20 pb-6 pt-5 transition-colors duration-500 hover:border-gold"
                >
                  <span
                    aria-hidden="true"
                    className="font-serif text-base tracking-[0.2em] text-gold"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-1 font-serif text-2xl text-warm-white">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-warm-white/75">
                    {point.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1} className="mx-auto w-full max-w-md lg:mr-0">
          <GoldFrame side="left">
            <div className="group overflow-hidden">
              <div className="transition-transform duration-1400 ease-out group-hover:scale-[1.06]">
                <ProductImage
                  name={why.image}
                  alt={why.alt}
                  fit="cover"
                  className="aspect-square w-full"
                />
              </div>
            </div>
          </GoldFrame>

          <p className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.2em] text-warm-white/60">
            <span>Frosted glass</span>
            <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-gold" />
            <span>Black dropper</span>
            <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-gold" />
            <span>{PRODUCT.size}</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}