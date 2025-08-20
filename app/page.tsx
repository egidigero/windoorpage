"use client"

import { Button } from "@/components/ui/button"
import {
  Calendar,
  Phone,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import Footer from "@/components/Footer"
import HeroSection from "@/components/home/HeroSection"
import ServiciosSection from "@/components/home/ServiciosSection"
import ContactoSection from "@/components/home/ContactoSection"

export default function WindoorHomepage() {
  const { toast } = useToast()
  const [isScrolled, setIsScrolled] = useState(false)
  const [showReservationModal, setShowReservationModal] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [currentMonth, setCurrentMonth] = useState<Date | null>(null)
  const [showDeCasasBadge, setShowDeCasasBadge] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const isMobile = useIsMobile()
  const [isBadgeOpen, setIsBadgeOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setCurrentMonth(new Date())
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const generateCalendarDays = () => {
    if (!currentMonth) return []
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const today = new Date()

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)

      const isCurrentMonth = date.getMonth() === month
      const isPast = date.getTime() < today.setHours(0, 0, 0, 0)
      const isWeekend = date.getDay() === 0 || date.getDay() === 6

      days.push({
        date: date,
        day: date.getDate(),
        isCurrentMonth,
        isPast,
        isWeekend,
        dateString: date.toISOString().split("T")[0],
      })
    }

    return days
  }

  const availableTimes = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"]

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const handlePrevMonth = () => {
    if (currentMonth) {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
    }
  }

  const handleNextMonth = () => {
    if (currentMonth) {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
    }
  }

  const handleReservation = () => {
    if (selectedDate && selectedTime) {
      toast({
        title: "Reserva confirmada",
        description: `Reserva confirmada para el ${selectedDate} a las ${selectedTime}`,
      })
      setShowReservationModal(false)
      setSelectedDate("")
      setSelectedTime("")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Espera a que el componente esté montado para renderizar contenido dependiente de fechas */}
      {!isMounted || !currentMonth ? (
        <div />
      ) : (
        <>
          {showDeCasasBadge && (
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
          <header
            className={`fixed left-0 right-0 z-40 transition-all duration-500 ease-in-out top-0 ${
              isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
            }`}
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                  <span
                    className={`text-2xl font-bold tracking-wide transition-colors duration-500 ${
                      isScrolled ? "text-black" : "text-white"
                    }`}
                  >
                    WINDOOR
                  </span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                  <Link
                    href="/productos"
                    className={`hover:opacity-70 transition-all duration-300 font-medium ${
                      isScrolled ? "text-black" : "text-white"
                    }`}
                  >
                    Productos
                  </Link>
                  <Link
                    href="#nosotros"
                    className={`hover:opacity-70 transition-all duration-300 font-medium ${
                      isScrolled ? "text-black" : "text-white"
                    }`}
                  >
                    Nosotros
                  </Link>
                  <Link
                    href="/proyectos"
                    className={`hover:opacity-70 transition-all duration-300 font-medium ${
                      isScrolled ? "text-black" : "text-white"
                    }`}
                  >
                    Proyectos
                  </Link>
                  <Link
                    href="#contacto"
                    className={`hover:opacity-70 transition-all duration-300 font-medium ${
                      isScrolled ? "text-black" : "text-white"
                    }`}
                  >
                    Contacto
                  </Link>
                </nav>

                {/* Contact Info */}
                <div
                  className={`hidden lg:flex items-center space-x-4 transition-colors duration-500 ${
                    isScrolled ? "text-black" : "text-white"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">+54 11 3042-6971</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Buenos Aires</span>
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`md:hidden transition-colors duration-500 ${isScrolled ? "text-black" : "text-white"}`}
                >
                  <div className="relative w-6 h-6">
                    <span
                      className={`absolute top-1 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                        isMobileMenuOpen ? "rotate-45 top-3" : ""
                      }`}
                    ></span>
                    <span
                      className={`absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                        isMobileMenuOpen ? "opacity-0" : ""
                      }`}
                    ></span>
                    <span
                      className={`absolute top-5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                        isMobileMenuOpen ? "-rotate-45 top-3" : ""
                      }`}
                    ></span>
                  </div>
                </button>
              </div>

              {/* Mobile Menu */}
              <div
                className={`md:hidden transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <nav
                  className={`flex flex-col space-y-4 py-4 px-2 rounded-lg ${
                    isScrolled ? "bg-white/95 backdrop-blur-md" : "bg-black/20 backdrop-blur-md"
                  }`}
                >
                  <Link
                    href="/productos"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`hover:opacity-70 transition-all duration-300 font-medium py-2 px-4 rounded ${
                      isScrolled ? "text-black hover:bg-gray-100" : "text-white hover:bg-white/10"
                    }`}
                  >
                    Productos
                  </Link>
                  <Link
                    href="#nosotros"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`hover:opacity-70 transition-all duration-300 font-medium py-2 px-4 rounded ${
                      isScrolled ? "text-black hover:bg-gray-100" : "text-white hover:bg-white/10"
                    }`}
                  >
                    Nosotros
                  </Link>
                  <Link
                    href="/proyectos"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`hover:opacity-70 transition-all duration-300 font-medium py-2 px-4 rounded ${
                      isScrolled ? "text-black hover:bg-gray-100" : "text-white hover:bg-white/10"
                    }`}
                  >
                    Proyectos
                  </Link>
                  <Link
                    href="#contacto"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`hover:opacity-70 transition-all duration-300 font-medium py-2 px-4 rounded ${
                      isScrolled ? "text-black hover:bg-gray-100" : "text-white hover:bg-white/10"
                    }`}
                  >
                    Contacto
                  </Link>

                  <div className={`border-t pt-4 mt-4 space-y-2 ${isScrolled ? "border-gray-200" : "border-white/20"}`}>
                    <div className={`flex items-center space-x-2 px-4 py-2 ${isScrolled ? "text-black" : "text-white"}`}>
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">+54 11 3042-6971</span>
                    </div>
                    <div className={`flex items-center space-x-2 px-4 py-2 ${isScrolled ? "text-black" : "text-white"}`}>
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Buenos Aires</span>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </header>

          {/* Reservation Modal */}
          {showReservationModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Agendar Visita al Showroom</h3>
                  <button
                    onClick={() => setShowReservationModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Cerrar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Calendar */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-gray-900">Seleccionar Fecha</h4>
                      <div className="flex items-center space-x-2">
                        <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-medium min-w-[120px] text-center">
                          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </span>
                        <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                        <div key={day} className="text-xs font-medium text-gray-500 text-center py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {generateCalendarDays().map((day, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            !day.isPast && !day.isWeekend && day.isCurrentMonth && setSelectedDate(day.dateString)
                          }
                          disabled={day.isPast || day.isWeekend || !day.isCurrentMonth}
                          className={`
                        p-2 text-sm rounded transition-colors
                        ${day.isCurrentMonth ? "text-gray-900" : "text-gray-300"}
                        ${day.isPast || day.isWeekend ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"}
                        ${selectedDate === day.dateString ? "bg-[#E6D5C3] text-gray-900 font-medium" : ""}
                      `}
                        >
                          {day.day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Seleccionar Horario</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          disabled={!selectedDate}
                          className={`
                        p-3 text-sm rounded-lg border transition-colors
                        ${!selectedDate ? "cursor-not-allowed opacity-50" : "hover:bg-gray-50"}
                        ${selectedTime === time ? "bg-[#E6D5C3] border-[#E6D5C3] text-gray-900 font-medium" : "border-gray-200"}
                      `}
                        >
                          {time}
                        </button>
                      ))}
                    </div>

                    {selectedDate && selectedTime && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">Resumen de tu visita:</h5>
                        <p className="text-sm text-gray-600">
                          Fecha:{" "}
                          {new Date(selectedDate).toLocaleDateString("es-AR", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-gray-600">Horario: {selectedTime} hs</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Updated contact form with all required fields and validations */}
                <div className="mt-8 pt-6 border-t">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Tus Datos</h4>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                        <input
                          type="text"
                          required
                          placeholder="Tu nombre completo"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                        <input
                          type="tel"
                          required
                          pattern="[0-9]+"
                          placeholder="Tu número de teléfono"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de cliente *</label>
                        <select
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
                        >
                          <option value="">Seleccionar tipo</option>
                          <option value="particular">Particular</option>
                          <option value="profesional">Profesional</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de producto *</label>
                        <select
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
                        >
                          <option value="">Seleccionar producto</option>
                          <option value="aberturas-pvc">Aberturas de PVC</option>
                          <option value="vestidores-banos">Vestidores y baños</option>
                          <option value="puertas-interior">Puertas de interior</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mensaje / Medidas / Observaciones
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Contanos sobre tu proyecto, medidas aproximadas, o cualquier detalle importante..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent resize-none"
                      />
                    </div>
                  </form>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8">
                  <Button variant="outline" onClick={() => setShowReservationModal(false)} className="px-6 py-3">
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleReservation}
                    disabled={!selectedDate || !selectedTime}
                    className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirmar Reserva
                  </Button>
                </div>
              </div>
            </div>
          )}

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
