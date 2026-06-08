'use client'

import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import type { BlogPost } from '@/lib/db'

type Form = {
  title: string
  slug: string
  excerpt: string
  content: string
  published: boolean
}

const emptyForm: Form = { title: '', slug: '', excerpt: '', content: '', published: false }

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [form, setForm] = useState<Form>(emptyForm)
  const [editId, setEditId] = useState<number | null>(null)
  const [view, setView] = useState<'list' | 'editor'>('list')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchPosts() {
    const res = await fetch('/api/blog?all=1')
    if (res.ok) setPosts(await res.json())
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  function startNew() {
    setEditId(null)
    setForm(emptyForm)
    setError('')
    setView('editor')
  }

  function startEdit(post: BlogPost) {
    setEditId(post.id)
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content || '',
      published: post.published,
    })
    setError('')
    setView('editor')
  }

  function handleTitleChange(title: string) {
    setForm((f) => ({
      ...f,
      title,
      slug: editId ? f.slug : slugify(title),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/blog', {
      method: editId ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editId ? { id: editId, ...form } : form),
    })

    if (res.ok) {
      await fetchPosts()
      setView('list')
      setEditId(null)
      setForm(emptyForm)
    } else {
      const data = await res.json()
      setError(data.error || 'Fehler beim Speichern.')
    }

    setLoading(false)
  }

  async function togglePublished(post: BlogPost) {
    await fetch('/api/blog', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: post.id, published: !post.published }),
    })
    await fetchPosts()
  }

  async function deletePost(id: number) {
    if (!confirm('Beitrag wirklich loeschen?')) return
    await fetch('/api/blog', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    await fetchPosts()
  }

  if (view === 'editor') {
    return (
      <AdminShell>
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setView('list')}
              className="text-sm text-neutral-500 hover:text-neutral-800"
            >
              ← Zurueck
            </button>
            <h1 className="text-xl font-bold tracking-tight">
              {editId ? 'Beitrag bearbeiten' : 'Neuer Beitrag'}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="blog-title" className="block text-xs font-medium text-neutral-600 mb-1">Titel *</label>
              <input
                id="blog-title"
                name="title"
                autoComplete="off"
                required
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Titel des Beitrags"
              />
            </div>

            <div>
              <label htmlFor="blog-slug" className="block text-xs font-medium text-neutral-600 mb-1">Slug (URL)</label>
              <input
                id="blog-slug"
                name="slug"
                autoComplete="off"
                spellCheck={false}
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="url-des-beitrags"
              />
            </div>

            <div>
              <label htmlFor="blog-excerpt" className="block text-xs font-medium text-neutral-600 mb-1">
                Zusammenfassung (Excerpt)
              </label>
              <textarea
                id="blog-excerpt"
                name="excerpt"
                rows={2}
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Kurze Zusammenfassung für die Blog-Übersicht…"
              />
            </div>

            <div>
              <label htmlFor="blog-content" className="block text-xs font-medium text-neutral-600 mb-1">
                Inhalt (Markdown)
              </label>
              <textarea
                id="blog-content"
                name="content"
                rows={18}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y font-mono"
                placeholder="## Abschnitt&#10;&#10;Schreib deinen Beitrag hier in Markdown…"
              />
              <p className="text-xs text-neutral-400 mt-1">
                Markdown wird unterstuetzt: **fett**, *kursiv*, ## Ueberschrift, - Listen
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="published" className="text-sm font-medium">
                Sofort veroeffentlichen
              </label>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Wird gespeichert…' : 'Speichern'}
              </button>
              <button
                type="button"
                onClick={() => setView('list')}
                className="text-sm text-neutral-600 hover:text-neutral-900 px-4 py-2.5 rounded-lg border border-gray-200 transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      </AdminShell>
    )
  }

  return (
    <AdminShell>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
            <p className="text-sm text-neutral-500 mt-0.5">
              Beitraege verwalten und veroeffentlichen
            </p>
          </div>
          <button
            onClick={startNew}
            className="bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Neuer Beitrag
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {posts.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 text-sm">
              Noch keine Beitraege.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200 bg-neutral-50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500">Titel</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500">Datum</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-4 py-3 font-medium max-w-xs truncate">{post.title}</td>
                    <td className="px-4 py-3 text-neutral-500 whitespace-nowrap">
                      {formatDate(post.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => togglePublished(post)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
                          post.published
                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                            : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                        }`}
                      >
                        {post.published ? 'Veroeffentlicht' : 'Entwurf'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => startEdit(post)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Bearbeiten
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Loeschen
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminShell>
  )
}
