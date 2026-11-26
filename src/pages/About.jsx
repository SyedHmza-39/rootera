import { ListChecks, Package } from 'lucide-react'
import FramedImage from '../components/ui/FramedImage'
import GoldDivider from '../components/ui/GoldDivider'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import RotatingBadge from '../components/ui/RotatingBadge'
import SectionHeading from '../components/ui/SectionHeading'
import FeaturedProductCard from '../components/shop/FeaturedProductCard'
import { PRODUCT } from '../data/product'
import { ABOUT } from '../data/about'
import { usePageTitle } from '../hooks/usePageTitle'

const ICONS = { list: ListChecks, package: Package }
const pad = (number) => String(number).padStart(2, '0')

export default function About() {
  usePageTitle('About | ROOTERA')
  const { banner, story, quote, philosophy, approach, transparency } = ABOUT

  return (
    <>
      {/* 1. Hero */}
      <PageHero
        eyebrow={banner.eyebrow}
        wordmark={banner.wordmark}
        title={banner.title}
        text={banner.text}
        cta={banner.cta}
        link={banner.link}
        badges={banner.badges}
        visual={banner.visual}
      />

      {/* 2. Our story */}
      <section id="our-story" className="section scroll-mt-28">
        <div className="page-container grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <FramedImage
            name={story.image}
            alt={story.alt}
            side="left"
            badge={<RotatingBadge text={story.badgeText} />}
            className="mx-auto w-full max-w-md lg:ml-0"
          />

          <div>
            <SectionHeading eyebrow={story.eyebrow} title={story.title} />
            <Reveal delay={0.1} className="mt-6 space-y-4">
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph} className="body-text">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Pull quote */}
      <section className="bg-forest py-20 text-center sm:py-24">
        <div className="page-container">
          <Reveal>
            <span
              aria-hidden="true"
              className="block h-10 font-serif text-8xl leading-none text-gold/70"
            >
              &ldquo;
            </span>
            <blockquote className="mx-auto mt-4 max-w-2xl text-balance font-serif text-3xl leading-snug text-warm-white sm:text-4xl">
              {quote.text}
            </blockquote>
            <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.26em] text-gold">
              {quote.author}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 4. Our philosophy */}
      <section className="section">
        <div className="page-container">
          <SectionHeading
            align="center"
            eyebrow={philosophy.eyebrow}
            title={philosophy.title}
          />

          <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {philosophy.items.map((item, index) => (
              <li key={item.id}>
                <Reveal
                  delay={index * 0.1}
                  className="border-t border-charcoal/20 pt-5 transition-colors duration-500 hover:border-gold"
                >
                  <span
                    aria-hidden="true"
                    className="font-serif text-base tracking-[0.2em] text-gold"
                  >
                    {pad(index + 1)}
                  </span>
                  <h3 className="mt-1 font-serif text-3xl text-forest">
                    {item.title}
                  </h3>
                  <p className="body-text mt-3 text-sm">{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Our approach */}
      <section className="section bg-beige">
        <div className="page-container grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="order-2 lg:order-1">
            <SectionHeading eyebrow={approach.eyebrow} title={approach.title} />

            <Reveal delay={0.1} className="mt-6 space-y-4">
              {approach.paragraphs.map((paragraph) => (
                <p key={paragraph} className="body-text">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {PRODUCT.keyIngredients.map((ingredient, index) => (
                <li key={ingredient.name}>
                  <Reveal
                    delay={0.15 + index * 0.08}
                    className="h-full rounded-xl border border-gold/50 bg-warm-white/60 p-4"
                  >
                    <h3 className="font-serif text-xl text-forest">
                      {ingredient.name}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-charcoal/70">
                      {ingredient.note}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <FramedImage
            name={approach.image}
            alt={approach.alt}
            className="order-1 mx-auto w-full max-w-md lg:order-2 lg:mr-0"
          />
        </div>
      </section>

      {/* 6. Quality and transparency */}
      <section className="section">
        <div className="page-container">
          <SectionHeading
            align="center"
            eyebrow={transparency.eyebrow}
            title={transparency.title}
          />

          <ul className="mx-auto mt-14 grid max-w-3xl gap-12 md:grid-cols-2">
            {transparency.items.map((item, index) => {
              const Icon = ICONS[item.icon] ?? ListChecks

              return (
                <li key={item.id}>
                  <Reveal delay={index * 0.1} className="text-center">
                    <Icon
                      size={28}
                      strokeWidth={1.25}
                      aria-hidden="true"
                      className="mx-auto text-gold"
                    />
                    <h3 className="mt-4 font-serif text-2xl text-forest">
                      {item.title}
                    </h3>
                    <p className="body-text mx-auto mt-2 max-w-[17rem] text-sm">
                      {item.text}
                    </p>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <GoldDivider />

      {/* 7. Featured products, one by one */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="page-container">
          <Reveal>
            <FeaturedProductCard />
          </Reveal>
        </div>
      </section>
    </>
  )
}