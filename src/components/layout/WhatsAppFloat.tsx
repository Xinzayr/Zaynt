'use client'

import { useState, useEffect } from 'react'
import { Phone, X, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { generateWhatsAppLink } from '@/lib/utils'

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      lastScrollY = currentScrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    const message = 'Hola, quisiera consultar por un trabajo técnico y su disponibilidad.'
    window.open(generateWhatsAppLink(siteConfig.whatsappGeneral, message), '_blank', 'noopener,noreferrer')
    setIsOpen(false)
  }

  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="fixed bottom-6 right-6 z-50" aria-label="WhatsApp flotante">
      <AnimatePresence>
        {isOpen && !prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="glass-surface absolute bottom-16 right-0 w-72 rounded-2xl p-4 text-white"
            role="dialog"
            aria-label="Opciones de contacto"
          >
            <div className="space-y-3">
              <button
                onClick={handleClick}
                className="w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg bg-slate-100 text-slate-950 hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2"
              >
                <Phone className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span className="font-medium">WhatsApp General</span>
              </button>
              <button
                onClick={() => {
                  const message = 'Hola, quisiera consultar la disponibilidad para un servicio técnico.'
                  window.open(generateWhatsAppLink(siteConfig.whatsappGeneral, message), '_blank', 'noopener,noreferrer')
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver focus-visible:ring-offset-2"
              >
                <MessageSquare className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span className="font-medium">Consultar disponibilidad</span>
              </button>
            </div>
          </motion.div>
        )}
        {isOpen && prefersReducedMotion && (
          <div className="glass-surface absolute bottom-16 right-0 w-72 rounded-2xl p-4 text-white" role="dialog">
            <div className="space-y-3">
              <button
                onClick={handleClick}
                className="w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg bg-slate-100 text-slate-950 hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2"
              >
                <Phone className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span className="font-medium">WhatsApp General</span>
              </button>
              <button
                onClick={() => {
                  const message = 'Hola, quisiera consultar la disponibilidad para un servicio técnico.'
                  window.open(generateWhatsAppLink(siteConfig.whatsappGeneral, message), '_blank', 'noopener,noreferrer')
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver focus-visible:ring-offset-2"
              >
                <MessageSquare className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span className="font-medium">Consultar disponibilidad</span>
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-slate-400 bg-slate-100 text-slate-950 shadow-elevation transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/50',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Cerrar opciones de WhatsApp' : 'Abrir opciones de WhatsApp'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: 0, scale: 0.8 }}
              animate={{ rotate: 45, scale: 1 }}
              exit={{ rotate: 90, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-7 w-7" aria-hidden="true" />
            </motion.div>
          ) : (
            <motion.div
              key="phone"
              initial={{ rotate: -45, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: -90, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Phone className="h-7 w-7" aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}