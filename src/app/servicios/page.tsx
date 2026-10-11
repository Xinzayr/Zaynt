import { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { services } from '@/data/services'
import { technicians } from '@/data/technicians'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { generateWhatsAppUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Soporte informático, mantenimiento, cableado, CCTV, sistemas, capacitación y consultoría, sujetos a evaluación.',
}

const categories = [...new Set(services.map((service) => service.category))]

export default function ServiciosPage() {
  const servicesByCategory = categories.map((cat) => ({
    category: cat,
    items: services
      .filter((service) => service.category === cat)
      .sort((a, b) => a.order - b.order)
      .map((service) => ({
        ...service,
        assignedTechnician: technicians.find((member) => member.id === service.technicianId),
      })),
  })).filter((g) => g.items.length > 0)

  return (
    <div className="py-8">
      <Section variant="default" size="lg" aria-labelledby="services-heading">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <h1 id="services-heading" className="text-3xl md:text-4xl font-bold text-gray-950 dark:text-white mb-4">
            Servicios informáticos y técnicos
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            ZAYNT es un emprendimiento colaborativo en crecimiento. ZAYNT Solutions identifica su línea de servicios informáticos; el catálogo también incluye áreas de trabajo de sus colaboradores. No implica disponibilidad, certificación o resultado garantizados: cada servicio se evalúa y cotiza individualmente.
          </p>
        </Reveal>

        {servicesByCategory.map((group, groupIndex) => (
          <RevealItem key={group.category} index={groupIndex} stagger={0.15}>
            <div className="mb-16 last:mb-0">
              <h2 className="text-2xl font-semibold text-gray-950 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-silver/20 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-gray-700 dark:text-gray-300" aria-hidden="true" />
                </span>
                {group.category}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((service, index) => (
                  <RevealItem key={service.id} index={index} stagger={0.08}>
                    <Card hover variant="elevated" className="h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          {service.featured && (
                            <span className="text-xs px-2 py-0.5 rounded bg-silver/20 text-gray-700 dark:text-gray-300">
                              Destacado
                            </span>
                          )}
                          {service.name}
                        </CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium text-gray-950 dark:text-white">
                            Presencial en Guayaquil o remoto, según evaluación
                          </span>
                        </div>
                        <a
                          href={generateWhatsAppUrl(
                            `Hola, quisiera consultar la disponibilidad del servicio: ${service.name}.`,
                            service.assignedTechnician?.whatsapp
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-start gap-2 rounded-lg bg-transparent px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver focus-visible:ring-offset-2 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                          Consultar disponibilidad
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </CardContent>
                    </Card>
                  </RevealItem>
                ))}
              </div>
            </div>
          </RevealItem>
        ))}
      </Section>

      <Section variant="muted" size="md" aria-labelledby="warranty-heading">
        <Reveal className="text-center max-w-2xl mx-auto">
          <h2 id="warranty-heading" className="text-2xl md:text-3xl font-bold text-gray-950 dark:text-white mb-4">
            Evaluación, ubicación y seguridad
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            El mantenimiento presencial a domicilio se coordina únicamente dentro de Guayaquil, con cita, y sujeto a una evaluación de seguridad. Fuera de esa zona se ofrecen consultas, capacitación y asistencia remota cuando el trabajo lo permita.
          </p>
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="glass-surface flex items-center gap-2 rounded-xl p-4 text-gray-600 dark:text-gray-400">
              <CheckCircle className="h-5 w-5 text-slate-300 flex-shrink-0" aria-hidden="true" />
              <span>Servicio según catálogo disponible</span>
            </div>
            <div className="glass-surface flex items-center gap-2 rounded-xl p-4 text-gray-600 dark:text-gray-400">
              <CheckCircle className="h-5 w-5 text-slate-300 flex-shrink-0" aria-hidden="true" />
              <span>Cita y zona confirmadas antes de la visita</span>
            </div>
            <div className="glass-surface flex items-center gap-2 rounded-xl p-4 text-gray-600 dark:text-gray-400">
              <CheckCircle className="h-5 w-5 text-slate-300 flex-shrink-0" aria-hidden="true" />
              <span>Alcance, pago y plazo por escrito antes de iniciar</span>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section variant="default" size="md" aria-labelledby="faq-heading">
        <Reveal className="mx-auto max-w-3xl">
          <h2 id="faq-heading" className="mb-8 text-center text-2xl font-bold text-white md:text-3xl">
            Preguntas frecuentes
          </h2>
          <div className="space-y-4">
            <details className="glass-surface rounded-xl p-5 text-slate-300">
              <summary className="cursor-pointer font-semibold text-white">¿Qué incluye el mantenimiento de computadoras?</summary>
              <p className="mt-3 text-sm leading-6">
                Puede incluir limpieza interna de polvo, cambio de pasta térmica y optimización del sistema operativo. El alcance final depende de la evaluación y se escribe en la cotización. La duración orientativa compartida es de 2 a 3 horas; no es un plazo garantizado.
              </p>
              <p className="mt-3 text-sm leading-6">
                Windows 10 IoT u otra edición se considera solo si la edición, compatibilidad y licencia se verifican antes. No se promete una fecha de soporte sin comprobar la edición y su ciclo oficial. Respalda tus datos antes de entregar el equipo; un disco provisional solo se ofrece si está disponible y se acuerda.
              </p>
            </details>
            <details className="glass-surface rounded-xl p-5 text-slate-300">
              <summary className="cursor-pointer font-semibold text-white">¿Cómo se cotiza y cuándo empieza el trabajo?</summary>
              <p className="mt-3 text-sm leading-6">
                Primero explicas por escrito el problema o necesidad. Después se evalúan alcance, modalidad, materiales, precio y plazo. Se puede acordar el pago total por adelantado o 50% antes y 50% al finalizar. El trabajo comienza únicamente después de que ambas partes aprueben la cotización y se cumpla el anticipo allí indicado.
              </p>
            </details>
            <details className="glass-surface rounded-xl p-5 text-slate-300">
              <summary className="cursor-pointer font-semibold text-white">¿Atienden fuera de Guayaquil?</summary>
              <p className="mt-3 text-sm leading-6">
                Las visitas y mantenimientos presenciales se limitan a Guayaquil y requieren cita. Para otras zonas se pueden evaluar opciones remotas. Si el lugar o las circunstancias no resultan seguros, no se realiza la visita; se podrá proponer atención remota o un lugar público y concurrido, solo si es viable y ambas partes lo aceptan.
              </p>
            </details>
            <details className="glass-surface rounded-xl p-5 text-slate-300">
              <summary className="cursor-pointer font-semibold text-white">¿Garantizan la recuperación de datos?</summary>
              <p className="mt-3 text-sm leading-6">
                No. Antes de iniciar se deben acordar por escrito el criterio de éxito, el precio y cómo se tratarán o conservarán los datos. Solo se cobra si se alcanza el criterio de éxito acordado. No se guarda una copia en la nube sin consentimiento expreso y un plazo de conservación definido.
              </p>
            </details>
            <details className="glass-surface rounded-xl p-5 text-slate-300">
              <summary className="cursor-pointer font-semibold text-white">¿Qué licencias de software incluyen?</summary>
              <p className="mt-3 text-sm leading-6">
                Se brinda ayuda para instalar o configurar software con licencias válidas aportadas por el cliente o adquiridas mediante canales autorizados. Las licencias, claves y cuentas se verifican y cotizan aparte; no se ofrecen activaciones no autorizadas.
              </p>
            </details>
          </div>
        </Reveal>
      </Section>
    </div>
  )
}