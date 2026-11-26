import { Info } from 'lucide-react'
import HeroSection from '../components/home/HeroSection'
import MarqueeStrip from '../components/home/MarqueeStrip'
import CollectionSection from '../components/home/CollectionSection'
import ShowcaseSection from '../components/home/ShowcaseSection'
import WhySection from '../components/home/WhySection'
import IngredientsSection from '../components/home/IngredientsSection'
import HowToUseSection from '../components/home/HowToUseSection'
import ReviewSlider from '../components/ReviewSlider'
import Accordion from '../components/ui/Accordion'
import Button from '../components/ui/Button'
import GoldDivider from '../components/ui/GoldDivider'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import { HOME } from '../data/home'

export default function Home() {
  const { reviews, faq } = HOME

  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <CollectionSection />
      <GoldDivider />
      <ShowcaseSection />
      <WhySection />
      <IngredientsSection />
      <HowToUseSection />
      <GoldDivider />

      {/* Customer reviews */}
      <section className="section bg-beige">
        <div className="page-container">
          <SectionHeading
            align="center"
            eyebrow={reviews.eyebrow}
            title={reviews.title}
          />

          {reviews.note && (
            <Reveal delay={0.1} className="mt-6 flex justify-center">
              <p className="inline-flex max-w-xl items-start gap-2 border border-gold/60 px-4 py-2 text-left text-xs leading-relaxed text-charcoal/75">
                <Info
                  size={15}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="mt-px shrink-0 text-gold"
                />
                {reviews.note}
              </p>
            </Reveal>
          )}

          <Reveal delay={0.15} className="mt-12">
            <ReviewSlider
              reviews={reviews.items}
              confirmedReal={reviews.confirmedReal}
            />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="page-container grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow={faq.eyebrow} title={faq.title}>
              {faq.text}
            </SectionHeading>

            <Reveal
              delay={0.15}
              className="mt-10 border-l-2 border-gold bg-beige p-6"
            >
              <h3 className="font-serif text-2xl text-forest">{faq.help.title}</h3>
              <p className="body-text mt-2 text-sm">{faq.help.text}</p>
              <Button to="/contact" variant="outline" className="mt-5">
                {faq.help.cta}
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Accordion items={faq.items} defaultOpenId={faq.items[0].id} numbered />
          </Reveal>
        </div>
      </section>
    </>
  )
}