import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://reboot.studio'),
  title: {
    default: 'REBOOT | Soluciones y Automatizaciones Digitales',
    template: '%s | REBOOT Studio'
  },
  description: 'Transformamos la manera en que trabajas. Soluciones digitales y automatizaciones a medida para negocios que buscan crecer sin complicaciones.',
  keywords: [
    'automatización digital',
    'soluciones digitales',
    'automatización de procesos',
    'eficiencia empresarial',
    'transformación digital',
    'herramientas para negocios',
    'optimización de procesos',
    'automatización para pymes',
    'desarrollo de software a medida',
    'productividad empresarial',
    'REBOOT studio'
  ],
  authors: [{ name: 'REBOOT Studio' }],
  creator: 'REBOOT Studio',
  publisher: 'REBOOT Studio',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://reboot.studio',
    siteName: 'REBOOT Studio',
    title: 'REBOOT | Soluciones y Automatizaciones Digitales',
    description: 'Transformamos la manera en que trabajas. Soluciones digitales y automatizaciones a medida para negocios que buscan crecer sin complicaciones.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'REBOOT Studio - Soluciones Digitales'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'REBOOT | Soluciones y Automatizaciones Digitales',
    description: 'Transformamos la manera en que trabajas. Soluciones digitales y automatizaciones a medida.',
    images: ['/og-image.jpg'],
    creator: '@rebootstudio'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://reboot.studio',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0d0d12' },
    { media: '(prefers-color-scheme: light)', color: '#0d0d12' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${geistMono.variable} bg-background`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'REBOOT Studio',
              description: 'Estudio de soluciones y automatizaciones digitales',
              url: 'https://reboot.studio',
              logo: 'https://reboot.studio/logo.png',
              sameAs: [
                'https://twitter.com/rebootstudio',
                'https://linkedin.com/company/rebootstudio',
                'https://instagram.com/rebootstudio'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                availableLanguage: ['Spanish', 'English']
              },
              offers: {
                '@type': 'AggregateOffer',
                description: 'Soluciones digitales y automatizaciones a medida'
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'REBOOT Studio',
              url: 'https://reboot.studio',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://reboot.studio/buscar?q={search_term_string}'
                },
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
