import type { Metadata } from "next"
import AberturasPVCClientPage from "./AberturasPVCClientPage"
export const dynamic = 'force-static'
export const revalidate = 3600

export const metadata: Metadata = {
  title: "Aberturas de PVC Premium - Windoor | Aislación Térmica Superior",
  description:
    "Aberturas de PVC con aislación térmica y acústica superior, herrajes de primera línea y colocación profesional. Perfiles Dcasas en Nordelta.",
  keywords:
    "aberturas PVC, ventanas PVC, puertas PVC, aislación térmica, herrajes premium, Dcasas, Nordelta, doble vidrio hermético",
  alternates: { canonical: (process.env.NEXT_PUBLIC_SITE_URL || 'https://windoor.com.ar') + '/productos/aberturas-pvc' },
  openGraph: {
    title: "Aberturas de PVC Premium - Windoor",
    description: "Aislación térmica y acústica superior con herrajes de primera línea",
    url: "https://windoor.com.ar/productos/aberturas-pvc",
    images: [ { url: '/images/windoor-aberturas-marinas.jpeg', width: 1200, height: 800, alt: 'Aberturas de PVC Windoor' } ]
  },
  twitter: { card: 'summary_large_image', title: 'Aberturas de PVC Premium - Windoor', description: 'Aislación térmica y acústica superior', images: ['/images/windoor-aberturas-marinas.jpeg'] }
}

export default function AberturasPVCPage() {
  return <AberturasPVCClientPage />
}
