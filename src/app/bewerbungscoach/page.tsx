import type { Metadata } from 'next'
import Link from 'next/link'
import WaButton from '@/components/WaButton'
import { cities } from '@/lib/cities'

export const metadata: Metadata = {
  title: 'Bewerbungscoach – Persönliche Unterstützung für deine Bewerbung',
  description:
    'Dein persönlicher Bewerbungscoach: Lebenslauf, Anschreiben, Bewerbungsstrategie. Für Azubis und Studierende in ganz Deutschland. Kostenloses Erstgespräch.',
  alternates: {
    canonical: 'https://aldinb.de/bewerbungscoach',
  },
}

const faqs = [
  {
    q: 'Was macht ein Bewerbungscoach?',
    a: 'Ein Bewerbungscoach hilft dir, deine Stärken zu erkennen und sie in einer Bewerbung überzeugend zu präsentieren. Das umfasst Lebenslauf, Anschreiben, Bewerbungsstrategie und auf Wunsch auch die Vorbereitung auf Vorstellungsgespräche.',
  },
  {
    q: 'Für wen ist Bewerbungscoaching sinnvoll?',
    a: 'Für alle, die sich auf Ausbildungsplätze, Praktika, Werkstudentenstellen oder Einstiegspositionen bewerben. Besonders wertvoll, wenn du wenig Erfahrung hast oder bisherige Bewerbungen nicht erfolgreich waren.',
  },
  {
    q: 'Unterschied zum Lebenslauf-Service?',
    a: 'Der Lebenslauf-Service ist der erste Schritt. Coaching geht tiefer: Wir sprechen über deine Ziele, deine Stärken und deine Strategie. Ich begleite dich den ganzen Weg.',
  },
  {
    q: 'Wie läuft das Coaching ab?',
    a: 'Alles per WhatsApp oder Chat. Kein Termin, kein Büro. Du schreibst mir, ich antworte – schnell, direkt, persönlich.',
  },
  {
    q: 'Was kostet Bewerbungscoaching?',
    a: 'Abhängig vom Umfang. Das erste Gespräch ist kostenlos. Dann besprechen wir gemeinsam, was sinnvoll ist und was es kostet.',
  },
]

export default function BewerbungscoachPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="pt-16 pb-20 px-5 bg-white relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(28,79,139,0.07) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-3">
            Bewerbungscoach
          </p>
          <h1 className="font-display font-black text-5xl md:text-6xl text-warm-900 leading-[1.05] tracking-tightest mb-6">
            Dein persönlicher{' '}
            <span className="text-gradient">Bewerbungscoach</span>
          </h1>
          <p className="text-lg md:text-xl text-warm-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Ein guter Bewerbungscoach macht mehr als einen Lebenslauf. Er versteht dich,
            findet deine Stärken und bringt sie überzeugend auf Papier.
          </p>
          <div className="flex justify-center">
            <WaButton size="lg" />
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── WAS IST COACHING ─────────────────────────────────────────── */}
      <section className="section-pad bg-warm-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="overline mb-2">Die Strategie</p>
            <h2 className="font-display font-black text-3xl md:text-4xl text-warm-900 mb-6">
              Was Bewerbungscoaching wirklich bedeutet
            </h2>
            <p className="text-warm-500 leading-relaxed mb-4 text-lg">
              Viele Leute schicken einfach Bewerbungen raus und hoffen auf das Beste. Das
              Problem: Ohne Strategie, ohne richtigen Lebenslauf und ohne überzeugendes
              Anschreiben landet die Bewerbung direkt im Papierkorb.
            </p>
            <p className="text-warm-500 leading-relaxed mb-4 text-lg">
              Als Bewerbungscoach schaue ich mir deine gesamte Situation an. Was willst du
              erreichen? Was kannst du? Was sucht der Arbeitgeber? Und wie bringen wir das
              zusammen?
            </p>
            <p className="text-warm-500 leading-relaxed text-lg">
              Das Ergebnis: Eine Bewerbung, die nicht nur professionell aussieht, sondern
              wirklich zu dir passt – und die ankommt.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                title: 'Stärkenanalyse',
                desc: 'Ich helfe dir, deine Stärken zu erkennen – auch wenn du denkst, du hast keine.',
              },
              {
                title: 'Zielgerichtete Strategie',
                desc: 'Welche Stellen passen zu dir? Wie bewirbst du dich am besten?',
              },
              {
                title: 'Vollständige Bewerbungsunterlagen',
                desc: 'Lebenslauf, Anschreiben, Profil – alles aus einer Hand.',
              },
              {
                title: 'Schnelles Feedback',
                desc: 'Ich bin per WhatsApp erreichbar – keine langen Wartezeiten.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="card p-5 group hover:border-brand-200 transition-colors flex gap-4 items-start cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-warm-900 mb-1">{item.title}</h3>
                  <p className="text-warm-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZIELGRUPPEN BENTO ────────────────────────────────────────── */}
      <section className="section-pad bg-white border-t border-warm-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-black text-4xl text-warm-900 mb-4">
              Für wen ist Bewerbungscoaching gedacht?
            </h2>
            <p className="text-warm-500 text-lg max-w-2xl mx-auto">
              Jeder verdient eine Chance auf den richtigen Job. Schreib mir, egal in welcher Situation.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                group: 'Schüler',
                desc: 'Erste Bewerbung für Ausbildung oder Praktikum. Du weißt nicht, wo du anfangen sollst? Ich helfe dir.',
              },
              {
                group: 'Studierende',
                desc: 'Werkstudentenjob, Praktikum oder Einstieg nach dem Studium – ich kenne die Anforderungen.',
              },
              {
                group: 'Azubi-Bewerber',
                desc: 'Ausbildungsplätze sind umkämpft. Mit dem richtigen Lebenslauf stichst du aus der Masse heraus.',
              },
              {
                group: 'Quereinsteiger',
                desc: 'Branchenwechsel oder Neustart? Ich helfe dir, deine Erfahrung neu zu positionieren.',
              },
              {
                group: 'Erfolglose Bewerber',
                desc: 'Schon mehrmals beworben ohne Rückmeldung? Ich sage dir ehrlich, was verbessert werden kann.',
              },
              {
                group: 'Alle anderen',
                desc: 'Schreib mir einfach und wir besprechen unverbindlich, wie ich dir helfen kann.',
              },
            ].map((item) => (
              <div
                key={item.group}
                className="card p-6 border border-warm-200 hover:border-brand-200 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="font-display font-bold text-xl text-warm-900 mb-2">{item.group}</h3>
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
            Jetzt Bewerbungscoaching anfragen.
          </h2>
          <p className="text-brand-200 text-lg mb-10">
            Kostenloses Erstgespräch per WhatsApp. Kein Risiko, keine Verpflichtung.
          </p>
          <WaButton size="lg" label="Coaching anfragen" variant="white" />
        </div>
      </section>

      {/* ── CITY LINKS ───────────────────────────────────────────────── */}
      <section className="py-14 px-5 bg-white border-t border-warm-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-xl mb-2 text-warm-900">
            Bewerbungscoach in deiner Stadt
          </h2>
          <p className="text-warm-500 text-sm mb-6">
            Ich arbeite für Bewerber in ganz Deutschland – online, per WhatsApp, schnell.
          </p>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/bewerbungscoach/${city.slug}`}
                className="px-4 py-2.5 bg-warm-50 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 text-warm-700 text-sm font-medium rounded-xl border border-warm-200 transition-colors shadow-sm"
              >
                Bewerbungscoach in {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
