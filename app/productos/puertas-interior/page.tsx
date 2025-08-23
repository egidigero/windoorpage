import type { Metadata } from "next"
import PuertasInteriorClientPage from "./PuertasInteriorClientPage"
export const dynamic = 'force-static'
export const revalidate = 3600

export const metadata: Metadata = {
  title: "Puertas de Interior a Medida - Windoor | Variedad de Texturas y Herrajes Premium",
  description:
    "Puertas de interior a medida con variedad de texturas y hojas, herrajes resistentes y colocación prolija para un cierre perfecto en Nordelta.",
  keywords:
    "puertas interior, puertas a medida, variedad texturas, herrajes resistentes, colocación prolija, cierre perfecto, Nordelta, puertas modernas",
  alternates: { canonical: (process.env.NEXT_PUBLIC_SITE_URL || 'https://windoor.com.ar') + '/productos/puertas-interior' },
  openGraph: {
    title: "Puertas de Interior a Medida - Windoor",
    description: "Variedad de texturas con herrajes resistentes y colocación prolija perfecta",
    url: "https://windoor.com.ar/productos/puertas-interior",
    images: [ { url: '/images/windoor-showroom.png', width: 1200, height: 800, alt: 'Puertas de interior Windoor' } ]
  },
  twitter: { card: 'summary_large_image', title: 'Puertas de Interior a Medida - Windoor', description: 'Variedad de texturas y herrajes premium', images: ['/images/windoor-showroom.png'] }
}

export default function PuertasInteriorPage() {
  return <PuertasInteriorClientPage />
}
