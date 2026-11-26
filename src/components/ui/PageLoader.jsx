export default function PageLoader() {
  return (
    <div
      role="status"
      className="flex min-h-[60vh] flex-col items-center justify-center text-center"
    >
      <span
        aria-hidden="true"
        className="font-serif text-2xl tracking-[0.3em] text-gold motion-safe:animate-pulse"
      >
        ROOTERA
      </span>
      <span className="sr-only">Loading page</span>
    </div>
  )
}