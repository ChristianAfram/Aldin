import { NextRequest, NextResponse } from 'next/server'
import { products as db } from '@/lib/db'
import { getSession } from '@/lib/auth'

function unauthorized() {
  return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 })
}

// GET: Public (active only) or Admin (all)
export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get('all')
  const session = all ? await getSession() : null

  if (all && !session) return unauthorized()

  const result = all ? db.findAll() : db.findActive()
  return NextResponse.json(result)
}

// POST: Create product (admin only)
export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return unauthorized()

  try {
    const { name, description, price, category } = await req.json()

    if (!name) {
      return NextResponse.json({ error: 'Name ist erforderlich.' }, { status: 400 })
    }

    const product = db.create({
      name,
      description: description || '',
      price: price || '',
      category: category || '',
    })
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
    const { id, name, description, price, category, active } = await req.json()

    if (!id) {
      return NextResponse.json({ error: 'ID erforderlich.' }, { status: 400 })
    }

    const updated = db.update(Number(id), {
      ...(name !== undefined && { name }),
      ...(description !== undefined && { description }),
      ...(price !== undefined && { price }),
      ...(category !== undefined && { category }),
      ...(active !== undefined && { active }),
    })

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
    const { id } = await req.json()
    db.delete(Number(id))
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server-Fehler.' }, { status: 500 })
  }
}
