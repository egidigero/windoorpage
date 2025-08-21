"use client"

import Image from "next/image"
import React from "react"

export default function ServiciosSection() {
  return (
    <section id="nosotros" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6">Nosotros</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Creamos productos únicos donde cada detalle refleja nuestra pasión por la excelencia y el diseño
              personalizado.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-3xl lg:text-4xl font-light text-gray-900 leading-tight">
                  Transformamos ideas en{" "}
                  <span className="font-medium text-gray-800">realidades excepcionales</span>
                </h3>
              </div>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
                <p>
                  En Windoor, cada producto nace de una conversación. Escuchamos tus necesidades, entendemos tu visión y la
                  transformamos en creaciones que superan expectativas.
                </p>
                <p>
                  Nos especializamos en aberturas de PVC y aluminio, placares, vestidores, baños y puertas de interior a
                  medida, combinando técnicas artesanales con tecnología de vanguardia para lograr acabados impecables.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-[#E6D5C3] rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Diseño Personalizado</h4>
                    <p className="text-gray-600 font-light">
                      Cada producto es único, diseñado específicamente para tu espacio y estilo de vida.
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
                  sizes="(min-width: 1024px) 50vw, 100vw"
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
  )
}

