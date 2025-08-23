"use client"

import { ArrowRight, X } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useScrollPosition } from "@/hooks/use-scroll-position"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import Footer from "@/components/Footer"
import HeroSection from "@/components/home/HeroSection"
import ServiciosSection from "@/components/home/ServiciosSection"
import ContactoSection from "@/components/home/ContactoSection"
import Header from "@/components/Header"
import { LeadBookingForm } from "@/components/booking/LeadBookingForm"

export default function WindoorHomepage() {
  const [showDeCasasBadge, setShowDeCasasBadge] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const isMobile = useIsMobile()
  const [isBadgeOpen, setIsBadgeOpen] = useState(false)
  const scrollY = useScrollPosition()
  const shouldShowBadge = showDeCasasBadge && scrollY < 100

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Espera a que el componente esté montado para renderizar contenido dependiente de fechas */}
  {!isMounted ? (
        <div />
      ) : (
        <>
          {shouldShowBadge && (
            <div className="fixed md:top-20 md:right-6 bottom-6 right-4 z-40">
              <div className="relative group">
                <div
                  onClick={() => isMobile && setIsBadgeOpen(!isBadgeOpen)}
                  className="bg-slate-800 shadow-lg rounded-xl px-6 py-4 border border-slate-600 hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src="/images/dcasas-logo.png"
                      alt="D-CASAS"
                      width={160} // aumentado de 100 a 160
                      height={32} // aumentado de 20 a 32
                      className="h-8 w-auto brightness-0 invert" // aumentado de h-5 a h-8
                    />
                    <div className="text-center">
                      <div className="text-sm font-semibold text-white">Partner</div> {/* aumentado de text-xs a text-sm y font-medium a font-semibold */}
                      <div className="text-[13px] text-slate-300 leading-tight"> {/* aumentado de text-[10px] a text-[13px] */}
                        Aberturas para
                        <br />
                        proyectos premium
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={cn(
                    "absolute bottom-full md:top-full right-0 mb-3 md:mt-3 md:mb-0 w-[400px] max-w-[98vw] transition-all duration-300 transform z-50",
                    "opacity-0 invisible translate-y-2",
                    "group-hover:opacity-100 group-hover:visible group-hover:translate-y-0",
                    isBadgeOpen && "opacity-100 visible translate-y-0"
                  )}
                >
                  <div className="bg-slate-800 shadow-2xl rounded-2xl border border-slate-600 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <Image
                          src="/images/dcasas-logo.png"
                          alt="D-CASAS"
                          width={220} // aumentado de 160 a 220
                          height={44} // aumentado de 32 a 44
                          className="h-11 w-auto flex-shrink-0 brightness-0 invert mt-1" // aumentado de h-8 a h-11
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white text-lg mb-2"> {/* aumentado de text-sm a text-lg */}
                            Parte de D-CASAS
                          </h4>
                          <p className="text-base text-slate-300 leading-relaxed mb-3"> {/* aumentado de text-xs a text-base */}
                            Las aberturas Windoor son parte integral de los proyectos de construcción premium de D-CASAS,
                            garantizando los más altos estándares de calidad.
                          </p>
                          <a
                            href="https://arquitecturadcasas.com.ar/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-base font-semibold text-amber-200 hover:text-amber-100 transition-colors duration-300" // aumentado de text-xs a text-base y font-medium a font-semibold
                          >
                            Conocer D-CASAS
                            <ArrowRight className="w-4 h-4 ml-1" /> {/* aumentado de w-3 h-3 a w-4 h-4 */}
                          </a>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowDeCasasBadge(false)
                        setIsBadgeOpen(false)
                      }}
                      className="absolute top-3 right-3 p-2 hover:bg-slate-700 rounded-full transition-colors duration-300" // aumentado de top-2 right-2 p-1.5 a top-3 right-3 p-2
                      aria-label="Cerrar"
                    >
                      <X className="w-4 h-4 text-slate-400 hover:text-white" /> {/* aumentado de w-3 h-3 a w-4 h-4 */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* Header */}
          <Header active="inicio" />


          <HeroSection />
          <ServiciosSection />
          <ContactoSection />

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
