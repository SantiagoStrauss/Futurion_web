"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet"

const navLinks = [
  { name: "Inicio", href: "/" },
  { 
    name: "Servicios", 
    href: "/servicios",
    submenu: [
      { name: "Todos los Servicios", href: "/servicios" },
      { name: "Implementación Odoo", href: "/odoo" }
    ]
  },
  { name: "Casos de Estudio", href: "/casos-de-estudio" },
  { name: "Blog", href: "/blog" },
  { name: "Nosotros", href: "/nosotros" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Variable para definir el color del texto según el scroll
  const textColor = isScrolled ? "text-gray-800" : "text-white"
  const linkColor = isScrolled ? "text-gray-800/90 hover:text-gray-800" : "text-white/90 hover:text-white"

  return (
    <header
      className={`
        fixed left-1/2 top-4 -translate-x-1/2 z-50
        w-[calc(100%-2rem)] max-w-6xl
        px-6 py-3
        flex items-center justify-between
        rounded-full
        transition-all duration-300
        ${
          isScrolled
            ? "shadow-xl backdrop-blur-xl backdrop-saturate-150 border border-white/20 bg-white/50"
            : "bg-transparent border-none shadow-none backdrop-blur-0"
        }
      `}
    >
      {/* Logo o título */}
      <Link href="/" className={`flex items-center ${textColor}`}>
        <img src="/3.png" alt="Futurion Partners Logo" className="h-12 w-12 object-contain mr-2" />
        <span className="text-xl font-serif font-semibold">Futurion Partners</span>
      </Link>

      {/* Navegación en Desktop */}
      <nav className="hidden md:flex items-center space-x-6">
        {navLinks.map((link) => (
          <div 
            key={link.name} 
            className="relative"
            onMouseEnter={() => link.submenu && setActiveDropdown(link.name)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href={link.href}
              className={`${linkColor} transition-colors font-sans flex items-center`}
            >
              {link.name}
              {link.submenu && <ChevronDown className="ml-1 h-4 w-4" />}
            </Link>
            
            {link.submenu && activeDropdown === link.name && (
              <div className="absolute top-full left-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                {link.submenu.map((sublink) => (
                  <Link
                    key={sublink.name}
                    href={sublink.href}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors font-sans"
                  >
                    {sublink.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Botón Desktop */}
      <div className="hidden md:block">
        <Button className="bg-primary hover:bg-primary/80 text-white" asChild>
          <Link href="/contacto">Contactar</Link>
        </Button>
      </div>

      {/* Menú móvil (Sheet) */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className={textColor}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-black text-white border-[#333]">
          <SheetTitle className="sr-only">Menú principal</SheetTitle>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="text-lg font-serif font-medium text-white">
                Futurion Partners
              </Link>
            </div>

            <nav className="flex flex-col space-y-6 mb-auto">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <SheetClose asChild>
                    <Link
                      href={link.href}
                      className="text-lg font-sans text-white/90 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                  
                  {link.submenu && (
                    <div className="ml-4 mt-2 space-y-2">
                      {link.submenu.map((sublink) => (
                        <SheetClose asChild key={sublink.name}>
                          <Link
                            href={sublink.href}
                            className="block text-white/70 hover:text-white transition-colors font-sans"
                          >
                            {sublink.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-[#333]">
              <Button className="w-full bg-red-700 hover:bg-red-800 text-white" asChild>
                <Link href="/contacto">Contactar</Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}