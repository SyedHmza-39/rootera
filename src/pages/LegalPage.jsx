import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'
import NotFound from './NotFound'
import { LEGAL, LEGAL_ORDER } from '../data/legal'
import { SITE } from '../data/site'
import { usePageTitle } from '../hooks/usePageTitle'
import { isPlaceholder } from '../utils/placeholder'

// Turns **bold** markers into bold text
function Rich({ text }) {
  return text.split('**').map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-semibold text-forest">
        {part}
      </strong>
    ) : (
      part
    ),
  )
}

function Paragraphs({ items, className = '' }) {
  return items.map((text) => (
    <p key={text} className={`body-text mt-4 ${className}`}>
      <Rich text={text} />
    </p>
  ))
}

export default function LegalPage({ doc }) {
  const page = LEGAL[doc]
  usePageTitle(page ? `${page.title} | ROOTERA` : 'Page not found | ROOTERA')

  if (!page) return <NotFound />

  const { email } = SITE.contact
  const others = LEGAL_ORDER.filter((item) => item.key !== doc)

  return (
    <>
      <section className="bg-beige py-16 text-center sm:py-20">
        <div className="page-container">
          <Reveal>
            <p className="eyebrow">Legal</p>
            <h1 className="mt-4 text-balance font-serif text-4xl leading-[1.05] text-forest sm:text-5xl lg:text-6xl">
              {page.title}
            </h1>
            <div className="gold-rule mx-auto mt-6" />
          </Reveal>
        </div>
      </section>

      <section className="section-tight pb-20 sm:pb-24">
        <div className="page-container">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <Paragraphs items={page.intro} />
            </Reveal>

            {page.sections.map((section) => (
              <Reveal
                key={section.title}
                className="mt-10 border-t border-charcoal/15 pt-8"
              >
                <h2 className="font-serif text-2xl text-forest">{section.title}</h2>
                <Paragraphs items={section.paragraphs} />

                {section.list && (
                  <ul className="mt-4 space-y-2">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-base leading-relaxed text-charcoal/80"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.7em] h-1.25 w-1.25 shrink-0 rotate-45 bg-gold"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.link && (
                  <Link
                    to={section.link.to}
                    className="mt-4 inline-block border-b border-gold pb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-forest transition-colors hover:text-gold"
                  >
                    {section.link.label}
                  </Link>
                )}
              </Reveal>
            ))}

            {page.outro.length > 0 && (
              <Reveal
                className={page.sections.length > 0 ? 'mt-10 border-t border-charcoal/15 pt-8' : 'mt-8'}
              >
                <Paragraphs items={page.outro} />
              </Reveal>
            )}

            <Reveal className="mt-12 rounded-2xl border-l-2 border-gold bg-beige p-6">
              <p className="text-sm leading-relaxed text-charcoal/80">
                Questions about this page?{' '}
                {!isPlaceholder(email) && (
                  <>
                    Write to us at{' '}
                    <a
                      href={`mailto:${email}`}
                      className="font-medium text-forest underline decoration-gold underline-offset-2 hover:text-gold"
                    >
                      {email}
                    </a>{' '}
                    or use our{' '}
                  </>
                )}
                {isPlaceholder(email) && <>Use our </>}
                <Link
                  to="/contact"
                  className="font-medium text-forest underline decoration-gold underline-offset-2 hover:text-gold"
                >
                  contact page
                </Link>
                .
              </p>
            </Reveal>

            <nav aria-label="Other policies" className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {others.map((item) => (
                <Link
                  key={item.key}
                  to={item.to}
                  className="border-b border-gold pb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-forest transition-colors hover:text-gold"
                >
                  {LEGAL[item.key].title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </>
  )
}