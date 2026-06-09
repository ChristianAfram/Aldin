import AdminShell from '@/components/AdminShell'
import { products, blogPosts } from '@/lib/db'

export default async function AdminDashboard() {
  let productCount = 0
  let blogCount = 0
  let publishedCount = 0

  try {
    productCount = (await products.findActive()).length
    const allPosts = await blogPosts.findAll()
    blogCount = allPosts.length
    publishedCount = allPosts.filter((p) => p.published).length
  } catch {
    // DB nicht initialisiert
  }

  return (
    <AdminShell>
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Dashboard</h1>
        <p className="text-neutral-500 text-sm mb-8">Übersicht deiner Inhalte</p>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Aktive Produkte', value: productCount },
            { label: 'Blog-Beiträge gesamt', value: blogCount },
            { label: 'Veröffentlicht', value: publishedCount },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-5">
              <p className="text-3xl font-extrabold tracking-tight mb-1">{stat.value}</p>
              <p className="text-xs text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <a
            href="/admin/produkte"
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors"
          >
            <p className="font-semibold mb-1">Produkte verwalten</p>
            <p className="text-xs text-neutral-500">Lebenslauf-Pakete, Anschreiben und mehr</p>
          </a>
          <a
            href="/admin/blog"
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors"
          >
            <p className="font-semibold mb-1">Blog verwalten</p>
            <p className="text-xs text-neutral-500">Beiträge erstellen und veröffentlichen</p>
          </a>
        </div>
      </div>
    </AdminShell>
  )
}
