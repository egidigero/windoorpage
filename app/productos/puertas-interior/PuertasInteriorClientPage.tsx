"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Layers, ShieldCheck, Wrench, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { LeadBookingForm } from "@/components/booking/LeadBookingForm"

export default function PuertasInteriorClientPage() {
  const [showReservationModal] = useState(false)

  const projectImages = [
    {
      src: "/images/Puerta1.jpg",
      alt: "Puerta de interior minimalista negra",
      title: "Puerta Pivotante",
    },
    {
      src: "/images/Puerta2.jpg",
      alt: "Puerta de interior blanca",
      title: "Puerta Blanca",
    },
    {
      src: "/images/Puerta3.jpg",
      alt: "Puerta de interior con madera",
      title: "Puerta de interior con madera",
    },
    {
      src: "/images/Puerta4.jpg",
      alt: "Puerta de interior con vidrio",
      title: "Puerta de interior con vidrio",
    }
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
              Puertas a medida con acabados premium: laqueados, enchapados y melamina.
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6D5C3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Variedad de Texturas</h3>
                <p className="text-sm text-gray-600">Múltiples acabados y estilos</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6D5C3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Herrajes Resistentes</h3>
                <p className="text-sm text-gray-600">Componentes de larga duración</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6D5C3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Colocación Prolija</h3>
                <p className="text-sm text-gray-600">Instalación perfecta garantizada</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6D5C3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-gray-900" />
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
                  <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[3/4]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={800}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 rounded-2xl"
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
              <LeadBookingForm defaultProductType="puertas-interior" useCalendarInline maxDate={(() => { const d=new Date(); d.setMonth(d.getMonth()+1); return d; })()} />
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
