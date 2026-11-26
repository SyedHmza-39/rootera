/**
 * Site-wide configuration: navigation, announcement bar, contact details.
 */

export const SITE = {
  name: 'ROOTERA',
    tagline: 'Your Daily Care Ritual, Elevated.',
  announcement: 'ROOTERA: premium hair & skincare',

    // Footer closing statement. The headline is the tagline above.
  closing: {
    eyebrow: 'Begin your ritual',
        text: 'Discover ROOTERA hair and skincare: lightweight, considered formulas designed for a simple, consistent ritual.',
    cta: 'Shop the collection',
  },

  // CONFIG: set each `href` once the page exists (for example '/privacy').
  // While href is null, the item shows as "coming soon" and is not clickable.
  // Before you collect emails or take orders, add real policies for your country.
  legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Returns & Refund Policy', href: '/returns' },
  ],

  // CONFIG: replace the placeholders with your real contact details.
  contact: {
    email: 'rootera@gmail.com',
    address: 'Islamabad, Pakistan',
   hours: '9 AM to 9 PM, Every day',
  },

  // CONFIG: set each `href` to your real profile URL.
  // While href is null, the link is shown as "coming soon" and not clickable.
    // Add your social profiles here when you have them, for example:
  // { label: 'Instagram', href: 'https://www.instagram.com/yourname' },
  // They then appear in the footer and on the Contact page automatically.
  // Known names with icons: Instagram, Facebook, TikTok.
  social: [],
}

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Shop', to: '/shop' },
  { label: 'Contact', to: '/contact' },
]