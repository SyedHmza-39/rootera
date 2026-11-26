/**
 * ROOTERA site check.
 *
 * Run it with:   npm run check
 *
 * It reads your project files and reports problems: missing images, broken
 * links, bad product data, missing alt text and wording that may need a
 * second look. It never changes any file.
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { register } from 'node:module'
import { basename, dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

// Lets Node import project files that leave out the ".js" ending
register(
  'data:text/javascript,' +
    encodeURIComponent(`
export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context)
  } catch (error) {
    if (specifier.startsWith('.') && !/\\.[a-z]+$/i.test(specifier)) {
      return nextResolve(specifier + '.js', context)
    }
    throw error
  }
}
`),
  import.meta.url,
)

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'src')
const IMAGE_DIR = join(SRC, 'assets', 'images', 'product')
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.avif']

// ---------- Small helpers ----------

const report = { passed: 0, fails: [], warns: [], todos: [], infos: [] }
const fail = (message) => report.fails.push(message)
const warn = (message) => report.warns.push(message)
const todo = (message) => report.todos.push(message)
const info = (message) => report.infos.push(message)

function check(condition, failMessage) {
  if (condition) report.passed += 1
  else fail(failMessage)
}

const rel = (file) => relative(ROOT, file).split('\\').join('/')
const read = (file) => readFileSync(file, 'utf8')
const lineOf = (text, index) => text.slice(0, index).split('\n').length
const isText = (value) => typeof value === 'string' && value.trim() !== ''

function walk(dir, extensions) {
  if (!existsSync(dir)) return []
  const found = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) found.push(...walk(full, extensions))
    else if (extensions.includes(extname(entry.name).toLowerCase())) found.push(full)
  }
  return found
}

async function load(path) {
  const file = join(SRC, path)
  if (!existsSync(file)) {
    fail(`Missing file: src/${path}`)
    return null
  }
  try {
    return await import(pathToFileURL(file).href)
  } catch (error) {
    fail(`Could not read src/${path}: ${error.message}`)
    return null
  }
}

const productsMod = await load('data/products.js')
const homeMod = await load('data/home.js')
const aboutMod = await load('data/about.js')
const siteMod = await load('data/site.js')
const contactMod = await load('data/contact.js')
const formatMod = await load('utils/format.js')
const productUtils = await load('utils/product.js')
const orderMod = await load('data/order.js')

const PRODUCTS = productsMod?.PRODUCTS ?? []
const HOME = homeMod?.HOME
const ABOUT = aboutMod?.ABOUT
const SITE = siteMod?.SITE
const NAV_LINKS = siteMod?.NAV_LINKS ?? []
const CONTACT = contactMod?.CONTACT

// ---------- 1. Images ----------

const imageFiles = existsSync(IMAGE_DIR)
  ? readdirSync(IMAGE_DIR).filter((file) =>
      IMAGE_EXTENSIONS.includes(extname(file).toLowerCase()),
    )
  : []
const imageNames = new Map()

check(imageFiles.length > 0, `No images found in ${rel(IMAGE_DIR)}`)

for (const file of imageFiles) {
  const name = basename(file, extname(file))
  check(!imageNames.has(name), `Two image files share the name "${name}" (${file})`)
  imageNames.set(name, file)

  const kilobytes = Math.round(statSync(join(IMAGE_DIR, file)).size / 1024)
  if (kilobytes > 600) {
    warn(`${file} is ${kilobytes} KB. Compress it so pages load faster.`)
  } else {
    report.passed += 1
  }
}

const refs = []
const addRef = (where, name) => {
  if (name) refs.push({ where, name })
}

for (const product of PRODUCTS) {
  for (const item of product.gallery ?? []) addRef(`${product.name} gallery`, item.image)
  addRef(`${product.name} card image`, product.cardImage)
  addRef(`${product.name} hero image`, product.heroImage)
  addRef(`${product.name} showcase image`, product.showcaseImage)
  addRef(`${product.name} about section`, product.about?.image)
  for (const item of product.collage ?? []) addRef(`${product.name} collage`, item.image)
}
if (HOME) {
  for (const slide of HOME.hero?.slides ?? []) addRef('Home hero slide', slide.image)
  addRef('Home "Why ROOTERA"', HOME.why?.image)
  addRef('Home "How to use"', HOME.howToUse?.image)
  for (const item of Object.values(HOME.ingredientImages ?? {})) {
    addRef('Home ingredient card', item.image)
  }
}
if (ABOUT) {
  addRef('About banner', ABOUT.banner?.image)
  addRef('About story', ABOUT.story?.image)
  addRef('About approach', ABOUT.approach?.image)
}
if (CONTACT) addRef('Contact portrait', CONTACT.hero?.portrait?.image)

const usedImages = new Set()
for (const { where, name } of refs) {
  usedImages.add(name)
  check(
    imageNames.has(name),
    `Image "${name}" is used by ${where}, but no file with that name is in ${rel(IMAGE_DIR)}`,
  )
}
for (const [name, file] of imageNames) {
  if (!usedImages.has(name)) info(`Image not used anywhere: ${file}`)
}

// ---------- 2. Product data ----------

const seenIds = new Set()
const seenSlugs = new Set()

for (const product of PRODUCTS) {
  const label = product.name ?? product.id ?? 'A product'

  for (const key of [
    'id',
    'slug',
    'category',
    'name',
    'tagline',
    'size',
    'formatShort',
    'shortDescription',
    'currency',
  ]) {
    check(isText(product[key]), `${label}: "${key}" is missing or empty`)
  }

  check(!seenIds.has(product.id), `${label}: id "${product.id}" is used twice`)
  check(!seenSlugs.has(product.slug), `${label}: slug "${product.slug}" is used twice`)
  seenIds.add(product.id)
  seenSlugs.add(product.slug)

  check(
    /^[a-z0-9]+(-[a-z0-9]+)*$/.test(product.slug ?? ''),
    `${label}: slug "${product.slug}" should use only lowercase letters, numbers and hyphens`,
  )
  check(
    Number.isFinite(product.price) && product.price >= 0,
    `${label}: price must be a number`,
  )
  if (product.price === 0) {
    warn(`${label}: price is 0, so the site shows "Price coming soon"`)
  }
  check(
    product.salePrice == null ||
      (Number.isFinite(product.salePrice) &&
        product.salePrice > 0 &&
        product.salePrice < product.price),
    `${label}: salePrice must be empty or lower than the price`,
  )
  check(
    Number.isInteger(product.stock) && product.stock >= 0,
    `${label}: stock must be a whole number`,
  )

  try {
    new Intl.NumberFormat('en', { style: 'currency', currency: product.currency })
    report.passed += 1
  } catch {
    fail(`${label}: currency "${product.currency}" is not a valid currency code`)
  }

  check(
    Array.isArray(product.labelHighlights) && product.labelHighlights.length > 0,
    `${label}: labelHighlights needs at least one item`,
  )
  check(
    Array.isArray(product.details) &&
      product.details.length > 0 &&
      product.details.every((item) => isText(item.label) && isText(item.value)),
    `${label}: every "details" item needs a label and a value`,
  )
  check(
    Array.isArray(product.keyIngredients) &&
      product.keyIngredients.length > 0 &&
      product.keyIngredients.every((item) => isText(item.name) && isText(item.note)),
    `${label}: every key ingredient needs a name and a note`,
  )
  check(
    Array.isArray(product.directions?.steps) &&
      product.directions.steps.length > 0 &&
      product.directions.steps.every(isText),
    `${label}: directions need at least one step`,
  )
  check(
    isText(product.shipping?.summary) && Array.isArray(product.shipping?.details),
    `${label}: shipping needs a summary and a details list`,
  )

  const gallery = product.gallery ?? []
  check(gallery.length > 0, `${label}: the gallery needs at least one image`)
  check(
    gallery.every(
      (item) => isText(item.id) && isText(item.label) && isText(item.image) && isText(item.alt),
    ),
    `${label}: every gallery image needs an id, label, image name and alt text`,
  )
  check(
    new Set(gallery.map((item) => item.id)).size === gallery.length,
    `${label}: gallery ids must be different from each other`,
  )
  check(
    isText(product.about?.title) &&
      isText(product.about?.text) &&
      isText(product.about?.image) &&
      isText(product.about?.alt),
    `${label}: the "about" section needs a title, text, image and alt text`,
  )
  for (const item of product.collage ?? []) {
    check(isText(item.image) && isText(item.alt), `${label}: every collage photo needs an image and alt text`)
  }
  check(
    Array.isArray(product.faq) &&
      product.faq.every((item) => isText(item.id) && isText(item.question) && isText(item.answer)),
    `${label}: every FAQ item needs an id, question and answer`,
  )
}

// ---------- 3. Prices and cart maths ----------

if (formatMod && productUtils) {
  const { formatPrice } = formatMod
  const { getUnitPrice, isInStock, isOnSale, priceLabel, productPath } = productUtils
  const plain = (text) => String(text).replace(/\u00a0/g, ' ')

  check(plain(formatPrice(2500, 'PKR')) === 'PKR 2,500', 'formatPrice(2500, "PKR") should give "PKR 2,500"')
  check(plain(formatPrice(1850.5, 'PKR')) === 'PKR 1,850.50', 'formatPrice(1850.5, "PKR") should give "PKR 1,850.50"')
  check(String(formatPrice(10, 'XXXX')).includes('XXXX'), 'formatPrice should not break on an invalid currency code')

  check(isOnSale({ price: 100, salePrice: 80 }) === true, 'A lower sale price should count as a sale')
  check(isOnSale({ price: 100, salePrice: 120 }) === false, 'A sale price above the price should not count as a sale')
  check(isOnSale({ price: 0, salePrice: 50 }) === false, 'A sale should not show when no real price is set')
  check(getUnitPrice({ price: 100, salePrice: 80 }) === 80, 'The sale price should be used when it applies')
  check(getUnitPrice({ price: 100, salePrice: null }) === 100, 'The normal price should be used when there is no sale')
  check(isInStock({ stock: 0 }) === false, 'A product with stock 0 should be out of stock')
  check(isInStock({ stock: 3 }) === true, 'A product with stock above 0 should be in stock')
  check(priceLabel({ price: 0, currency: 'PKR' }) === 'Price coming soon', 'An unset price should read "Price coming soon"')
  check(plain(priceLabel({ price: 2500, salePrice: null, currency: 'PKR' })) === 'PKR 2,500', 'A set price should read "PKR 2,500"')

  if (PRODUCTS.length >= 2) {
    const [a, b] = PRODUCTS
    const expected = getUnitPrice(a) * 1 + getUnitPrice(b) * 2
    const subtotal = [
      [a, 1],
      [b, 2],
    ].reduce((sum, [product, quantity]) => sum + getUnitPrice(product) * quantity, 0)
    check(subtotal === expected, 'The subtotal calculation does not add up')
    info(`Sample subtotal: 1 x ${a.name} + 2 x ${b.name} = ${plain(formatPrice(subtotal, a.currency))}`)
  }
  check(productPath({ slug: 'x' }) === '/shop/x', 'productPath should give /shop/<slug>')
}

// ---------- 4. Links and anchors ----------

const sourceFiles = walk(SRC, ['.js', '.jsx'])
const routes = new Set(['/', '/about', '/shop', '/contact', '/terms', '/privacy', '/returns', ...PRODUCTS.map((p) => `/shop/${p.slug}`)])
const productHashes = ['ingredients', 'directions', 'faq']
const contactHashes = ['contact-form', 'contact-details']

const allIds = new Set()
for (const file of sourceFiles) {
  for (const match of read(file).matchAll(/\bid="([^"]+)"/g)) allIds.add(match[1])
}

for (const item of SITE?.legal ?? []) {
  if (item.href) {
    check(routes.has(item.href), `Footer link "${item.label}" points to "${item.href}", which is not a page`)
  }
}

for (const item of SITE?.legal ?? []) {
  if (item.href) {
    check(routes.has(item.href), `Footer link "${item.label}" points to "${item.href}", which is not a page`)
  }
}

for (const link of NAV_LINKS) {
  check(routes.has(link.to), `Menu link "${link.label}" points to "${link.to}", which is not a page`)
}

for (const file of sourceFiles) {
  const text = read(file)

  for (const match of text.matchAll(/\bto=(["'])(\/[^"']*)\1/g)) {
    const [path, hash] = match[2].split('#')
    const where = `${rel(file)}:${lineOf(text, match.index)}`
    check(routes.has(path), `${where}: the link to "${match[2]}" does not match any page`)
    if (hash) {
      const valid = path.startsWith('/shop/')
        ? productHashes.includes(hash)
        : path === '/contact'
          ? contactHashes.includes(hash)
          : false
      check(valid, `${where}: "${match[2]}" jumps to a section that does not exist on that page`)
    }
  }

  for (const match of text.matchAll(/\$\{[^}]*\}#([a-z-]+)/g)) {
    const where = `${rel(file)}:${lineOf(text, match.index)}`
    check(productHashes.includes(match[1]), `${where}: "#${match[1]}" is not a section on the product page`)
  }

  for (const match of text.matchAll(/\bhref="#([^"]+)"/g)) {
    const where = `${rel(file)}:${lineOf(text, match.index)}`
    check(allIds.has(match[1]), `${where}: the link "#${match[1]}" has no element with that id`)
  }
}

// ---------- 5. Alt text ----------

for (const file of sourceFiles.filter((f) => f.endsWith('.jsx'))) {
  const text = read(file)
  for (const match of text.matchAll(/<(img|motion\.img|ProductImage)\b[\s\S]*?\/>/g)) {
    const where = `${rel(file)}:${lineOf(text, match.index)}`
    check(/\balt=/.test(match[0]), `${where}: <${match[1]}> has no alt text`)
  }
}

// ---------- 6. Wording review ----------

const RISKY =
  /\b(clinically|clinical|proven|dermatologist|certified|certification|cures?|cured|heals?|guarantee[sd]?|100%|organic|vegan|cruelty|FDA|permanent|miracle|anti-aging|wrinkles?|acne|eczema|regrow|regrowth|baldness)\b/gi
const NEGATION = /\b(do not|does not|don't|not promise|no\.|never|without)\b/i

for (const file of sourceFiles) {
  if (file.endsWith('check-site.mjs')) continue
  const lines = read(file).split('\n')
  lines.forEach((text, index) => {
    if (/^\s*(\/\/|\/\*|\*)/.test(text)) return
    // "We do not guarantee..." is fine. Any other risky word is still flagged.
    const hits = [...text.matchAll(RISKY)]
      .map((m) => m[0])
            .filter(
        (word) =>
          !(/^guarantee/i.test(word) && (NEGATION.test(text) || /\bquestion:/.test(text))),
      )
    if (hits.length === 0) return
    warn(`Review this wording (${[...new Set(hits)].join(', ')}): ${rel(file)}:${index + 1}  ${text.trim().slice(0, 90)}`)
  })
}

if (HOME?.reviews?.items) {
  if (HOME.reviews.confirmedReal === true) {
    info('Reviews are marked as real customer reviews. Make sure each customer agreed to be quoted by name.')
  } else {
    report.passed += 1
    todo('Reviews show as "Sample review". When they are confirmed as genuine, set confirmedReal to true (src/data/home.js)')
  }
}

const haircareMentions = new Map()
for (const file of sourceFiles) {
  const count = (read(file).match(/hair\s?care/gi) ?? []).length
  if (count > 0) haircareMentions.set(rel(file), count)
}
if (haircareMentions.size > 0) {
  info(
    'Files that mention "haircare" (fine if they are about the hair serum): ' +
      [...haircareMentions].map(([file, count]) => `${file} (${count})`).join(', '),
  )
}

// ---------- 7. Launch to-do list ----------

if (SITE) {
  for (const [key, value] of Object.entries(SITE.contact ?? {})) {
    if (/_PLACEHOLDER$/.test(value)) todo(`Contact ${key} is still a placeholder (src/data/site.js)`)
  }
  for (const item of SITE.social ?? []) {
    if (!item.href) todo(`${item.label} link is empty (src/data/site.js)`)
  }
  for (const item of SITE.legal ?? []) {
    if (!item.href) todo(`${item.label} page does not exist yet. Add a real one before launch (src/data/site.js)`)
  }
}
for (const product of PRODUCTS) {
  if (!isText(product.fullIngredientList)) todo(`${product.name}: paste the full ingredient list (fullIngredientList)`)
  if (product.directions?.confirmed === false && istext(product.directions?.note)) {
    todo(`${product.name}: confirm the exact directions, then set directions.confirmed to true`)
  }
}
if (PRODUCTS.some((p) => (p.shipping?.details ?? []).some((d) => /to be confirmed/i.test(d)))) {
  todo('Replace the shipping placeholders with real delivery information (src/data/product.js)')
}
if (orderMod && !isText(orderMod.ORDER?.whatsappNumber)) {
  todo('Add your WhatsApp number so customers can send orders on WhatsApp (src/data/order.js)')
}

const formFile = join(SRC, 'components', 'contact', 'ContactForm.jsx')
if (existsSync(formFile)) {
  const connected = read(formFile).match(/const IS_CONNECTED = (true|false)/)
  if (connected?.[1] === 'false') {
    todo('The contact form is frontend-only. Connect an email service, then set IS_CONNECTED to true (ContactForm.jsx)')
  }
}

// ---------- 8. Project housekeeping ----------

for (const stale of [
  'src/App.css',
  'src/assets/react.svg',
  'src/assets/vite.svg',
  'src/assets/hero.png',
  'public/vite.svg',
]) {
  if (existsSync(join(ROOT, stale))) warn(`Leftover Vite starter file (safe to delete): ${stale}`)
}

const htmlFile = join(ROOT, 'index.html')
if (existsSync(htmlFile)) {
  const html = read(htmlFile)
  check(/<html[^>]*\blang="/.test(html), 'index.html: the <html> tag needs a lang attribute')
  check(/<meta[^>]*name="viewport"/.test(html), 'index.html: the viewport meta tag is missing')
  check(/<meta[^>]*name="description"/.test(html), 'index.html: the description meta tag is missing')
  check(/<title>[^<]+<\/title>/.test(html), 'index.html: the page title is missing')
    const fontLink =
    html.match(/href="([^"]*fonts\.googleapis\.com[^"]*)"/)?.[1] ?? '(no Google Fonts link found)'
  check(
    /Playfair(\+|%20| )Display/i.test(fontLink) && /Source(\+|%20| )Serif/i.test(fontLink),
    `index.html: the fonts link should load Playfair Display and Source Serif 4. It currently says: ${fontLink}`,
  )
  if (!/rel="icon"/.test(html)) warn('index.html has no favicon link, so browsers show a blank tab icon')
  else report.passed += 1
} else {
  fail('index.html is missing')
}

for (const file of sourceFiles) {
  if (file.endsWith('check-site.mjs')) continue
  const text = read(file)
  for (const match of text.matchAll(/console\.log\(/g)) {
    warn(`Leftover console.log: ${rel(file)}:${lineOf(text, match.index)}`)
  }
}

// ---------- Report ----------

const rule = '-'.repeat(64)
console.log(`\nROOTERA site check\n${rule}`)
console.log(`Passed checks: ${report.passed}`)
console.log(`Problems:      ${report.fails.length}`)
console.log(`Warnings:      ${report.warns.length}`)
console.log(`Launch to-dos: ${report.todos.length}`)

const printList = (title, tag, items) =>{ 
  if (items.length === 0) return
  console.log(`\n${title}\n${rule}`)
  for (const item of items) console.log(`${tag}  ${item}`)
}

printList('PROBLEMS (fix these)', 'FAIL', report.fails)
printList('WARNINGS (worth a look)', 'WARN', report.warns)
printList('LAUNCH TO-DO LIST (placeholders still waiting for real information)', 'TODO', report.todos)
printList('NOTES', 'INFO', report.infos)

console.log(
  `\n${report.fails.length === 0 ? 'No problems found.' : 'Fix the problems above, then run "npm run check" again.'}\n`,
)
process.exitCode = report.fails.length > 0 ? 1 : 0