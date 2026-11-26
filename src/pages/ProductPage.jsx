import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import GoldDivider from '../components/ui/GoldDivider'
import ProductHero from '../components/shop/ProductHero'
import ProductStory from '../components/shop/ProductStory'
import ProductInfo from '../components/shop/ProductInfo'
import ProductFaq from '../components/shop/ProductFaq'
import RelatedProducts from '../components/shop/RelatedProducts'
import StickyBuyBar from '../components/shop/StickyBuyBar'
import { getProductBySlug } from '../data/products'
import { useStickyBar } from '../hooks/useStickyBar'

export default function ProductPage() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const buyRef = useRef(null)
  const endRef = useRef(null)
  const showSticky = useStickyBar(buyRef, endRef, slug)

  // A page title that is unique to each product (good for sharing and search)
  useEffect(() => {
    if (!product) return undefined
    const previous = document.title
    document.title = `${product.name} | ${product.brand}`
    return () => {
      document.title = previous
    }
  }, [product])

  if (!product) {
    return (
      <section className="section">
        <div className="page-container text-center">
          <p className="eyebrow">Product not found</p>
          <h1 className="mt-4 font-serif text-4xl text-forest">
            We could not find that product
          </h1>
          <div className="gold-rule mx-auto mt-6" />
          <p className="body-text mx-auto mt-6 max-w-md">
            The link may be wrong or the product may have moved.
          </p>
          <div className="mt-8">
            <Button to="/shop">Back to the shop</Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <ProductHero key={product.slug} product={product} buyRef={buyRef} />
      <ProductStory product={product} />
      <ProductInfo product={product} />
      <ProductFaq key={`faq-${product.slug}`} product={product} />
      <GoldDivider />
      <RelatedProducts currentSlug={product.slug} />

      {/* Marks the end of the page so the sticky bar can hide near the footer */}
      <div ref={endRef} aria-hidden="true" />
      <StickyBuyBar key={`bar-${product.slug}`} product={product} visible={showSticky} />
    </>
  )
}