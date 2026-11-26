import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ProductCard from '../shop/ProductCard'
import { PRODUCTS } from '../../data/products'

export default function CollectionSection() {
  return (
    <section className="section">
      <div className="page-container">
        <SectionHeading
          align="center"
          eyebrow="The collection"
          title="Hair & Skincare, Made Simple"
        >
          Lightweight, Considered Formulas For A Simple Daily Ritual.
        </SectionHeading>

        <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-4 lg:gap-x-8">
          {PRODUCTS.map((product, index) => (
            <li key={product.id}>
              <ProductCard product={product} delay={index * 0.08} />
            </li>
          ))}
        </ul>

        <Reveal delay={0.2} className="mt-14 text-center">
          <Button to="/shop" variant="outline">
            Shop all products
          </Button>
        </Reveal>
      </div>
    </section>
  )
}