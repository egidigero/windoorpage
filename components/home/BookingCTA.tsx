"use client"

import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import React from "react"

export function BookingCTA() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
      <Button
        onClick={() => {
          try {
            const w: any = window
            if (typeof w.openBookingModal === "function") {
              w.openBookingModal()
            } else {
              w.BOOKING_FORCE_OPEN = true
              window.dispatchEvent(new Event("open-booking-modal"))
            }
          } catch {}
        }}
        size="lg"
        className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 border-0"
      >
        <Calendar className="w-5 h-5 mr-2" />
        Agendá tu visita
      </Button>
      <Link href="/productos" prefetch>
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
  )
}
