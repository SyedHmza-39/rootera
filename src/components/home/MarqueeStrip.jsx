// Words taken from your product labels.
const MARQUEE_ITEMS = [
  'Hair care',
  'Skincare',
  'Lightweight',
  'Hydrating',
  'Gentle',
  'Non-greasy',
]

function Group({ items, duplicate = false }) {
  return (
    <ul
      className={`flex shrink-0 items-center ${duplicate ? 'marquee-dup' : ''}`}
      aria-hidden={duplicate || undefined}
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center whitespace-nowrap font-serif text-xl sm:text-2xl"
        >
          {item}
          <span aria-hidden="true" className="mx-8 h-1.5 w-1.5 bg-gold sm:mx-10" />
        </li>
      ))}
    </ul>
  )
}

export default function MarqueeStrip() {
  return (
    <section
      aria-label="Product highlights"
      className="marquee overflow-hidden bg-forest py-4 text-warm-white"
    >
      <div className="marquee-track">
        <Group items={MARQUEE_ITEMS} />
        <Group items={MARQUEE_ITEMS} duplicate />
      </div>
    </section>
  )
}