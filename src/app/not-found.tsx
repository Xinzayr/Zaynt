import type { Metadata } from 'next'
import Link from 'next/link'
import { Home, Search, RotateCcw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Página no encontrada',
  description: 'La página que buscas no existe o ha sido movida.',
  robots: 'noindex',
}

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem-200px)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <span className="text-9xl font-bold text-silver/30 dark:text-silver/20">404</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-950 dark:text-white mb-4">Página no encontrada</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver focus-visible:ring-offset-2 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Volver al inicio
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-950 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver focus-visible:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Ir al inicio
          </Link>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">¿Buscas algo en concreto?</p>
          <form action="/buscar" className="flex gap-2 max-w-xs mx-auto" role="search">
            <label htmlFor="search" className="sr-only">Buscar en el sitio</label>
            <input
              id="search"
              type="search"
              name="q"
              placeholder="Buscar servicios, técnicos..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-silver"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="inline-flex items-center justify-center rounded-lg bg-gray-950 px-4 py-2 text-white transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver focus-visible:ring-offset-2 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}