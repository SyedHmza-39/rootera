import { PRODUCT as HAIR_SERUM } from './product'
import { INGREDIENTS } from './ingredients'
/**
 * All ROOTERA products. The hair serum lives in product.js (it is also used
 * on the Home page). The others are defined here.
 *
 * CONFIG, for every product below:
 *  - price: 0 means "Price coming soon". Replace with the real price.
 *  - stock: 10 is a placeholder. Replace with the real available stock.
 *  - fullIngredientList: paste the complete ingredient list between the quotes.
 *  - directions.confirmed: set to true after you add the exact directions.
 * Shipping text is shared and comes from the hair serum in product.js.
 */

const shared = {
  brand: HAIR_SERUM.brand,
  currency: HAIR_SERUM.currency,
  salePrice: null,
  shipping: HAIR_SERUM.shipping,
  ingredientListPlaceholder: HAIR_SERUM.ingredientListPlaceholder,
  fullIngredientList: '',
  heroImage: null, // add a transparent cut-out here later to float it in the hero
}

const SENSITIVE_SKIN =
  'If you have sensitive skin, allergies or a skin condition, check the full ingredient list and speak to a healthcare professional before use.'

function faqFor(name, summary, who) {
  return [
    { id: 'what', question: `What is ${name}?`, answer: summary },
    {
      id: 'use',
      question: 'How do I use it?',
      answer:
        'Follow the steps in "Directions for use" on this page. If you have questions about using it, contact us.',
    },
    {
      id: 'results',
      question: 'Does it guarantee results?',
      answer:
        'No. Results vary from person to person, and we do not promise specific outcomes.',
    },
    { id: 'who', question: 'Who can use it?', answer: who },
  ]
}

const SKIN_STEPS_NOTE =
  ''

const skinGlowSerum = {
  ...shared,
  id: 'rootera-advanced-skin-glow-serum',
  slug: 'advanced-skin-glow-serum',
  category: 'Skin',
  name: 'Advanced Skin Glow Serum',
  tagline: 'Hydration + Radiance Boost',
  size: '30 ml',
  formatShort: 'Glass dropper bottle',
  price: 2100,
  stock: 999,
  shortDescription:
    'A lightweight, hydrating face serum designed to support skin hydration and a radiant-looking glow.',
  labelHighlights: [
    'Hydration + Radiance Boost',
    'Hyaluronic Acid + Niacinamide',
    'Lightweight',
    'Hydrating',
  ],
  details: [
    { label: 'Size', value: '30 ml' },
    { label: 'Format', value: 'Green glass bottle with dropper' },
    { label: 'Feel', value: 'Lightweight and hydrating' },
    { label: 'Use', value: 'Face' },
  ],
  keyIngredients: [
    {
      name: 'Hyaluronic Acid',
      note: 'A well-known hydrating ingredient in modern skincare.',
    },
    {
      name: 'Niacinamide',
      note: 'Also known as vitamin B3, commonly found in skincare formulas.',
    },
  ],
  directions: {
    confirmed: false,
    steps: [
      'Cleanse your face and pat dry.',
      'Apply the serum to your face using the dropper.',
      'Gently press or smooth it into the skin.',
      'Follow with your usual routine.',
    ],
    note: SKIN_STEPS_NOTE,
  },
    heroImage: 'skin-glow-serum-cutout',
  cardImage: 'skin-glow-serum',
  gallery: [
    {
      id: 'main',
      label: 'Product',
      image: 'skin-glow-serum',
      alt: 'ROOTERA Advanced Skin Glow Serum, 30 ml green glass dropper bottle with a gold collar and white bulb, on a soft cream background',
    },
  ],
  about: {
    title: 'Hydration, Made Light.',
    text: 'ROOTERA Advanced Skin Glow Serum is a lightweight face serum with hyaluronic acid and niacinamide, designed to support hydration and a radiant-looking glow as part of a simple daily routine.',
        image: 'skin-glow-serum-lifestyle',
    position: '50% 42%',
    alt: 'ROOTERA Advanced Skin Glow Serum on a stone stand with fresh rosemary and a soft shadow on a warm beige wall',
  },
    collage: [
    {
      image: 'skin-glow-serum',
      position: '50% 55%',
      alt: 'ROOTERA Advanced Skin Glow Serum, a 30 ml green glass dropper bottle with a gold collar, on a soft cream background',
    },
    {
      image: 'skin-glow-serum-lifestyle',
      position: '50% 49%',
      alt: 'ROOTERA Advanced Skin Glow Serum on a stone stand with fresh rosemary and a soft shadow on a warm beige wall',
    },
  ],
  faq: faqFor(
    'Advanced Skin Glow Serum',
    'A lightweight, hydrating face serum with hyaluronic acid and niacinamide, designed to support hydration and a radiant-looking glow.',
    SENSITIVE_SKIN,
  ),
}

const vitaminCSerum = {
  ...shared,
  id: 'rootera-vitamin-c-brightening-serum',
  slug: 'vitamin-c-brightening-serum',
  category: 'Skin',
  name: 'Vitamin C Brightening Serum',
  tagline: 'Radiance + Glow Boost',
  size: '30 ml',
  formatShort: 'Amber glass dropper',
  price: 1850,
  stock: 999,
  shortDescription:
    'A lightweight serum with vitamin C and niacinamide, designed to help skin look brighter and more radiant.',
  labelHighlights: [
    'Radiance + Glow Boost',
    'Vitamin C + Niacinamide',
    'Brightening',
    'Hydrating',
  ],
  details: [
    { label: 'Size', value: '30 ml' },
    { label: 'Format', value: 'Amber glass bottle with dropper' },
    { label: 'Feel', value: 'Lightweight and hydrating' },
    { label: 'Use', value: 'Face' },
  ],
  keyIngredients: [
    {
      name: 'Vitamin C',
      note: 'A popular ingredient in radiance-focused skincare.',
    },
    {
      name: 'Niacinamide',
      note: 'Also known as vitamin B3, commonly found in skincare formulas.',
    },
  ],
  directions: {
    confirmed: false,
    steps: [
      'Cleanse your face and pat dry.',
      'Apply the serum to your face using the dropper.',
      'Gently press or smooth it into the skin.',
      'Follow with your usual routine and use consistently, following the directions printed on your packaging.',
    ],
    note: SKIN_STEPS_NOTE,
  },
    heroImage: 'vitamin-c-serum-cutout',
  cardImage: 'vitamin-c-serum',
  gallery: [
    {
      id: 'main',
      label: 'Product',
      image: 'vitamin-c-serum',
      alt: 'ROOTERA Vitamin C Brightening Serum, 30 ml amber glass dropper bottle with a gold collar and black bulb, on a white background',
    },
  ],
  about: {
    title: 'A Brighter-Looking Routine.',
    text: 'ROOTERA Vitamin C Brightening Serum is a lightweight serum with vitamin C and niacinamide, designed to help skin look brighter and more radiant as part of a simple daily routine.',
        image: 'vitamin-c-serum-lifestyle',
    position: '50% 51%',
    alt: 'ROOTERA Vitamin C Brightening Serum on a stone stand beside dried flowers in warm golden light',
  },
    collage: [
    {
      image: 'vitamin-c-serum',
      position: '50% 56%',
      alt: 'ROOTERA Vitamin C Brightening Serum, a 30 ml amber glass dropper bottle with a gold collar, on a white background',
    },
    {
      image: 'vitamin-c-serum-lifestyle',
      position: '50% 54%',
      alt: 'ROOTERA Vitamin C Brightening Serum on a stone stand beside dried flowers in warm golden light',
    },
  ],
  faq: faqFor(
    'Vitamin C Brightening Serum',
    'A lightweight serum with vitamin C and niacinamide, designed to help skin look brighter and more radiant.',
    SENSITIVE_SKIN,
  ),
}

const facialCleanser = {
  ...shared,
  id: 'rootera-gentle-facial-cleanser',
  slug: 'gentle-facial-cleanser',
  category: 'Skin',
  name: 'Gentle Facial Cleanser',
  tagline: 'Daily Cleansing + Fresh Hydration',
  size: '150 ml',
  formatShort: 'Pump bottle',
  price: 1050,
  stock: 999,
  shortDescription:
    'A gentle daily facial cleanser with aloe vera, glycerin and panthenol, designed to cleanse and leave skin feeling fresh and hydrated.',
  labelHighlights: [
    'Daily Cleansing + Fresh Hydration',
    'Aloe Vera + Glycerin + Panthenol',
    'Gentle',
    'Hydrating',
    'All skin types',
  ],
  details: [
    { label: 'Size', value: '150 ml' },
    { label: 'Format', value: 'Amber bottle with pump' },
    { label: 'Feel', value: 'Gentle and hydrating' },
    { label: 'Suitable for', value: 'All skin types' },
  ],
  keyIngredients: [
    {
      name: 'Aloe Vera',
      note: 'A botanical often found in gentle skincare.',
    },
    {
      name: 'Glycerin',
      note: 'A common hydrating ingredient in cleansers and moisturisers.',
    },
    {
      name: 'Panthenol',
      note: 'Also known as provitamin B5, often found in skincare formulas.',
    },
  ],
  directions: {
    confirmed: false,
    steps: [
      'Wet your face with water.',
      'Dispense a small amount using the pump.',
      'Massage gently onto the skin, then rinse thoroughly.',
      'Use as part of your daily cleansing routine.',
    ],
    note: SKIN_STEPS_NOTE,
  },
    heroImage: 'facial-cleanser-cutout',
  cardImage: 'facial-cleanser',
  gallery: [
    {
      id: 'main',
      label: 'Product',
      image: 'facial-cleanser',
      alt: 'ROOTERA Gentle Facial Cleanser, 150 ml amber pump bottle with a gold pump, on a warm beige background',
    },
  ],
  about: {
    title: 'Gentle, Everyday.',
    text: 'ROOTERA Gentle Facial Cleanser is a daily cleanser with aloe vera, glycerin and panthenol, designed to cleanse gently and leave skin feeling fresh and hydrated. It is designed for all skin types.',
        image: 'facial-cleanser-lifestyle',
    position: '50% 48%',
    alt: 'ROOTERA Gentle Facial Cleanser on a stone stand beside a vase of dried stems in soft natural light',
  },
    collage: [
    {
      image: 'facial-cleanser',
      position: '50% 50%',
      alt: 'ROOTERA Gentle Facial Cleanser, a 150 ml amber pump bottle, on a warm beige background',
    },
    {
      image: 'facial-cleanser-lifestyle',
      position: '50% 44%',
      alt: 'ROOTERA Gentle Facial Cleanser on a stone stand beside a vase of dried stems in soft natural light',
    },
  ],
  faq: faqFor(
    'Gentle Facial Cleanser',
    'A gentle daily facial cleanser with aloe vera, glycerin and panthenol, designed to cleanse and leave skin feeling fresh and hydrated.',
    `It is designed for all skin types. ${SENSITIVE_SKIN}`,
  ),
}

export const PRODUCTS = [HAIR_SERUM, skinGlowSerum, vitaminCSerum, facialCleanser].map(
  (product) => ({
    ...product,
    fullIngredientList:
      INGREDIENTS[product.slug]?.list ?? product.fullIngredientList,
    allergyNote: INGREDIENTS[product.slug]?.note ?? '',
  }),
)

export const CATEGORIES = [
  'All',
  ...new Set(PRODUCTS.map((product) => product.category)),
]

export function getProductBySlug(slug) {
  return PRODUCTS.find((product) => product.slug === slug) ?? null
}