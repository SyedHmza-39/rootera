/**
 * Contact page copy. Your email, phone, address, hours and social links
 * come from site.js, so they are only written once.
 */

export const CONTACT = {
  hero: {
    eyebrow: 'Contact',
    wordmark: 'Contact', // the large faint word behind the portrait
    title: 'We would love to hear from you.',
    text: 'Questions about a product, an order or your routine? Write to us using the form below.',
    cta: 'Send a message',
    link: 'Contact details',
    badges: ['Hair care', 'Skincare'],

    // mode "arch": the photo sits in an arch-shaped frame.
    // mode "cutout": a transparent portrait stands in front of the large word.
    // To switch, put a transparent image in src/assets/images/product/,
    // set `image` to its file name (no extension) and `mode` to 'cutout'.
        portrait: {
      mode: 'cutout',
      image: 'contact-portrait-cutout',
      position: '50% 50%',
      alt: 'A woman with her eyes closed and a soft smile, gently touching her cheek',
    },
  },

  form: {
    eyebrow: 'Send a message',
    title: 'Write To Us',
    note: 'Write your message, then send it by WhatsApp or email. It is sent from your own phone or email app, so you can review it before you press send.',
  },

  details: {
    eyebrow: 'Contact details',
    title: 'Other Ways To Reach Us',
    shopNote: 'Looking for ingredients, directions or product questions?',
    shopLink: 'Visit the shop',
  },
}