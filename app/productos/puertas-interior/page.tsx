import type { Metadata } from "next"
import PuertasInteriorClientPage from "./PuertasInteriorClientPage"

export const metadata: Metadata = {
  title: "Puertas de Interior a Medida - Windoor | Variedad de Texturas y Herrajes Premium",
  description:
    "Puertas de interior a medida con variedad de texturas y hojas, herrajes resistentes y colocación prolija para un cierre perfecto en Nordelta.",
  keywords:
    "puertas interior, puertas a medida, variedad texturas, herrajes resistentes, colocación prolija, cierre perfecto, Nordelta, puertas modernas",
  openGraph: {
    title: "Puertas de Interior a Medida - Windoor",
    description: "Variedad de texturas con herrajes resistentes y colocación prolija perfecta",
    url: "https://windoor.com.ar/productos/puertas-interior",
  },
}

export default function PuertasInteriorPage() {
  return <PuertasInteriorClientPage />
}
