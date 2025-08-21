"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { useState, useEffect } from "react"
import { useScrollPosition } from "@/hooks/use-scroll-position"
import { useToast } from "@/hooks/use-toast"
import Footer from "@/components/Footer"
import HeroSection from "@/components/home/HeroSection"
import ServiciosSection from "@/components/home/ServiciosSection"
import ContactoSection from "@/components/home/ContactoSection"
import Header from "@/components/Header"
import ReservationModal from "@/components/ReservationModal"
import DeCasasBadge from "@/components/DeCasasBadge"

export default function WindoorHomepage() {
  const { toast } = useToast()
  const [showReservationModal, setShowReservationModal] = useState(false)
  const [showDeCasasBadge, setShowDeCasasBadge] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const scrollY = useScrollPosition()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {!isMounted ? (
        <div />
      ) : (
        <>
          <DeCasasBadge
            show={showDeCasasBadge && scrollY < 100}
            onClose={() => setShowDeCasasBadge(false)}
          />

          {/* Floating Widgets */}
          <div className="fixed bottom-6 left-6 z-50">
            <Button
              onClick={() => setShowReservationModal(true)}
              className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Visita
            </Button>
          </div>

          {/* Header */}
          <Header active="inicio" />

          <ReservationModal
            open={showReservationModal}
            onClose={() => setShowReservationModal(false)}
            onReservation={(date, time) =>
              toast({
                title: "Reserva confirmada",
                description: `Reserva confirmada para el ${date} a las ${time}`,
              })
            }
          />

          <HeroSection onShowReservation={() => setShowReservationModal(true)} />
          <ServiciosSection />
          <ContactoSection onShowReservation={() => setShowReservationModal(true)} />

          {/* Footer */}
          <Footer
            links={[
              { label: "Productos", href: "/productos" },
              { label: "Nosotros", href: "#nosotros" },
              { label: "Proyectos", href: "/proyectos" },
              { label: "Contacto", href: "#contacto" },
            ]}
          />
        </>
      )}
    </div>
  )
}
