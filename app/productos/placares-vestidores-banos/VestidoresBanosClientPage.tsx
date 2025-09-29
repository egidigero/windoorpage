"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Ruler, Hammer, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { LeadBookingForm } from "@/components/booking/LeadBookingForm"

export default function VestidoresBanosClientPage() {
  const [showReservationModal] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const projectImages = [
    {
      src: "/images/vestidores-3.jpg",
      alt: "Baño moderno con mesada negra y grifería dorada",
      title: "Baño moderno con mesada negra y grifería dorada",
    },
    {
      src: "/images/vestidores-2.jpg",
      alt: "Vestidor con puertas negras y espejo",
      title: "Vestidor con puertas negras y espejo",
    },
    {
      src: "/images/vestidores-1.jpg",
      alt: "Vestidor de madera claro con isla central",
      title: "Vestidor de madera claro con isla central",
    },
    {
      src: "/images/vestidores-4.jpg",
      alt: "Vestidor premium con estantes iluminados",
      title: "Vestidor premium con estantes iluminados",
    },
    {
      src: "/images/vestidores-6.jpg",
      alt: "Detalle de accesorio extraíble para corbatas en vestidor de madera",
      title: "Accesorio extraíble para corbatas",
    },
    {
      src: "/images/vestidores-5.jpg",
      alt: "Vestidor elegante con tocador, espejo redondo y cortinas de diseño",
      title: "Vestidor elegante con tocador y espejo",
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
            <span className="text-gray-900 font-medium">Placares, Vestidores y baños</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6">Placares, Vestidores y Baños</h1>
            <div className="w-24 h-0.5 bg-[#E6D5C3] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 leading-relaxed font-light mb-12">
              Diseño a medida, materiales premium con foco en funcionalidad diaria.
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6D5C3] rounded-full flex items-center justify-center mx-auto mb-4">
                 <Ruler className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Diseño a Medida</h3>
                <p className="text-sm text-gray-600">Cada espacio único y personalizado</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6D5C3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Hammer className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Materiales Nobles</h3>
                <p className="text-sm text-gray-600">Selección premium de acabados</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6D5C3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Funcionalidad Diaria</h3>
                <p className="text-sm text-gray-600">Pensado para tu rutina</p>
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
                <div key={index} className="group cursor-pointer" onClick={() => { setModalOpen(true); setModalIndex(index); }}>
                  <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                      <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal para ver imagen en grande */}
            {modalOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                onClick={e => {
                  if (e.target === e.currentTarget) setModalOpen(false);
                }}
              >
                <div
                  className="relative max-w-3xl w-full flex flex-col items-center px-4 mx-auto"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    className="absolute top-8 right-8 text-white text-3xl font-bold bg-black/60 rounded-full px-4 py-2 hover:bg-black/80"
                    onClick={e => { e.stopPropagation(); setModalOpen(false); }}
                    aria-label="Cerrar"
                  >
                    &times;
                  </button>
                  <div className="flex items-center justify-center w-full" style={{maxWidth: '90vw', maxHeight: '80vh'}}>
                    <Image
                      src={projectImages[modalIndex].src}
                      alt={projectImages[modalIndex].alt}
                      width={900}
                      height={675}
                      className="rounded-2xl object-contain shadow-2xl"
                      style={{maxWidth: '90vw', maxHeight: '80vh'}}
                    />
                  </div>
                  <h3 className="text-white text-xl mt-4 mb-2 text-center">{projectImages[modalIndex].title}</h3>
                  <div className="flex justify-between w-full mt-2">
                    <button
                      className="text-white bg-black/40 px-4 py-2 rounded-l-full hover:bg-black/70"
                      onClick={e => { e.stopPropagation(); setModalIndex((i) => (i === 0 ? projectImages.length - 1 : i - 1)); }}
                      aria-label="Anterior"
                    >
                      &#8592;
                    </button>
                    <button
                      className="text-white bg-black/40 px-4 py-2 rounded-r-full hover:bg-black/70"
                      onClick={e => { e.stopPropagation(); setModalIndex((i) => (i === projectImages.length - 1 ? 0 : i + 1)); }}
                      aria-label="Siguiente"
                    >
                      &#8594;
                    </button>
                  </div>
                </div>
              </div>
            )}
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
              <LeadBookingForm defaultProductType="placares-vestidores-banos" useCalendarInline maxDate={(() => { const d=new Date(); d.setMonth(d.getMonth()+1); return d; })()} />
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
