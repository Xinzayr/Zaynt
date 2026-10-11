import { z } from 'zod'

// Servicio
export const ServiceSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  category: z.string().min(1).max(50),
  description: z.string().max(500).optional(),
  technicianId: z.string().max(100).optional(),
  priceFrom: z.number().int().nonnegative().optional(),
  duration: z.string().max(50).optional(),
  icon: z.string().max(50).optional(),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
})

export type Service = z.infer<typeof ServiceSchema>

// Técnico
export const TechnicianSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  nickname: z.string().max(100).optional(),
  businessUnit: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  specialties: z.array(z.string().max(50)).min(1).max(10),
  serviceTypes: z.array(z.string().max(50)).default([]),
  bio: z.string().max(500).optional(),
  schedule: z.string().max(100).optional(),
  whatsapp: z.string().regex(/^\d+$/).optional(),
  avatar: z.string().url().optional(),
  photos: z.array(z.string().url()).max(3).default([]),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
})

export type Technician = z.infer<typeof TechnicianSchema>

// Trabajo/Galería
export const GalleryItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(100),
  category: z.string().min(1).max(50),
  beforeImage: z.string().url().optional(),
  afterImage: z.string().url(),
  description: z.string().max(500).optional(),
  device: z.string().max(100).optional(),
  technicianId: z.string().optional(),
  date: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
})

export type GalleryItem = z.infer<typeof GalleryItemSchema>

// Novedad
export const NewsItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200),
  excerpt: z.string().max(500).optional(),
  content: z.string().optional(),
  image: z.string().url().optional(),
  url: z.string().url().optional(),
  source: z.enum(['static', 'facebook']).default('static'),
  publishedAt: z.string().datetime().optional(),
  author: z.string().max(100).optional(),
  tags: z.array(z.string().max(50)).default([]),
})

export type NewsItem = z.infer<typeof NewsItemSchema>

// Formulario de contacto
export const ContactFormSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^[\d\s+()-]{9,20}$/),
  email: z.string().email().optional().or(z.literal('')),
  serviceType: z.enum([
    'mantenimiento_pc',
    'revision_usado',
    'soporte',
    'cableado_utp',
    'cctv',
    'redes_acceso',
    'deteccion_incendios',
    'veyon',
    'windows_office',
    'linux',
    'capacitacion_control',
    'consultoria',
    'recuperacion_datos',
    'reparacion_mandos',
    'arduino',
    'tutoria_programacion_arduino',
    'otro',
  ]),
  contactPerson: z.enum(['xinzayr', 'brian-jamel']),
  modality: z.enum(['presencial_guayaquil', 'remoto', 'hibrido', 'por_confirmar']),
  description: z.string().min(5, 'Cuéntanos un poco más sobre lo que necesitas.').max(1000),
  termsAcknowledged: z.boolean().refine((accepted) => accepted, 'Debes confirmar la información antes de continuar.'),
  honeypot: z.string().optional(),
})

export type ContactFormData = z.infer<typeof ContactFormSchema>

// Validaciones de sanitización
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Caracteres de control
    .replace(/\n{3,}/g, '\n\n') // Saltos de línea excesivos
    .trim()
}

export const sanitizeFormData = (data: ContactFormData): ContactFormData => ({
  ...data,
  name: sanitizeInput(data.name),
  phone: data.phone.replace(/\D/g, ''),
  email: data.email?.toLowerCase().trim() || '',
  description: sanitizeInput(data.description),
})