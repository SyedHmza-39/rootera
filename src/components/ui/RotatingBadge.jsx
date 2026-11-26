import { useId } from 'react'

/**
 * Props:
 *  - text: the circling text (keep it under about 34 characters)
 *  - className: position classes (default: top-right corner, slightly outside)
 */
export default function RotatingBadge({
  text,
  className = '-right-4 -top-4 sm:-right-5 sm:-top-5',
}) {
  const id = useId().replace(/:/g, '')
  const pathId = `badge-path-${id}`

  return (
    <div
      aria-hidden="true"
      className={`absolute z-10 flex h-24 w-24 items-center justify-center rounded-full border border-gold bg-warm-white sm:h-28 sm:w-28 ${className}`}
    >
      <svg viewBox="0 0 100 100" className="spin-slow h-[88%] w-[88%]">
        <defs>
          <path
            id={pathId}
            d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
          />
        </defs>
        <text
          fontSize="8.8"
          letterSpacing="1.2"
          fontWeight="600"
          fill="#183D2B"
          fontFamily="'Source Serif 4', serif"
        >
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </svg>
      <span className="absolute h-1.5 w-1.5 rotate-45 bg-gold" />
    </div>
  )
}