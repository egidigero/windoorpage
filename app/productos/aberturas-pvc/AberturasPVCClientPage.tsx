"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AberturasPVCClientPage() {
  const [showReservationModal, setShowReservationModal] = useState(false)

  const projectImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Aberturas%20colocadas%20en%20barrio%20MARINAS%40puertos_escobar.jpg-dTTdGL5emzuvGcZ5TeCEuTC8S3Yae1.jpeg",
      alt: "Aberturas de PVC en Barrio Marinas",
      title: "Casa Moderna - Barrio Marinas",
    },
    {
      src: "/placeholder.svg?height=400&width=600&text=Ventana+PVC+doble+vidrio",
      alt: "Ventana PVC con doble vidrio",
      title: "Ventana con Doble Vidrio Hermético",
    },
    {
      src: "/placeholder.svg?height=400&width=600&text=Puerta+balcon+PVC+premium",
      alt: "Puerta balcón PVC premium",
      title: "Puerta Balcón Premium",
    },
    {
      src: "/placeholder.svg?height=400&width=600&text=Ventanal+panoramico+PVC",
      alt: "Ventanal panorámico PVC",
      title: "Ventanal Panorámico",
    },
    {
      src: "/placeholder.svg?height=400&width=600&text=Abertura+PVC+cocina",
      alt: "Abertura PVC para cocina",
      title: "Ventana de Cocina",
    },
    {
      src: "/placeholder.svg?height=400&width=600&text=Puerta+entrada+PVC",
      alt: "Puerta de entrada PVC",
      title: "Puerta de Entrada Reforzada",
    },
  ]

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-form")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              WINDOOR
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Inicio
              </Link>
              <Link href="/productos" className="text-gray-900 font-medium">
                Productos
              </Link>
              <Link href="/proyectos" className="text-gray-600 hover:text-gray-900 transition-colors">
                Proyectos
              </Link>
              <Link href="/#nosotros" className="text-gray-600 hover:text-gray-900 transition-colors">
                Nosotros
              </Link>
              <Link href="/#contacto" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contacto
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/productos" className="hover:text-gray-900">
              Productos
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Aberturas de PVC</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6">Aberturas de PVC</h1>
            <div className="w-24 h-0.5 bg-[#E6D5C3] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 leading-relaxed font-light mb-12">
              Aislación térmica y acústica superior, herrajes de primera línea y colocación profesional. Ideal para
              obras que exigen eficiencia y terminación premium.
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6D5C3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gray-900 rounded"></div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Aislación Térmica</h3>
                <p className="text-sm text-gray-600">Máximo confort en todas las estaciones</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6D5C3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gray-900 rounded-full"></div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Herrajes Premium</h3>
                <p className="text-sm text-gray-600">Componentes de primera línea</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6D5C3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gray-900 rounded-sm"></div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Colocación Profesional</h3>
                <p className="text-sm text-gray-600">Instalación perfecta garantizada</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6D5C3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gray-900 rounded-lg"></div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Garantía Extendida</h3>
                <p className="text-sm text-gray-600">Respaldo total en tu inversión</p>
              </div>
            </div>

            {/* Dcasas Badge */}
          </div>
        </div>
      </section>

      {/* Simple Photo Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-gray-900 mb-6">Galería de Fotos</h2>
              <p className="text-xl text-gray-600 font-light">
                Descubrí la calidad y versatilidad de nuestras aberturas de PVC
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectImages.map((image, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3]">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                      <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-gray-900 mb-6">Pedí tu Presupuesto</h2>
              <p className="text-xl text-gray-600 font-light">
                Contanos sobre tu proyecto y te enviaremos una cotización personalizada
              </p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
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
                    className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    Enviar Consulta
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed CTA Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={scrollToContact}
          className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Pedir presupuesto
        </Button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">WINDOOR</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Nos especializamos en aberturas de PVC, placares y vestidores, baños y puertas de interior a medida,
                combinando técnicas artesanales con tecnología de vanguardia para lograr acabados impecables.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/windoor.aberturas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Navegación</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/productos" className="text-gray-300 hover:text-white transition-colors">
                    Productos
                  </Link>
                </li>
                <li>
                  <Link href="/proyectos" className="text-gray-300 hover:text-white transition-colors">
                    Proyectos
                  </Link>
                </li>
                <li>
                  <Link href="/#nosotros" className="text-gray-300 hover:text-white transition-colors">
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/#contacto" className="text-gray-300 hover:text-white transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-gray-300">
                <p>Remeros Plaza Shopping</p>
                <p>Av. Sta. María de las Conchas 4711</p>
                <p>Rincón de Milberg, B1624 Tigre</p>
                <p>Provincia de Buenos Aires</p>
                <p className="pt-2">
                  <a href="tel:+5491234567890" className="hover:text-white transition-colors">
                    +54 9 11 2345-6789
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Windoor. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
