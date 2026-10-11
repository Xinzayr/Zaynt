import { publicEnv } from './env'

export const siteConfig = {
  name: publicEnv.NEXT_PUBLIC_SITE_NAME,
  url: publicEnv.NEXT_PUBLIC_SITE_URL,
  whatsappGeneral: publicEnv.NEXT_PUBLIC_WHATSAPP_GENERAL,
  whatsappUsername: 'Xinzayr',
  facebookPageUrl: publicEnv.NEXT_PUBLIC_FACEBOOK_PAGE_URL,
  facebookFeedUrl: '/feed.xml',
  navigation: [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Equipo colaborador', href: '/tecnicos' },
    { label: 'Trabajos', href: '/trabajos' },
    { label: 'Contacto', href: '/contacto' },
  ],
  legal: [
    { label: 'Privacidad', href: '/privacidad' },
    { label: 'Términos del servicio', href: '/terminos' },
  ],
  metadata: {
    title: {
      default: 'ZAYNT — Servicios informáticos y técnicos',
      template: '%s | ZAYNT',
    },
    description: 'Soporte informático, mantenimiento, redes, CCTV, capacitación y consultoría técnica según alcance y disponibilidad.',
    keywords: ['soporte informático', 'mantenimiento de computadoras', 'redes', 'CCTV', 'Arduino', 'programación', 'ZAYNT'],
    authors: [{ name: 'ZAYNT' }],
    creator: 'ZAYNT',
    publisher: 'ZAYNT',
    robots: 'index, follow',
    openGraph: {
      type: 'website',
      locale: 'es_EC',
      siteName: 'ZAYNT',
    },
  },
}

export type SiteConfig = typeof siteConfig