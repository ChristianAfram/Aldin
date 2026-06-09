import type { MetadataRoute } from 'next'
import { cities } from '@/lib/cities'
import { blogPosts } from '@/lib/db'
import { SITE_URL } from '@/lib/config'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/produkte`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/bewerbungscoach`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'daily', priority: 0.8 },
  ]

  const cityRoutes: MetadataRoute.Sitemap = cities.flatMap((city) => [
    {
      url: `${SITE_URL}/lebenslauf-erstellen/${city.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/bewerbungscoach/${city.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ])

  let postRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = await blogPosts.findPublished()
    postRoutes = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    // DB nicht erreichbar (z.B. Build ohne DATABASE_URL) – statische Routen reichen.
  }

  return [...staticRoutes, ...cityRoutes, ...postRoutes]
}
