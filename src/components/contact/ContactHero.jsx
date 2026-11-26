import PageHero from '../ui/PageHero'
import { CONTACT } from '../../data/contact'

export default function ContactHero() {
  const { hero } = CONTACT

  return (
    <PageHero
      eyebrow={hero.eyebrow}
      wordmark={hero.wordmark}
      title={hero.title}
      text={hero.text}
      cta={{ label: hero.cta, href: '#contact-form' }}
      link={{ label: hero.link, href: '#contact-details' }}
      badges={hero.badges}
      visual={hero.portrait}
    />
  )
}