import bcrypt from 'bcryptjs'
import { adminUsers } from '../src/lib/db'

async function seed() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    console.error('ADMIN_EMAIL und ADMIN_PASSWORD muessen als Umgebungsvariablen gesetzt sein.')
    console.error('Beispiel: ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=geheim npm run seed')
    process.exit(1)
  }

  console.log('Erstelle Admin-Benutzer...')

  const hash = await bcrypt.hash(password, 12)
  adminUsers.upsert(email, hash)

  console.log(`✓ Admin-Benutzer "${email}" wurde erstellt / aktualisiert.`)
  console.log('✓ Seed abgeschlossen. Datenbank: data/local.json')
}

seed().catch((err) => {
  console.error('Seed fehlgeschlagen:', err)
  process.exit(1)
})
