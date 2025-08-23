import type { Metadata } from "next"
import VestidoresBanosClientPage from "./VestidoresBanosClientPage"
export const dynamic = 'force-static'
export const revalidate = 3600

export const metadata: Metadata = {
  title: "Placares, Vestidores y Baños a Medida - Windoor | Diseño Premium Personalizado",
  description:
    "Placares, Vestidores y baños diseñados a medida con materiales nobles y funcionalidad diaria. Integración estética perfecta y plazos confiables en Nordelta.",
  keywords:
    "Placares a medida, vestidores a medida, baños personalizados, diseño a medida, materiales nobles, funcionalidad diaria, Nordelta, baños de lujo, vestidores modernos",
  alternates: { canonical: (process.env.NEXT_PUBLIC_SITE_URL || 'https://windoor.com.ar') + '/productos/placares-vestidores-banos' },
  openGraph: {
    title: "Placares, Vestidores y Baños a Medida - Windoor",
    description: "Diseño a medida con materiales nobles y funcionalidad diaria perfecta",
    url: "https://windoor.com.ar/productos/placares-vestidores-banos",
    images: [ { url: '/images/windoor-bathroom.jpeg', width: 1200, height: 800, alt: 'Vestidores y baños a medida Windoor' } ]
  },
  twitter: { card: 'summary_large_image', title: 'Placares, Vestidores y Baños a Medida - Windoor', description: 'Diseño personalizado con materiales nobles', images: ['/images/windoor-bathroom.jpeg'] }
}

export default function VestidoresBanosPage() {
  return <VestidoresBanosClientPage />
}
