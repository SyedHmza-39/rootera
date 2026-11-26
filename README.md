# ROOTERA

A premium hair and skincare storefront built with React, Vite and Tailwind CSS.

Pages: Home, About, Shop, a page for every product, Contact, and the legal pages (Terms of Service, Privacy Policy, Returns & Refund Policy).

## Features

- Product pages with benefits, ingredients (INCI), directions and questions
- A working cart that remembers items in the browser, with a limit set by each product's stock
- Ordering by WhatsApp or email, with cash on delivery (the site does not take online payments)
- A contact form that opens WhatsApp or the visitor's email app with the message typed in
- Animated heroes, sliders and sections, with reduced-motion support
- Responsive layouts from small phones to large desktops, keyboard and screen reader friendly

## Built with

React, Vite, Tailwind CSS v4, React Router, Framer Motion and Lucide icons.

## Getting started

You need Node.js 20.19 or newer.

```bash
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the site for development |
| `npm run build` | Builds the production site into `dist` |
| `npm run preview` | Serves the built site locally |
| `npm run lint` | Checks the code style |
| `npm run check` | Checks images, links, product data, alt text and wording, and lists what is still a placeholder |

## Where to change things

| What | File |
|---|---|
| Products, prices, stock, shipping | `src/data/product.js` and `src/data/products.js` |
| Full ingredient lists | `src/data/ingredients.js` |
| Product benefits | `src/data/benefits.js` |
| Home page text and reviews | `src/data/home.js` |
| About page text | `src/data/about.js` |
| Contact page text | `src/data/contact.js` |
| Email, address, hours, social links, menu | `src/data/site.js` |
| WhatsApp number and order settings | `src/data/order.js` |
| Terms, Privacy and Returns text | `src/data/legal.js` |
| Images | `src/assets/images/product/` |

Images are found by file name, without the extension, so `bottle-cutout.webp` is used as `bottle-cutout`.

## Project structure

```
src/
  components/   reusable pieces (home, shop, cart, contact, ui)
  pages/        one file per page
  layouts/      the shared header and footer
  data/         all text, products and settings
  hooks/        small React hooks
  utils/        helpers (prices, images, orders)
  context/      the cart
  assets/       images
scripts/        the site checker
```

## Still to do before launch

- Add social media links in `src/data/site.js` (they appear automatically)
- Add exact directions for use if the manufacturer provides them
- Publish the site and connect a domain
- Have the legal text reviewed by someone qualified

## Notes on claims

Product wording is cautious: it says "helps" and "supports" and never promises guaranteed results. Keep it that way when editing the text.

## License

All rights reserved. The ROOTERA name, logo, product images and text may not be copied or reused without permission.