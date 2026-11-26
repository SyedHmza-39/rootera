/**
 * About page copy and image names.
 * Image names are file names WITHOUT the extension, from
 * src/assets/images/product/.
 *
 * Note: "Our story" describes what ROOTERA set out to make. If you want to
 * add real origin details (who started the brand, when, why), replace the
 * paragraphs in `story` with your own facts.
 */

export const ABOUT = {
    banner: {
    eyebrow: 'About ROOTERA',
    wordmark: 'About',
    title: 'Care that starts at the root.',
    text: 'ROOTERA is a premium, minimalist hair and skincare brand built around lightweight formulas and a simple daily ritual.',
    cta: { label: 'Shop the collection', to: '/shop' },
    link: { label: 'Read our story', href: '#our-story' },
    badges: ['Simplicity', 'Honesty'],

    // mode "product": a bottle floats inside two thin rings.
    // To use a person instead, set mode to 'cutout' and image to the name of
    // a transparent portrait (for example 'contact-portrait-cutout').
    visual: {
      mode: 'cutout',
      image: 'about-portrait-cutout',
      alt: 'A woman with long dark hair and a soft smile, gently touching her hair',
    },
  },

  story: {
    eyebrow: 'Our story',
    title: 'A simple Idea, Carefully Made.',
    paragraphs: [
      'ROOTERA began with a straightforward question: what would hair and skincare look like if it were lightweight, uncomplicated and easy to keep up?',
      'Our answer is a small collection of lightweight formulas in considered packaging, each designed to fit into a routine you actually enjoy. We keep things deliberately small: a few products, made well, with their ingredients and directions shown plainly.',
    ],
    image: 'bottle-botanical',
    alt: 'ROOTERA serum bottle styled with fresh rosemary sprigs',
    badgeText: 'ROOT ACTIVATION + DENSITY BOOST • ',
  },

  quote: {
    text: 'SIMPLE CARE YOU WILL ACTUALLY ENJOY USING, EVERY DAY.',
    author: 'ROOTERA',
  },

  philosophy: {
    eyebrow: 'Our philosophy',
    title: 'Three Ideas We Build Around',
    items: [
      {
        id: 'simplicity',
        title: 'Simplicity',
        text: 'A few lightweight formulas and a clear ritual, with nothing unnecessary in between.',
      },
      {
        id: 'start-at-the-source',
        title: 'Start at the source',
        text: 'Healthy-looking hair begins at the scalp, and healthy-looking skin begins with consistent, gentle care. We design with both in mind.',
      },
      {
        id: 'honesty',
        title: 'Honesty',
        text: 'Plain language, cautious claims, and sample content that is always clearly labelled.',
      },
    ],
  },

  approach: {
    eyebrow: 'Our approach to care',
    title: 'Lightweight By Design.',
    paragraphs: [
      'We think daily care should fit easily into a busy day. Our formulas are designed to feel light and comfortable on the skin and scalp.',
    ],
    image: 'bottle-closeup',
    alt: 'Close-up of the ROOTERA label and black dropper collar',
  },

  transparency: {
    eyebrow: 'Quality & transparency',
    title: 'What You See Is What Is Inside.',
    items: [
      {
        id: 'ingredients',
        icon: 'list',
        title: 'Ingredients, named plainly',
        text: 'Key ingredients are shown on every product label and on this site, with the full list on each product page.',
      },
      {
        id: 'packaging',
        icon: 'package',
        title: 'Considered packaging',
        text: 'Thoughtfully chosen packaging, made for easy and precise application.',
      },
    ],
  },

  product: {
    eyebrow: 'Featured product',
    cta: 'View product',
  },
}