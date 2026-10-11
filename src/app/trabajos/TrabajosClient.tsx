'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Image as ImageIcon, Search, Wrench } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Card, CardContent } from '@/components/ui/Card'
import { gallery } from '@/data/gallery'

const categories = ['Todas', ...Array.from(new Set(gallery.map((item) => item.category)))] as const

type Category = typeof categories[number]

export default function TrabajosClient() {
  const [activeCategory, setActiveCategory] = useState<Category>(categories[0])
  const [searchQuery, setSearchQuery] = useState('')

  const filteredGallery = gallery
    .filter((item) => {
      if (activeCategory !== 'Todas' && item.category !== activeCategory) return false
      if (
        searchQuery &&
        !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.device?.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }
      return true
    })
    .sort((a, b) => a.order - b.order)

  return (
    <div className="py-8">
      <Section variant="default" size="lg" aria-labelledby="gallery-heading">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <h1 id="gallery-heading" className="mb-4 text-3xl font-bold text-gray-950 dark:text-white md:text-4xl">
            Trabajos realizados
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Aquí compartiremos trabajos reales cuando estén disponibles para publicar.
          </p>
        </Reveal>

        {gallery.length > 0 ? (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="min-w-[200px] flex-1">
                <label htmlFor="gallery-category" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Categoría
                </label>
                <select
                  id="gallery-category"
                  className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-silver focus:outline-none focus:ring-2 focus:ring-silver dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:text-sm"
                  value={activeCategory}
                  onChange={(event) => setActiveCategory(event.target.value as Category)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="min-w-[200px] flex-1">
                <label htmlFor="gallery-search" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Buscar
                </label>
                <div className="relative">
                  <input
                    id="gallery-search"
                    type="text"
                    placeholder="Buscar por título o dispositivo..."
                    className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 pr-11 shadow-sm focus:border-silver focus:outline-none focus:ring-2 focus:ring-silver dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:text-sm"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                  <Search className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGallery.map((item) => (
                <Card key={item.id} className="h-full">
                  <Reveal>
                    <div className="relative">
                      {item.beforeImage && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 opacity-50">
                          <ImageIcon className="h-10 w-10 text-white" aria-hidden="true" />
                        </div>
                      )}
                      <img
                        src={item.afterImage}
                        alt={item.title}
                        className="h-48 w-full rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4 pt-0">
                      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h2>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        {item.device} · {item.category}
                      </p>
                      <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                    </CardContent>
                  </Reveal>
                </Card>
              ))}
            </div>

            {filteredGallery.length === 0 && (
              <Reveal className="py-12 text-center">
                <p className="text-gray-500">No se encontraron trabajos que coincidan con los filtros seleccionados.</p>
              </Reveal>
            )}
          </div>
        ) : (
          <Reveal className="mx-auto max-w-xl">
            <Card className="border-slate-800 bg-slate-900/70 text-center">
              <CardContent className="px-8 py-12">
                <Wrench className="mx-auto h-10 w-10 text-slate-300" aria-hidden="true" />
                <h2 className="mt-5 text-xl font-semibold text-white">Galería en preparación</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Aún no hay trabajos publicados. Escríbenos si quieres consultar por un servicio disponible.
                </p>
                <Link
                  href="/contacto"
                  className="mt-6 inline-flex items-center rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-white"
                >
                  Consultar disponibilidad
                </Link>
              </CardContent>
            </Card>
          </Reveal>
        )}
      </Section>
    </div>
  )
}
