import { useState } from 'react'
import { resolveProductImage } from '../../utils/images'

/**
 * Props:
 *  - name: image file name without extension, e.g. "bottle-white"
 *  - alt: descriptive alt text
 *  - className: sizing classes for the wrapper, e.g. "aspect-square"
 *  - fit: "contain" (default, shows the whole bottle) or "cover"
 *  - priority: true for above-the-fold images (loads immediately)
 *  - transparent: true for cut-out PNGs (no beige box behind the image)
 */
export default function ProductImage({
  name,
  alt,
  className = '',
  fit = 'contain',
  priority = false,
  transparent = false,
}) {
  const src = resolveProductImage(name)
  const [failedSrc, setFailedSrc] = useState(null)
  const [loadedSrc, setLoadedSrc] = useState(null)

  const showFallback = !src || failedSrc === src
  const isLoaded = loadedSrc === src

  if (showFallback) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-beige px-4 text-center ${className}`}
      >
        <span className="font-serif text-lg tracking-[0.25em] text-gold sm:text-xl">
          ROOTERA
        </span>
        <span className="mt-2 text-[11px] uppercase tracking-[0.2em] text-charcoal/50">
          Image coming soon
        </span>
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden ${transparent ? '' : 'bg-beige'} ${className}`}
    >
      {!isLoaded && !transparent && (
        <div
          className="absolute inset-0 animate-pulse bg-charcoal/5"
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoadedSrc(src)}
        onError={() => setFailedSrc(src)}
        className={`h-full w-full transition-opacity duration-500 ${
          fit === 'cover' ? 'object-cover' : 'object-contain'
        } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}