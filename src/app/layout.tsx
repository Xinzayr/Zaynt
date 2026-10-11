import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import { publicEnv } from '@/config/env'
import { siteConfig } from '@/config/site'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { PrivacyConsent } from '@/components/layout/PrivacyConsent'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  ...siteConfig.metadata,
  metadataBase: new URL(publicEnv.NEXT_PUBLIC_SITE_URL),
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    ...siteConfig.metadata.openGraph,
    url: publicEnv.NEXT_PUBLIC_SITE_URL,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-[#090a0c] text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-white text-gray-900 rounded-lg shadow-lg font-medium"
        >
          Saltar al contenido principal
        </a>
        <Navbar />
        <main id="main-content" className="min-h-[calc(100vh-64px)] pt-16">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <PrivacyConsent />
      </body>
    </html>
  )
}