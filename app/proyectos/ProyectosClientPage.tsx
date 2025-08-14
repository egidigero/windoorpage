"use client"

import { Button } from "@/components/ui/button"
import { Play, X, ChevronRight, Eye, MessageSquare, Phone, MapPin, Mail, Instagram, Facebook, Menu } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function ProyectosClientPage() {
  const [activeFilter, setActiveFilter] = useState("Todas")
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
      thumbnail: "/placeholder.svg?height=300&width=400&text=Ventanales+PVC+Panorámicos",
      description: "Instalación de ventanales panorámicos de PVC con doble vidrio hermético.",
    },
    {
      id: 5,
      title: "Vestidor a Medida Moderno",
      city: "Belgrano, CABA",
      category: "Vestidores y baños",
      videoType: "mp4",
      videoUrl: "/placeholder-video.mp4", // Placeholder MP4
      thumbnail: "/placeholder.svg?height=300&width=400&text=Vestidor+Moderno+a+Medida",
      description: "Vestidor personalizado con isla central y sistema de iluminación LED.",
    },
    {
      id: 6,
      title: "Puertas Interiores Premium",
      city: "Palermo, CABA",
      category: "Puertas",
      videoType: "vimeo",
      videoUrl: "123456789", // Placeholder Vimeo ID
      thumbnail: "/placeholder.svg?height=300&width=400&text=Puertas+Interiores+Premium",
      description: "Puertas de interior con acabado en madera natural y herrajes premium.",
    },
    {
      id: 7,
      title: "Aberturas PVC Cocina Integral",
      city: "Vicente López, Buenos Aires",
      category: "PVC",
      videoType: "youtube",
      videoUrl: "dQw4w9WgXcQ",
      thumbnail: "/placeholder.svg?height=300&width=400&text=Cocina+Integral+PVC",
      description: "Ventanas de PVC para cocina integral con apertura oscilobatiente.",
    },
    {
      id: 8,
      title: "Baño Minimalista Mármol",
      city: "Recoleta, CABA",
      category: "Vestidores y baños",
      videoType: "mp4",
      videoUrl: "/placeholder-video.mp4",
      thumbnail: "/placeholder.svg?height=300&width=400&text=Baño+Minimalista+Mármol",
      description: "Baño minimalista con revestimiento completo en mármol Carrara.",
    },
    {
      id: 9,
      title: "Puertas Corredizas Modernas",
      city: "Núñez, CABA",
      category: "Puertas",
      videoType: "image",
      videoUrl: "/placeholder.svg?height=400&width=600&text=Puertas+Corredizas+Modernas",
      thumbnail: "/placeholder.svg?height=300&width=400&text=Puertas+Corredizas+Modernas",
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
          <img
            src={project.videoUrl || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold tracking-wide text-black">
                WINDOOR
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="hover:opacity-70 transition-all duration-300 font-medium text-black">
                Inicio
              </Link>
              <Link href="/productos" className="hover:opacity-70 transition-all duration-300 font-medium text-black">
                Productos
              </Link>
              <Link href="/#nosotros" className="hover:opacity-70 transition-all duration-300 font-medium text-black">
                Nosotros
              </Link>
              <Link href="/proyectos" className="text-black font-medium">
                Proyectos
              </Link>
              <Link href="/#contacto" className="hover:opacity-70 transition-all duration-300 font-medium text-black">
                Contacto
              </Link>
            </nav>

            {/* Contact Info */}
            <div className="hidden lg:flex items-center space-x-4 text-black">
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
            <button className="md:hidden text-black">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

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
                      <img
                        src={project.thumbnail || "/placeholder.svg"}
                        alt={project.title}
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
                      placeholder="Contanos sobre tu proyecto, qué te gustó de los videos que viste, medidas aproximadas, o cualquier detalle importante..."
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
      </div>

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
                    <Link href="/#nosotros" className="text-gray-400 hover:text-white transition-colors duration-300">
                      Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link href="/proyectos" className="text-gray-400 hover:text-white transition-colors duration-300">
                      Proyectos
                    </Link>
                  </li>
                  <li>
                    <Link href="/#contacto" className="text-gray-400 hover:text-white transition-colors duration-300">
                      Contacto
                    </Link>
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
