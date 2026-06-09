import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // WhatsApp
        wa: '#25D366',
        'wa-dark': '#1ebe57',
        // Brand – navy-blue inspired by Fritsch but warmer/darker
        brand: {
          50: '#eef3fa',
          100: '#d5e3f4',
          200: '#adc7e9',
          300: '#78a4d6',
          400: '#4a81c0',
          500: '#2c63a8',
          600: '#1c4f8b', // primary
          700: '#173f70',
          800: '#0f2b4e',
          900: '#091a31',
        },
        // Gold accent (premium feel, unique)
        gold: {
          300: '#f5d98a',
          400: '#f0c84a',
          500: '#e8b820',
          600: '#c99910',
        },
        // Warm neutral (not the generic Tailwind gray)
        warm: {
          50: '#fafaf7',
          100: '#f3f3ef',
          200: '#e8e8e2',
          300: '#d4d4cc',
          400: '#ababA0',
          500: '#787870',
          600: '#525248',
          700: '#3a3a32',
          800: '#232318',
          900: '#14140e',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-rubik)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tightest: '-0.07em',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'wa-ping': 'waPing 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        waPing: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.08)', opacity: '0.9' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'brand-sm': '0 2px 8px 0 rgba(28, 79, 139, 0.12)',
        'brand-md': '0 4px 24px 0 rgba(28, 79, 139, 0.18)',
        'gold-glow': '0 0 20px 4px rgba(232, 184, 32, 0.25)',
      },
    },
  },
  plugins: [],
}

export default config
