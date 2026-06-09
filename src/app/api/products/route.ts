import { NextRequest, NextResponse } from 'next/server'
import { products as db } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { productCreateSchema, productUpdateSchema, idSchema, firstIssue } from '@/lib/validation'

function unauthorized() {
  return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 })
}

// GET: Public (active only) or Admin (all)
export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get('all') === '1'
  const session = all ? await getSession() : null

  if (all && !session) return unauthorized()

  const result = all ? await db.findAll() : await db.findActive()
  return NextResponse.json(result)
}

// POST: Create product (admin only)
export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return unauthorized()

  try {
    const parsed = productCreateSchema.safeParse(await req.json())
    if (!parsed.success) {
      return NextResponse.json({ error: firstIssue(parsed.error) }, { status: 400 })
    }

    const product = await db.create(parsed.data)
    return NextResponse.json(product, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server-Fehler.' }, { status: 500 })
  }
}

// PATCH: Update product (admin only)
export async function PATCH(req: NextRequest) {
  const session = await getSession()
  if (!session) return unauthorized()

  try {
    const parsed = productUpdateSchema.safeParse(await req.json())
    if (!parsed.success) {
      return NextResponse.json({ error: firstIssue(parsed.error) }, { status: 400 })
    }
    const { id, ...data } = parsed.data

    const updated = await db.update(id, data)

    if (!updated) {
      return NextResponse.json({ error: 'Produkt nicht gefunden.' }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server-Fehler.' }, { status: 500 })
  }
}

// DELETE: Delete product (admin only)
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
