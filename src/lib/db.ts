/**
 * Neon PostgreSQL data layer (HTTP driver, serverless-safe for Vercel).
 * Requires DATABASE_URL. Tables are created by `npm run seed` (scripts/seed.ts).
 */

import { neon } from '@neondatabase/serverless'

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

type Row = Record<string, unknown>

let client: ReturnType<typeof neon> | null = null

function sql() {
  if (!client) {
    const url = process.env.DATABASE_URL
    if (!url) {
      throw new Error('DATABASE_URL ist nicht gesetzt.')
    }
    client = neon(url)
  }
  return client
}

function isoDate(value: unknown): string {
  return new Date(value as string | Date).toISOString()
}

function isUniqueViolation(err: unknown): boolean {
  return typeof err === 'object' && err !== null && (err as { code?: string }).code === '23505'
}

/**
 * Builds a parameterized UPDATE for the keys present in `data` (undefined
 * values are skipped, mirroring the previous partial-update semantics).
 */
async function updateRow(
  table: 'products' | 'blog_posts',
  id: number,
  data: Record<string, unknown>,
  extraSet = '',
): Promise<Row | null> {
  const keys = Object.keys(data).filter((key) => data[key] !== undefined)
  if (keys.length === 0 && !extraSet) return null
  const assignments = keys.map((key, i) => `"${key}" = $${i + 1}`)
  if (extraSet) assignments.push(extraSet)
  const params = keys.map((key) => data[key])
  params.push(id)
  const rows = (await sql().query(
    `UPDATE ${table} SET ${assignments.join(', ')} WHERE id = $${params.length} RETURNING *`,
    params,
  )) as Row[]
  return rows[0] ?? null
}

// ─── Products ────────────────────────────────────────────────────────────────

function mapProduct(row: Row): Product {
  return {
    id: row.id as number,
    name: row.name as string,
    description: row.description as string,
    price: row.price as string,
    category: row.category as string,
    active: row.active as boolean,
    created_at: isoDate(row.created_at),
  }
}

export const products = {
  async findAll(): Promise<Product[]> {
    const rows = (await sql()`SELECT * FROM products ORDER BY created_at DESC, id DESC`) as Row[]
    return rows.map(mapProduct)
  },

  async findActive(): Promise<Product[]> {
    const rows =
      (await sql()`SELECT * FROM products WHERE active ORDER BY created_at DESC, id DESC`) as Row[]
    return rows.map(mapProduct)
  },

  async findById(id: number): Promise<Product | undefined> {
    const rows = (await sql()`SELECT * FROM products WHERE id = ${id}`) as Row[]
    return rows[0] ? mapProduct(rows[0]) : undefined
  },

  async create(data: Pick<Product, 'name' | 'description' | 'price' | 'category'>) {
    const rows = (await sql()`
      INSERT INTO products (name, description, price, category)
      VALUES (${data.name}, ${data.description ?? ''}, ${data.price ?? ''}, ${data.category ?? ''})
      RETURNING *
    `) as Row[]
    return mapProduct(rows[0])
  },

  async update(
    id: number,
    data: Partial<Omit<Product, 'id' | 'created_at'>>,
  ): Promise<Product | null> {
    const hasChanges = Object.values(data).some((value) => value !== undefined)
    if (!hasChanges) return (await this.findById(id)) ?? null
    const row = await updateRow('products', id, data)
    return row ? mapProduct(row) : null
  },

  async delete(id: number): Promise<boolean> {
    const rows = (await sql()`DELETE FROM products WHERE id = ${id} RETURNING id`) as Row[]
    return rows.length > 0
  },
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

function mapBlogPost(row: Row): BlogPost {
  return {
    id: row.id as number,
    title: row.title as string,
    slug: row.slug as string,
    content: row.content as string,
    excerpt: row.excerpt as string,
    published: row.published as boolean,
    created_at: isoDate(row.created_at),
    updated_at: isoDate(row.updated_at),
  }
}

export const blogPosts = {
  async findAll(): Promise<BlogPost[]> {
    const rows = (await sql()`SELECT * FROM blog_posts ORDER BY created_at DESC, id DESC`) as Row[]
    return rows.map(mapBlogPost)
  },

  async findPublished(): Promise<
    Pick<BlogPost, 'id' | 'title' | 'slug' | 'excerpt' | 'created_at'>[]
  > {
    const rows = (await sql()`
      SELECT id, title, slug, excerpt, created_at FROM blog_posts
      WHERE published ORDER BY created_at DESC, id DESC
    `) as Row[]
    return rows.map((row) => ({
      id: row.id as number,
      title: row.title as string,
      slug: row.slug as string,
      excerpt: row.excerpt as string,
      created_at: isoDate(row.created_at),
    }))
  },

  async findBySlug(slug: string): Promise<BlogPost | undefined> {
    const rows = (await sql()`SELECT * FROM blog_posts WHERE slug = ${slug}`) as Row[]
    return rows[0] ? mapBlogPost(rows[0]) : undefined
  },

  async findById(id: number): Promise<BlogPost | undefined> {
    const rows = (await sql()`SELECT * FROM blog_posts WHERE id = ${id}`) as Row[]
    return rows[0] ? mapBlogPost(rows[0]) : undefined
  },

  async create(data: Pick<BlogPost, 'title' | 'slug' | 'excerpt' | 'content' | 'published'>) {
    try {
      const rows = (await sql()`
        INSERT INTO blog_posts (title, slug, excerpt, content, published)
        VALUES (${data.title}, ${data.slug}, ${data.excerpt ?? ''}, ${data.content ?? ''}, ${data.published ?? false})
        RETURNING *
      `) as Row[]
      return mapBlogPost(rows[0])
    } catch (err) {
      if (isUniqueViolation(err)) throw new Error('UNIQUE_SLUG')
      throw err
    }
  },

  async update(
    id: number,
    data: Partial<Omit<BlogPost, 'id' | 'created_at'>>,
  ): Promise<BlogPost | null> {
    try {
      const row = await updateRow('blog_posts', id, data, '"updated_at" = NOW()')
      return row ? mapBlogPost(row) : null
    } catch (err) {
      if (isUniqueViolation(err)) throw new Error('UNIQUE_SLUG')
      throw err
    }
  },

  async delete(id: number): Promise<boolean> {
    const rows = (await sql()`DELETE FROM blog_posts WHERE id = ${id} RETURNING id`) as Row[]
    return rows.length > 0
  },
}

// ─── Admin Users ──────────────────────────────────────────────────────────────

function mapAdminUser(row: Row): AdminUser {
  return {
    id: row.id as number,
    email: row.email as string,
    password_hash: row.password_hash as string,
    created_at: isoDate(row.created_at),
  }
}

export const adminUsers = {
  async findByEmail(email: string): Promise<AdminUser | undefined> {
    const rows = (await sql()`SELECT * FROM admin_users WHERE email = ${email}`) as Row[]
    return rows[0] ? mapAdminUser(rows[0]) : undefined
  },

  async upsert(email: string, password_hash: string): Promise<AdminUser> {
    const rows = (await sql()`
      INSERT INTO admin_users (email, password_hash)
      VALUES (${email}, ${password_hash})
      ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash
      RETURNING *
    `) as Row[]
    return mapAdminUser(rows[0])
  },
}
