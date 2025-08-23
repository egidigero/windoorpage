import dynamic from "next/dynamic"
import Footer from "@/components/Footer"
import HeroSection from "@/components/home/HeroSection"
import Header from "@/components/Header"

// Client wrapper to defer badge (no effect on server component constraints)
const DeferDeCasasBadge = dynamic(() => import("@/components/home/DeCasasBadge").then(m => m.DeCasasBadge), { ssr: true })

const ServiciosSection = dynamic(() => import("@/components/home/ServiciosSection"), { ssr: true, loading: () => <div className="min-h-[400px] animate-pulse" /> })
const ContactoSection = dynamic(() => import("@/components/home/ContactoSection"), { ssr: true, loading: () => <div className="min-h-[400px] animate-pulse" /> })

export default function WindoorHomepage() {
  return (
    <div className="min-h-screen bg-white">
  <DeferDeCasasBadge />
      <Header active="inicio" />
      <HeroSection />
      <ServiciosSection />
      <ContactoSection />
      <Footer
        links={[
          { label: "Productos", href: "/productos" },
          { label: "Nosotros", href: "#nosotros" },
          { label: "Proyectos", href: "/proyectos" },
          { label: "Contacto", href: "#contacto" },
        ]}
      />
    </div>
  )
}
