import { z } from 'zod'

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_SITE_NAME: z.string().min(1),
  NEXT_PUBLIC_WHATSAPP_GENERAL: z.string().regex(/^\d+$/, 'Solo dígitos con código de país'),
  NEXT_PUBLIC_FACEBOOK_PAGE_URL: z.string().url().optional(),
  NEXT_PUBLIC_CLARITY_PROJECT_ID: z.string().optional(),
})

const serverEnvSchema = z.object({
  NEWS_SOURCE: z.enum(['static', 'facebook']).default('static'),
  FACEBOOK_PAGE_ID: z.string().optional(),
  FACEBOOK_PAGE_ACCESS_TOKEN: z.string().optional(),
  FACEBOOK_GRAPH_API_VERSION: z.string().default('v20.0'),
  NEWS_REVALIDATE_SECONDS: z.coerce.number().int().positive().default(3600),
  CRON_SECRET: z.string().optional(),
})

export type PublicEnv = z.infer<typeof publicEnvSchema>
export type ServerEnv = z.infer<typeof serverEnvSchema>

function validateEnv<T>(schema: z.ZodSchema<T>, env: Record<string, string | undefined>, label: string): T {
  const result = schema.safeParse(env)
  if (!result.success) {
    const issues = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('\n')
    throw new Error(`[${label}] Variables de entorno inválidas:\n${issues}`)
  }
  return result.data
}

const rawPublicEnv = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_WHATSAPP_GENERAL: process.env.NEXT_PUBLIC_WHATSAPP_GENERAL,
  NEXT_PUBLIC_FACEBOOK_PAGE_URL: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL,
  NEXT_PUBLIC_CLARITY_PROJECT_ID: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
}

const rawServerEnv = {
  NEWS_SOURCE: process.env.NEWS_SOURCE,
  FACEBOOK_PAGE_ID: process.env.FACEBOOK_PAGE_ID,
  FACEBOOK_PAGE_ACCESS_TOKEN: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
  FACEBOOK_GRAPH_API_VERSION: process.env.FACEBOOK_GRAPH_API_VERSION,
  NEWS_REVALIDATE_SECONDS: process.env.NEWS_REVALIDATE_SECONDS,
  CRON_SECRET: process.env.CRON_SECRET,
}

export const publicEnv = validateEnv(publicEnvSchema, rawPublicEnv, 'PUBLIC')
export const serverEnv = validateEnv(serverEnvSchema, rawServerEnv, 'SERVER')

// serverEnv se exporta desde un módulo separado con "server-only"
export { validateEnv }
export { serverEnvSchema }