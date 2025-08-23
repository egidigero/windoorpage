import type { Metadata } from "next"
import ProductosClientPage from "./ProductosClientPage"
export const dynamic = 'force-static'
export const revalidate = 3600

export const metadata: Metadata = {
  title: "Productos Premium - Windoor | Aberturas PVC, Vestidores y Puertas",
  description:
    "Descubrí nuestra línea completa de aberturas de PVC, vestidores, baños y puertas de interior. Calidad premium y diseño a medida en Nordelta.",
  keywords: "productos windoor, aberturas PVC, vestidores a medida, puertas interior, baños personalizados, Nordelta",
  alternates: { canonical: (process.env.NEXT_PUBLIC_SITE_URL || 'https://windoor.com.ar') + '/productos' },
  openGraph: {
    title: "Productos Premium - Windoor",
    description: "Aberturas de PVC, vestidores, baños y puertas de interior de máxima calidad",
    url: "https://windoor.com.ar/productos",
    images: [
      { url: '/images/windoor-hero-bg.jpeg', width: 1200, height: 630, alt: 'Productos Windoor' }
    ]
  },
  twitter: { card: 'summary_large_image', title: 'Productos Premium - Windoor', description: 'Catálogo de aberturas, vestidores, baños y puertas', images: ['/images/windoor-hero-bg.jpeg'] }
}

export default function ProductosPage() {
  return <ProductosClientPage />
}
