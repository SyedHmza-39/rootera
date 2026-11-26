import { Suspense, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'
import AnnouncementBar from '../components/AnnouncementBar'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartDrawer from '../components/CartDrawer'
import PageLoader from '../components/ui/PageLoader'
import { useCart } from '../hooks/useCart'

export default function RootLayout() {
  const { pathname } = useLocation()
  const { isOpen: cartOpen } = useCart()
  const mainRef = useRef(null)
  const previousPath = useRef(pathname)

  // After moving to another page, put keyboard focus at the start of the new
  // content, so keyboard and screen reader users do not have to tab back
  // through the header. It does not scroll and it does not run on first load.
  useEffect(() => {
    if (previousPath.current === pathname) return
    previousPath.current = pathname
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <>
      <ScrollToTop />

      {/* The page is switched off while the cart drawer is open */}
      <div
        className="flex min-h-screen flex-col"
        inert={cartOpen ? true : undefined}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:bg-forest focus:px-4 focus:py-2 focus:text-warm-white"
        >
          Skip to main content
        </a>

        <AnnouncementBar />
        <Navbar />

        <main
          id="main-content"
          ref={mainRef}
          tabIndex={-1}
          className="flex-1 outline-none"
        >
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>

        <Footer />
      </div>

      <CartDrawer />
    </>
  )
}