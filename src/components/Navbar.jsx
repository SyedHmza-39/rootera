import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { NAV_LINKS, SITE } from '../data/site'
import { useCart } from '../hooks/useCart'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'

const LEFT_LINKS = NAV_LINKS.slice(0, 2)
const RIGHT_LINKS = NAV_LINKS.slice(2)

function DesktopLink({ to, label }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className="group relative py-2 text-[12px] uppercase tracking-[0.2em] text-charcoal/70 transition-colors duration-300 hover:text-forest"
    >
      {({ isActive }) => (
        <>
          <span className={isActive ? 'text-forest' : ''}>{label}</span>
          <span
            aria-hidden="true"
            className={`absolute inset-x-0 bottom-0 h-px origin-left bg-gold transition-transform duration-300 ${
              isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`}
          />
        </>
      )}
    </NavLink>
  )
}

export default function Navbar() {
  const { pathname } = useLocation()
  const { itemCount, openCart } = useCart()
  const toggleRef = useRef(null)

  const [menuPath, setMenuPath] = useState(null)
  const menuOpen = menuPath === pathname

  useLockBodyScroll(menuOpen)

  // Close the menu with the Escape key and return focus to the toggle button
  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuPath(null)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  // Close the menu if the window is widened to the desktop layout
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const onChange = (event) => {
      if (event.matches) setMenuPath(null)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const toggleMenu = () => setMenuPath(menuOpen ? null : pathname)
  const closeMenu = () => setMenuPath(null)

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-warm-white/95 backdrop-blur">
      <div className="page-container grid h-16 grid-cols-[1fr_auto_1fr] items-center lg:h-20">
        {/* Left: hamburger on mobile, links on desktop */}
        <div className="flex items-center">
          <button
            ref={toggleRef}
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="-ml-2 p-2 text-forest lg:hidden"
          >
            {menuOpen ? (
              <X size={22} strokeWidth={1.5} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}
          </button>

          <nav aria-label="Main left" className="hidden gap-9 lg:flex">
            {LEFT_LINKS.map((link) => (
              <DesktopLink key={link.to} to={link.to} label={link.label} />
            ))}
          </nav>
        </div>

        {/* Center: wordmark */}
        <Link
          to="/"
          onClick={closeMenu}
          aria-label={`${SITE.name} home`}
          className="font-serif text-xl tracking-[0.22em] text-gold sm:text-2xl lg:text-3xl"
        >
          {SITE.name}
        </Link>

        {/* Right: links on desktop, cart always */}
        <div className="flex items-center justify-end gap-9">
          <nav aria-label="Main right" className="hidden gap-9 lg:flex">
            {RIGHT_LINKS.map((link) => (
              <DesktopLink key={link.to} to={link.to} label={link.label} />
            ))}
          </nav>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
            className="relative -mr-2 p-2 text-forest transition-colors hover:text-gold"
          >
            <ShoppingBag size={21} strokeWidth={1.5} />
            {itemCount > 0 && (
              <motion.span
                key={itemCount}
                initial={{ scale: 1.7 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 420, damping: 14 }}
                className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-forest px-1 text-[10px] font-medium text-warm-white"
              >
                {itemCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            className="overflow-hidden border-t border-charcoal/10 bg-warm-white lg:hidden"
          >
            <ul className="page-container py-2">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block border-b border-charcoal/10 py-4 font-serif text-3xl ${
                        isActive ? 'text-gold' : 'text-forest'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
