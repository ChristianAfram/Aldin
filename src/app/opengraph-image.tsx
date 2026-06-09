import { ImageResponse } from 'next/og'
import { SITE_NAME } from '@/lib/config'

export const runtime = 'edge'
export const alt = `${SITE_NAME} – Bewerbungsservice: Lebenslauf & Coaching`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background: 'linear-gradient(135deg, #1c4f8b 0%, #0f2b4e 100%)',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 110,
          fontWeight: 800,
          color: '#fafaf7',
          letterSpacing: '-0.04em',
        }}
      >
        Aldin
        <span style={{ color: '#e8b820' }}>.</span>
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 42,
          color: '#fafaf7',
          opacity: 0.92,
          marginTop: 24,
        }}
      >
        Bewerbungsservice – Lebenslauf & Coaching
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 28,
          color: '#e8b820',
          marginTop: 40,
          fontWeight: 600,
        }}
      >
        aldinb.de
      </div>
    </div>,
    size,
  )
}
