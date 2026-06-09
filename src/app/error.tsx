'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="section-pad bg-warm-50 min-h-[60vh] flex items-center">
      <div className="max-w-xl mx-auto px-5 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-3">Fehler</p>
        <h1 className="font-display font-black text-4xl md:text-5xl text-warm-900 mb-4">
          Etwas ist schiefgelaufen
        </h1>
        <p className="text-warm-500 text-lg mb-8 leading-relaxed">
          Das hätte nicht passieren dürfen. Bitte versuche es noch einmal – wenn das Problem bleibt,
          schau in ein paar Minuten wieder vorbei.
        </p>
        <button
          onClick={reset}
          className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors shadow-brand-sm"
        >
          Erneut versuchen
        </button>
      </div>
    </section>
  )
}
