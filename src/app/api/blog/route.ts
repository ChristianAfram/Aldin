import { NextRequest, NextResponse } from 'next/server'
import { blogPosts as db } from '@/lib/db'
import { getSession } from '@/lib/auth'

function unauthorized() {
  return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 })
}

// GET: Public (published only) or Admin (all)
export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get('all')
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
    const { title, slug, excerpt, content, published } = await req.json()

    if (!title || !slug) {
      return NextResponse.json({ error: 'Titel und Slug sind erforderlich.' }, { status: 400 })
    }

    const post = await db.create({
      title,
      slug,
      excerpt: excerpt || '',
      content: content || '',
      published: published ?? false,
    })
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
    const { id, title, slug, excerpt, content, published } = await req.json()

    if (!id) {
      return NextResponse.json({ error: 'ID erforderlich.' }, { status: 400 })
    }

    const updated = await db.update(Number(id), {
      ...(title !== undefined && { title }),
      ...(slug !== undefined && { slug }),
      ...(excerpt !== undefined && { excerpt }),
      ...(content !== undefined && { content }),
      ...(published !== undefined && { published }),
    })

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
    const { id } = await req.json()
    await db.delete(Number(id))
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server-Fehler.' }, { status: 500 })
  }
}
