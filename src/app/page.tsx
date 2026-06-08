import type { Metadata } from 'next'
import Link from 'next/link'
import WaButton from '@/components/WaButton'
import { cities } from '@/lib/cities'

export const metadata: Metadata = {
  title: 'Lebenslauf erstellen lassen – Professionell & guenstig',
  description:
    'Lebenslauf erstellen lassen von einem erfahrenen Bewerbungsprofi. Fuer Azubis, Studierende und Berufseinsteiger. Kostenlose Erstberatung.',
  alternates: {
    canonical: 'https://aldinb.de',
  },
}

const faqs = [
  {
    q: 'Was kostet ein professioneller Lebenslauf?',
    a: 'Der Preis haengt von deiner Situation ab – ob Erstbewerber oder Berufserfahrener, ob Lebenslauf allein oder mit Anschreiben. Das erste Gespraech ist kostenlos. Schreib mir einfach.',
  },
  {
    q: 'Wie lange dauert es, bis mein Lebenslauf fertig ist?',
    a: 'In der Regel 1–2 Werktage. Bei Bedarf auch schneller. Ich sage dir vorab, was realistisch ist.',
  },
  {
    q: 'Ich habe kaum Berufserfahrung. Lohnt sich das trotzdem?',
    a: 'Gerade dann. Ich hole das Beste aus dir raus – Schule, Ehrenamt, Hobbys, Soft Skills. Ein Lebenslauf ist mehr als eine Erfahrungsliste.',
  },
  {
    q: 'Was brauche ich fuer die Zusammenarbeit?',
    a: 'Nichts Besonderes. Schreib mir auf WhatsApp, erzaehl mir kurz, auf was du dich bewirbst, und ich kuemmere mich um den Rest.',
  },
  {
    q: 'Bekomme ich auch Hilfe beim Anschreiben?',
    a: 'Ja. Ich mache Lebenslaeufe und Anschreiben – oder beides zusammen. Das koennen wir zusammen besprechen.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 px-5">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(28,79,139,0.07) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className="trust-pill">
              <span className="text-brand-600 font-bold">✓</span>
              100 % Erfolgsquote
            </span>
            <span className="trust-pill">
              <span className="text-brand-600 font-bold">✓</span>
              Erstgespräch gratis
            </span>
            <span className="trust-pill">
              <span className="text-brand-600 font-bold">✓</span>
              ATS-Kompatibel
            </span>
          </div>

          <h1 className="font-display font-black text-5xl md:text-7xl text-warm-900 leading-[0.95] tracking-tightest mb-6">
            Lebenslauf erstellen lassen –{' '}
            <span className="text-gradient">der erste Schritt zum Job.</span>
          </h1>
          <p className="text-lg md:text-xl text-warm-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Dein Lebenslauf entscheidet, ob du zum Vorstellungsgespraech eingeladen wirst. Ich
            erstelle ihn individuell, professionell und passend zur Stelle.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <WaButton size="lg" />
            <Link
              href="#ablauf"
              className="inline-flex items-center justify-center px-8 py-4 bg-warm-100 hover:bg-warm-200 text-warm-800 font-semibold rounded-xl transition-colors text-base"
            >
              So funktioniert’s
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── BENTO GRID: WAS EIN GUTER LEBENSLAUF BRAUCHT ─────────────── */}
      <section className="section-pad bg-warm-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="overline mb-2">Qualitätssicherung</p>
            <h2 className="font-display font-black text-4xl md:text-5xl text-warm-900 mb-4">
              Was ein guter Lebenslauf braucht
            </h2>
            <p className="text-warm-500 max-w-2xl mx-auto text-lg">
              Ein Lebenslauf ist keine Tabelle mit Daten. Er ist dein erster Eindruck bei einem
              Arbeitgeber – und der entscheidet in wenigen Sekunden.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                ),
                title: 'Klare Struktur',
                desc: 'Personaldaten, Ausbildung, Erfahrung – in einer Reihenfolge, die Sinn ergibt.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                ),
                title: 'ATS-Kompatibel',
                desc: 'Optimiert für automatische HR-Filter. Dein CV kommt durch die Systeme.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                ),
                title: 'Richtige Keywords',
                desc: 'Jede Stelle ist anders. Ich passe deinen CV an die konkrete Ausschreibung an.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.879-5.831a1.5 1.5 0 00-1.4-2.27F15 5.25v1.51M9.53 16.122A15.995 15.995 0 0017.122 9.53m-7.592 6.592l-3.879 5.831a1.5 1.5 0 01-1.4 2.27v-1.51" />
                ),
                title: 'Seriöses Design',
                desc: 'Übersichtlich, sauber, ohne unnötigen Schnickschnack. Ein Design, das wirkt.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-1.82.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                ),
                title: 'Stärken-Fokus',
                desc: 'Auch wenn du kaum Erfahrung hast – ich finde deine Stärken und präsentiere sie.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: '100% Fehlerfrei',
                desc: 'Keine Grammatikfehler, perfekte Zeichensetzung und konsistente Formatierung.',
              },
            ].map((item) => (
              <div key={item.title} className="card p-7 group hover:border-brand-200">
                <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="font-display font-bold text-xl text-warm-900 mb-2">{item.title}</h3>
                <p className="text-warm-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE: PROZESS ────────────────────────────────────────── */}
      <section id="ablauf" className="section-pad bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="overline mb-2">Einfacher Ablauf</p>
          <h2 className="font-display font-black text-4xl md:text-5xl text-warm-900 mb-12">
            In 4 Schritten zur fertigen Bewerbung
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Kontakt', desc: 'Schreib mir auf WhatsApp. Kein Formular, keine Wartezeit.' },
              { step: '02', title: 'Kurzes Gespräch', desc: 'Ich lerne dich kennen und verstehe, worauf du dich bewirbst.' },
              { step: '03', title: 'Ich erstelle den CV', desc: 'Innerhalb von 1–2 Tagen bekommst du den fertigen Lebenslauf.' },
              { step: '04', title: 'Feedback & Fertig', desc: 'Du schickst die Bewerbung raus. Bezahlt wird nach Zufriedenheit.' },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                {/* connector line */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-warm-200 z-0 -translate-x-4" aria-hidden />
                )}
                <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center font-display font-black text-brand-600 text-xl mb-4 relative z-10 shadow-sm">
                  {item.step}
                </div>
                <h3 className="font-display font-bold text-xl mb-2 text-warm-900">{item.title}</h3>
                <p className="text-warm-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── FAQ ACCORDION ────────────────────────────────────────────── */}
      <section className="section-pad bg-warm-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="overline mb-2">Du hast Fragen?</p>
            <h2 className="font-display font-black text-4xl text-warm-900">
              Häufige Fragen
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-white border border-warm-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 font-semibold text-warm-900 text-lg outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                  {faq.q}
                  <span className="ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-warm-50 text-brand-600 group-open:rotate-180 transition-transform duration-300">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-warm-500 leading-relaxed text-sm border-t border-warm-50 pt-4 opacity-0 group-open:animate-fade-in">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINALE ───────────────────────────────────────────────── */}
      <section
        className="py-24 px-5 text-white text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f2b4e 0%, #1c4f8b 60%, #2c63a8 100%)' }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-200 mb-3">Bereit?</p>
          <h2 className="font-display font-black text-4xl md:text-5xl mb-5 leading-[1.1]">
            Lebenslauf erstellen lassen – jetzt anfragen.
          </h2>
          <p className="text-brand-200 text-lg mb-10">
            Kostenloses Erstgespräch per WhatsApp. Ohne Risiko. Ohne versteckte Kosten.
          </p>
          <WaButton size="lg" label="Auf WhatsApp schreiben" variant="white" />
        </div>
      </section>

      {/* ── CITY LINKS ───────────────────────────────────────────────── */}
      <section className="py-14 px-5 bg-white border-t border-warm-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-xl mb-2 text-warm-900">
            Lebenslauf erstellen in deiner Stadt
          </h2>
          <p className="text-warm-500 text-sm mb-6">
            Ich helfe Bewerbern in ganz Deutschland. Finde deinen Standort:
          </p>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/lebenslauf-erstellen/${city.slug}`}
                className="px-4 py-2.5 bg-warm-50 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 text-warm-700 text-sm font-medium rounded-xl border border-warm-200 transition-colors shadow-sm"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLOATING WA BUTTON ────────────────────────────────────────── */}
      <WaButton
        label=""
        className="fixed bottom-6 right-6 z-50 wa-ring !w-14 !h-14 !rounded-full !p-0 shadow-lg shadow-green-200/50 hover:scale-110 active:scale-95"
      />
    </>
  )
}
