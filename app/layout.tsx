import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Are You Ready For Her? | Muslim Marriage Readiness Assessment',
  description: 'A free 5-minute assessment for serious Muslim men. Discover your readiness score across 5 pillars and get a personalized report sent to your inbox.',
  openGraph: {
    title: 'Are You Ready For Her?',
    description: 'Before you find the right woman — find out if you\'re the right man.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-charcoal-900 text-white antialiased">
        {children}
      </body>
    </html>
  )
}
