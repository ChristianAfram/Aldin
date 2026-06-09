import { blogPosts } from '@/lib/db'
import { SITE_NAME, SITE_URL } from '@/lib/config'

export const revalidate = 3600

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  let posts: Awaited<ReturnType<typeof blogPosts.findPublished>> = []
  try {
    posts = await blogPosts.findPublished()
  } catch {
    // DB nicht erreichbar – leerer Feed statt Fehler.
  }

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${escapeXml(post.slug)}</link>
      <guid>${SITE_URL}/blog/${escapeXml(post.slug)}</guid>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt || '')}</description>
    </item>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(`${SITE_NAME} – Blog`)}</title>
    <link>${SITE_URL}/blog</link>
    <description>Bewerbungstipps, Lebenslauf-Ratgeber und Karriere-Ratschläge für junge Bewerber.</description>
    <language>de-DE</language>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
