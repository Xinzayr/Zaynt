'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm'
          : 'bg-transparent'
      )}
      role="banner"
    >
      <nav className="container-custom" aria-label="Navegación principal">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver focus-visible:ring-offset-2 rounded-md"
            aria-label={`${siteConfig.name} - Inicio`}
          >
            <span className="text-gray-900 dark:text-white">{siteConfig.name}</span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-8">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver focus-visible:ring-offset-2 rounded-md px-2 py-1"
              >
                {item.label}
              </Link>
            ))}
            <Button variant="whatsapp" size="sm" className="hidden sm:inline-flex">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Contactar
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => generateWhatsAppLink(siteConfig.whatsappGeneral, '')}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">WhatsApp</span>
            </Button>
            <button
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950',
            isOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
          )}
          role="navigation"
          aria-label="Menú móvil"
        >
          <div className="flex flex-col gap-2 px-2 pb-4">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="whatsapp"
              className="w-full justify-center mt-2"
              onClick={() => {
                generateWhatsAppLink(siteConfig.whatsappGeneral, '')
                setIsOpen(false)
              }}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Contactar por WhatsApp
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}

function generateWhatsAppLink(phone: string, message: string) {
  const cleanPhone = phone.replace(/\D/g, '')
  const encodedMessage = encodeURIComponent(message)
  window.open(`https://wa.me/${cleanPhone}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer')
}