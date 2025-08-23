import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { BookingProvider } from "@/components/booking/BookingProvider";
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Windoor - Aberturas y Interiores Personalizados | Nordelta",
  description:
    "Especialistas en aberturas y soluciones de interiores: vestidores, baños, placares y puertas a medida. Showroom en Remeros Plaza, Nordelta. Calidad premium y asesoramiento personalizado.",
  keywords:
    "aberturas PVC, vestidores, baños, puertas interior, Nordelta, Buenos Aires, aluminio, interiores personalizados, placares, showroom",
  authors: [{ name: "Windoor" }],
  creator: "Windoor",
  publisher: "Windoor",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://windoor.com.ar",
    siteName: "Windoor",
  title: "Windoor - Aberturas y Interiores Personalizados",
    description:
      "Especialistas en aberturas y diseño de interiores: vestidores, baños, placares y puertas a medida en Nordelta.",
    images: [
      {
        url: "/images/windoor-hero-bg.jpeg",
        width: 1200,
        height: 630,
        alt: "Windoor Showroom - Aberturas y Interiores",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  title: "Windoor - Aberturas y Interiores Personalizados",
  description: "Especialistas en aberturas y soluciones de interiores: vestidores, baños, placares y puertas en Nordelta.",
    images: ["/images/windoor-hero-bg.jpeg"],
  },
  alternates: {
    canonical: "https://windoor.com.ar",
  },
  category: 'home_improvement',
  other: {
    "geo.region": "AR-B",
    "geo.placename": "Nordelta, Buenos Aires",
    "geo.position": "-34.4208;-58.6413",
    ICBM: "-34.4208, -58.6413",
  },
  generator: 'v0.app',

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        {/* ...otros tags... */}
    {/* Performance preconnects */}
    <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" crossOrigin="anonymous" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    {/* Preload hero image for LCP */}
    <link rel="preload" as="image" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/foto_Mesa_de_trabajo_1_xig9nn.jpg-k4cDKWCcIAos0k47ORXgwbtCyy6tOK.jpeg" />
        {/* Estructured Data / JSON-LD */}
        <script
          type="application/ld+json"
          // Nota: mantener datos clave para Organización, LocalBusiness y WebSite
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://windoor.com.ar' }/#org`,
                  name: 'Windoor',
                  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://windoor.com.ar',
                  logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://windoor.com.ar' }/images/windoor-showroom.png`,
                  sameAs: [
                    'https://www.instagram.com',
                    'https://www.facebook.com'
                  ],
                  contactPoint: [{
                    '@type': 'ContactPoint',
                    contactType: 'customer service',
                    areaServed: 'AR',
                    availableLanguage: ['es']
                  }]
                },
                {
                  '@type': 'LocalBusiness',
                  '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://windoor.com.ar' }/#local`,
                  name: 'Windoor Showroom',
                  image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://windoor.com.ar' }/images/windoor-hero-bg.jpeg`,
                  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://windoor.com.ar',
                  priceRange: '$$-$$$',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Nordelta',
                    addressRegion: 'Buenos Aires',
                    addressCountry: 'AR'
                  },
                  geo: { '@type': 'GeoCoordinates', latitude: -34.4208, longitude: -58.6413 },
                  openingHoursSpecification: [
                    { '@type': 'OpeningHoursSpecification', dayOfWeek: [ 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday' ], opens: '10:00', closes: '19:00' }
                  ],
                  parentOrganization: { '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://windoor.com.ar' }/#org` }
                },
                {
                  '@type': 'WebSite',
                  '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://windoor.com.ar' }/#website`,
                  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://windoor.com.ar',
                  name: 'Windoor',
                  inLanguage: 'es-AR',
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://windoor.com.ar' }/buscar?q={search_term_string}`,
                    'query-input': 'required name=search_term_string'
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} ${montserrat.variable}`}>
        <BookingProvider>
          <main id="main-content" role="main" className="min-h-screen focus:outline-none">
            {children}
          </main>
        </BookingProvider>
        <Toaster />
      </body>
    </html>
  )
}  
