/**
 * Initializes the Neon PostgreSQL schema (idempotent) and creates/updates
 * the admin user. Usage: npm run seed
 * Reads DATABASE_URL, ADMIN_EMAIL and ADMIN_PASSWORD from the environment
 * or from .env.local at the project root.
 */

import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import { neon } from '@neondatabase/serverless'
import { adminUsers } from '../src/lib/db'

function loadEnvLocal() {
  const file = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(file)) return
  for (const line of fs.readFileSync(file, 'utf-8').split('\n')) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/)
    if (!match) continue
    let value = match[2].trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (process.env[match[1]] === undefined) process.env[match[1]] = value
  }
}

const DDL = [
  `CREATE TABLE IF NOT EXISTS products (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    price       TEXT NOT NULL DEFAULT '',
    category    TEXT NOT NULL DEFAULT '',
    active      BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS blog_posts (
    id         SERIAL PRIMARY KEY,
    title      TEXT NOT NULL,
    slug       TEXT NOT NULL UNIQUE,
    content    TEXT NOT NULL DEFAULT '',
    excerpt    TEXT NOT NULL DEFAULT '',
    published  BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS blog_posts_published_created_idx
    ON blog_posts (published, created_at DESC)`,
  `CREATE TABLE IF NOT EXISTS admin_users (
    id            SERIAL PRIMARY KEY,
    email         TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
]

async function seed() {
  loadEnvLocal()

  const databaseUrl = process.env.DATABASE_URL
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!databaseUrl) {
    console.error('DATABASE_URL muss gesetzt sein (.env.local oder Umgebungsvariable).')
    process.exit(1)
  }
  if (!email || !password) {
    console.error('ADMIN_EMAIL und ADMIN_PASSWORD muessen als Umgebungsvariablen gesetzt sein.')
    console.error('Beispiel: ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=geheim npm run seed')
    process.exit(1)
  }

  console.log('Erstelle Tabellen (falls nicht vorhanden)...')
  const sql = neon(databaseUrl)
  for (const statement of DDL) {
    await sql.query(statement)
  }
  console.log('✓ Schema ist aktuell.')

  console.log('Erstelle Admin-Benutzer...')
  const hash = await bcrypt.hash(password, 12)
  // Lowercased to match the login route, which normalizes the email input.
  await adminUsers.upsert(email.trim().toLowerCase(), hash)

  console.log(`✓ Admin-Benutzer "${email}" wurde erstellt / aktualisiert.`)
  console.log('✓ Seed abgeschlossen.')
}

seed().catch((err) => {
  console.error('Seed fehlgeschlagen:', err)
  process.exit(1)
})
