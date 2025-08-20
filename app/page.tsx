"use client"

import { Button } from "@/components/ui/button"
import {
  Calendar,
  Phone,
  MapPin,
  Mail,
  Instagram,
  Facebook,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export default function WindoorHomepage() {
  const { toast } = useToast()
  const [isScrolled, setIsScrolled] = useState(false)
  const [showReservationModal, setShowReservationModal] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showDeCasasBadge, setShowDeCasasBadge] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const generateCalendarDays = () => {
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
      const isPast = date < today.setHours(0, 0, 0, 0)
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
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
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
      {showDeCasasBadge && (
        <div className="fixed md:top-20 md:right-6 bottom-6 right-4 z-40">
          <div className="relative group">
            <div className="bg-slate-800 shadow-lg rounded-lg px-3 py-2 border border-slate-600 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/dcasas-logo.png"
                  alt="D-CASAS"
                  width={100}
                  height={20}
                  className="h-5 w-auto brightness-0 invert"
                />
                <div className="text-center">
                  <div className="text-xs font-medium text-white">Partner</div>
                  <div className="text-[10px] text-slate-300 leading-tight">
                    Aberturas para
                    <br />
                    proyectos premium
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-full md:top-full right-0 mb-3 md:mt-3 md:mb-0 w-80 max-w-[95vw] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
              <div className="bg-slate-800 shadow-2xl rounded-xl border border-slate-600 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start space-x-3">
                    <Image
                      src="/images/dcasas-logo.png"
                      alt="D-CASAS"
                      width={160}
                      height={32}
                      className="h-8 w-auto flex-shrink-0 brightness-0 invert mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white text-sm mb-2">Parte de D-CASAS</h4>
                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        Las aberturas Windoor son parte integral de los proyectos de construcción premium de D-CASAS,
                        garantizando los más altos estándares de calidad.
                      </p>
                      <a
                        href="https://arquitecturadcasas.com.ar/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-medium text-amber-200 hover:text-amber-100 transition-colors duration-300"
                      >
                        Conocer D-CASAS
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowDeCasasBadge(false)
                  }}
                  className="absolute top-2 right-2 p-1.5 hover:bg-slate-700 rounded-full transition-colors duration-300"
                  aria-label="Cerrar"
                >
                  <X className="w-3 h-3 text-slate-400 hover:text-white" />
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
                  className={`absolute top-1 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 top-3" : ""}`}
                ></span>
                <span
                  className={`absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
                ></span>
                <span
                  className={`absolute top-5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 top-3" : ""}`}
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

      {/* Hero Section */}
      <section
        className="relative h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/foto_Mesa_de_trabajo_1_xig9nn.jpg-k4cDKWCcIAos0k47ORXgwbtCyy6tOK.jpeg')`,
        }}
      >
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
              Descubrí la excelencia en aberturas de PVC, placares y vestidores, baños y puertas de interior a medida,
              con diseños personalizados y calidad premium en un espacio único para inspirarte.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                onClick={() => setShowReservationModal(true)}
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

      {/* Nosotros Section */}
      <section id="nosotros" className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6">Nosotros</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                Creamos espacios únicos donde cada detalle refleja nuestra pasión por la excelencia y el diseño
                personalizado.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-3xl lg:text-4xl font-light text-gray-900 leading-tight">
                    Transformamos ideas en <span className="font-medium text-gray-800">realidades excepcionales</span>
                  </h3>
                </div>

                <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
                  <p>
                    En Windoor, cada proyecto nace de una conversación. Escuchamos tus necesidades, entendemos tu visión
                    y la transformamos en espacios que superan expectativas.
                  </p>
                  <p>
                    Nos especializamos en aberturas de PVC, placares y vestidores, baños y puertas de interior a medida,
                    combinando técnicas artesanales con tecnología de vanguardia para lograr acabados impecables.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-[#E6D5C3] rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Diseño Personalizado</h4>
                      <p className="text-gray-600 font-light">
                        Cada proyecto es único, diseñado específicamente para tu espacio y estilo de vida.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-[#E6D5C3] rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Materiales Premium</h4>
                      <p className="text-gray-600 font-light">
                        Seleccionamos cuidadosamente cada material para garantizar durabilidad y belleza.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-[#E6D5C3] rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Experiencia Completa</h4>
                      <p className="text-gray-600 font-light">
                        Desde el primer boceto hasta la instalación final, te acompañamos en cada paso.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - Image */}
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <Image
                    src="/images/windoor-bathroom.jpeg"
                    alt="Interiores personalizados con acabados de máxima calidad"
                    width={1200}
                    height={600}
                    className="w-full h-[600px] object-cover rounded-2xl shadow-xl"
                  />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white text-sm font-light bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
                      Interiores personalizados con acabados de máxima calidad
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visitanos Section with Map */}
      <section id="contacto" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6">Visitanos</h2>
              <div className="w-24 h-0.5 bg-[#E6D5C3]/20 mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                Conocé nuestro showroom y descubrí de cerca la calidad que nos distingue. Te esperamos para hacer
                realidad tu proyecto.
              </p>
            </div>

            {/* Location Info and Map */}
            <div className="grid lg:grid-cols-2 gap-20 items-start mb-20">
              {/* Left Content - Contact Info */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-3xl font-light text-gray-900 leading-tight">
                    Nuestro
                    <span className="font-medium text-gray-800"> showroom</span>
                  </h3>

                  <p className="text-lg text-gray-600 leading-relaxed font-light">
                    Te invitamos a conocer nuestro espacio donde podés ver, tocar y experimentar la calidad de nuestros
                    productos. Nuestro equipo te asesorará personalmente para encontrar la solución perfecta.
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-[#E6D5C3] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-5 h-5 text-gray-900" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Ubicación</h4>
                      <p className="text-gray-600 font-light">Remeros Plaza Shopping</p>
                      <p className="text-gray-600 font-light">Av. Sta. María de las Conchas 4711</p>
                      <p className="text-gray-600 font-light">Rincón de Milberg, B1624 Tigre</p>
                      <p className="text-gray-600 font-light">Provincia de Buenos Aires</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-[#E6D5C3] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-5 h-5 text-gray-900" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Teléfono</h4>
                      <p className="text-gray-600 font-light">+54 11 3042-6971</p>
                      <p className="text-gray-600 font-light">Lun a Vie: 9:00 - 18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-[#E6D5C3] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-5 h-5 text-gray-900" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-600 font-light">info@windoor.com.ar</p>
                      <p className="text-gray-600 font-light">Respuesta en 24hs</p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    onClick={() => setShowReservationModal(true)}
                    size="lg"
                    className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 border-0"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Agendar visita
                  </Button>
                </div>
              </div>

              <div className="order-2 lg:order-2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#E6D5C3]/20 to-transparent rounded-3xl blur-xl"></div>
                  <div className="relative bg-white rounded-3xl p-4 shadow-2xl">
                    <div className="w-full h-80 rounded-2xl overflow-hidden">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4480.895493333115!2d-58.62389082712781!3d-34.406694197745765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bca69fb83732d1%3A0xfa5255b3fee0a006!2sRemeros%20Plaza!5e0!3m2!1ses-419!2sar!4v1755122259682!5m2!1ses-419!2sar"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-2xl"
                        title="Ubicación de Windoor en Remeros Plaza Shopping"
                      />
                    </div>
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-500 font-light italic">
                        Remeros Plaza Shopping - Fácil acceso y estacionamiento disponible
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-20">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-light text-gray-900 mb-4">Contactanos</h3>
                  <p className="text-lg text-gray-600 font-light">
                    Completá el formulario y te contactaremos para asesorarte
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo *</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
                        <input
                          type="tel"
                          required
                          pattern="[0-9]+"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
                          placeholder="Tu número de teléfono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fecha preferida</label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hora preferida</label>
                        <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent">
                          <option value="">Seleccionar hora</option>
                          <option value="09:00">09:00</option>
                          <option value="10:00">10:00</option>
                          <option value="11:00">11:00</option>
                          <option value="12:00">12:00</option>
                          <option value="14:00">14:00</option>
                          <option value="15:00">15:00</option>
                          <option value="16:00">16:00</option>
                          <option value="17:00">17:00</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de cliente *</label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de producto *</label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mensaje / Medidas / Observaciones
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent resize-none"
                        placeholder="Contanos sobre tu proyecto, medidas aproximadas, o cualquier detalle que consideres importante..."
                      />
                    </div>

                    <div className="text-center pt-6">
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-110"
                      >
                        Enviar Consulta
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-center">
              <h3 className="text-2xl font-light text-gray-900 mb-6">Seguinos en redes</h3>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.instagram.com/windoor.aberturas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 hover:bg-[#E6D5C3] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-5 h-5 text-gray-700" />
                </a>
                <a
                  href="https://www.facebook.com/windoor.aberturas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 hover:bg-[#E6D5C3] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="w-5 h-5 text-gray-700" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {/* Logo and Description */}
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-4">WINDOOR</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-6">
                  Especialistas en aberturas de PVC, placares y vestidores, baños y puertas de interior a medida.
                  Transformamos espacios con la más alta calidad y diseño excepcional.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/windoor.aberturas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-[#E6D5C3] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Instagram className="w-4 h-4 text-white hover:text-gray-900" />
                  </a>
                  <a
                    href="https://www.facebook.com/windoor.aberturas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-[#E6D5C3] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Facebook className="w-4 h-4 text-white hover:text-gray-900" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/productos" className="text-gray-400 hover:text-white transition-colors duration-300">
                      Productos
                    </Link>
                  </li>
                  <li>
                    <a href="#nosotros" className="text-gray-400 hover:text-white transition-colors duration-300">
                      Nosotros
                    </a>
                  </li>
                  <li>
                    <Link href="/proyectos" className="text-gray-400 hover:text-white transition-colors duration-300">
                      Proyectos
                    </Link>
                  </li>
                  <li>
                    <a href="#contacto" className="text-gray-400 hover:text-white transition-colors duration-300">
                      Contacto
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Contacto</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>+54 11 3042-6971</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>info@windoor.com.ar</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 mt-1" />
                    <span>
                      Remeros Plaza Shopping
                      <br />
                      Av. Sta. María de las Conchas 4711
                      <br />
                      Rincón de Milberg, B1624 Tigre
                      <br />
                      Provincia de Buenos Aires
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© 2024 Windoor. Todos los derechos reservados.</p>
              <div className="flex space-x-6 mt-4 md:mt-0"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
