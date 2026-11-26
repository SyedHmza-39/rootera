import { AlertCircle } from 'lucide-react'

export default function FormField({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  autoComplete,
  inputMode,
  inputRef,
  multiline = false,
  required = true,
  maxLength,
  rows = 3,
}) {
  const errorId = `${id}-error`
  const classes = `w-full border bg-warm-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 transition-colors ${
    error ? 'border-red-700' : 'border-charcoal/25 focus:border-forest'
  }`

  const shared = {
    id,
    name,
    value,
    onChange,
    onBlur,
    ref: inputRef,
    autoComplete,
    inputMode,
    maxLength,
    'aria-required': required,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
    className: classes,
  }

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.18em] text-charcoal/70"
      >
        {label}
        {!required && <span className="normal-case tracking-normal"> (optional)</span>}
      </label>

      {multiline ? (
        <textarea {...shared} rows={rows} />
      ) : (
        <input {...shared} type={type} />
      )}

      {error && (
        <p id={errorId} className="mt-1.5 flex items-start gap-1.5 text-xs text-red-700">
          <AlertCircle size={13} aria-hidden="true" className="mt-px shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}