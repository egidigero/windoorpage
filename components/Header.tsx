"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Phone, MapPin, Menu } from "lucide-react"

interface HeaderProps {
  active?: "inicio" | "productos" | "nosotros" | "proyectos" | "contacto"
}

export default function Header({ active }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const linkClasses = (id: HeaderProps["active"]) =>
    active === id
      ? "text-black font-medium"
      : "hover:opacity-70 transition-all duration-300 font-medium text-black"

  return (
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
            <Link href="/" className={linkClasses("inicio")}>Inicio</Link>
            <Link href="/productos" className={linkClasses("productos")}>
              Productos
            </Link>
            <Link href="/#nosotros" className={linkClasses("nosotros")}>
              Nosotros
            </Link>
            <Link href="/proyectos" className={linkClasses("proyectos")}>
              Proyectos
            </Link>
            <Link href="/#contacto" className={linkClasses("contacto")}>
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
  )
}

