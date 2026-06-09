import type { Metadata } from 'next'
import { Inter, Rubik } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import PublicLayout from '@/components/PublicLayout'
import JsonLd from '@/components/JsonLd'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, WA_LINK } from '@/lib/config'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – Bewerbungsservice`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    types: {
      'application/rss+xml': '/blog/feed.xml',
    },
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  sameAs: [WA_LINK],
  areaServed: { '@type': 'Country', name: 'Deutschland' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${rubik.variable}`}>
      <body className="bg-warm-50 text-warm-900 font-sans antialiased">
        <JsonLd data={organizationJsonLd} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Zum Inhalt springen
        </a>
        <PublicLayout>{children}</PublicLayout>
        <Analytics />
      </body>
    </html>
  )
}
