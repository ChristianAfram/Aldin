import Link from 'next/link'
import { cities } from '@/lib/cities'
import { WA_LINK } from '@/lib/config'

const topCities    = cities.slice(0, 6)
const moreCities   = cities.slice(6)

export default function Footer() {
  return (
    <footer className="border-t border-warm-200 bg-warm-900 text-warm-300">
      <div className="max-w-5xl mx-auto px-5 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-display font-black text-2xl tracking-tighter text-white mb-1">
              Aldin<span className="text-brand-400">.</span>
            </p>
            <p className="text-sm text-warm-400 leading-relaxed mb-5">
              Professionelle Bewerbungsunterlagen für Azubis, Studierende und Berufseinsteiger.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-wa hover:bg-wa-dark text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326z" />
              </svg>
              WhatsApp Kontakt
            </a>
          </div>

          {/* Service */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-warm-500 mb-4">Service</p>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-warm-400 hover:text-white transition-colors">
                  Lebenslauf erstellen
                </Link>
              </li>
              <li>
                <Link href="/produkte" className="text-sm text-warm-400 hover:text-white transition-colors">
                  Produkte & Preise
                </Link>
              </li>
              <li>
                <Link href="/bewerbungscoach" className="text-sm text-warm-400 hover:text-white transition-colors">
                  Bewerbungscoach
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-warm-400 hover:text-white transition-colors">
                  Blog &amp; Tipps
                </Link>
              </li>
            </ul>
          </div>

          {/* Cities 1 */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-warm-500 mb-4">Städte</p>
            <ul className="space-y-3">
              {topCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/lebenslauf-erstellen/${city.slug}`}
                    className="text-sm text-warm-400 hover:text-white transition-colors"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities 2 */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-warm-500 mb-4">Weitere Städte</p>
            <ul className="space-y-3">
              {moreCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/lebenslauf-erstellen/${city.slug}`}
                    className="text-sm text-warm-400 hover:text-white transition-colors"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-warm-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-warm-600">
            &copy; {new Date().getFullYear()} Aldin B. – Freelance-Bewerbungsservice
          </p>
          <p className="text-xs text-warm-600">
            Kein gewerblicher Anbieter. Alle Angaben ohne Gewähr.
          </p>
        </div>
      </div>
    </footer>
  )
}
