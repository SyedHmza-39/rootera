// Collect every product image that exists in the assets folder.
const modules = import.meta.glob(
  '../assets/images/product/*.{png,jpg,jpeg,webp,avif}',
  { eager: true, import: 'default' },
)

// Build a lookup like { 'bottle-white': '/src/assets/...' }
const imageMap = Object.entries(modules).reduce((map, [path, url]) => {
  const fileName = path.split('/').pop()
  const baseName = fileName.replace(/\.[^.]+$/, '')
  map[baseName] = url
  return map
}, {})

/** Returns the image URL for a name like "bottle-white", or null if missing. */
export function resolveProductImage(name) {
  return imageMap[name] ?? null
}