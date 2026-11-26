/**
 * The text of the legal pages. Put **double asterisks** around words to make
 * them bold. Each page has an intro, numbered sections, and a closing line.
 */

export const LEGAL = {
  terms: {
    title: 'Terms of Service',
    intro: [
      'Welcome to ROOTERA! By accessing our website and purchasing our products, you agree to the following terms and conditions.',
    ],
    sections: [
      {
        title: '1. Products & Information',
        paragraphs: [
          'We aim to provide accurate product descriptions, ingredients, images, and pricing. However, slight variations in product appearance may occur.',
        ],
      },
      {
        title: '2. Orders & Payments',
        paragraphs: [
          'All orders are subject to availability and confirmation. ROOTERA reserves the right to cancel orders in case of pricing errors, stock issues, or suspicious activity.',
        ],
      },
      {
        title: '3. Shipping & Delivery',
        paragraphs: [
          'We aim to deliver orders within the estimated delivery timeframe. Delivery times may vary depending on location and courier services.',
        ],
      },
      {
        title: '4. Returns & Refunds',
        paragraphs: [
          'Customers can request a return within 7 days of receiving their order. Products must be unused, unopened, and in their original packaging. Please refer to our Returns & Refund Policy for details.',
        ],
        link: { label: 'Read the Returns & Refund Policy', to: '/returns' },
      },
      {
        title: '5. Product Usage',
        paragraphs: [
          'Customers should read product ingredients and usage instructions before applying any skincare product. Individual results may vary.',
        ],
      },
      {
        title: '6. Website Content',
        paragraphs: [
          'All website content, including logos, images, text, and designs, belongs to ROOTERA and may not be copied or reused without permission.',
        ],
      },
      {
        title: '7. Changes to Terms',
        paragraphs: [
          'ROOTERA reserves the right to update these terms at any time. Continued use of our website means you accept the updated terms.',
        ],
      },
    ],
    outro: ['For any questions, please contact our customer support team.'],
  },

  privacy: {
    title: 'Privacy Policy',
    intro: [
      'At ROOTERA, we respect your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and protect your information when you visit our website or place an order.',
    ],
    sections: [
      {
        title: '1. Information We Collect',
        paragraphs: [
          'We may collect your name, email address, phone number, shipping address, billing details, and order information when you make a purchase or contact us.',
        ],
      },
      {
        title: '2. How We Use Your Information',
        paragraphs: ['Your information is used to:'],
        list: [
          'Process and deliver your orders.',
          'Communicate order updates and confirmations.',
          'Provide customer support.',
          'Improve our website and shopping experience.',
          'Send promotional updates where you have given consent.',
        ],
      },
      {
        title: '3. Information Sharing',
        paragraphs: [
          'We do not sell your personal information. We may share necessary information with trusted payment providers, delivery companies, and service providers to fulfill your orders and operate our website.',
        ],
      },
      {
        title: '4. Data Security',
        paragraphs: [
          'We take reasonable security measures to protect your personal information against unauthorized access, misuse, or disclosure.',
        ],
      },
      {
        title: '5. Cookies',
        paragraphs: [
          'Our website may use cookies to improve browsing experience, understand website traffic, and remember user preferences.',
        ],
      },
      {
        title: '6. Your Privacy Rights',
        paragraphs: [
          'You may request access to, correction of, or deletion of your personal information, subject to applicable legal requirements.',
        ],
      },
      {
        title: '7. Policy Updates',
        paragraphs: [
          'ROOTERA may update this Privacy Policy from time to time. Any changes will be published on this page.',
        ],
      },
      {
        title: '8. Contact Us',
        paragraphs: [
          'If you have questions about this Privacy Policy or your personal information, please contact our customer support team.',
        ],
      },
    ],
    outro: [],
  },

  returns: {
    title: 'Returns & Refund Policy',
    intro: [
      "At ROOTERA, customer satisfaction is our priority. If you're not satisfied with your purchase, you can request a return within **7 days of receiving your order**.",
      'Products must be unused, unopened, and in their original packaging to qualify for a return. Damaged, defective, or incorrect items should be reported to our customer support team within 7 days of delivery.',
      'Once your return is approved and inspected, eligible refunds will be processed through the original payment method or another agreed method.',
    ],
    sections: [],
    outro: ['For return assistance, please contact our customer support team.'],
  },
}

// The order the policies are listed in
export const LEGAL_ORDER = [
  { key: 'terms', to: '/terms' },
  { key: 'privacy', to: '/privacy' },
  { key: 'returns', to: '/returns' },
]