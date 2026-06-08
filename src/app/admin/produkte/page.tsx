'use client'

import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import type { Product } from '@/lib/db'

type Form = Omit<Product, 'id' | 'active' | 'created_at'>

const emptyForm: Form = { name: '', description: '', price: '', category: '' }

export default function AdminProduktePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState<Form>(emptyForm)
  const [editId, setEditId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchProducts() {
    const res = await fetch('/api/products?all=1')
    if (res.ok) setProducts(await res.json())
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  function startEdit(product: Product) {
    setEditId(product.id)
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
    })
  }

  function cancelEdit() {
    setEditId(null)
    setForm(emptyForm)
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/products', {
      method: editId ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editId ? { id: editId, ...form } : form),
    })

    if (res.ok) {
      await fetchProducts()
      cancelEdit()
    } else {
      const data = await res.json()
      setError(data.error || 'Fehler beim Speichern.')
    }

    setLoading(false)
  }

  async function toggleActive(product: Product) {
    await fetch('/api/products', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: product.id, active: !product.active }),
    })
    await fetchProducts()
  }

  async function deleteProduct(id: number) {
    if (!confirm('Produkt wirklich loeschen?')) return
    await fetch('/api/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    await fetchProducts()
  }

  return (
    <AdminShell>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Produkte</h1>
            <p className="text-sm text-neutral-500 mt-0.5">
              Lebenslauf-Pakete, Anschreiben und weitere Angebote
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="font-semibold mb-4">
            {editId ? 'Produkt bearbeiten' : 'Neues Produkt'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-neutral-600 mb-1">Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="z.B. Lebenslauf Basis"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-neutral-600 mb-1">Kategorie</label>
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="z.B. Lebenslauf"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-neutral-600 mb-1">Preis</label>
              <input
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="z.B. ab 19 EUR"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-neutral-600 mb-1">
                Beschreibung
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Kurze Beschreibung des Produkts..."
              />
            </div>

            {error && (
              <p className="col-span-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <div className="col-span-2 flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Wird gespeichert...' : editId ? 'Aenderungen speichern' : 'Produkt hinzufuegen'}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="text-sm text-neutral-600 hover:text-neutral-900 px-4 py-2 rounded-lg border border-gray-200 transition-colors"
                >
                  Abbrechen
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {products.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 text-sm">
              Noch keine Produkte.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200 bg-neutral-50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500">Kategorie</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500">Preis</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-neutral-500">{product.category || '–'}</td>
                    <td className="px-4 py-3 text-neutral-500">{product.price || '–'}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleActive(product)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
                          product.active
                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                            : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                        }`}
                      >
                        {product.active ? 'Aktiv' : 'Inaktiv'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => startEdit(product)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Bearbeiten
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
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
