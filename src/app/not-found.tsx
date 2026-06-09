import type { Metadata } from 'next'
import Link from 'next/link'
import WaButton from '@/components/WaButton'

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className="section-pad bg-warm-50 min-h-[60vh] flex items-center">
      <div className="max-w-xl mx-auto px-5 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-3">
          Fehler 404
        </p>
        <h1 className="font-display font-black text-4xl md:text-5xl text-warm-900 mb-4">
          Seite nicht gefunden
        </h1>
        <p className="text-warm-500 text-lg mb-8 leading-relaxed">
          Die Seite, die du suchst, gibt es nicht oder wurde verschoben. Kein Problem – hier geht es
          weiter.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors shadow-brand-sm"
          >
            Zur Startseite
          </Link>
          <Link
            href="/blog"
            className="text-sm font-semibold text-warm-700 hover:text-brand-600 transition-colors px-6 py-3"
          >
            Zum Blog
          </Link>
        </div>
        <div className="mt-10">
          <WaButton label="Oder schreib mir auf WhatsApp" />
        </div>
      </div>
    </section>
  )
}
