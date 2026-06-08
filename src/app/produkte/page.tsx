import type { Metadata } from 'next'
import { products } from '@/lib/db'
import WaButton from '@/components/WaButton'

export const metadata: Metadata = {
  title: 'Produkte & Pakete – Lebenslauf erstellen lassen',
  description:
    'Finde das passende Paket für deine Bewerbung: Vom Basis-Lebenslauf bis zur Premium-Bewerbung inklusive Anschreiben.',
  alternates: {
    canonical: 'https://aldinb.de/produkte',
  },
}

export const revalidate = 0 // always fetch fresh from local JSON DB

export default async function ProduktePage() {
  let activeProducts: ReturnType<typeof products.findActive> = []
  try {
    activeProducts = products.findActive()
  } catch {
    // fail silently if DB not initialized
  }

  return (
    <>
      <section className="pt-16 pb-12 px-5 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-3">Produkte & Preise</p>
          <h1 className="font-display font-black text-4xl md:text-5xl text-warm-900 mb-4">
            Das passende Paket für dich
          </h1>
          <p className="text-warm-500 text-lg">
            Transparente Preise, professionelle Ergebnisse. Wähle das Paket, das am besten zu dir passt.
          </p>
        </div>
      </section>

      <hr className="divider" />

      <section className="section-pad bg-warm-50 min-h-[50vh]">
        <div className="max-w-5xl mx-auto">
          {activeProducts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-warm-200 rounded-2xl">
              <p className="text-lg font-display font-bold text-warm-900 mb-2">Noch keine Produkte</p>
              <p className="text-warm-500 text-sm">Aktuell sind keine Pakete verfügbar.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeProducts.map((product) => (
                <div key={product.id} className="card bg-white p-8 hover:border-brand-200 hover:shadow-md transition-all flex flex-col h-full">
                  {product.category && (
                    <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider rounded-md mb-4 w-fit">
                      {product.category}
                    </span>
                  )}
                  <h2 className="font-display font-bold text-2xl text-warm-900 mb-2">
                    {product.name}
                  </h2>
                  {product.price && (
                    <p className="font-display font-black text-3xl text-brand-600 mb-5">
                      {product.price}
                    </p>
                  )}
                  <p className="text-warm-500 text-sm leading-relaxed mb-8 flex-grow">
                    {product.description || 'Keine Beschreibung verfügbar.'}
                  </p>
                  
                  <div className="mt-auto">
                    <WaButton label="Jetzt anfragen" className="w-full" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-5 bg-white border-t border-warm-200 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-2xl text-warm-900 mb-4">
            Du bist dir nicht sicher?
          </h2>
          <p className="text-warm-500 mb-8 leading-relaxed">
            Kein Problem. Schreib mir einfach auf WhatsApp, schildere mir deine Situation und wir finden gemeinsam heraus, welches Paket das richtige für dich ist. Das Erstgespräch ist 100% kostenlos.
          </p>
          <WaButton variant="white" label="Kostenlos beraten lassen" />
        </div>
      </section>
    </>
  )
}
