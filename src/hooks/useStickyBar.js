import { useEffect, useState } from 'react'

/**
 * Returns true when the target (the main buy panel) has scrolled off the top
 * of the screen and the end-of-page marker is not yet in view.
 * `resetKey` re-attaches the observers when the product changes.
 */
export function useStickyBar(targetRef, endRef, resetKey) {
  const [pastTarget, setPastTarget] = useState(false)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    const target = targetRef.current
    if (!target || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(([entry]) => {
      setPastTarget(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    })
    observer.observe(target)
    return () => observer.disconnect()
  }, [targetRef, resetKey])

  useEffect(() => {
    const end = endRef.current
    if (!end || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(([entry]) => {
      setAtEnd(entry.isIntersecting)
    })
    observer.observe(end)
    return () => observer.disconnect()
  }, [endRef, resetKey])

  return pastTarget && !atEnd
}