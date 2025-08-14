import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Windoor - Aberturas de Aluminio y Interiores Personalizados | Nordelta",
  description:
    "Especialistas en aberturas de PVC, vestidores, baños y puertas de interior. Showroom en Remeros Plaza, Nordelta. Calidad premium y asesoramiento personalizado.",
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
    title: "Windoor - Aberturas de Aluminio y Interiores Personalizados",
    description:
      "Especialistas en aberturas de PVC, vestidores, baños y puertas de interior. Showroom en Remeros Plaza, Nordelta.",
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
    title: "Windoor - Aberturas de Aluminio y Interiores Personalizados",
    description: "Especialistas en aberturas de PVC, vestidores, baños y puertas de interior. Showroom en Nordelta.",
    images: ["/images/windoor-hero-bg.jpeg"],
  },
  alternates: {
    canonical: "https://windoor.com.ar",
  },
  other: {
    "geo.region": "AR-B",
    "geo.placename": "Nordelta, Buenos Aires",
    "geo.position": "-34.4208;-58.6413",
    ICBM: "-34.4208, -58.6413",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} ${montserrat.variable}`}>{children}</body>
    </html>
  )
}
