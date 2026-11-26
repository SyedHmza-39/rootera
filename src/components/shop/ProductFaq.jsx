import Accordion from '../ui/Accordion'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function ProductFaq({ product }) {
  const { details, shipping, faq = [] } = product

  const items = [
    {
      id: 'details',
      question: 'Product details',
      answer: `${details.map((item) => `${item.label}: ${item.value}`).join('. ')}.`,
    },
    {
      id: 'shipping',
      question: 'Shipping information',
      answer: `${shipping.summary} ${shipping.details.join('. ')}.`,
    },
    ...faq,
  ]

  return (
    <section id="faq" className="section scroll-mt-28">
      <div className="page-container">
        <SectionHeading align="center" eyebrow="Good to know" title="Details & Questions" />
        <Reveal delay={0.1} className="mx-auto mt-12 max-w-3xl">
          <Accordion items={items} defaultOpenId="details" />
        </Reveal>
      </div>
    </section>
  )
}