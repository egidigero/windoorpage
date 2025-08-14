import type { Metadata } from "next"
import ProyectosClientPage from "./ProyectosClientPage"

export const metadata: Metadata = {
  title: "Proyectos Realizados - Windoor | Videos y Fotos de Obras Reales",
  description:
    "Descubrí la calidad de nuestro trabajo a través de videos y fotos de proyectos reales en PVC, vestidores, baños y puertas de interior.",
  keywords:
    "proyectos windoor, obras realizadas, videos proyectos, fotos obras, aberturas PVC instaladas, vestidores realizados, baños terminados",
  openGraph: {
    title: "Proyectos Realizados - Windoor",
    description: "Videos y fotos de proyectos reales de aberturas, vestidores y baños",
    url: "https://windoor.com.ar/proyectos",
  },
}

export default function ProyectosPage() {
  return <ProyectosClientPage />
}
