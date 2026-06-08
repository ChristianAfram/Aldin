'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { WA_LINK } from '@/lib/config'

const navLinks = [
  { href: '/',                      label: 'Home' },
  { href: '/produkte',              label: 'Produkte' },
  { href: '/bewerbungscoach',       label: 'Bewerbungscoach' },
  { href: '/blog',                  label: 'Blog' },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname              = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/96 backdrop-blur-md border-b border-warm-200 shadow-brand-sm'
          : 'bg-white/95 backdrop-blur-sm border-b border-warm-200'
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display font-black text-xl tracking-tighter text-warm-900">
          Aldin<span className="text-brand-600">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'text-brand-600'
                  : 'text-warm-500 hover:text-warm-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-wa-btn"
            className="ml-2 bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-brand-sm"
          >
            Anfragen
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 -mr-2 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
        >
          <span className={`block w-5 h-0.5 bg-warm-800 mb-1.5 transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-warm-800 mb-1.5 transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-warm-800 transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-200 ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="border-t border-warm-200 bg-white px-5 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href ? 'text-brand-600' : 'text-warm-700'
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-600 text-white px-5 py-3 rounded-xl text-sm font-semibold text-center"
          >
            Auf WhatsApp anfragen
          </a>
        </div>
      </div>
    </nav>
  )
}
