"use client"

import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function ProductosClientPage() {
  const [showReservationModal, setShowReservationModal] = useState(false)

  const categories = [
    {
      id: "aberturas-pvc",
      title: "Aberturas de PVC y Aluminio",
      description:
        "Aislación térmica y acústica superior, herrajes de primera línea y colocación profesional. Ideal para obras que exigen eficiencia y terminación premium.",
      image:
        "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=600&q=80",
      alt: "Ventanas de PVC blancas en living moderno",
      features: [
        "Aislación térmica y acústica",
        "Herrajes de primera línea",
        "Colocación profesional",
      ],
    },
    {
      id: "vestidores-banos",
      title: "Vestidores y baños",
      description:
        "Diseño a medida, materiales nobles y foco en funcionalidad diaria. Integración estética con la obra y plazos confiables.",
      image:
        "https://images.unsplash.com/photo-1600618432448-4110be51c650?auto=format&fit=crop&w=600&q=80",
      alt: "Baño con vanitory doble y espejo iluminado",
      features: ["Diseño a medida", "Materiales nobles", "Funcionalidad diaria", "Plazos confiables"],
    },
    {
      id: "puertas-interior",
      title: "Puertas de interior",
      description:
        "Puertas a medida con acabados premium: laqueados, enchapados y melamina.",
      image:
        "https://images.unsplash.com/photo-1586105251261-72a756497a12?auto=format&fit=crop&w=600&q=80",
      alt: "Puerta de interior de madera blanca en pasillo moderno",
      features: ["Variedad de texturas", "Herrajes resistentes", "Colocación prolija", "Cierre perfecto"],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header active="productos" />

      {/* Add padding to account for fixed header */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6">Nuestros Productos</h1>
              <div className="w-24 h-0.5 bg-[#E6D5C3] mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                Descubrí nuestra línea completa de productos premium, diseñados para transformar espacios con la más
                alta calidad y funcionalidad excepcional.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {categories.map((category, index) => (
                  <div key={category.id} className="group">
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={category.image}
                          alt={category.alt}
                          width={800}
                          height={600}
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          priority={index === 0}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">{category.title}</h3>
                        <p className="text-gray-600 leading-relaxed mb-6 font-light">{category.description}</p>

                        {/* Features */}
                        <ul className="space-y-2 mb-8">
                          {category.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                              <div className="w-2 h-2 bg-[#E6D5C3] rounded-full mr-3"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {/* CTA Button */}
                        <Link href={`/productos/${category.id}`}>
                          <Button className="w-full bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg group-hover:scale-105">
                            Ver detalles
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-light text-gray-900 mb-6">¿Necesitás asesoramiento personalizado?</h2>
              <p className="text-xl text-gray-600 mb-8 font-light">
                Nuestro equipo de expertos te ayudará a elegir la solución perfecta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setShowReservationModal(true)}
                  size="lg"
                  className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar visita
                </Button>
                <Link href="/proyectos">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-gray-300 hover:border-[#E6D5C3] text-gray-700 hover:text-gray-900 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg bg-transparent"
                  >
                    Ver proyectos
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
