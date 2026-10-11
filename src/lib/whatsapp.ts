import { siteConfig } from '@/config/site'

export interface WhatsAppMessageParams {
  name: string
  phone: string
  email?: string
  serviceType: string
  modality: string
  description: string
}

const SERVICE_LABELS: Record<string, string> = {
  mantenimiento_pc: 'Mantenimiento de computadoras o laptops',
  revision_usado: 'Revisión de computadora usada',
  soporte: 'Soporte técnico remoto o presencial',
  cableado_utp: 'Cableado UTP Cat 5e / Cat 6',
  cctv: 'CCTV y vigilancia electrónica',
  redes_acceso: 'Redes, conectividad o control de acceso',
  deteccion_incendios: 'Detección de incendios',
  veyon: 'Implementación de Veyon',
  windows_office: 'Windows u Office con licencia válida',
  linux: 'Instalación o capacitación en Linux',
  capacitacion_control: 'Capacitación o control parental',
  consultoria: 'Consultoría informática',
  recuperacion_datos: 'Evaluación de recuperación de datos',
  reparacion_mandos: 'Reparación y mantenimiento de mandos',
  arduino: 'Proyectos o apoyo técnico con Arduino',
  tutoria_programacion_arduino: 'Enseñanza de programación o Arduino',
  otro: 'Otro trabajo técnico',
}

const MODALITY_LABELS: Record<string, string> = {
  presencial_guayaquil: 'Presencial en Guayaquil',
  remoto: 'Remoto',
  hibrido: 'Híbrido (por coordinar)',
  por_confirmar: 'Por confirmar',
}

const MAX_MESSAGE_LENGTH = 4096

export function buildWhatsAppMessage(params: WhatsAppMessageParams): string {
  const lines = [
    `*Nueva consulta técnica - ${siteConfig.name}*`,
    '',
  ]

  if (params.name) {
    lines.push(`*Nombre:* ${params.name}`)
  }

  if (params.phone) {
    lines.push(`*Teléfono:* ${params.phone}`)
  }

  if (params.email) {
    lines.push(`*Email:* ${params.email}`)
  }

  lines.push(
    '',
    `*Tipo de servicio:* ${SERVICE_LABELS[params.serviceType] || params.serviceType}`,
    `*Modalidad:* ${MODALITY_LABELS[params.modality] || params.modality}`,
    '',
    `*Descripción:*`,
    params.description,
    '',
    'Esta es una consulta inicial; no autoriza el inicio del trabajo. Solicito una evaluación y cotización por escrito.',
  )

  lines.push('', `—`, `Enviado desde la web de ${siteConfig.name}`)

  let message = lines.join('\n')

  if (message.length > MAX_MESSAGE_LENGTH) {
    message = message.slice(0, MAX_MESSAGE_LENGTH - 50) + '\n\n[Mensaje truncado por longitud]'
  }

  return message
}

export function generateWhatsAppUrl(message: string, targetPhone?: string): string {
  const phone = targetPhone || siteConfig.whatsappGeneral
  const cleanPhone = phone.replace(/\D/g, '')
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}

export function openWhatsApp(params: WhatsAppMessageParams, targetPhone?: string): void {
  const message = buildWhatsAppMessage(params)
  const url = generateWhatsAppUrl(message, targetPhone)
  window.open(url, '_blank', 'noopener,noreferrer')
}