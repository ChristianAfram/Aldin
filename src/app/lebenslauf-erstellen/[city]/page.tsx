import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import WaButton from '@/components/WaButton'
import { cities, getCityBySlug } from '@/lib/cities'

type Props = { params: { city: string } }

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const city = getCityBySlug(params.city)
  if (!city) return {}

  return {
    title: `Lebenslauf erstellen in ${city.name} – Professionell & schnell`,
    description: `Lebenslauf erstellen in ${city.name}: Individueller, professioneller Lebenslauf für Azubis, Studierende und Berufseinsteiger in ${city.name}. Jetzt kostenlos anfragen.`,
    alternates: {
      canonical: `https://aldinb.de/lebenslauf-erstellen/${city.slug}`,
    },
  }
}

export default function CityLebenslaufPage({ params }: Props) {
  const city = getCityBySlug(params.city)
  if (!city) notFound()

  const otherCities = cities.filter((c) => c.slug !== city.slug).slice(0, 6)

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
              Speziell für {city.name}
            </span>
            <span className="trust-pill">
              <span className="text-brand-600 font-bold">✓</span>
              Schnelle Lieferung
            </span>
          </div>

          <h1 className="font-display font-black text-5xl md:text-6xl text-warm-900 leading-[1.05] tracking-tightest mb-6">
            Lebenslauf erstellen in <span className="text-gradient">{city.name}</span>
          </h1>
          <p className="text-lg md:text-xl text-warm-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Du bewirbst dich in {city.name}? Ich erstelle deinen Lebenslauf professionell,
            individuell und passend zur Stelle – damit du aus der Masse herausstichst.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <WaButton size="lg" label={`Lebenslauf in ${city.name} anfragen`} />
            <Link
              href="/lebenslauf-erstellen"
              className="inline-flex items-center justify-center px-8 py-4 bg-warm-100 hover:bg-warm-200 text-warm-800 font-semibold rounded-xl transition-colors text-base"
            >
              Alle Städte ansehen
            </Link>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── JOB MARKET ───────────────────────────────────────────────── */}
      <section className="section-pad bg-warm-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="overline mb-2">Lokal punkten</p>
            <h2 className="font-display font-black text-3xl md:text-4xl text-warm-900 mb-6">
              Jobmarkt in {city.name}
            </h2>
            <p className="text-warm-500 leading-relaxed mb-5 text-lg">{city.jobMarket}</p>
            <p className="text-warm-500 leading-relaxed text-lg">
              Genau deshalb ist ein professionell gestalteter Lebenslauf in {city.name} kein Luxus,
              sondern Pflicht. Ich helfe dir, diesen ersten Eindruck optimal zu gestalten.
            </p>
          </div>
          <div className="card p-8 bg-white border border-warm-200">
            <h3 className="font-display font-bold text-xl text-warm-900 mb-3">
              Branchen in {city.name}
            </h3>
            <p className="text-sm text-warm-500 mb-6 leading-relaxed">{city.industries}</p>

            <h3 className="font-display font-bold text-lg text-warm-900 mb-4">Was du bekommst</h3>
            <ul className="space-y-3">
              {[
                `Lebenslauf optimiert für ${city.name}`,
                'Angepasst an lokale Branchen und Stellen',
                'ATS-freundliches Format für große Unternehmen',
                'Kostenlose Überarbeitung bis zur Zufriedenheit',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-warm-600">
                  <span className="text-brand-600 shrink-0 mt-0.5">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── PROCESS TIMELINE ─────────────────────────────────────────── */}
      <section className="section-pad bg-white border-t border-warm-200">
        <div className="max-w-5xl mx-auto">
          <p className="overline mb-2">Ablauf</p>
          <h2 className="font-display font-black text-4xl md:text-5xl text-warm-900 mb-12">
            So bekommst du deinen CV
          </h2>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'WhatsApp schreiben',
                desc: `Schreib mir kurz, worauf du dich in ${city.name} bewirbst.`,
              },
              {
                step: '02',
                title: 'Lebenslauf erhalten',
                desc: 'In 1–2 Tagen bekommst du deinen fertigen Lebenslauf.',
              },
              {
                step: '03',
                title: 'Job bekommen',
                desc: 'Bewerbung abschicken. Bezahlt wird nach Zufriedenheit.',
              },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                {/* connector line */}
                {i < 2 && (
                  <div
                    className="hidden sm:block absolute top-6 left-full w-full h-px bg-warm-200 z-0 -translate-x-4"
                    aria-hidden
                  />
                )}
                <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center font-display font-black text-brand-600 text-xl mb-4 relative z-10 shadow-sm">
                  {item.step}
                </div>
                <h3 className="font-display font-bold text-xl mb-2 text-warm-900">{item.title}</h3>
                <p className="text-warm-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <WaButton size="lg" label={`Lebenslauf in ${city.name} erstellen lassen`} />
          </div>
        </div>
      </section>

      {/* ── OTHER CITIES ─────────────────────────────────────────────── */}
      <section className="py-14 px-5 bg-warm-50 border-t border-warm-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-xl mb-2 text-warm-900">
            Auch in anderen Städten verfügbar
          </h2>
          <p className="text-sm text-warm-500 mb-6">
            Ich helfe Bewerbern in ganz Deutschland – nicht nur in {city.name}.
          </p>
          <div className="flex flex-wrap gap-2">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/lebenslauf-erstellen/${c.slug}`}
                className="px-4 py-2.5 bg-white hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 text-warm-700 text-sm font-medium rounded-xl border border-warm-200 transition-colors shadow-sm"
              >
                {c.name}
              </Link>
            ))}
            <Link
              href="/lebenslauf-erstellen"
              className="px-4 py-2.5 bg-warm-200 hover:bg-warm-300 text-warm-900 text-sm font-medium rounded-xl transition-colors shadow-sm"
            >
              Alle Städte ansehen
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
