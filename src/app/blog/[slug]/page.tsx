import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { marked } from 'marked'
import { blogPosts } from '@/lib/db'
import type { BlogPost } from '@/lib/db'
import WaButton from '@/components/WaButton'

type Props = { params: { slug: string } }

export const revalidate = 60

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = blogPosts.findBySlug(params.slug)
    if (!post || !post.published) return {}
    return {
      title: post.title,
      description: post.excerpt || undefined,
    }
  } catch {
    return {}
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogPostPage({ params }: Props) {
  let post: BlogPost | null = null

  try {
    const found = blogPosts.findBySlug(params.slug)
    post = (found && found.published) ? found : null
  } catch {
    notFound()
  }

  if (!post) notFound()

  const htmlContent = String(marked.parse(post.content || ''))

  return (
    <>
      <article className="max-w-3xl mx-auto px-5 py-16 md:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-bold text-warm-400 hover:text-brand-600 transition-colors mb-8 group"
        >
          <svg className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Zurück zum Blog
        </Link>

        <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-4">
          {formatDate(post.created_at)}
        </p>
        <h1 className="font-display font-black text-4xl md:text-5xl text-warm-900 leading-[1.1] tracking-tight mb-10">
          {post.title}
        </h1>

        <div
          className="prose prose-lg prose-headings:font-display prose-headings:font-bold prose-headings:text-warm-900 prose-p:text-warm-600 prose-a:text-brand-600 hover:prose-a:text-brand-700 prose-strong:text-warm-900 prose-li:text-warm-600 max-w-none mb-16"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <div className="card p-8 bg-warm-50 border-warm-200">
          <h2 className="font-display font-bold text-2xl text-warm-900 mb-3">
            Brauchst du Hilfe bei deiner Bewerbung?
          </h2>
          <p className="text-warm-500 mb-6 leading-relaxed">
            Ein starker Lebenslauf ist oft der fehlende Schlüssel zur Einladung. Schreib mir auf WhatsApp – kostenloses Erstgespräch, ganz ohne Verpflichtung.
          </p>
          <WaButton />
        </div>
      </article>
    </>
  )
}
