# ZAYNT — Plantilla base para web comercial de reparación electrónica

## Descripción general
Plantilla Next.js 16 (App Router, `src/`) para la web de ZAYNT, emprendimiento de reparación de electrónica (3 personas). Todo es **plantilla**: estructura, tipos, configuración y seguridad están completos; los datos reales se editan en `src/data/` sin tocar componentes.

## Stack verificado
- **Next.js** 16.4.0 (App Router, Turbopack)
- **React** 19.3.0
- **Tailwind CSS** 4.3.3 (CSS-first, `@theme` en `globals.css`)
- **Motion** 14.1.0 (`motion/react`)
- **lucide-react** 1.55.0
- **zod** 4.6.5
- **TypeScript** 5.9.3 (estricto)
- **ESLint** 10 + `eslint-config-next` 16 (flat config)
- **Prettier** 3.9 + `prettier-plugin-tailwindcss`

## Inicio rápido
```bash
# 1. Instalar dependencias (versiones fijadas en package.json)
npm install

# 2. Copiar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus valores reales

# 3. Desarrollo
npm run dev

# 4. Producción
npm run build && npm run start
```

## Scripts disponibles
| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo (Turbopack) |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | ESLint (flat config) |
| `npm run lint:fix` | ESLint con auto-fix |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier write |
| `npm run format:check` | Prettier check |
| `npm run check:secrets` | Gitleaks (detecta secretos en repo) |

## Variables de entorno
Copia `.env.example` a `.env.local` (gitignored) y rellena:

### Públicas (prefijo `NEXT_PUBLIC_`)
| Variable | Descripción | Requerida | Ejemplo |
|----------|-------------|-----------|---------|
| `NEXT_PUBLIC_SITE_URL` | URL base del sitio (producción: URL de Vercel) | Sí | `https://zaynt.vercel.app` |
| `NEXT_PUBLIC_SITE_NAME` | Nombre del sitio | Sí | `ZAYNT` |
| `NEXT_PUBLIC_WHATSAPP_GENERAL` | WhatsApp Business (dígitos con código país, sin el cero local inicial) | Sí | `593983955959` |
| `NEXT_PUBLIC_FACEBOOK_PAGE_URL` | URL pública de Facebook | No | `https://www.facebook.com/profile.php?id=61595018891608` |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Identificador público de Microsoft Clarity | No | `yw7vqncc63` |

### Servidor / Secretas (sin prefijo `NEXT_PUBLIC_`)
| Variable | Descripción | Requerida (hasta etapa 4) | Ejemplo |
|----------|-------------|---------------------------|---------|
| `NEWS_SOURCE` | Fuente de novedades: `static` o `facebook` | No (default: `static`) | `static` |
| `FACEBOOK_PAGE_ID` | ID de la página de Facebook | Solo si `NEWS_SOURCE=facebook` | `123456789012345` |
| `FACEBOOK_PAGE_ACCESS_TOKEN` | Page Access Token de Facebook | Solo si `NEWS_SOURCE=facebook` | `EAA...` |
| `FACEBOOK_GRAPH_API_VERSION` | Versión Graph API | No (default: `v20.0`) | `v20.0` |
| `NEWS_REVALIDATE_SECONDS` | Segundos de revalidación ISR | No (default: `3600`) | `3600` |
| `CRON_SECRET` | Secreto para endpoint `/api/news/refresh` | Solo si `NEWS_SOURCE=facebook` | `openssl rand -hex 32` |

> **Facebook/RSS:** Meta no proporciona un RSS oficial para perfiles/páginas. Para habilitar `/novedades` y `/feed.xml`, configura `NEWS_SOURCE=facebook`, un ID de página con permisos Graph API y un Page Access Token válido en el entorno de servidor. No subas el token al repositorio. El enlace público por sí solo no da permiso de lectura a la API.
>
> **Clarity y consentimiento:** el script no se carga hasta que la persona acepta la analítica opcional. Debes revisar el aviso de privacidad, la configuración de consentimiento de Clarity y los requisitos aplicables antes de producción; esta integración no certifica cumplimiento jurídico en todos los países.
>
> **Contenido editable:** el bloque introductorio de inicio está en `src/content/home-intro.mdx`. Puedes actualizar texto y formato Markdown/MDX en ese archivo sin modificar componentes. MDX permite JSX, así que solo deben editarlo personas de confianza.
>
> **Nota:** Los WhatsApp individuales de cada colaborador se editan en `src/data/technicians.ts`; se usan en enlaces directos y no pueden mantenerse secretos una vez publicados.

### Configuración en Vercel
1. Project Settings → Environment Variables
2. Añade cada variable según la tabla (Name = key, Value = valor)
3. Marca como **Production**, **Preview**, **Development** según corresponda
4. Para rotar secretos (ej. `FACEBOOK_PAGE_ACCESS_TOKEN`, `CRON_SECRET`): genera nuevo valor, actualiza en Vercel y re-deploy

## Estructura del proyecto
```
zaynt/
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── src/
│   ├── proxy.ts                    # CSP con nonce (Next 16)
│   ├── app/
│   │   ├── layout.tsx              # Root layout (fonts, metadata, Navbar/Footer/WhatsAppFloat)
│   │   ├── page.tsx                # Home (hero, features, CTA)
│   │   ├── not-found.tsx
│   │   ├── globals.css             # Tokens Silver Tech + @theme
│   │   ├── servicios/page.tsx
│   │   ├── tecnicos/page.tsx
│   │   ├── trabajos/page.tsx       # Split: Server (metadata) + Client (TrabajosClient)
│   │   ├── contacto/page.tsx       # Formulario WhatsApp (etapa 2)
│   │   ├── privacidad/page.tsx
│   │   ├── sitemap.ts, robots.ts
│   │   └── api/news/refresh/route.ts   # Etapa 4 (protegido CRON_SECRET)
│   ├── components/
│   │   ├── layout/ (Navbar, Footer, WhatsAppFloat)
│   │   ├── ui/ (Button, Section, Reveal, Card)
│   │   ├── home/, services/, gallery/, news/
│   │   ├── technicians/ (TechnicianCard, TechnicianCarousel, PhotoSequence)
│   │   └── contact/ (ContactForm)
│   ├── config/
│   │   ├── env.ts                  # Único punto de lectura process.env (Zod)
│   │   ├── server-env.ts           # serverEnv (import "server-only")
│   │   └── site.ts                 # Metadatos, navegación, siteConfig
│   ├── data/                       # ← Edita aquí los datos reales
│   │   ├── services.ts
│   │   ├── technicians.ts
│   │   ├── gallery.ts
│   │   ├── news.ts
│   │   └── schemas.ts              # Esquemas Zod
│   └── lib/
│       ├── whatsapp.ts             # Construcción enlace wa.me
│       ├── sanitize.ts             # Sanitización entradas
│       ├── security.ts             # CSP, timingSafeEqual, allowed hosts
│       ├── utils.ts                # cn(), formatWhatsAppNumber, etc.
│       └── news/ (types, provider, static, facebook)
└── public/
    ├── brand/
    ├── technicians/[id]/
    │   ├── avatar.png
    │   ├── foto1.png, foto2.png, foto3.png
    └── gallery/
```

## Cómo editar datos (sin tocar componentes)
Todos los datos se gestionan en `src/data/`. Los archivos usan esquemas Zod de `schemas.ts` y son TypeScript tipado.

### Añadir/editar un servicio
Edita `src/data/services.ts`:
```ts
export const services: Service[] = [
  {
    id: 'screen-replacement',
    name: 'Cambio de pantalla',
    category: 'Móviles',
    description: 'Sustitución de pantalla rota...',
    priceFrom: 59,           // número (€) o undefined
    duration: '1-2 horas',   // string o undefined
    icon: 'smartphone',      // nombre icono lucide
    featured: true,
    order: 1,
  },
  // ...
]
```
- `category`: agrupa en la página Servicios
- `featured: true` → aparece destacado en Home
- `order`: orden de visualización

### Añadir/editar un técnico
Edita `src/data/technicians.ts`:
```ts
export const technicians: Technician[] = [
  {
    id: 'technician-main',
    name: '@xinzayr',
    role: 'Técnico principal',
    specialties: ['Servicio a domicilio', 'Otros trabajos según catálogo'],
    whatsapp: '593983955959',
    photos: [],
    bio: 'La modalidad y disponibilidad se confirman antes de coordinar.',
    featured: true,
    order: 1,
  },
]
```
Publica únicamente especialidades, horarios, fotos y trabajos reales; confirma la disponibilidad del catálogo antes de prometer un servicio.
- Coloca imágenes en `public/technicians/tech-XX/` (avatar + 3 fotos)
- `featured: true` → aparece en página Técnicos
- `whatsapp` → botón directo en su card

### Añadir/editar un trabajo (Galería)
Edita `src/data/gallery.ts`:
```ts
export const gallery: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'iPhone 14 Pro - Cambio pantalla',
    category: 'Móviles',
    beforeImage: '/gallery/iphone14-before.jpg',  // opcional
    afterImage: '/gallery/iphone14-after.jpg',    // obligatorio
    description: 'Sustitución OEM... Face ID OK',
    device: 'iPhone 14 Pro',
    technicianId: 'tech-01',
    date: '2024-01-15',
    featured: true,
    order: 1,
  },
  // ...
]
```
- `beforeImage` opcional → habilita botón "Ver antes/después"
- `afterImage` obligatorio (imagen principal)
- Imágenes en `public/gallery/`

## Seguridad (resumen)
- **CSP con nonce** en `proxy.ts` (Next 16) — `script-src 'self' 'nonce-...' 'strict-dynamic'`, `style-src 'self' 'unsafe-inline'`, `img-src 'self' data: https://*.fbcdn.net https://platform-lookaside.fbsbx.com`, `connect-src 'self'`, `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`, `object-src 'none'`
- `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restrictiva, `X-Frame-Options: DENY`
- `poweredByHeader: false`
- `images.remotePatterns` cerrados (`*.fbcdn.net`, `platform-lookaside.fbsbx.com`)
- `dangerouslySetInnerHTML` prohibido; todo contenido externo renderizado como texto
- Formulario: validación Zod + sanitización + honeypot → genera enlace `wa.me` en navegador (sin backend)
- Endpoint `/api/news/refresh` (etapa 4): `Authorization: Bearer <CRON_SECRET>` con `timingSafeEqual`, idempotente, ISR

## Comprobaciones pre-despliegue
```bash
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm run build       # Build producción
npm run check:secrets  # Gitleaks (no debe encontrar secretos)
npm audit           # Auditoría dependencias
```

## Licencia / Aviso legal
Plantilla base — no incluye asesoría legal. Los avisos `/privacidad` y `/terminos` son borradores informativos y deben completarse y revisarse localmente antes de producción.

---

**Próximo paso:** Etapa 2 → Web comercial (Inicio, Servicios, Contacto con formulario WhatsApp, botón flotante, páginas legales y SEO).