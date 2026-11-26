import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ProductImage from '../ui/ProductImage'
import { PRODUCT } from '../../data/product'
import { HOME } from '../../data/home'
import { productPath } from '../../utils/product'

const pad = (number) => String(number).padStart(2, '0')

export default function IngredientsSection() {
  const { ingredients, ingredientImages } = HOME

  return (
    <section className="section bg-beige">
      <div className="page-container">
        <SectionHeading
          align="center"
          eyebrow={ingredients.eyebrow}
          title={ingredients.title}
        >
          {ingredients.text}
        </SectionHeading>

        {/* The middle card sits lower on desktop for an editorial, staggered look */}
        <ul className="mt-14 grid gap-12 md:grid-cols-3 md:items-start">
          {PRODUCT.keyIngredients.map((ingredient, index) => {
            const media = ingredientImages[ingredient.name]

            return (
              <li key={ingredient.name} className={index === 1 ? 'md:mt-12' : ''}>
                <Reveal delay={index * 0.1} className="group">
                  <div className="frame-draw overflow-hidden">
                    <div className="transition-transform duration-1300 ease-out group-hover:scale-[1.07]">
                      <ProductImage
                        name={media?.image}
                        alt={media?.alt ?? ingredient.name}
                        fit="cover"
                        className="aspect-4/3 w-full"
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="font-serif text-base tracking-[0.2em] text-gold"
                    >
                      {pad(index + 1)}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-charcoal/20"
                    />
                    <span className="text-[11px] uppercase tracking-[0.18em] text-charcoal/50">
                      Key ingredient
                    </span>
                  </div>

                  <h3 className="mt-3 font-serif text-3xl text-forest">
                    {ingredient.name}
                  </h3>
                  <p className="body-text mt-2 text-sm">{ingredient.note}</p>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <Reveal delay={0.2} className="mt-14 text-center">
          <Link
            to={`${productPath(PRODUCT)}#ingredients`}
            className="border-b border-gold pb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-forest transition-colors hover:text-gold"
          >
            See the full ingredient list
          </Link>
        </Reveal>
      </div>
    </section>
  )
}