import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'

/**
 * Props:
 *  - items: array of { id, question, answer }
 *  - defaultOpenId: id of an item that starts open (optional)
 *  - numbered: show 01, 02, 03 before each question
 */
export default function Accordion({ items, defaultOpenId = null, numbered = false }) {
  const baseId = useId()
  const reduceMotion = useReducedMotion()
  const [openId, setOpenId] = useState(defaultOpenId)

  return (
    <div className="border-t border-charcoal/20">
      {items.map((item, index) => {
        const isOpen = openId === item.id
        const buttonId = `${baseId}-button-${item.id}`
        const panelId = `${baseId}-panel-${item.id}`

        return (
          <div
            key={item.id}
            className={`group relative border-b border-charcoal/20 transition-colors duration-500 ${
              isOpen ? 'bg-beige' : ''
            }`}
          >
            {/* Gold bar on the left edge: draws down on hover and while open */}
            <span
              aria-hidden="true"
              className={`absolute inset-y-0 left-0 w-0.5 origin-top bg-gold transition-transform duration-500 ${
                isOpen ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
              }`}
            />

            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center gap-4 px-4 py-5 text-left"
              >
                {numbered && (
                  <span
                    aria-hidden="true"
                    className="min-w-6 font-serif text-sm tracking-[0.14em] text-gold"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                )}
                <span className="flex-1 font-serif text-xl leading-snug text-forest sm:text-2xl">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                    isOpen
                      ? 'rotate-45 border-forest bg-forest text-warm-white'
                      : 'border-charcoal/25 text-forest'
                  }`}
                >
                  <Plus size={16} strokeWidth={1.5} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    ease: [0.2, 0.7, 0.2, 1],
                  }}
                  className="overflow-hidden"
                >
                  <p
                    className={`body-text pb-6 pr-14 ${
                      numbered ? 'pl-14' : 'pl-4'
                    }`}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}