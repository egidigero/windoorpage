"use client";
import { Button } from "@/components/ui/button";
import { Play, ChevronRight, Eye, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LeadBookingForm } from "@/components/booking/LeadBookingForm";

export default function ProyectosClientPage() {
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const projects = [
    {
      id: 1,
      title: "Puerta Pivotante Única",
      city: "WINDOOR - Innovación en Aberturas",
      category: "Puertas",
      videoType: "mp4",
      videoUrl: "/video-proyect/Proyecto 2.mp4",
  thumbnail: "/video-proyect/Proyecto2_thumb.jpg",
      description: "¿Buscás una puerta única? Mirá esta pivotante negra de gran tamaño y diseño minimalista.",
    },
    {
      id: 2,
      title: "Showroom y Vestidores Personalizados",
      city: "WINDOOR - Showroom y Soluciones a Medida",
      category: "Vestidores y baños",
      videoType: "mp4",
      videoUrl: "/video-proyect/Proyecto 5.mp4",
  thumbnail: "/video-proyect/Proyecto5_thumb.jpg",
      description: "Recorré nuestro showroom y descubrí vestidores y placares 100% personalizados.",
    },
    {
      id: 3,
      title: "Diferenciales WINDOOR en Vestidores",
      city: "WINDOOR - Calidad y Diseño",
      category: "Vestidores y baños",
      videoType: "mp4",
      videoUrl: "/video-proyect/Proyecto 4.mp4",
  thumbnail: "/video-proyect/Proyecto4_thumb.jpg",
      description: "Vestidores modulares, herrajes Hafele y detalles premium. Calidad y diseño únicos.",
    },
    {
      id: 4,
      title: "Aberturas de Gran Apertura en Obra",
      city: "WINDOOR - Obras y Proyectos",
      category: "PVC",
      videoType: "mp4",
      videoUrl: "/video-proyect/Proyecto 1.mp4",
  thumbnail: "/video-proyect/Proyecto1_thumb.jpg",
      description: "Sistemas plegables y apilables para unificar interior y exterior. Máxima apertura y vista.",
    },
  ];
  const filters = ["Todas", "PVC", "Vestidores y baños", "Puertas"];
  const filteredProjects = activeFilter === "Todas" ? projects : projects.filter((project) => project.category === activeFilter);

  const openVideoModal = (project: any) => setSelectedVideo(project);
  const closeVideoModal = () => setSelectedVideo(null);
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-form");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header active="proyectos" />
      <div className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-gray-900">Inicio</Link>
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
                Descubrí la calidad de nuestro trabajo a través de videos y fotos de proyectos reales. Cada obra refleja nuestro compromiso con la excelencia y el detalle.
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
                    <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[9/16]">
                      <video
                        src={project.videoUrl}
                        poster={project.thumbnail}
                        className="w-full h-full object-cover rounded-2xl bg-black"
                        style={{ aspectRatio: '9/16' }}
                        preload="metadata"
                        muted
                        playsInline
                        tabIndex={-1}
                        onMouseOver={e => (e.currentTarget as HTMLVideoElement).play()}
                        onMouseOut={e => (e.currentTarget as HTMLVideoElement).pause()}
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
                    </div>
                    {/* Project Info */}
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#8B7355] transition-colors">
                        {project.title}
                      </h3>
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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={closeVideoModal}>
              <div
                className="relative flex flex-col items-center justify-center max-h-[98vh] max-w-[min(100vw,420px)] w-full aspect-[9/16] bg-white/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/60"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 z-10 text-white text-3xl font-bold bg-black/60 rounded-full px-4 py-2 hover:bg-black/80 transition-colors"
                  onClick={closeVideoModal}
                  aria-label="Cerrar"
                >
                  &times;
                </button>
                <div className="flex-1 flex items-center justify-center w-full h-full">
                  <video
                    src={selectedVideo.videoUrl}
                    poster={selectedVideo.thumbnail}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    className="w-full h-full max-h-[80vh] max-w-[min(100vw,420px)] object-contain bg-transparent rounded"
                    style={{ aspectRatio: '9/16', backgroundColor: 'transparent' }}
                  />
                </div>
                <div className="p-4 w-full">
                  <h2 className="text-lg font-semibold mb-1">{selectedVideo.title}</h2>
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
      <Footer />
    </div>
  );
}
