import type { Metadata } from 'next'
import { Inter, Rubik } from 'next/font/google'
import './globals.css'
import PublicLayout from '@/components/PublicLayout'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/config'

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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${rubik.variable}`}>
      <body className="bg-warm-50 text-warm-900 font-sans antialiased">
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  )
}
