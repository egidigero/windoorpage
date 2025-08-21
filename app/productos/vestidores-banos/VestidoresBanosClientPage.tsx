"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ContactForm from "@/components/ContactForm"

export default function VestidoresBanosClientPage() {
  const [showReservationModal, setShowReservationModal] = useState(false)

  const projectImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%C2%BFTe%20gustar%C3%ADa%20que%20tu%20ba%C3%B1o%20se%20vea%20as%C3%ADHacelo%20con%20Windoor.%F0%9F%93%8D%20Remeros%20Plaza%2C%20primer%20piso.%20Local%202006%F0%9F%90%AE.jpg-yKqkqP88fcqoqZVrGWlrbnjTRQveVs.jpeg",
      alt: "Baño de lujo con vanitory doble",
      title: "Baño Principal con Vanitory Doble",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%C2%BFTe%20gustar%C3%ADa%20que%20tu%20ba%C3%B1o%20se%20vea%20as%C3%ADHacelo%20con%20Windoor.%F0%9F%93%8D%20Remeros%20Plaza%2C%20primer%20piso.%20Local%202006%F0%9F%90%AE%20%282%29.jpg-IAo8a4mP2rYPGSMAa3a8kzF4IuBU7O.jpeg",
      alt: "Ducha de lujo con ventana",
      title: "Ducha Premium con Ventana",
    },
    {
      src: "/placeholder.svg?height=400&width=600&text=Vestidor+a+medida+moderno",
      alt: "Vestidor a medida moderno",
      title: "Vestidor a Medida",
    },
    {
      src: "/placeholder.svg?height=400&width=600&text=Ba%C3%B1o+minimalista+marmol",
      alt: "Baño minimalista con mármol",
      title: "Baño Minimalista",
    },
    {
      src: "/placeholder.svg?height=400&width=600&text=Vestidor+con+isla+central",
      alt: "Vestidor con isla central",
      title: "Vestidor con Isla Central",
    },
    {
      src: "/placeholder.svg?height=400&width=600&text=Ba%C3%B1o+suite+premium",
      alt: "Baño suite premium",
      title: "Suite Premium",
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
            <span className="text-gray-900 font-medium">Vestidores y baños</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6">Vestidores y baños</h1>
            <div className="w-24 h-0.5 bg-[#E6D5C3] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 leading-relaxed font-light mb-12">
              Diseño a medida, materiales nobles y foco en funcionalidad diaria. Integración estética con la obra y
              plazos confiables.
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6D5C3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gray-900 rounded"></div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Diseño a Medida</h3>
                <p className="text-sm text-gray-600">Cada espacio único y personalizado</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6D5C3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gray-900 rounded-full"></div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Materiales Nobles</h3>
                <p className="text-sm text-gray-600">Selección premium de acabados</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6D5C3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gray-900 rounded-sm"></div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Funcionalidad Diaria</h3>
                <p className="text-sm text-gray-600">Pensado para tu rutina</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6D5C3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gray-900 rounded-lg"></div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Plazos Confiables</h3>
                <p className="text-sm text-gray-600">Entrega en tiempo y forma</p>
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
                Espacios únicos diseñados para tu comodidad y estilo de vida
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
              <ContactForm />
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
