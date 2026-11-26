import SectionHeading from '../ui/SectionHeading'
import ProductCard from './ProductCard'
import { PRODUCTS } from '../../data/products'

export default function RelatedProducts({ currentSlug }) {
  const others = PRODUCTS.filter((product) => product.slug !== currentSlug).slice(0, 3)
  if (others.length === 0) return null

  return (
    <section className="section">
      <div className="page-container">
        <SectionHeading
          align="center"
          eyebrow="The collection"
          title="You May Also Like"
        />
        <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((product, index) => (
            <li key={product.id}>
              <ProductCard product={product} delay={index * 0.1} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}