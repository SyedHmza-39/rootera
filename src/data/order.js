import { SITE } from './site'

/**
 * Settings for the order request in the cart.
 *
 * whatsappNumber: your WhatsApp number in international format, digits only.
 *   For a Pakistani number 0300 1234567 write 923001234567
 *   (92 for Pakistan, then the number without the first 0).
 *   The number is only used inside the WhatsApp link and is never shown on a page.
 *   Leave it empty to hide the WhatsApp button.
 */
export const ORDER = {
  whatsappNumber: '923065442384',
  email: SITE.contact.email,
  paymentNote: 'Cash on delivery',
}