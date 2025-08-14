import type { Metadata } from "next"
import VestidoresBanosClientPage from "./VestidoresBanosClientPage"

export const metadata: Metadata = {
  title: "Vestidores y Baños a Medida - Windoor | Diseño Premium Personalizado",
  description:
    "Vestidores y baños diseñados a medida con materiales nobles y funcionalidad diaria. Integración estética perfecta y plazos confiables en Nordelta.",
  keywords:
    "vestidores a medida, baños personalizados, diseño a medida, materiales nobles, funcionalidad diaria, Nordelta, baños de lujo, vestidores modernos",
  openGraph: {
    title: "Vestidores y Baños a Medida - Windoor",
    description: "Diseño a medida con materiales nobles y funcionalidad diaria perfecta",
    url: "https://windoor.com.ar/productos/vestidores-banos",
  },
}

export default function VestidoresBanosPage() {
  return <VestidoresBanosClientPage />
}
