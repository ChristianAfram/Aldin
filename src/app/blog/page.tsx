import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/lib/db'
import type { BlogPost } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Blog – Bewerbungstipps für Azubis und Studierende',
  description:
    'Kostenlose Bewerbungstipps, Lebenslauf-Ratgeber und Karriere-Ratschläge für junge Bewerber.',
}

export const revalidate = 60

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogPage() {
  let posts: BlogPost[] = []

  try {
    posts = blogPosts.findPublished() as BlogPost[]
  } catch {
    // DB not yet initialized
  }

  return (
    <>
      <section className="pt-16 pb-12 px-5 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-3">Blog</p>
          <h1 className="font-display font-black text-4xl md:text-5xl text-warm-900 mb-4">
            Bewerbungstipps & Ratgeber
          </h1>
          <p className="text-warm-500 text-lg">
            Alles, was du für deine Bewerbung wissen musst – kostenlos und auf den Punkt gebracht.
          </p>
        </div>
      </section>

      <hr className="divider" />

      <section className="section-pad bg-warm-50 min-h-[50vh]">
        <div className="max-w-3xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-warm-200 rounded-2xl">
              <p className="text-lg font-display font-bold text-warm-900 mb-2">Noch keine Beiträge</p>
              <p className="text-warm-500 text-sm">Die ersten Artikel sind bald verfügbar.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {posts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.id} className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2">
                  <article className="card p-6 sm:p-8 bg-white hover:border-brand-200 transition-[border-color,box-shadow] h-full">
                    <p className="text-xs font-medium uppercase tracking-wider text-warm-400 mb-3">
                      {formatDate(post.created_at)}
                    </p>
                    <h2 className="font-display font-bold text-2xl text-warm-900 mb-3 group-hover:text-brand-600 transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-warm-500 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="inline-flex items-center text-sm font-bold text-brand-600 group-hover:text-brand-700">
                      Weiterlesen
                      <svg className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
