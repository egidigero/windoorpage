"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function PuertasInteriorClientPage() {
  const [showReservationModal, setShowReservationModal] = useState(false)

  const projectImages = [
    {
      src: "/placeholder.svg?height=400&width=600&text=Puerta+interior+moderna+blanca",
      alt: "Puerta interior moderna blanca",
      title: "Puerta Moderna Blanca",
    },
    {
      src: "/placeholder.svg?height=400&width=600&text=Puerta+madera+natural+textura",
      alt: "Puerta de madera natural con textura",
      title: "Puerta Madera Natural",
    },
    {
      src: "/placeholder.svg?height=400&width=600&text=Puerta+corrediza+minimalista",
      alt: "Puerta corrediza minimalista",
      title: "Puerta Corrediza",
    },
    {
      src: "/placeholder.svg?height=400&width=600&text=Puerta+vidrio+esmerilado",
      alt: "Puerta con vidrio esmerilado",
      title: "Puerta con Vidrio",
    },
    {
      src: "/placeholder.svg?height=400&width=600&text=Puerta+doble+hoja+elegante",
      alt: "Puerta doble hoja elegante",
      title: "Puerta Doble Hoja",
    },
    {
      src: "/placeholder.svg?height=400&width=600&text=Puerta+placard+integrada",
      alt: "Puerta de placard integrada",
      title: "Puerta Placard Integrada",
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
      <Header active="productos" />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 mt-20">
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
            <span className="text-gray-900 font-medium">Puertas de interior</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6">Puertas de interior</h1>
            <div className="w-24 h-0.5 bg-[#E6D5C3] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 leading-relaxed font-light mb-12">
              Puertas a medida con variedad de texturas y hojas, herrajes resistentes y colocación prolija para un
              cierre perfecto.
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6D5C3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gray-900 rounded"></div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Variedad de Texturas</h3>
                <p className="text-sm text-gray-600">Múltiples acabados y estilos</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6D5C3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gray-900 rounded-full"></div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Herrajes Resistentes</h3>
                <p className="text-sm text-gray-600">Componentes de larga duración</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6D5C3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gray-900 rounded-sm"></div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Colocación Prolija</h3>
                <p className="text-sm text-gray-600">Instalación perfecta garantizada</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6D5C3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gray-900 rounded-lg"></div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Cierre Perfecto</h3>
                <p className="text-sm text-gray-600">Ajuste preciso y silencioso</p>
              </div>
            </div>
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
                Puertas diseñadas para complementar perfectamente cada ambiente
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
      <Footer
        linksTitle="Navegación"
        links={[
          { label: "Inicio", href: "/" },
          { label: "Productos", href: "/productos" },
          { label: "Proyectos", href: "/proyectos" },
          { label: "Nosotros", href: "/#nosotros" },
          { label: "Contacto", href: "/#contacto" },
        ]}
      />
    </div>
  )
}
