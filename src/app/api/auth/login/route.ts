import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createToken } from '@/lib/auth'
import { adminUsers } from '@/lib/db'
import { loginSchema, firstIssue } from '@/lib/validation'
import { checkRateLimit, clientIp } from '@/lib/rate-limit'

// Compared against when the email is unknown, so the response time does not
// reveal whether an account exists.
const DUMMY_HASH = '$2a$12$nS5S.JWhfPTcyuenrsVGFOL3oAGoS8t.kPiSIpKv9P4szu0EDMjlq'

export async function POST(req: NextRequest) {
  try {
    if (!checkRateLimit(`login:${clientIp(req.headers)}`)) {
      return NextResponse.json(
        { error: 'Zu viele Login-Versuche. Bitte warte 15 Minuten.' },
        { status: 429 },
      )
    }

    const parsed = loginSchema.safeParse(await req.json())
    if (!parsed.success) {
      return NextResponse.json({ error: firstIssue(parsed.error) }, { status: 400 })
    }
    const { email, password } = parsed.data

    const user = await adminUsers.findByEmail(email)
    const valid = await bcrypt.compare(password, user?.password_hash ?? DUMMY_HASH)

    if (!user || !valid) {
      return NextResponse.json({ error: 'Ungültige Anmeldedaten.' }, { status: 401 })
    }

    const token = await createToken(user.id, user.email)

    const response = NextResponse.json({ ok: true })
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    return response
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server-Fehler.' }, { status: 500 })
  }
}
