import { Info } from 'lucide-react'
import ContactHero from '../components/contact/ContactHero'
import ContactForm from '../components/contact/ContactForm'
import ContactDetails from '../components/contact/ContactDetails'
import Reveal from '../components/ui/Reveal'
import { CONTACT } from '../data/contact'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Contact() {
usePageTitle('Contact')
const { form } = CONTACT

  return (
    <>
      <ContactHero />

      <section className="section">
        <div className="page-container grid items-start gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div id="contact-form" className="scroll-mt-28">
            <Reveal>
              <p className="eyebrow">{form.eyebrow}</p>
              <h2 className="section-heading mt-4 text-balance text-forest">
                {form.title}
              </h2>
              <div className="gold-rule mt-6" />
              <p className="mt-6 flex items-start gap-2 border-l-2 border-gold bg-beige px-4 py-3 text-sm leading-relaxed text-charcoal/80">
                <Info
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-gold"
                />
                {form.note}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <ContactForm />
            </Reveal>
          </div>

          <div id="contact-details" className="scroll-mt-28 lg:pt-4">
            <Reveal delay={0.1}>
              <ContactDetails />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}