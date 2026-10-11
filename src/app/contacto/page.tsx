'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import Link from 'next/link'
import { Phone, Home, Wrench, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select, type SelectOption } from '@/components/ui/Select'
import { Card } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ContactFormSchema, ContactFormData, sanitizeFormData } from '@/data/schemas'
import { technicians } from '@/data/technicians'
import { buildWhatsAppMessage, generateWhatsAppUrl } from '@/lib/whatsapp'
import { sanitizeInput } from '@/lib/sanitize'

const DEVICE_TYPES = [
  { value: 'mantenimiento_pc', label: 'Mantenimiento de computadora o laptop' },
  { value: 'revision_usado', label: 'Revisión de computadora usada' },
  { value: 'soporte', label: 'Soporte técnico remoto o presencial' },
  { value: 'cableado_utp', label: 'Cableado UTP Cat 5e / Cat 6' },
  { value: 'cctv', label: 'Instalación o configuración de CCTV' },
  { value: 'redes_acceso', label: 'Redes, conectividad o control de acceso' },
  { value: 'deteccion_incendios', label: 'Detección de incendios' },
  { value: 'veyon', label: 'Implementación de Veyon' },
  { value: 'windows_office', label: 'Windows u Office con licencia válida' },
  { value: 'linux', label: 'Linux o capacitación' },
  { value: 'capacitacion_control', label: 'Control parental o capacitación' },
  { value: 'consultoria', label: 'Consultoría informática' },
  { value: 'recuperacion_datos', label: 'Evaluación de recuperación de datos' },
  { value: 'reparacion_mandos', label: 'Reparación o mantenimiento de mandos' },
  { value: 'arduino', label: 'Proyecto o consulta sobre Arduino' },
  { value: 'tutoria_programacion_arduino', label: 'Enseñanza de programación o Arduino' },
  { value: 'otro', label: 'Otro requerimiento' },
] as const satisfies SelectOption[]

const MODALITIES = [
  { value: 'presencial_guayaquil', label: 'Presencial en Guayaquil' },
  { value: 'remoto', label: 'Remoto' },
  { value: 'hibrido', label: 'Híbrido, por coordinar' },
  { value: 'por_confirmar', label: 'Por confirmar' },
] as const satisfies SelectOption[]

const CONTACT_OPTIONS = [
  { value: 'xinzayr', label: 'Xinzayr · Principal · termina en 5959' },
  { value: 'brian-jamel', label: 'Brian Jamel · Secundario · termina en 9187' },
] as const satisfies SelectOption[]

export default function ContactoPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    serviceType: 'mantenimiento_pc',
    contactPerson: 'xinzayr',
    modality: 'por_confirmar',
    description: '',
    termsAcknowledged: false,
    honeypot: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [waUrl, setWaUrl] = useState<string | null>(null)

  const validateField = (name: keyof ContactFormData, value: string | boolean): string | null => {
    const result = ContactFormSchema.shape[name].safeParse(value)
    if (!result.success) {
      return result.error.issues[0].message
    }
    return null
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const sanitized = name === 'phone' ? value.replace(/\D/g, '') : sanitizeInput(value)
    setFormData(prev => ({ ...prev, [name]: sanitized }))
    const error = validateField(name as keyof ContactFormData, sanitized)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    // Honeypot check
    if (formData.honeypot) {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setTimeout(() => setSubmitSuccess(false), 3000)
      return
    }

    const sanitized = sanitizeFormData(formData)
    const result = ContactFormSchema.safeParse(sanitized)

    if (!result.success) {
      const newErrors: Partial<Record<keyof ContactFormData, string>> = {}
      result.error.issues.forEach(issue => {
        const path = issue.path[0] as keyof ContactFormData
        newErrors[path] = issue.message
      })
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    const message = buildWhatsAppMessage(sanitized)
    const recipient = technicians.find((member) => member.id === sanitized.contactPerson)
    const url = generateWhatsAppUrl(message, recipient?.whatsapp)
    setWaUrl(url)

    // Open WhatsApp
    window.open(url, '_blank', 'noopener,noreferrer')
    setSubmitSuccess(true)
    setIsSubmitting(false)

    // Reset form after delay
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        email: '',
        serviceType: 'mantenimiento_pc',
        contactPerson: 'xinzayr',
        modality: 'por_confirmar',
        description: '',
        termsAcknowledged: false,
        honeypot: '',
      })
      setSubmitSuccess(false)
      setWaUrl(null)
    }, 5000)
  }

  return (
    <div className="py-16 md:py-24">
      <Section variant="default" size="lg" aria-labelledby="contact-heading">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <h1 id="contact-heading" className="text-3xl md:text-4xl font-bold text-gray-950 dark:text-white mb-4">
            Contacto
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Cuéntanos qué trabajo necesitas. Confirmamos el catálogo, la modalidad y la disponibilidad antes de coordinar.
          </p>
        </Reveal>

        <div className="max-w-2xl mx-auto">
          {/* Quick WhatsApp button */}
          <Reveal className="mb-8" delay={0.1}>
            <Button
              variant="whatsapp"
              size="lg"
              className="w-full justify-center gap-3"
              onClick={() => {
                const url = generateWhatsAppUrl(
                  buildWhatsAppMessage({
                    name: '',
                    phone: '',
                    serviceType: 'otro',
                    modality: 'por_confirmar',
                    description: 'Hola, quisiera consultar por un servicio informático o técnico.',
                  })
                )
                window.open(url, '_blank', 'noopener,noreferrer')
              }}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Contactar por WhatsApp directamente
            </Button>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              O rellena el formulario para una respuesta más detallada
            </p>
          </Reveal>

          {/* Contact form */}
          <Reveal delay={0.2}>
            <Card className="p-6 md:p-8">
              <form onSubmit={handleSubmit} noValidate className="space-y-6" data-clarity-mask="true">
                {/* Honeypot */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Row 1: Name + Phone */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="label">
                      Nombre <span className="text-slate-300" aria-hidden="true">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      required
                      error={errors.name}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="label">
                      Teléfono <span className="text-slate-300" aria-hidden="true">*</span>
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+593 98 000 0000"
                      required
                      error={errors.phone}
                      disabled={isSubmitting}
                      maxLength={20}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="label">
                    Email (opcional)
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    error={errors.email}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Device type + Modality */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="serviceType" className="label">
                      Servicio que necesitas <span className="text-slate-300" aria-hidden="true">*</span>
                    </label>
                    <Select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                      error={errors.serviceType}
                      disabled={isSubmitting}
                      options={DEVICE_TYPES}
                    />
                  </div>
                  <div>
                    <label htmlFor="modality" className="label">
                      Modalidad preferida
                    </label>
                    <Select
                      id="modality"
                      name="modality"
                      value={formData.modality}
                      onChange={handleChange}
                      error={errors.modality}
                      disabled={isSubmitting}
                      options={MODALITIES}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contactPerson" className="label">
                    Enviar consulta a <span className="text-slate-300" aria-hidden="true">*</span>
                  </label>
                  <Select
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                    error={errors.contactPerson}
                    disabled={isSubmitting}
                    options={CONTACT_OPTIONS}
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Se muestran solo los últimos cuatro dígitos de cada contacto.
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="label">
                    Cuéntanos qué necesitas <span className="text-slate-300" aria-hidden="true">*</span>
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Resume la necesidad y qué ocurrió. Menciona trabajos previos, condiciones conocidas, equipo y resultado que buscas."
                    required
                    error={errors.description}
                    disabled={isSubmitting}
                    rows={5}
                    maxLength={1000}
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 text-right">
                    {formData.description.length}/1000
                  </p>
                </div>

                <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-300">
                    <input
                      id="termsAcknowledged"
                      name="termsAcknowledged"
                      type="checkbox"
                      checked={formData.termsAcknowledged}
                      onChange={(event) => {
                        const accepted = event.target.checked
                        setFormData((previous) => ({ ...previous, termsAcknowledged: accepted }))
                        setErrors((previous) => ({
                          ...previous,
                          termsAcknowledged: validateField('termsAcknowledged', accepted) ?? undefined,
                        }))
                      }}
                      className="mt-1 h-4 w-4 shrink-0 accent-slate-300"
                      aria-invalid={Boolean(errors.termsAcknowledged)}
                      aria-describedby={errors.termsAcknowledged ? 'terms-error' : 'terms-help'}
                    />
                    <span>
                      Confirmo que describí mi requerimiento y leí el{' '}
                      <Link href="/terminos" className="text-slate-200 underline underline-offset-4">
                        aviso de condiciones
                      </Link>{' '}
                      y el{' '}
                      <Link href="/privacidad" className="text-slate-200 underline underline-offset-4">
                        aviso de privacidad
                      </Link>
                      . Entiendo que este envío es una consulta, no la aceptación final de una cotización ni una orden para iniciar el trabajo.
                    </span>
                  </label>
                  <p id="terms-help" className="mt-3 text-xs leading-5 text-slate-400">
                    El alcance, costo, modalidad, materiales, plazos y condiciones se enviarán por escrito para tu revisión. El trabajo solo inicia tras tu aprobación expresa.
                  </p>
                  {errors.termsAcknowledged && (
                    <p id="terms-error" className="mt-2 text-sm font-medium text-slate-200" role="alert">{errors.termsAcknowledged}</p>
                  )}
                </div>

                {/* Submit + WhatsApp link */}
                <div className="space-y-3">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center gap-2"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    <Send className="h-5 w-5" aria-hidden="true" />
                    {isSubmitting ? 'Enviando...' : 'Enviar por WhatsApp'}
                  </Button>

                  {waUrl && (
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Send className="h-5 w-5" aria-hidden="true" />
                      Abrir WhatsApp manualmente
                    </a>
                  )}

                  {submitSuccess && !isSubmitting && (
                    <div className="flex items-center justify-center gap-2 text-slate-300 text-sm">
                      <CheckCircle className="h-5 w-5 text-slate-300" aria-hidden="true" />
                      <span>¡Mensaje preparado! Se ha abierto WhatsApp. Si no se abre, usa el enlace de arriba.</span>
                    </div>
                  )}
                </div>
              </form>
            </Card>
          </Reveal>
        </div>

        {/* Contact info cards */}
        <Reveal delay={0.3} className="mt-16">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Phone className="h-6 w-6 text-slate-600 dark:text-slate-300" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-950 dark:text-white mb-3">WhatsApp</h3>
              <div className="flex flex-col gap-2">
                <a
                  href={generateWhatsAppUrl('Hola, quisiera consultar por un trabajo técnico.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
                >
                  WhatsApp Business · Xinzayr
                </a>
                <a
                  href={generateWhatsAppUrl('Hola Brian Jamel, quisiera consultar por un trabajo técnico.', technicians.find((member) => member.id === 'brian-jamel')?.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
                >
                  WhatsApp · Brian Jamel
                </a>
              </div>
            </Card>
            <Card className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Home className="h-6 w-6 text-slate-600 dark:text-slate-300" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-950 dark:text-white mb-2">Atención presencial</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Solo en Guayaquil, con cita y sujeta a evaluación de seguridad y disponibilidad.
              </p>
            </Card>
            <Card className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Wrench className="h-6 w-6 text-slate-600 dark:text-slate-300" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-950 dark:text-white mb-2">Otros trabajos técnicos</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Consulta qué opciones están incluidas en el catálogo disponible.
              </p>
            </Card>
          </div>
        </Reveal>
      </Section>
    </div>
  )
}