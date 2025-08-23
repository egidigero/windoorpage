import type { Metadata } from "next"
import ProyectosClientPage from "./ProyectosClientPage"
export const dynamic = 'force-static'
export const revalidate = 3600

export const metadata: Metadata = {
  title: "Proyectos Realizados - Windoor | Videos y Fotos de Obras Reales",
  description:
    "Descubrí la calidad de nuestro trabajo a través de videos y fotos de proyectos reales en PVC, vestidores, baños y puertas de interior.",
  keywords:
    "proyectos windoor, obras realizadas, videos proyectos, fotos obras, aberturas PVC instaladas, vestidores realizados, baños terminados",
  alternates: { canonical: (process.env.NEXT_PUBLIC_SITE_URL || 'https://windoor.com.ar') + '/proyectos' },
  openGraph: {
    title: "Proyectos Realizados - Windoor",
    description: "Videos y fotos de proyectos reales de aberturas, vestidores y baños",
    url: "https://windoor.com.ar/proyectos",
    images: [ { url: '/images/windoor-hero-bg.jpeg', width: 1200, height: 630, alt: 'Proyectos realizados Windoor' } ]
  },
  twitter: { card: 'summary_large_image', title: 'Proyectos Realizados - Windoor', description: 'Obras reales de aberturas y vestidores', images: ['/images/windoor-hero-bg.jpeg'] }
}

export default function ProyectosPage() {
  return <ProyectosClientPage />
}
