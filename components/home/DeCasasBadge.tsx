"use client"
import Image from "next/image"
import { ArrowRight, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useScrollPosition } from "@/hooks/use-scroll-position"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export function DeCasasBadge() {
  const [showDeCasasBadge, setShowDeCasasBadge] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const isMobile = useIsMobile()
  const [isBadgeOpen, setIsBadgeOpen] = useState(false)
  const scrollY = useScrollPosition()
  const shouldShowBadge = showDeCasasBadge && scrollY < 100

  useEffect(() => setIsMounted(true), [])
  if (!isMounted) return null
  if (!shouldShowBadge) return null
  return (
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
              width={160}
              height={32}
              className="brightness-0 invert"
              style={{ height: "2rem", width: "auto" }}
              priority={false}
            />
            <div className="text-center">
              <div className="text-sm font-semibold text-white">Partner</div>
              <div className="text-[13px] text-slate-300 leading-tight">
                Aberturas para
                <br /> proyectos premium
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
                  width={220}
                  height={44}
                  className="flex-shrink-0 brightness-0 invert mt-1"
                  style={{ height: "2.75rem", width: "auto" }}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white text-lg mb-2">Parte de D-CASAS</h4>
                  <p className="text-base text-slate-300 leading-relaxed mb-3">
                    Las aberturas Windoor son parte integral de los proyectos de construcción premium de D-CASAS,
                    garantizando los más altos estándares de calidad.
                  </p>
                  <a
                    href="https://arquitecturadcasas.com.ar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-base font-semibold text-amber-200 hover:text-amber-100 transition-colors duration-300"
                  >
                    Conocer D-CASAS
                    <ArrowRight className="w-4 h-4 ml-1" />
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
              className="absolute top-3 right-3 p-2 hover:bg-slate-700 rounded-full transition-colors duration-300"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4 text-slate-400 hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
