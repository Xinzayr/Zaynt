import Link from 'next/link'
import { MessageCircle, MapPin, Clock, Rss } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { generateWhatsAppUrl } from '@/lib/whatsapp'
import { technicians } from '@/data/technicians'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 text-white" role="contentinfo">
      <div className="container-custom py-16 lg:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-bold" aria-label={`${siteConfig.name} - Inicio`}>
              {siteConfig.name}
            </Link>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Emprendimiento colaborativo de servicios informáticos, soporte técnico y capacitación. Cada solicitud se evalúa y cotiza antes de iniciar.
            </p>
          </div>

          <nav aria-label="Enlaces rápidos">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Enlaces</h3>
            <ul className="mt-4 space-y-3">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver rounded"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address aria-label="Información de contacto">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Contacto</h3>
            <ul className="mt-4 space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <a
                  href={generateWhatsAppUrl('Hola, quisiera consultar por un trabajo técnico.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Business · Xinzayr
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <a
                  href={generateWhatsAppUrl('Hola Brian Jamel, quisiera consultar por un trabajo técnico.', technicians.find((member) => member.id === 'brian-jamel')?.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp · Brian Jamel
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span>Zona de atención: Guayaquil, Ecuador</span>
              </li>
            </ul>
          </address>

          <div aria-label="Disponibilidad">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Disponibilidad</h3>
            <ul className="mt-4 space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span>Atención con cita; horarios según disponibilidad</span>
              </li>
              <li>Mantenimiento presencial solo en Guayaquil</li>
              <li>Soporte remoto sujeto al tipo de trabajo</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-end" aria-label="Enlaces legales">
            {siteConfig.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-gray-500 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver rounded"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/privacidad#preferencias-de-privacidad"
              className="text-sm text-gray-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver rounded"
            >
              Preferencias de privacidad
            </Link>
          </nav>
        </div>
        <div className="mt-5 flex flex-wrap justify-end gap-5 text-sm text-gray-500">
          {siteConfig.facebookPageUrl && (
            <a href={siteConfig.facebookPageUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              Facebook
            </a>
          )}
          <Link href="/novedades" className="transition-colors hover:text-white">Novedades</Link>
          <a href={siteConfig.facebookFeedUrl} className="inline-flex items-center gap-2 transition-colors hover:text-white">
            <Rss className="h-4 w-4" aria-hidden="true" />
            RSS
          </a>
        </div>
      </div>
    </footer>
  )
}