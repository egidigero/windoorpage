"use client"

import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react"
import { LeadBookingForm } from "@/components/booking/LeadBookingForm"
import React from "react"

export default function ContactoSection() {
  const maxDate = (() => { const d = new Date(); d.setMonth(d.getMonth() + 1); return d; })();
  return (
    <section id="contacto" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6">Visitanos</h2>
            <div className="w-24 h-0.5 bg-[#E6D5C3]/20 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Conocé nuestro showroom y descubrí de cerca la calidad que nos distingue. Te esperamos para hacer realidad tu proyecto.
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
                  Te invitamos a conocer nuestro espacio donde podés ver, tocar y experimentar la calidad de nuestros productos. Nuestro equipo te asesorará personalmente para encontrar la solución perfecta.
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
                    <p className="text-gray-600 font-light">Nordelta, Tigre</p>
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
                    <p className="text-gray-600 font-light">info.windooraberturas@gmail.com</p>
                    <p className="text-gray-600 font-light">Respuesta en 24hs</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  onClick={() => { try { window.dispatchEvent(new Event('open-booking-modal')); } catch {} }}
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
                <LeadBookingForm maxDate={maxDate} useCalendarInline />
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

