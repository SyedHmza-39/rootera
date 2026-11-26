import { useMemo, useState } from 'react'
import PageHero from '../components/ui/PageHero'
import ProductCard from '../components/shop/ProductCard'
import { CATEGORIES, PRODUCTS } from '../data/products'
import { SHOP } from '../data/shop'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Shop() {
  usePageTitle('Shop | ROOTERA')
  const [category, setCategory] = useState('All')
  const { hero } = SHOP

  const visible = useMemo(
    () =>
      category === 'All'
        ? PRODUCTS
        : PRODUCTS.filter((product) => product.category === category),
    [category],
  )

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        wordmark={hero.wordmark}
        title={hero.title}
        text={hero.text}
        cta={hero.cta}
        link={hero.link}
        badges={hero.badges}
      />

      <section id="products" className="section-tight scroll-mt-28 pb-20 sm:pb-24">
        <div className="page-container">
          <div
            role="group"
            aria-label="Filter products by category"
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {CATEGORIES.map((item) => {
              const isActive = item === category
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={isActive}
                  className={`rounded-xl border px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isActive
                      ? 'border-forest bg-forest text-warm-white'
                      : 'border-charcoal/25 text-forest hover:border-gold'
                  }`}
                >
                  {item}
                </button>
              )
            })}
          </div>

          <p
            aria-live="polite"
            className="mt-6 text-center text-xs uppercase tracking-[0.16em] text-charcoal/55"
          >
            {visible.length} {visible.length === 1 ? 'product' : 'products'}
          </p>

          {visible.length === 0 ? (
            <p className="body-text mt-12 text-center">
              No products in this category yet.
            </p>
          ) : (
            <ul
              key={category}
              className="mt-12 grid grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-4 lg:gap-x-8"
            >
              {visible.map((product, index) => (
                <li key={product.id}>
                  <ProductCard product={product} delay={index * 0.08} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}