import { NextRequest, NextResponse } from 'next/server'
import { blogPosts as db } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { blogCreateSchema, blogUpdateSchema, idSchema, firstIssue } from '@/lib/validation'

function unauthorized() {
  return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 })
}

// GET: Public (published only) or Admin (all)
export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get('all') === '1'
  const session = all ? await getSession() : null

  if (all && !session) return unauthorized()

  const result = all ? await db.findAll() : await db.findPublished()
  return NextResponse.json(result)
}

// POST: Create post (admin only)
export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return unauthorized()

  try {
    const parsed = blogCreateSchema.safeParse(await req.json())
    if (!parsed.success) {
      return NextResponse.json({ error: firstIssue(parsed.error) }, { status: 400 })
    }

    const post = await db.create(parsed.data)
    return NextResponse.json(post, { status: 201 })
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'UNIQUE_SLUG') {
      return NextResponse.json({ error: 'Dieser Slug ist bereits vergeben.' }, { status: 409 })
    }
    console.error(err)
    return NextResponse.json({ error: 'Server-Fehler.' }, { status: 500 })
  }
}

// PATCH: Update post (admin only)
export async function PATCH(req: NextRequest) {
  const session = await getSession()
  if (!session) return unauthorized()

  try {
    const parsed = blogUpdateSchema.safeParse(await req.json())
    if (!parsed.success) {
      return NextResponse.json({ error: firstIssue(parsed.error) }, { status: 400 })
    }
    const { id, ...data } = parsed.data

    const updated = await db.update(id, data)

    if (!updated) {
      return NextResponse.json({ error: 'Beitrag nicht gefunden.' }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (err) {
    if (err instanceof Error && err.message === 'UNIQUE_SLUG') {
      return NextResponse.json({ error: 'Dieser Slug ist bereits vergeben.' }, { status: 409 })
    }
    console.error(err)
    return NextResponse.json({ error: 'Server-Fehler.' }, { status: 500 })
  }
}

// DELETE: Delete post (admin only)
export async function DELETE(req: NextRequest) {
  const session = await getSession()
  if (!session) return unauthorized()

  try {
    const parsed = idSchema.safeParse(await req.json())
    if (!parsed.success) {
      return NextResponse.json({ error: 'Gültige ID erforderlich.' }, { status: 400 })
    }
    await db.delete(parsed.data.id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server-Fehler.' }, { status: 500 })
  }
}
