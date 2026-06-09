/**
 * Local JSON "database" – used instead of Neon/PostgreSQL for local development.
 * Stores data in data/local.json at the project root.
 * Replace this file with the Neon version when deploying to production.
 */

import fs from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'local.json')

export type Product = {
  id: number
  name: string
  description: string
  price: string
  category: string
  active: boolean
  created_at: string
}

export type BlogPost = {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  published: boolean
  created_at: string
  updated_at: string
}

export type AdminUser = {
  id: number
  email: string
  password_hash: string
  created_at: string
}

type DbData = {
  products: Product[]
  blog_posts: BlogPost[]
  admin_users: AdminUser[]
  _sequences: { products: number; blog_posts: number; admin_users: number }
}

function ensureDbFile(): DbData {
  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(DB_PATH)) {
    const initial: DbData = {
      products: [],
      blog_posts: [],
      admin_users: [],
      _sequences: { products: 0, blog_posts: 0, admin_users: 0 },
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), 'utf-8')
    return initial
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) as DbData
}

function saveDb(data: DbData): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

function nextId(data: DbData, table: keyof DbData['_sequences']): number {
  data._sequences[table] += 1
  return data._sequences[table]
}

function now(): string {
  return new Date().toISOString()
}

// ─── Products ────────────────────────────────────────────────────────────────

export const products = {
  findAll(): Product[] {
    return ensureDbFile().products.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
  },

  findActive(): Product[] {
    return this.findAll().filter((p) => p.active)
  },

  findById(id: number): Product | undefined {
    return ensureDbFile().products.find((p) => p.id === id)
  },

  create(data: Pick<Product, 'name' | 'description' | 'price' | 'category'>): Product {
    const db = ensureDbFile()
    const product: Product = {
      id: nextId(db, 'products'),
      name: data.name,
      description: data.description ?? '',
      price: data.price ?? '',
      category: data.category ?? '',
      active: true,
      created_at: now(),
    }
    db.products.push(product)
    saveDb(db)
    return product
  },

  update(id: number, data: Partial<Omit<Product, 'id' | 'created_at'>>): Product | null {
    const db = ensureDbFile()
    const idx = db.products.findIndex((p) => p.id === id)
    if (idx === -1) return null
    db.products[idx] = { ...db.products[idx], ...data }
    saveDb(db)
    return db.products[idx]
  },

  delete(id: number): boolean {
    const db = ensureDbFile()
    const before = db.products.length
    db.products = db.products.filter((p) => p.id !== id)
    saveDb(db)
    return db.products.length < before
  },
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const blogPosts = {
  findAll(): BlogPost[] {
    return ensureDbFile().blog_posts.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
  },

  findPublished(): Pick<BlogPost, 'id' | 'title' | 'slug' | 'excerpt' | 'created_at'>[] {
    return this.findAll()
      .filter((p) => p.published)
      .map(({ id, title, slug, excerpt, created_at }) => ({ id, title, slug, excerpt, created_at }))
  },

  findBySlug(slug: string): BlogPost | undefined {
    return ensureDbFile().blog_posts.find((p) => p.slug === slug)
  },

  findById(id: number): BlogPost | undefined {
    return ensureDbFile().blog_posts.find((p) => p.id === id)
  },

  create(data: Pick<BlogPost, 'title' | 'slug' | 'excerpt' | 'content' | 'published'>): BlogPost {
    const db = ensureDbFile()
    if (db.blog_posts.find((p) => p.slug === data.slug)) {
      throw new Error('UNIQUE_SLUG')
    }
    const post: BlogPost = {
      id: nextId(db, 'blog_posts'),
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt ?? '',
      content: data.content ?? '',
      published: data.published ?? false,
      created_at: now(),
      updated_at: now(),
    }
    db.blog_posts.push(post)
    saveDb(db)
    return post
  },

  update(id: number, data: Partial<Omit<BlogPost, 'id' | 'created_at'>>): BlogPost | null {
    const db = ensureDbFile()
    const idx = db.blog_posts.findIndex((p) => p.id === id)
    if (idx === -1) return null
    db.blog_posts[idx] = { ...db.blog_posts[idx], ...data, updated_at: now() }
    saveDb(db)
    return db.blog_posts[idx]
  },

  delete(id: number): boolean {
    const db = ensureDbFile()
    const before = db.blog_posts.length
    db.blog_posts = db.blog_posts.filter((p) => p.id !== id)
    saveDb(db)
    return db.blog_posts.length < before
  },
}

// ─── Admin Users ──────────────────────────────────────────────────────────────

export const adminUsers = {
  findByEmail(email: string): AdminUser | undefined {
    return ensureDbFile().admin_users.find((u) => u.email === email)
  },

  upsert(email: string, password_hash: string): AdminUser {
    const db = ensureDbFile()
    const existing = db.admin_users.findIndex((u) => u.email === email)
    if (existing !== -1) {
      db.admin_users[existing].password_hash = password_hash
      saveDb(db)
      return db.admin_users[existing]
    }
    const user: AdminUser = {
      id: nextId(db, 'admin_users'),
      email,
      password_hash,
      created_at: now(),
    }
    db.admin_users.push(user)
    saveDb(db)
    return user
  },
}
