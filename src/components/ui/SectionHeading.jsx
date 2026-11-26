import Reveal from './Reveal'

/**
 * Props:
 *  - eyebrow: small gold label above the title
 *  - title: the heading text
 *  - children: optional paragraph under the heading
 *  - align: "left" | "center"
 *  - tone: "light" (default) or "dark" for forest-green backgrounds
 */
export default function SectionHeading({
  eyebrow,
  title,
  children,
  align = 'left',
  tone = 'light',
}) {
  const centered = align === 'center'
  const dark = tone === 'dark'

  return (
    <Reveal className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        className={`section-heading mt-4 text-balance ${
          dark ? 'text-warm-white' : 'text-forest'
        }`}
      >
        {title}
      </h2>
      <div className={`gold-rule mt-6 ${centered ? 'mx-auto' : ''}`} />
      {children && (
        <p
          className={`body-text mt-6 text-balance ${
            dark ? 'text-warm-white/75' : ''
          }`}
        >
          {children}
        </p>
      )}
    </Reveal>
  )
}