import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { adminUsers } from '@/lib/db'
import { createToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'E-Mail und Passwort erforderlich.' }, { status: 400 })
    }

    const user = adminUsers.findByEmail(email)

    if (!user) {
      return NextResponse.json({ error: 'Ungueltige Anmeldedaten.' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.password_hash)

    if (!valid) {
      return NextResponse.json({ error: 'Ungueltige Anmeldedaten.' }, { status: 401 })
    }

    const token = await createToken(user.id, user.email)

    const response = NextResponse.json({ ok: true })
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server-Fehler.' }, { status: 500 })
  }
}
