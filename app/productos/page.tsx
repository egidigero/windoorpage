import type { Metadata } from "next"
import ProductosClientPage from "./ProductosClientPage"

export const metadata: Metadata = {
  title: "Productos Premium - Windoor | Aberturas PVC, Vestidores y Puertas",
  description:
    "Descubrí nuestra línea completa de aberturas de PVC, vestidores, baños y puertas de interior. Calidad premium y diseño a medida en Nordelta.",
  keywords: "productos windoor, aberturas PVC, vestidores a medida, puertas interior, baños personalizados, Nordelta",
  openGraph: {
    title: "Productos Premium - Windoor",
    description: "Aberturas de PVC, vestidores, baños y puertas de interior de máxima calidad",
    url: "https://windoor.com.ar/productos",
  },
}

export default function ProductosPage() {
  return <ProductosClientPage />
}
