import type { Metadata } from 'next'
import { Section } from '@/components/ui/Section'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { Card, CardContent } from '@/components/ui/Card'
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle,
  Gauge,
  MapPin,
  MessageSquareText,
  Network,
  ShieldCheck,
  Sparkles,
  Camera,
  GraduationCap,
  Monitor,
  Wrench,
} from 'lucide-react'
import { siteConfig } from '@/config/site'
import HomeIntro from '@/content/home-intro.mdx'

const primaryActionClass =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-[radial-gradient(circle_at_top,_#ffffff,_#d4d4d8_45%,_#a1a1aa_100%)] px-7 py-3.5 text-base font-semibold text-slate-950 shadow-[0_0_35px_rgba(212,212,216,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(212,212,216,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300'
const secondaryActionClass =
  'glass-control inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold text-slate-100 transition-all duration-200 hover:border-slate-300/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300'

export const metadata: Metadata = {
  title: 'Servicios informáticos y técnicos',
  description: 'Soporte informático, mantenimiento, redes, CCTV, capacitación y consultoría técnica en Guayaquil y en línea.',
}

const services = [
  {
    icon: Monitor,
    title: 'Soporte y mantenimiento',
    description: 'Limpieza, pasta térmica, revisión de equipos usados y optimización informática.',
  },
  {
    icon: Network,
    title: 'Redes e infraestructura',
    description: 'Cableado UTP, conectividad y evaluación de soluciones para hogares y organizaciones.',
  },
  {
    icon: Camera,
    title: 'CCTV y vigilancia electrónica',
    description: 'Evaluación, instalación y configuración según equipos, sitio y alcance acordado.',
  },
  {
    icon: GraduationCap,
    title: 'Sistemas y formación',
    description: 'Veyon, Windows con licencia válida, Linux, programación y Arduino según alcance.',
  },
  {
    icon: Wrench,
    title: 'Mandos y controles',
    description: 'Evaluación de reparación y mantenimiento de mandos de PlayStation y otros controles.',
  },
]

const features = [
  {
    icon: ShieldCheck,
    title: 'Red colaborativa',
    description: 'Emprendimiento en crecimiento: cada solicitud se evalúa con el colaborador adecuado.',
  },
  {
    icon: Sparkles,
    title: 'Alcance acordado',
    description: 'Recibes por escrito el servicio, los materiales, el precio y el plazo antes de iniciar.',
  },
  {
    icon: Gauge,
    title: 'Presencial y remoto',
    description: 'Mantenimiento presencial solo en Guayaquil; otros lugares se atienden en línea.',
  },
  {
    icon: BadgeCheck,
    title: 'Seguridad primero',
    description: 'Las visitas se coordinan con cita y se suspenden si las condiciones no son seguras.',
  },
]

const process = [
  {
    number: '01',
    title: 'Cuéntanos',
    description: 'Describe por WhatsApp la necesidad, el equipo o el trabajo que buscas.',
  },
  {
    number: '02',
    title: 'Evaluamos',
    description: 'Revisamos viabilidad, modalidad, seguridad, alcance, materiales y plazo.',
  },
  {
    number: '03',
    title: 'Cotizamos',
    description: 'Documentamos el acuerdo. El trabajo comienza después de tu aprobación y del anticipo convenido.',
  },
]

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pb-16 pt-10 md:pb-24 md:pt-14">
        <div className="absolute inset-0 tech-grid opacity-35" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(212,212,216,0.12),_transparent_55%)]" aria-hidden="true" />

        <div className="container-custom relative z-10 py-8 md:py-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-400/30 bg-slate-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                <span className="h-2 w-2 rounded-full bg-slate-200 shadow-[0_0_12px_rgba(226,232,240,0.7)]" />
                ZAYNT • SOLUTIONS · GUAYAQUIL Y EN LÍNEA
              </div>

              <h1 className="text-4xl font-black tracking-[-0.06em] text-white md:text-5xl lg:text-7xl">
                Tecnología para tus proyectos,
                <span className="block bg-gradient-to-r from-white via-slate-300 to-slate-400 bg-clip-text text-transparent">
                  con soluciones claras.
                </span>
              </h1>

              <div className="mt-6 max-w-xl space-y-4">
                <HomeIntro />
              </div>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
                <a
                  href={`https://wa.me/${siteConfig.whatsappGeneral}?text=${encodeURIComponent('Hola, quisiera consultar por un servicio informático o técnico.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={primaryActionClass}
                >
                  Consultar por WhatsApp
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
                <a href="#servicios" className={secondaryActionClass}>
                  Ver servicios
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-5 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-slate-300" aria-hidden="true" />
                  Cotización por escrito
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-slate-300" aria-hidden="true" />
                  Presencial en Guayaquil
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-slate-300" aria-hidden="true" />
                  Soporte remoto según servicio
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="relative">
              <div className="glass-panel relative overflow-hidden rounded-[28px] p-5 md:p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_35%)]" aria-hidden="true" />
                <div className="relative">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-300">ZAYNT Solutions</p>
                      <h2 className="mt-2 text-2xl font-bold text-white">Servicios por alcance</h2>
                    </div>
                    <span className="rounded-full border border-slate-400/40 bg-slate-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                      Coordinación previa
                    </span>
                  </div>

                  <div className="glass-surface rounded-2xl p-5">
                    <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
                      <span>Área</span>
                      <span>Modalidad</span>
                    </div>

                    <div className="space-y-3">
                      {[
                        ['Computadoras', 'Presencial / remoto'],
                        ['Redes y CCTV', 'Guayaquil / evaluación'],
                        ['Sistemas y formación', 'En línea / coordinado'],
                      ].map(([device, issue]) => (
                        <div
                          key={device}
                          className="glass-surface flex items-center justify-between rounded-xl px-3 py-3"
                        >
                          <div>
                            <p className="font-semibold text-white">{device}</p>
                            <p className="text-xs text-slate-400">{issue}</p>
                          </div>
                          <div className="rounded-full border border-slate-400/30 bg-slate-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-200">
                            Consultar
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Section id="servicios" variant="muted" size="lg" aria-labelledby="services-heading" className="section-glow">
        <Reveal>
          <header className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-slate-300">Servicios</p>
            <h2 id="services-heading" className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Servicios para equipos, redes y organizaciones.
            </h2>
          </header>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {services.map((service, index) => (
              <RevealItem key={service.title} index={index} stagger={0.08}>
                <Card hover variant="elevated" className="h-full">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-400/30 bg-slate-400/10 text-slate-200">
                      <service.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-slate-300">{service.description}</p>
                    <div className="mt-5 flex items-center gap-2 text-sm font-medium text-slate-300">
                      Más información
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </CardContent>
                </Card>
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section variant="default" size="lg" aria-labelledby="benefits-heading">
        <Reveal>
          <header className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-slate-300">Por qué elegirnos</p>
            <h2 id="benefits-heading" className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Un proceso profesional, transparente y adaptado a cada solicitud.
            </h2>
          </header>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <RevealItem key={feature.title} index={index} stagger={0.08}>
                <div className="glass-surface rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-400/10 text-slate-200">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{feature.description}</p>
                </div>
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section variant="dark" size="lg" aria-labelledby="process-heading">
        <Reveal>
          <header className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-slate-300">Proceso</p>
            <h2 id="process-heading" className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Primero acordamos qué se hará y bajo qué condiciones.
            </h2>
          </header>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div className="grid gap-6 md:grid-cols-3">
            {process.map((step, index) => (
              <RevealItem key={step.number} index={index} stagger={0.1}>
                <div className="glass-surface rounded-2xl p-6">
                  <span className="inline-flex rounded-full border border-slate-400/30 bg-slate-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                    {step.number}
                  </span>
                  <h3 className="mt-5 text-2xl font-bold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{step.description}</p>
                </div>
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section variant="default" size="md" aria-labelledby="contact-heading">
        <Reveal className="glass-panel rounded-[28px] p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-slate-300">Consulta disponibilidad</p>
              <h2 id="contact-heading" className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                ¿Necesitas soporte, una instalación o asesoría?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
                Describe el requerimiento. Evaluamos el alcance y te compartimos una cotización para revisar antes de iniciar.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <a
                href={`https://wa.me/${siteConfig.whatsappGeneral}?text=${encodeURIComponent('Hola, quisiera consultar por un servicio informático o técnico.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={primaryActionClass}
              >
                Enviar WhatsApp
                <MessageSquareText className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href="/contacto" className={secondaryActionClass}>
                <MapPin className="h-5 w-5" aria-hidden="true" />
                Ver contacto
              </a>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section variant="default" size="md" aria-label="Información del servicio">
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-slate-300" aria-hidden="true" />
            <span>Servicios según evaluación</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-slate-300" aria-hidden="true" />
            <span>Cotización antes de empezar</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-slate-300" aria-hidden="true" />
            <span>Acuerdos por escrito</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-slate-300" aria-hidden="true" />
            <span>Presencial en Guayaquil · remoto fuera de zona</span>
          </div>
        </div>
      </Section>
    </>
  )
}