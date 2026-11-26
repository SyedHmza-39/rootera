/**
 * Home page copy. Product facts (name, size, ingredients, directions)
 * come from product.js so they are only ever written once.
 */

export const HOME = {
  hero: {
        eyebrow: 'Premium hair & skincare',
    lines: ['Your Daily Care', 'Ritual, Elevated.'],
    text: 'Discover lightweight hair and skincare, designed to support scalp care, skin hydration and a radiant-looking glow.',
    points: ['Hair care', 'Skincare', 'Lightweight'],
            slides: [
      {
        id: 'hero-1',
        image: 'hero-1',
        position: '77% 25%',
        alt: 'A woman with long dark hair holding the ROOTERA serum bottle beside her face, against a warm golden wall',
      },
      {
        id: 'hero-5',
        image: 'hero-5',
        position: '97% 40%',
        alt: 'A woman holding the ROOTERA Advanced Skin Glow Serum bottle near her cheek, against a soft cream wall',
      },
      // Remove this slide until the photo is regenerated: the cleanser volume reads 180 ml
      {
        id: 'hero-6',
        image: 'hero-6',
        position: '99% 50%',
        alt: 'A person pressing the pump of the ROOTERA Gentle Facial Cleanser in a calm, minimal bathroom',
      },
      // Remove this slide until the photo is regenerated: "VITAMIN C" is misspelled on the label
      {
        id: 'hero-4',
        image: 'hero-4',
        position: '83% 40%',
        alt: 'A woman in warm golden light holding the dropper of the ROOTERA Vitamin C Brightening Serum above its bottle',
      },
    ],
  },

    showcase: {
    eyebrow: 'Root Activation + Density Boost',
    title: 'Designed For A Simple Daily Ritual',
    items: [
      {
        id: 'lightweight',
        title: 'Lightweight',
        text: 'A fine serum designed to feel light on the scalp.',
      },
      {
        id: 'non-greasy',
        title: 'Non-Greasy',
        text: 'Created with a clean, non-greasy feel for everyday use.',
      },
      {
        id: 'dropper',
        title: 'Precise Dropper',
        text: 'A black dropper lets you apply the serum straight to the scalp.',
      },
      {
        id: 'ingredients',
        title: 'Caffeine, Biotin, Rosemary',
        text: 'The key ingredients featured on our label.',
      },
      {
        id: 'scalp-care',
        title: 'Scalp-Focused Care',
        text: 'Designed to support scalp care as part of a simple routine.',
      },
      {
        id: 'unisex',
        title: 'Unisex',
        text: 'One serum, made for everyone.',
      },
    ],
  },

  why: {
    eyebrow: 'Why ROOTERA',
    title: 'Minimal Formula. Considered Ritual.',
    text: 'ROOTERA is built around one idea: simple, lightweight care you will actually enjoy using, every day.',
    image: 'bottle-closeup',
    alt: 'Close-up of the ROOTERA label and black dropper collar',
    points: [
      {
        id: 'light',
        title: 'Lightweight',
        text: 'A fine serum designed to feel light on the scalp.',
      },
      {
        id: 'clean',
        title: 'Non-Greasy',
        text: 'Created with a clean feel, without a heavy finish.',
      },
      {
        id: 'scalp',
        title: 'Scalp-Focused Care',
        text: 'Applied directly to the scalp, designed to support scalp care.',
      },
      {
        id: 'unisex',
        title: 'Unisex',
        text: 'One serum, made for everyone.',
      },
    ],
  },

  ingredients: {
    eyebrow: 'Inside the bottle',
    title: 'Three Ingredients, One Simple Ritual',
    text: 'The key ingredients featured on our label. You can find the full ingredient list on the Shop page.',
  },

  // Image file names (no extension) and alt text for each ingredient card
  ingredientImages: {
    Caffeine: {
      image: 'ingredient-caffeine',
      alt: 'Roasted coffee beans on a soft beige surface, representing caffeine',
    },
    Biotin: {
      image: 'ingredient-biotin',
      alt: 'A single golden droplet on beige linen, representing biotin',
    },
    Rosemary: {
      image: 'ingredient-rosemary',
      alt: 'Fresh rosemary sprigs on a soft beige surface',
    },
  },

  howToUse: {
    eyebrow: 'How to use',
        title: 'A Simple Ritual',
    stepTitles: ['Prepare', 'Apply', 'Massage', 'Stay Consistent'],
    image: 'bottle-lifestyle',
    alt: 'ROOTERA serum bottle styled in a calm, minimal bathroom setting',
  },

    reviews: {
    eyebrow: 'Customer reviews',
    title: 'What customers say',

    // Set to true ONLY when the three reviews below are genuine reviews from
    // real customers who agreed to be quoted by name. While false, the site
    // shows them as "Sample review" with no names or star ratings.
    confirmedReal: true,
        note: 'Reviews of our Advanced Skin Glow Serum and Vitamin C Brightening Serum.',

    items: [
      {
        id: 'review-1',
        name: 'Laiba Rauf',
        rating: 5,
        text: 'This serum is amazing! It feels so lightweight and hydrating on my skin. I love how easily it absorbs without leaving any sticky feeling.',
      },
      {
        id: 'review-2',
        name: 'Noor Fatima',
        rating: 5,
        text: 'Perfect for my daily skincare routine. My skin feels soft, hydrated, and fresh after using it. The green bottle looks absolutely gorgeous!',
      },
      {
        id: 'review-3',
        name: 'Mehak Aslam',
        rating: 4,
        text: 'Really impressed with the texture. It feels gentle, absorbs quickly, and works beautifully with my moisturizer. I would love to try more ROOTERA products.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions & Answered',
        text: 'Find quick answers about the serum, how to use it, and what to expect.',
    help: {
      title: 'Cannot Find What You Need?',
      text: 'Send us a message from the Contact page.',
      cta: 'Contact us',
    },
    items: [
      {
        id: 'what',
        question: 'What is ROOTERA Advanced Hair Growth Serum?',
        answer:
          'A lightweight, non-greasy scalp serum in a 100 ml frosted glass dropper bottle. It features caffeine, biotin and rosemary, and is designed to support scalp care and help hair look fuller.',
      },
      {
        id: 'use',
        question: 'How do I use it?',
        answer:
          'Apply the serum to a clean scalp with the dropper, then massage in gently with your fingertips. If you have questions about using it, contact us.',
      },
      {
        id: 'greasy',
        question: 'Will it feel greasy?',
        answer:
          'ROOTERA is designed with a lightweight, non-greasy feel. How any product feels can vary from person to person.',
      },
      {
        id: 'who',
        question: 'Who can use it?',
        answer:
          'The serum is unisex, so it is made for everyone. If you have sensitive skin, allergies or a scalp condition, check the full ingredient list and speak to a healthcare professional before use.',
      },
      {
        id: 'results',
        question: 'Does it guarantee results?',
        answer:
          'No. ROOTERA is designed to support scalp care and help hair look fuller, but results vary from person to person. We do not promise guaranteed hair growth or prevention of hair loss.',
      },
      {
        id: 'shipping',
        question: 'Where do you deliver?',
        answer:
          'We currently deliver within Pakistan only. Delivery usually takes 3 to 5 days, the delivery cost depends on your order, and payment is cash on delivery.',
      },
    ],
  },

  newsletter: {
    eyebrow: 'The ROOTERA list',
    title: 'Join for news and updates',
    text: 'Be the first to hear about new releases and updates from ROOTERA.',
  },
}