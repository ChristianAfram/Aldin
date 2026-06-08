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
    title: `Bewerbungscoach in ${city.name} – Professionelle Unterstuetzung`,
    description: `Dein Bewerbungscoach in ${city.name}: Professioneller Lebenslauf, Anschreiben und Bewerbungsstrategie fuer den Jobmarkt in ${city.name}. Jetzt kostenlos anfragen.`,
    alternates: {
      canonical: `https://aldinb.de/bewerbungscoach/${city.slug}`,
    },
  }
}

export default function CityBewerbungscoachPage({ params }: Props) {
  const city = getCityBySlug(params.city)
  if (!city) notFound()

  const otherCities = cities.filter((c) => c.slug !== city.slug).slice(0, 6)

  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-12 px-5">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
            {city.name} · Bewerbungscoach
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-5">
            Bewerbungscoach in {city.name}
          </h1>
          <p className="text-lg text-neutral-500 max-w-xl mb-8">
            Du bewirbst dich in {city.name} und brauchst Unterstuetzung? Ich helfe dir mit
            Lebenslauf, Anschreiben und Bewerbungsstrategie – individuell und persoenlich.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <WaButton size="lg" label={`Coaching in ${city.name} anfragen`} />
            <Link
              href="/bewerbungscoach"
              className="inline-flex items-center justify-center px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold rounded-xl transition-colors"
            >
              Zurueck zur Uebersicht
            </Link>
          </div>
        </div>
      </section>

      <hr className="max-w-5xl mx-auto border-gray-200" />

      {/* City specifics */}
      <section className="py-14 px-5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight mb-4">
              Bewerbungen in {city.name} – was du wissen musst
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-4">{city.jobMarket}</p>
            <p className="text-neutral-600 leading-relaxed">
              Als Bewerbungscoach helfe ich dir, genau das zu vermitteln, was Unternehmen in{' '}
              {city.name} suchen – in einem Lebenslauf und Anschreiben, das heraussticht.
            </p>
          </div>
          <div className="bg-neutral-50 border border-gray-200 rounded-2xl p-6">
            <h3 className="font-semibold mb-3">Was du von mir bekommst</h3>
            <ul className="space-y-3">
              {[
                `Bewerbungsunterlagen fuer den Jobmarkt in ${city.name}`,
                'Individuell auf dich und die Stelle zugeschnitten',
                'Ehrliches Feedback zu bestehenden Bewerbungen',
                'Schnelle Kommunikation per WhatsApp',
                'Kostenlose Ueberarbeitung',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-600">
                  <span className="text-green-600 font-bold mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <WaButton fullWidth label="Jetzt anfragen" />
            </div>
          </div>
        </div>
      </section>

      {/* Also available */}
      <section className="py-14 px-5 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-extrabold tracking-tight mb-2">
            Bewerbungscoach auch in anderen Staedten
          </h2>
          <p className="text-sm text-neutral-500 mb-5">
            Ich bin nicht nur in {city.name} aktiv – sondern in ganz Deutschland.
          </p>
          <div className="flex flex-wrap gap-2">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/bewerbungscoach/${c.slug}`}
                className="px-4 py-2 bg-neutral-100 hover:bg-blue-50 hover:text-blue-700 text-neutral-700 text-sm font-medium rounded-lg transition-colors"
              >
                {c.name}
              </Link>
            ))}
            <Link
              href="/bewerbungscoach"
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-medium rounded-lg transition-colors"
            >
              Alle Staedte
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
