import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin } from 'lucide-react'
import SocialIcon from '../ui/SocialIcon'
import { SITE } from '../../data/site'
import { CONTACT } from '../../data/contact'
import { isPlaceholder } from '../../utils/placeholder'

export default function ContactDetails() {
  const { email, address, hours } = SITE.contact
  const { details } = CONTACT

  // Only social profiles that have a link are shown
  const socials = (SITE.social ?? []).filter((item) => item.href)

  const rows = [
    {
      icon: Mail,
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      empty: 'Email address coming soon',
    },
    { icon: MapPin, label: 'Address', value: address, empty: 'Address coming soon' },
    { icon: Clock, label: 'Hours', value: hours, empty: 'Business hours coming soon' },
  ]

  return (
    <div>
      <p className="eyebrow">{details.eyebrow}</p>
      <h2 className="section-heading mt-4 text-balance text-forest">
        {details.title}
      </h2>
      <div className="gold-rule mt-6" />

      <ul className="mt-8 border-t border-charcoal/15">
        {rows.map(({ icon: Icon, label, value, href, empty }) => {
          const available = !isPlaceholder(value)
          return (
            <li
              key={label}
              className="flex items-start gap-4 border-b border-charcoal/15 py-5"
            >
              <Icon
                size={20}
                strokeWidth={1.25}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-gold"
              />
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-charcoal/55">
                  {label}
                </p>
                {available && href ? (
                  <a
                    href={href}
                    className="mt-1 block text-charcoal transition-colors hover:text-gold"
                  >
                    {value}
                  </a>
                ) : (
                  <p
                    className={`mt-1 ${available ? 'text-charcoal' : 'text-charcoal/55'}`}
                  >
                    {available ? value : empty}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      {socials.length > 0 && (
        <div className="mt-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-charcoal/55">
            Follow
          </p>
          <ul className="mt-3 flex flex-wrap gap-2.5">
            {socials.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-10 min-w-10 items-center justify-center rounded-full border border-charcoal/30 px-1 text-forest transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-charcoal"
                >
                  <SocialIcon label={item.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10 rounded-2xl border-l-2 border-gold bg-beige p-5">
        <p className="text-sm text-charcoal/80">{details.shopNote}</p>
        <Link
          to="/shop"
          className="mt-3 inline-block border-b border-gold pb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-forest transition-colors hover:text-gold"
        >
          {details.shopLink}
        </Link>
      </div>
    </div>
  )
}