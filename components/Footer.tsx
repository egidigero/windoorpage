import Link from "next/link"
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react"

interface FooterLink {
  label: string
  href: string
}

interface FooterProps {
  links?: FooterLink[]
  linksTitle?: string
}

export default function Footer({
  links,
  linksTitle = "Enlaces",
}: FooterProps) {
  const defaultLinks: FooterLink[] = [
    { label: "Productos", href: "/productos" },
    { label: "Nosotros", href: "/#nosotros" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Contacto", href: "/#contacto" },
  ]

  const menuLinks = links ?? defaultLinks

  const renderLink = (link: FooterLink) =>
    link.href.startsWith("#") ? (
      <a
        key={link.href}
        href={link.href}
        className="text-gray-400 hover:text-white transition-colors duration-300"
      >
        {link.label}
      </a>
    ) : (
      <Link
        key={link.href}
        href={link.href}
        className="text-gray-400 hover:text-white transition-colors duration-300"
      >
        {link.label}
      </Link>
    )

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
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

            <div>
              <h4 className="text-lg font-semibold mb-4">{linksTitle}</h4>
              <ul className="space-y-2">
                {menuLinks.map((link) => (
                  <li key={link.href}>{renderLink(link)}</li>
                ))}
              </ul>
            </div>

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

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Windoor. Todos los derechos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0"></div>
          </div>
        </div>
      </div>
    </footer>
  )
}

