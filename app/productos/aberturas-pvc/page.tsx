import type { Metadata } from "next"
import AberturasPVCClientPage from "./AberturasPVCClientPage"

export const metadata: Metadata = {
  title: "Aberturas de PVC Premium - Windoor | Aislación Térmica Superior",
  description:
    "Aberturas de PVC con aislación térmica y acústica superior, herrajes de primera línea y colocación profesional. Perfiles Dcasas en Nordelta.",
  keywords:
    "aberturas PVC, ventanas PVC, puertas PVC, aislación térmica, herrajes premium, Dcasas, Nordelta, doble vidrio hermético",
  openGraph: {
    title: "Aberturas de PVC Premium - Windoor",
    description: "Aislación térmica y acústica superior con herrajes de primera línea",
    url: "https://windoor.com.ar/productos/aberturas-pvc",
  },
}

export default function AberturasPVCPage() {
  return <AberturasPVCClientPage />
}
