import GoldFrame from './GoldFrame'
import ProductImage from './ProductImage'
import Reveal from './Reveal'

/**
 * Props:
 *  - name, alt: the image file name (no extension) and its alt text
 *  - side: "right" (default) or "left", where the gold frame is offset
 *  - badge: optional element placed over the image corner
 *  - className: classes for the outer wrapper (sizing and alignment)
 */
export default function FramedImage({
  name,
  alt,
  side = 'right',
  badge = null,
  className = '',
}) {
  return (
    <Reveal className={className}>
      <GoldFrame side={side}>
        <div className="group relative">
          <div className="overflow-hidden">
            <div className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]">
              <ProductImage
                name={name}
                alt={alt}
                fit="cover"
                className="aspect-square w-full"
              />
            </div>
          </div>
          {badge}
        </div>
      </GoldFrame>
    </Reveal>
  )
}