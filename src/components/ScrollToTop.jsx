import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to the top when the page changes, or to a section when the
 * address ends with #section-id.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const frame = requestAnimationFrame(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ block: 'start' })
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        }
      })
      return () => cancelAnimationFrame(frame)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    return undefined
  }, [pathname, hash])

  return null
}