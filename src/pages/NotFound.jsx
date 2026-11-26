import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFound() {
usePageTitle('Page not found')
  return (
    <section className="section">
      <div className="page-container text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="display-heading mt-4 text-forest">Page not found</h1>
        <div className="gold-rule mx-auto mt-6" />
        <p className="body-text mx-auto mt-6 max-w-md">
          The page you are looking for does not exist or has moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block border border-forest px-6 py-3 text-sm uppercase tracking-[0.2em] text-forest hover:bg-forest hover:text-warm-white"
        >
          Back to Home
        </Link>
      </div>
    </section>
  )
}
