"use client"

import Link from "next/link"
import { useState } from "react"
import { Phone, MapPin } from "lucide-react"
import { useScrollPosition } from "@/hooks/use-scroll-position"

interface HeaderProps {
  active?: "inicio" | "productos" | "nosotros" | "proyectos" | "contacto"
}

export default function Header({ active }: HeaderProps) {
  const scrollY = useScrollPosition()
  const isScrolled = active !== "inicio" || scrollY > 50
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const textColor = isScrolled ? "text-black" : "text-white"
  const linkClasses = (id: HeaderProps["active"], color: string) =>
    active === id
      ? `${color} font-medium`
      : `hover:opacity-70 transition-all duration-300 font-medium ${color}`

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className={`text-2xl font-bold tracking-wide ${textColor}`}>
              WINDOOR
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={linkClasses("inicio", textColor)}>
              Inicio
            </Link>
            <Link href="/productos" className={linkClasses("productos", textColor)}>
              Productos
            </Link>
            <Link href="/#nosotros" className={linkClasses("nosotros", textColor)}>
              Nosotros
            </Link>
            <Link href="/proyectos" className={linkClasses("proyectos", textColor)}>
              Proyectos
            </Link>
            <Link href="/#contacto" className={linkClasses("contacto", textColor)}>
              Contacto
            </Link>
          </nav>

          {/* Contact Info */}
          <div className={`hidden lg:flex items-center space-x-4 ${textColor}`}>
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
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${textColor}`}
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute top-1 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 top-3" : ""
                }`}
              ></span>
              <span
                className={`absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`absolute top-5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 top-3" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <nav className="flex flex-col space-y-4 py-4 px-2 rounded-lg bg-white/95 backdrop-blur-md">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${linkClasses("inicio", "text-black")} py-2 px-4 rounded hover:bg-gray-100`}
            >
              Inicio
            </Link>
            <Link
              href="/productos"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${linkClasses("productos", "text-black")} py-2 px-4 rounded hover:bg-gray-100`}
            >
              Productos
            </Link>
            <Link
              href="/#nosotros"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${linkClasses("nosotros", "text-black")} py-2 px-4 rounded hover:bg-gray-100`}
            >
              Nosotros
            </Link>
            <Link
              href="/proyectos"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${linkClasses("proyectos", "text-black")} py-2 px-4 rounded hover:bg-gray-100`}
            >
              Proyectos
            </Link>
            <Link
              href="/#contacto"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${linkClasses("contacto", "text-black")} py-2 px-4 rounded hover:bg-gray-100`}
            >
              Contacto
            </Link>

            <div className="border-t pt-4 mt-4 space-y-2 border-gray-200">
              <div className="flex items-center space-x-2 px-4 py-2 text-black">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+54 11 3042-6971</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 text-black">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Buenos Aires</span>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

