import { useEffect, useRef, useState } from 'react'
import { AlertCircle, CheckCircle2, Copy, Mail, MessageCircle } from 'lucide-react'
import Button from '../ui/Button'
import FormField from '../ui/FormField'
import { ORDER } from '../../data/order'
import { buildContactMessage, mailtoUrl, whatsappUrl } from '../../utils/order'

const MESSAGE_MAX = 1000
const FIELD_ORDER = ['name', 'email', 'subject', 'message']
const EMPTY = { name: '', email: '', subject: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values) {
  const errors = {}

  const name = values.name.trim()
  if (!name) errors.name = 'Please enter your full name.'
  else if (name.length < 2) errors.name = 'Your name should be at least 2 characters.'

  const email = values.email.trim()
  if (!email) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(email))
    errors.email = 'Please enter a valid email address, for example name@example.com.'

  const subject = values.subject.trim()
  if (!subject) errors.subject = 'Please enter a subject.'
  else if (subject.length < 3)
    errors.subject = 'Your subject should be at least 3 characters.'

  const message = values.message.trim()
  if (!message) errors.message = 'Please write a message.'
  else if (message.length < 10)
    errors.message = 'Your message should be at least 10 characters.'
  else if (message.length > MESSAGE_MAX)
    errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`

  return errors
}

export default function ContactForm() {
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

    const message = buildContactMessage(values)

    if (channel === 'whatsapp') {
      window.open(whatsappUrl(ORDER.whatsappNumber, message), '_blank', 'noopener,noreferrer')
    } else {
      window.location.assign(mailtoUrl(ORDER.email, values.subject.trim(), message))
    }
    setSent({ channel, message })
  }

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(sent.message)
      setCopied(true)
    } catch {
      // Copying can be blocked by the browser. The message is still in the app that opened.
    }
  }

  const reset = () => {
    setValues(EMPTY)
    setTouched({})
    setSubmitted(false)
    setSent(null)
  }

  if (sent) {
    const where = sent.channel === 'whatsapp' ? 'WhatsApp has' : 'Your email app has'

    return (
      <div className="border border-t-2 border-charcoal/15 border-t-gold bg-warm-white p-8 text-center sm:p-12">
        <CheckCircle2
          size={36}
          strokeWidth={1.25}
          aria-hidden="true"
          className="mx-auto text-gold"
        />
        <h3
          ref={sentRef}
          tabIndex={-1}
          className="mt-4 font-serif text-3xl text-forest outline-none"
        >
          Your message is ready
        </h3>
        <p className="body-text mx-auto mt-3 max-w-md">
          {where} opened with your message typed in. Please press send there to finish.
          Your message is not sent until you do.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button variant="outline" onClick={copyMessage}>
            <Copy size={15} strokeWidth={1.5} aria-hidden="true" />
            {copied ? 'Copied' : 'Copy my message'}
          </Button>
          <Button onClick={reset}>Write another message</Button>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-charcoal/55">
          If nothing opened, copy your message and send it to us at {ORDER.email}.
        </p>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={(event) => event.preventDefault()}
      className="border border-t-2 border-charcoal/15 border-t-gold bg-warm-white p-6 sm:p-10"
    >
      {submitted && hasErrors && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-2 rounded-xl border border-red-700/40 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
          Please check the highlighted fields and try again.
        </div>
      )}

      <p className="mb-6 text-xs text-charcoal/55">All fields are required.</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          id="contact-name"
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
          id="contact-email"
          name="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={change('email')}
          onBlur={blur('email')}
          error={shown('email')}
          autoComplete="email"
          inputRef={(node) => {
            refs.current.email = node
          }}
        />
        <div className="sm:col-span-2">
          <FormField
            id="contact-subject"
            name="subject"
            label="Subject"
            value={values.subject}
            onChange={change('subject')}
            onBlur={blur('subject')}
            error={shown('subject')}
            inputRef={(node) => {
              refs.current.subject = node
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <FormField
            id="contact-message"
            name="message"
            label="Message"
            multiline
            rows={6}
            value={values.message}
            onChange={change('message')}
            onBlur={blur('message')}
            error={shown('message')}
            inputRef={(node) => {
              refs.current.message = node
            }}
          />
          <p
            className={`mt-1.5 text-right text-xs ${
              values.message.length > MESSAGE_MAX ? 'text-red-700' : 'text-charcoal/50'
            }`}
          >
            {values.message.length} / {MESSAGE_MAX}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {hasWhatsapp && (
          <Button onClick={() => send('whatsapp')}>
            <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />
            Send on WhatsApp
          </Button>
        )}
        <Button
          variant={hasWhatsapp ? 'outline' : 'primary'}
          onClick={() => send('email')}
        >
          <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
          Send by email
        </Button>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-charcoal/55">
        Your message opens in your own WhatsApp or email app. It is not sent until you
        press send there.
      </p>
    </form>
  )
}