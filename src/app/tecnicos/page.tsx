import { Metadata } from 'next'
import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Users, ClipboardCheck, Handshake, MessageCircle, UserRound } from 'lucide-react'
import { technicians } from '@/data/technicians'
import { generateWhatsAppUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Equipo colaborador',
  description: 'Conoce cómo se coordinan los colaboradores de ZAYNT para cada solicitud técnica.',
}

export default function TecnicosPage() {
  return (
    <div className="py-8">
      <Section variant="default" size="lg" aria-labelledby="team-heading">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <h1 id="team-heading" className="mb-4 text-3xl font-bold text-gray-950 dark:text-white md:text-4xl">
            Un equipo colaborativo, en crecimiento
          </h1>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            ZAYNT reúne a un grupo de colaboradores que aporta experiencia y disponibilidad distintas. Podemos coordinar un trabajo individual o en conjunto; no todos los integrantes ofrecen los mismos servicios ni están disponibles para cada solicitud.
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            {
              icon: Users,
              title: 'Colaboración según el caso',
              text: 'Revisamos qué integrante puede atender el requerimiento y si el trabajo necesita coordinación entre varias personas.',
            },
            {
              icon: ClipboardCheck,
              title: 'Experiencia pertinente',
              text: 'Antes de cotizar se verifica el alcance y la capacidad disponible. No afirmamos certificaciones ni especialidades que no se hayan confirmado.',
            },
            {
              icon: Handshake,
              title: 'Responsable identificado',
              text: 'La cotización debe indicar quién coordina y quién ejecutará el trabajo, además del alcance, el precio y las condiciones acordadas.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <Reveal key={title}>
              <article className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <Icon className="mb-4 h-8 w-8 text-slate-300" aria-hidden="true" />
                <h2 className="text-xl font-semibold text-gray-950 dark:text-white">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Colaboradores</p>
          <h2 className="text-2xl font-bold text-gray-950 dark:text-white md:text-3xl">
            Personas y áreas de trabajo
          </h2>
          <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
            ZAYNT es el emprendimiento; ZAYNT Solutions identifica su línea de servicios informáticos. Cada perfil describe las áreas compartidas por el propio colaborador, no una garantía de disponibilidad ni una certificación.
          </p>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-2">
          {technicians.filter((member) => member.featured).map((member) => (
            <Reveal key={member.id}>
              <article className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-400/10 text-slate-200">
                    <UserRound className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">{member.businessUnit}</p>
                    <h3 className="mt-1 text-2xl font-bold text-gray-950 dark:text-white">{member.name}</h3>
                    {member.nickname && (
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {member.nickname}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{member.role}</p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-300">{member.bio}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Áreas de trabajo de ${member.name}`}>
                  {member.specialties.map((specialty) => (
                    <li
                      key={specialty}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {specialty}
                    </li>
                  ))}
                </ul>

                <a
                  href={generateWhatsAppUrl(`Hola ${member.name}, quisiera consultar por tus servicios y disponibilidad.`, member.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 px-5 py-3 font-semibold text-slate-950 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Consultar con {member.name}
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <p className="mb-5 text-gray-600 dark:text-gray-300">
            Consulta el catálogo y cuéntanos qué necesitas; confirmaremos si podemos atenderlo y bajo qué modalidad.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
            >
              Ver servicios
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-lg bg-slate-200 px-5 py-3 font-semibold text-slate-950 transition-colors hover:bg-white"
            >
              Consultar disponibilidad
            </Link>
          </div>
        </Reveal>
      </Section>
    </div>
  )
}