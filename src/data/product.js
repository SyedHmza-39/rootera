/**
 * ROOTERA product configuration.
 *
 * Update this file to change the product everywhere on the site.
 * Anything marked CONFIG is a placeholder waiting for your real information.
 */

export const PRODUCT = {
  id: 'rootera-advanced-hair-growth-serum',
  brand: 'ROOTERA',
  name: 'Advanced Hair Growth Serum',
   tagline: 'Root Activation + Density Boost',

  // ---------- Shop page fields ----------
  slug: 'advanced-hair-growth-serum',
  category: 'Hair',
  cardImage: 'bottle-beige',

  about: {
    title: 'A Simple Ritual, Made Lightweight.',
    text: 'ROOTERA Advanced Hair Growth Serum is designed to support scalp care as part of a routine you enjoy. Lightweight, non-greasy and unisex, in a frosted glass bottle with a black dropper.',
    image: 'bottle-lifestyle',
    alt: 'ROOTERA serum bottle styled in a calm, minimal bathroom setting',
  },

  // Optional: two photos for the collage at the bottom of the product page.
  collage: [
    {
      image: 'hero-1',
      position: '78% 30%',
      alt: 'A woman with long dark hair holding the ROOTERA serum bottle beside her face',
    },
    {
      image: 'bottle-botanical',
      position: '50% 50%',
      alt: 'ROOTERA serum bottle styled with fresh rosemary sprigs',
    },
  ],

  faq: [
    {
      id: 'use',
      question: 'How do I use it?',
      answer:
        'Apply the serum to a clean scalp with the dropper, then massage in gently with your fingertips. See "Directions for use" on this page. If you have questions about using it, contact us.',
    },
    {
      id: 'results',
      question: 'Does it guarantee results?',
      answer:
        'No. ROOTERA is designed to support scalp care and help hair look fuller, but results vary from person to person. We do not promise guaranteed hair growth or prevention of hair loss.',
    },
    {
      id: 'who',
      question: 'Who can use it?',
      answer:
        'The serum is unisex, so it is made for everyone. If you have sensitive skin, allergies or a scalp condition, check the full ingredient list and speak to a healthcare professional before use.',
    },
  ],
    size: '100 ml',
  formatShort: 'Frosted glass dropper',
  currency: 'PKR',
  price: 2500,
  salePrice: null,
  stock: 999,

  // ---------- Copy ----------
  shortDescription:
    'A lightweight, non-greasy serum designed to support scalp care and help hair look fuller.',
  description: [
    'ROOTERA Advanced Hair Growth Serum is a lightweight, non-greasy scalp serum in a 100 ml frosted glass dropper bottle, made for a simple and consistent routine.',
    'Formulated with caffeine, biotin and rosemary, it is designed to support scalp care and help hair look fuller and healthier-looking. Unisex by design.',
  ],

  // Short points taken directly from the product label
  labelHighlights: [
    'Root Activation + Density Boost',
    'Caffeine + Biotin + Rosemary',
    'Non-Greasy',
    'Lightweight',
    'Unisex',
  ],

  // Product details accordion
  details: [
    { label: 'Size', value: '100 ml' },
    { label: 'Format', value: 'Frosted glass bottle with black dropper' },
    { label: 'Feel', value: 'Lightweight and non-greasy' },
    { label: 'Suitable for', value: 'Unisex' },
  ],

  // ---------- Ingredients ----------
  // Short, cautious descriptions. No percentages or efficacy claims.
  keyIngredients: [
    {
      name: 'Caffeine',
      note: 'A familiar ingredient in modern scalp-care formulas.',
    },
    {
      name: 'Biotin',
      note: 'Also known as vitamin B7, often found in hair and scalp care products.',
    },
    {
      name: 'Rosemary',
      note: 'A botanical with a long history in traditional haircare.',
    },
  ],
  // CONFIG: paste your full INCI ingredient list between the quotes.
  fullIngredientList: '',
  ingredientListPlaceholder:
    'The full ingredient list will be added soon. If you have allergies or sensitivities, please email us before use.',

  // ---------- Directions ----------
  directions: {
    // CONFIG: set to true after you add the exact directions from your packaging.
    confirmed: false,
    steps: [
      'Start with a clean scalp and hair.',
      'Apply the serum directly to the scalp using the dropper.',
      'Massage gently with your fingertips.',
      'Use consistently as part of your routine.',
    ],
  },

  // ---------- Shipping (placeholder) ----------
  // CONFIG: replace with your real shipping information.
    shipping: {
    summary: 'We currently deliver within Pakistan only.',
    details: [
      'Delivery time: 3 to 5 days',
      'Delivery cost: Depends on your order',
      'Payment: Cash on delivery',
      'Returns: within 7 days of delivery, if unused, unopened and in the original packaging (see our Returns & Refund Policy)',
    ],
  },

  // ---------- Images ----------
  // Use file names WITHOUT the extension. The files live in
  // src/assets/images/product/ and can be .png, .jpg, .jpeg, .webp or .avif.
    heroImage: 'bottle-cutout',
  showcaseImage: 'bottle-cutout',
  gallery: [
    {
      id: 'white',
      label: 'Bottle on white',
      image: 'bottle-white',
      alt: 'ROOTERA Advanced Hair Growth Serum, 100 ml frosted glass dropper bottle with black dropper, on a clean white background',
    },
    {
      id: 'beige',
      label: 'Bottle on beige',
      image: 'bottle-beige',
      alt: 'ROOTERA Advanced Hair Growth Serum bottle on a soft beige background',
    },
    {
      id: 'closeup',
      label: 'Close-up',
      image: 'bottle-closeup',
      alt: 'Close-up of the ROOTERA label and black dropper collar',
    },
    {
      id: 'botanical',
      label: 'With botanicals',
      image: 'bottle-botanical',
      alt: 'ROOTERA serum bottle styled with fresh rosemary sprigs',
    },
    {
      id: 'lifestyle',
      label: 'Lifestyle',
      image: 'bottle-lifestyle',
      alt: 'ROOTERA serum bottle styled in a calm, minimal bathroom setting',
    },
  ],
}