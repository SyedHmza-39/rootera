const ICONS = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" />
    </>
  ),
  Facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />,
  TikTok: (
    <>
      <path d="M14 3v11a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c.4 2.6 2 4.4 5 4.6" />
    </>
  ),
}

/** Shows an icon for known networks, or the plain label for any other. */
export default function SocialIcon({ label }) {
  const icon = ICONS[label]

  if (!icon) {
    return <span className="px-1 text-xs">{label}</span>
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icon}
    </svg>
  )
}