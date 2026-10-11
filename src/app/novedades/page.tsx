import type { Metadata } from 'next'
import { ExternalLink, Rss } from 'lucide-react'
import { serverEnv } from '@/config/server-env'
import { siteConfig } from '@/config/site'
import { getNewsProvider } from '@/lib/news/provider'
import type { NewsItem } from '@/lib/news/types'

export const metadata: Metadata = {
  title: 'Novedades',
  description: 'Actualizaciones y publicaciones de ZAYNT.',
}

export const dynamic = 'force-dynamic'

export default async function NovedadesPage() {
  const isFacebookConfigured = serverEnv.NEWS_SOURCE === 'facebook' &&
    Boolean(serverEnv.FACEBOOK_PAGE_ID && serverEnv.FACEBOOK_PAGE_ACCESS_TOKEN)
  let posts: NewsItem[] = []
  let loadFailed = false

  if (isFacebookConfigured) {
    try {
      const provider = await getNewsProvider()
      posts = await provider.getNews(20)
    } catch (error) {
      console.error('[Novedades] Could not load Facebook posts.', error)
      loadFailed = true
    }
  }

  return (
    <main className="container-custom py-14 sm:py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">ZAYNT · Actualizaciones</p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">Novedades</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
          Publicaciones de Facebook que pueden ayudar a conocer las novedades del catálogo, proyectos y disponibilidad.
        </p>

        {posts.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.id} className="glass-surface rounded-2xl p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('es-EC') : 'Facebook'}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-white">{post.title}</h2>
                {post.excerpt && <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-300">{post.excerpt}</p>}
                {post.url && (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-100 underline underline-offset-4 hover:text-white"
                  >
                    Ver publicación
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </article>
            ))}
          </div>
        ) : (
          <section className="glass-surface mt-10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white">
              {loadFailed ? 'No se pudieron cargar las publicaciones' : 'Feed de Facebook pendiente de conexión'}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              {loadFailed
                ? 'La consulta a Meta Graph API falló. El equipo debe revisar que el identificador, permisos y token de acceso de la página sigan vigentes.'
                : 'El enlace público permite visitar Facebook, pero Meta no ofrece un RSS oficial de publicaciones para integrarlo directamente. Para mostrar publicaciones y generar el RSS se requiere configurar una aplicación de Meta y un Page Access Token autorizado; no se intentará extraer contenido mediante scraping.'}
            </p>
          </section>
        )}

        <div className="mt-8 flex flex-wrap gap-4">
          {siteConfig.facebookPageUrl && (
            <a
              href={siteConfig.facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-2.5 text-sm font-medium text-slate-100 transition-colors hover:border-slate-300 hover:bg-slate-800"
            >
              Facebook de ZAYNT
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          <a
            href={siteConfig.facebookFeedUrl}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-white"
          >
            <Rss className="h-4 w-4" aria-hidden="true" />
            Abrir RSS
          </a>
        </div>
      </div>
    </main>
  )
}
