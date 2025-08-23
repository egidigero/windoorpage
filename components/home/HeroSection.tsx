"use client"

import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import React from "react"

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden bg-gray-900">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/foto_Mesa_de_trabajo_1_xig9nn.jpg-k4cDKWCcIAos0k47ORXgwbtCyy6tOK.jpeg"
        alt="Showroom de Windoor con ventanales de PVC"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPU1dX7DwAFpwJ+o6a7lwAAAABJRU5ErkJggg=="
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-4 max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
            Descubrí nuestro
            <br />
            <span className="font-light">showroom</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Conoce nuestra línea de productos premium: aberturas y soluciones de interiores (placares, vestidores, baños, puertas),
            vestidores, baños y puertas de interior a medida.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={() => {
                try {
                  const w: any = window;
                  if (typeof w.openBookingModal === 'function') {
                    w.openBookingModal();
                  } else {
                    // Fallback: set flag so provider auto abre y disparar evento
                    w.BOOKING_FORCE_OPEN = true;
                    window.dispatchEvent(new Event('open-booking-modal'));
                  }
                } catch (e) { /* silent */ }
              }}
              size="lg"
              className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 border-0"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Agendá tu visita
            </Button>
            <Link href="/productos">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 hover:border-white text-white hover:text-black hover:bg-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:shadow-lg bg-transparent"
              >
                Ver productos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-16 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12 text-white/80">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#E6D5C3] rounded-full"></div>
              <span className="text-sm font-medium">Asesoramiento personalizado</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#E6D5C3] rounded-full"></div>
              <span className="text-sm font-medium">Productos a medida</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#E6D5C3] rounded-full"></div>
              <span className="text-sm font-medium">Máxima calidad</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}

