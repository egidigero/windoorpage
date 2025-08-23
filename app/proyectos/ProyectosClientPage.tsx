"use client"

import { Button } from "@/components/ui/button"
import { Play, X, ChevronRight, Eye, MessageSquare } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { LeadBookingForm } from "@/components/booking/LeadBookingForm"

export default function ProyectosClientPage() {
  const [activeFilter, setActiveFilter] = useState("Todas")
  const [selectedVideo, setSelectedVideo] = useState<any>(null)

  const projects = [
    {
      id: 1,
      title: "Casa Moderna - Barrio Marinas",
      city: "Tigre, Buenos Aires",
      category: "PVC",
      videoType: "image", // Usando imagen como placeholder para video
      videoUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Aberturas%20colocadas%20en%20barrio%20MARINAS%40puertos_escobar.jpg-dTTdGL5emzuvGcZ5TeCEuTC8S3Yae1.jpeg",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Aberturas%20colocadas%20en%20barrio%20MARINAS%40puertos_escobar.jpg-dTTdGL5emzuvGcZ5TeCEuTC8S3Yae1.jpeg",
      description: "Aberturas de PVC premium con ventanales de piso a techo en casa moderna.",
    },
    {
      id: 2,
      title: "Baño Premium Suite",
      city: "Nordelta, Buenos Aires",
      category: "Vestidores y baños",
      videoType: "image",
      videoUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%C2%BFTe%20gustar%C3%ADa%20que%20tu%20ba%C3%B1o%20se%20vea%20as%C3%ADHacelo%20con%20Windoor.%F0%9F%93%8D%20Remeros%20Plaza%2C%20primer%20piso.%20Local%202006%F0%9F%90%AE.jpg-yKqkqP88fcqoqZVrGWlrbnjTRQveVs.jpeg",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%C2%BFTe%20gustar%C3%ADa%20que%20tu%20ba%C3%B1o%20se%20vea%20as%C3%ADHacelo%20con%20Windoor.%F0%9F%93%8D%20Remeros%20Plaza%2C%20primer%20piso.%20Local%202006%F0%9F%90%AE.jpg-yKqkqP88fcqoqZVrGWlrbnjTRQveVs.jpeg",
      description: "Baño de lujo con vanitory doble y acabados en mármol premium.",
    },
    {
      id: 3,
      title: "Ducha Exclusiva con Ventana",
      city: "Puerto Madero, CABA",
      category: "Vestidores y baños",
      videoType: "image",
      videoUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%C2%BFTe%20gustar%C3%ADa%20que%20tu%20ba%C3%B1o%20se%20vea%20as%C3%ADHacelo%20con%20Windoor.%F0%9F%93%8D%20Remeros%20Plaza%2C%20primer%20piso.%20Local%202006%F0%9F%90%AE%20%282%29.jpg-IAo8a4mP2rYPGSMAa3a8kzF4IuBU7O.jpeg",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%C2%BFTe%20gustar%C3%ADa%20que%20tu%20ba%C3%B1o%20se%20vea%20as%C3%ADHacelo%20con%20Windoor.%F0%9F%93%8D%20Remeros%20Plaza%2C%20primer%20piso.%20Local%202006%F0%9F%90%AE%20%282%29.jpg-IAo8a4mP2rYPGSMAa3a8kzF4IuBU7O.jpeg",
      description: "Ducha premium con revestimiento en mármol y ventana de aluminio negro.",
    },
    {
      id: 4,
      title: "Ventanales Panorámicos PVC",
      city: "San Isidro, Buenos Aires",
      category: "PVC",
      videoType: "youtube",
      videoUrl: "dQw4w9WgXcQ", // Placeholder YouTube ID
      thumbnail:
        "https://images.unsplash.com/photo-1505692794403-1f4873b951d9?auto=format&fit=crop&w=800&q=80",
      description: "Instalación de ventanales panorámicos de PVC con doble vidrio hermético.",
    },
    {
      id: 5,
      title: "Vestidor a Medida Moderno",
      city: "Belgrano, CABA",
      category: "Vestidores y baños",
      videoType: "mp4",
      videoUrl: "/placeholder-video.mp4", // Placeholder MP4
      thumbnail:
        "https://images.unsplash.com/photo-1616627548380-a4e4978e6b24?auto=format&fit=crop&w=800&q=80",
      description: "Vestidor personalizado con isla central y sistema de iluminación LED.",
    },
    {
      id: 6,
      title: "Puertas Interiores Premium",
      city: "Palermo, CABA",
      category: "Puertas",
      videoType: "vimeo",
      videoUrl: "123456789", // Placeholder Vimeo ID
      thumbnail:
        "https://images.unsplash.com/photo-1586105251261-72a756497a12?auto=format&fit=crop&w=800&q=80",
      description: "Puertas de interior con acabado en madera natural y herrajes premium.",
    },
    {
      id: 7,
      title: "Aberturas PVC Cocina Integral",
      city: "Vicente López, Buenos Aires",
      category: "PVC",
      videoType: "youtube",
      videoUrl: "dQw4w9WgXcQ",
      thumbnail:
        "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80",
      description: "Ventanas de PVC para cocina integral con apertura oscilobatiente.",
    },
    {
      id: 8,
      title: "Baño Minimalista Mármol",
      city: "Recoleta, CABA",
      category: "Vestidores y baños",
      videoType: "mp4",
      videoUrl: "/placeholder-video.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      description: "Baño minimalista con revestimiento completo en mármol Carrara.",
    },
    {
      id: 9,
      title: "Puertas Corredizas Modernas",
      city: "Núñez, CABA",
      category: "Puertas",
      videoType: "image",
      videoUrl:
        "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=800&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=800&q=80",
      description: "Sistema de puertas corredizas con rieles ocultos y cierre suave.",
    },
  ]

  const filters = ["Todas", "PVC", "Vestidores y baños", "Puertas"]

  const filteredProjects =
    activeFilter === "Todas" ? projects : projects.filter((project) => project.category === activeFilter)

  const openVideoModal = (project: any) => {
    setSelectedVideo(project)
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-form")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const renderVideoContent = (project: any) => {
    switch (project.videoType) {
      case "youtube":
        return (
          <iframe
            src={`https://www.youtube.com/embed/${project.videoUrl}?autoplay=1`}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )
      case "vimeo":
        return (
          <iframe
            src={`https://player.vimeo.com/video/${project.videoUrl}?autoplay=1`}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )
      case "mp4":
        return <video src={project.videoUrl} className="w-full h-full object-cover" controls autoPlay />
      default:
        return (
          <Image
            src={project.videoUrl || "/placeholder.svg"}
            alt={project.title}
            width={800}
            height={600}
            sizes="100vw"
            className="w-full h-full object-cover"
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header active="proyectos" />

      {/* Add padding to account for fixed header */}
      <div className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-gray-900">
                Inicio
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">Proyectos</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6">Nuestros Proyectos</h1>
              <div className="w-24 h-0.5 bg-[#E6D5C3] mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                Descubrí la calidad de nuestro trabajo a través de videos y fotos de proyectos reales. Cada obra refleja
                nuestro compromiso con la excelencia y el detalle.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-4">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      activeFilter === filter
                        ? "bg-[#E6D5C3] text-gray-900 shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Mostrando <span className="font-semibold">{filteredProjects.length}</span> proyecto
                  {filteredProjects.length !== 1 ? "s" : ""}
                  {activeFilter !== "Todas" && (
                    <span>
                      {" "}
                      de <span className="font-semibold">{activeFilter}</span>
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="group cursor-pointer" onClick={() => openVideoModal(project)}>
                    <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3]">
                      <Image
                        src={project.thumbnail || "/placeholder.svg"}
                        alt={project.title}
                        width={800}
                        height={600}
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <Play className="w-6 h-6 text-gray-900 ml-1" />
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#E6D5C3] text-gray-900 text-xs font-medium rounded-full">
                          {project.category}
                        </span>
                      </div>

                      {/* Video Type Indicator */}
                      <div className="absolute top-4 right-4">
                        <div className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center">
                          {project.videoType === "image" ? (
                            <Eye className="w-4 h-4 text-white" />
                          ) : (
                            <Play className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#8B7355] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{project.city}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No se encontraron proyectos para esta categoría.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">{selectedVideo.title}</h3>
                  <p className="text-gray-600">{selectedVideo.city}</p>
                </div>
                <button onClick={closeVideoModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Video Content */}
              <div className="aspect-video bg-gray-900">{renderVideoContent(selectedVideo)}</div>

              {/* Modal Footer */}
              <div className="p-6 border-t">
                <p className="text-gray-600 mb-6">{selectedVideo.description}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/productos/${selectedVideo.category.toLowerCase().replace(/\s+/g, "-").replace("vestidores-y-baños", "vestidores-banos")}`}
                  >
                    <Button
                      variant="outline"
                      className="border-2 border-gray-300 hover:border-[#E6D5C3] text-gray-700 hover:text-gray-900 font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg bg-transparent w-full sm:w-auto"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver fotos
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      closeVideoModal()
                      scrollToContact()
                    }}
                    className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 w-full sm:w-auto"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Pedir presupuesto
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Form Section */}
        <section id="contact-form" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-light text-gray-900 mb-6">¿Te inspiró algún proyecto?</h2>
                <p className="text-xl text-gray-600 font-light">
                  Contanos tu idea y trabajemos juntos para crear algo único
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg">
                <LeadBookingForm useCalendarInline maxDate={(() => { const d=new Date(); d.setMonth(d.getMonth()+1); return d; })()} />
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
