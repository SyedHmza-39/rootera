import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, CheckCircle2, Copy, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import FormField from '../ui/FormField'
import { useCart } from '../../hooks/useCart'
import { ORDER } from '../../data/order'
import { formatPrice } from '../../utils/format'
import { getUnitPrice, isPriceConfigured, priceLabel } from '../../utils/product'
import { buildOrderMessage, emailUrl, whatsappUrl } from '../../utils/order'

const EMPTY = { name: '', phone: '', city: '', address: '', notes: '' }
const FIELD_ORDER = ['name', 'phone', 'city', 'address', 'notes']
const NOTES_MAX = 300

function validate(values) {
  const errors = {}

  const name = values.name.trim()
  if (!name) errors.name = 'Please enter your full name.'
  else if (name.length < 2) errors.name = 'Your name should be at least 2 characters.'

  const phone = values.phone.trim()
  const digits = phone.replace(/\D/g, '')
  if (!phone) errors.phone = 'Please enter your phone number.'
  else if (!/^\+?[0-9\s-]+$/.test(phone) || digits.length < 10 || digits.length > 13)
    errors.phone = 'Please enter a valid phone number, for example 0300 1234567.'

  if (values.city.trim().length < 2) errors.city = 'Please enter your city.'

  const address = values.address.trim()
  if (!address) errors.address = 'Please enter your delivery address.'
  else if (address.length < 10)
    errors.address = 'Please enter your full address (house, street and area).'

  if (values.notes.trim().length > NOTES_MAX)
    errors.notes = `Please keep your notes under ${NOTES_MAX} characters.`

  return errors
}

export default function OrderRequest({ onBack, onClose }) {
  const { items, subtotal, currency, hasUnpriced, clearCart } = useCart()
  const [values, setValues] = useState(EMPTY)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sent, setSent] = useState(null) // { channel, message }
  const [copied, setCopied] = useState(false)
  const refs = useRef({})
  const sentRef = useRef(null)

  const hasWhatsapp = String(ORDER.whatsappNumber).replace(/\D/g, '') !== ''
  const errors = validate(values)
  const hasErrors = Object.keys(errors).length > 0
  const shown = (field) => (touched[field] || submitted ? errors[field] : undefined)

  // Move focus to the confirmation so screen readers announce it
  useEffect(() => {
    if (sent) sentRef.current?.focus()
  }, [sent])

  useEffect(() => {
    if (!copied) return undefined
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const change = (field) => (event) =>
    setValues((previous) => ({ ...previous, [field]: event.target.value }))
  const blur = (field) => () =>
    setTouched((previous) => ({ ...previous, [field]: true }))

  const send = (channel) => {
    setSubmitted(true)
    const firstInvalid = FIELD_ORDER.find((field) => errors[field])
    if (firstInvalid) {
      refs.current[firstInvalid]?.focus()
      return
    }

    const message = buildOrderMessage({
      customer: values,
      items,
      subtotal,
      currency,
      paymentNote: ORDER.paymentNote,
    })

    if (channel === 'whatsapp') {
      window.open(whatsappUrl(ORDER.whatsappNumber, message), '_blank', 'noopener,noreferrer')
    } else {
      window.location.assign(emailUrl(ORDER.email, values.name, message))
    }
    setSent({ channel, message })
  }

  const copyOrder = async () => {
    try {
      await navigator.clipboard.writeText(sent.message)
      setCopied(true)
    } catch {
      // Copying can be blocked by the browser. The order text is still in the message.
    }
  }

  if (sent) {
    const where = sent.channel === 'whatsapp' ? 'WhatsApp has' : 'Your email app has'

    return (
      <div className="flex-1 overflow-y-auto px-6 py-8 text-center">
        <CheckCircle2
          size={36}
          strokeWidth={1.25}
          aria-hidden="true"
          className="mx-auto text-gold"
        />
        <h3
          ref={sentRef}
          tabIndex={-1}
          className="mt-4 font-serif text-2xl text-forest outline-none"
        >
          Your order message is ready
        </h3>
        <p className="body-text mt-3 text-sm">
          {where} opened with your order typed in. Please press send there to finish
          your request.
        </p>
        <p className="body-text mt-3 text-sm">
          Your order is not placed until you send it. We will then confirm your order,
          the delivery cost, and the delivery time.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Button
            onClick={() => {
              clearCart()
              onClose()
            }}
          >
            I have sent my order
          </Button>
          <Button variant="outline" onClick={copyOrder}>
            <Copy size={15} strokeWidth={1.5} aria-hidden="true" />
            {copied ? 'Copied' : 'Copy my order text'}
          </Button>
          <Button variant="outline" onClick={() => setSent(null)}>
            Back to my order
          </Button>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-charcoal/55">
          If nothing opened, copy your order text and send it to us on WhatsApp or at{' '}
          {ORDER.email}.
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-charcoal/60 transition-colors hover:text-forest"
        >
          <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" />
          Back to cart
        </button>

        <h3 className="mt-4 font-serif text-2xl text-forest">Order request</h3>
        <p className="body-text mt-2 text-sm">
          Tell us where to deliver. You will then send your order to us on WhatsApp or by
          email, and we will confirm it. Payment is cash on delivery.
        </p>

        <form
          noValidate
          onSubmit={(event) => event.preventDefault()}
          className="mt-6 space-y-4"
        >
          <FormField
            id="order-name"
            name="name"
            label="Full name"
            value={values.name}
            onChange={change('name')}
            onBlur={blur('name')}
            error={shown('name')}
            autoComplete="name"
            inputRef={(node) => {
              refs.current.name = node
            }}
          />
          <FormField
            id="order-phone"
            name="phone"
            label="Phone number"
            type="tel"
            inputMode="tel"
            value={values.phone}
            onChange={change('phone')}
            onBlur={blur('phone')}
            error={shown('phone')}
            autoComplete="tel"
            inputRef={(node) => {
              refs.current.phone = node
            }}
          />
          <FormField
            id="order-city"
            name="city"
            label="City"
            value={values.city}
            onChange={change('city')}
            onBlur={blur('city')}
            error={shown('city')}
            autoComplete="address-level2"
            inputRef={(node) => {
              refs.current.city = node
            }}
          />
          <FormField
            id="order-address"
            name="address"
            label="Delivery address"
            multiline
            rows={3}
            value={values.address}
            onChange={change('address')}
            onBlur={blur('address')}
            error={shown('address')}
            autoComplete="street-address"
            inputRef={(node) => {
              refs.current.address = node
            }}
          />
          <FormField
            id="order-notes"
            name="notes"
            label="Notes"
            required={false}
            multiline
            rows={2}
            value={values.notes}
            onChange={change('notes')}
            onBlur={blur('notes')}
            error={shown('notes')}
            inputRef={(node) => {
              refs.current.notes = node
            }}
          />
        </form>

        <div className="mt-6 border border-charcoal/15 bg-beige p-4 text-sm">
          <p className="text-[11px] uppercase tracking-[0.18em] text-charcoal/60">
            Your order
          </p>
          <ul className="mt-3 space-y-1.5">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex justify-between gap-3">
                <span>
                  {quantity} x {product.name}
                </span>
                <span className="shrink-0">
                  {isPriceConfigured(product)
                    ? formatPrice(getUnitPrice(product) * quantity, product.currency)
                    : priceLabel(product)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex justify-between border-t border-charcoal/15 pt-3 font-medium text-forest">
            <span>Subtotal</span>
            <span>{hasUnpriced ? 'To be confirmed' : formatPrice(subtotal, currency)}</span>
          </p>
          <p className="mt-2 text-xs text-charcoal/60">
            Delivery cost depends on your order and is not included.
          </p>
        </div>
      </div>

      <div className="space-y-3 border-t border-charcoal/10 bg-warm-white px-6 py-5">
        <p className="text-xs leading-relaxed text-charcoal/60">
        By sending your order you agree to our{' '}
        <Link to="/terms" className="underline decoration-gold underline-offset-2 hover:text-forest">
          Terms of Service
        </Link>
        ,{' '}
        <Link to="/privacy" className="underline decoration-gold underline-offset-2 hover:text-forest">
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link to="/returns" className="underline decoration-gold underline-offset-2 hover:text-forest">
          Returns &amp; Refund Policy
        </Link>
        .
      </p>
      {hasWhatsapp && (
          <Button className="w-full" onClick={() => send('whatsapp')}>
            <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />
            Send order on WhatsApp
          </Button>
        )}
        <Button
          variant={hasWhatsapp ? 'outline' : 'primary'}
          className="w-full"
          onClick={() => send('email')}
        >
          <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
          Send order by email
        </Button>
        {submitted && hasErrors && (
          <p role="alert" className="text-xs text-red-700">
            Please check the highlighted fields.
          </p>
        )}
      </div>
    </div>
  )
}