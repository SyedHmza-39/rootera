import { SITE } from '../data/site'

export default function AnnouncementBar() {
  return (
    <div className="bg-forest px-4 py-2.5 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-warm-white">
      <p>{SITE.announcement}</p>
    </div>
  )
}