import { formatPrice } from './format'
import { getUnitPrice, isPriceConfigured } from './product'

/** The order text that the customer sends to ROOTERA. */
export function buildOrderMessage({ customer, items, subtotal, currency, paymentNote }) {
  const lines = items.map(({ product, quantity }) => {
    const total = isPriceConfigured(product)
      ? ` = ${formatPrice(getUnitPrice(product) * quantity, product.currency)}`
      : ''
    return `- ${product.name} (${product.size}) x ${quantity}${total}`
  })

  return [
    'New ROOTERA order request',
    '',
    `Name: ${customer.name.trim()}`,
    `Phone: ${customer.phone.trim()}`,
    `City: ${customer.city.trim()}`,
    `Address: ${customer.address.trim()}`,
    customer.notes.trim() ? `Notes: ${customer.notes.trim()}` : null,
    '',
    'Items:',
    ...lines,
    '',
    `Subtotal: ${formatPrice(subtotal, currency)} (delivery cost not included)`,
    `Payment: ${paymentNote}`,
  ]
    .filter((line) => line !== null)
    .join('\n')
}

/** The message text for the contact form. */
export function buildContactMessage({ name, email, subject, message }) {
  return [
    'New message from the ROOTERA website',
    '',
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    `Subject: ${subject.trim()}`,
    '',
    'Message:',
    message.trim(),
  ].join('\n')
}

export function whatsappUrl(number, message) {
  const digits = String(number).replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export function mailtoUrl(address, subject, body) {
  return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function emailUrl(address, name, message) {
  return mailtoUrl(address, `New order request from ${name.trim()}`, message)
}