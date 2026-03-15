import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#A78BFA',
          400: '#7C3AED',
          500: '#6D28D9',
          600: '#4C1D95',
        },
        accent: {
          300: '#93C5FD',
          400: '#3B82F6',
          500: '#2563EB',
        },
        charcoal: {
          800: '#1A1F2E',
          900: '#0D1117',
          950: '#080C12',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
export default config
