import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({ message: 'E-Mail und Passwort erforderlich.' })
    .trim()
    .toLowerCase()
    .min(1, 'E-Mail und Passwort erforderlich.')
    .max(254),
  password: z
    .string({ message: 'E-Mail und Passwort erforderlich.' })
    .min(1, 'E-Mail und Passwort erforderlich.')
    .max(200),
})

export const idSchema = z.object({
  id: z.coerce.number().int().positive(),
})

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const productCreateSchema = z.object({
  name: z.string().trim().min(1, 'Name ist erforderlich.').max(200),
  description: z.string().max(5000).optional().default(''),
  price: z.string().max(50).optional().default(''),
  category: z.string().max(100).optional().default(''),
})

export const productUpdateSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string().trim().min(1).max(200).optional(),
  description: z.string().max(5000).optional(),
  price: z.string().max(50).optional(),
  category: z.string().max(100).optional(),
  active: z.boolean().optional(),
})

export const blogCreateSchema = z.object({
  title: z.string().trim().min(1, 'Titel ist erforderlich.').max(200),
  slug: z
    .string()
    .trim()
    .min(1, 'Slug ist erforderlich.')
    .max(200)
    .regex(slugPattern, 'Slug darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten.'),
  excerpt: z.string().max(500).optional().default(''),
  content: z.string().max(100_000).optional().default(''),
  published: z.boolean().optional().default(false),
})

export const blogUpdateSchema = z.object({
  id: z.coerce.number().int().positive(),
  title: z.string().trim().min(1).max(200).optional(),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(slugPattern, 'Slug darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten.')
    .optional(),
  excerpt: z.string().max(500).optional(),
  content: z.string().max(100_000).optional(),
  published: z.boolean().optional(),
})

/** First human-readable issue of a failed parse, for 400 responses. */
export function firstIssue(error: z.ZodError): string {
  return error.issues[0]?.message ?? 'Ungültige Eingabe.'
}
