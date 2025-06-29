// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
    // Crea un documento de tipo "contactMessage" en Sanity
    const doc = {
      _type: 'contactMessage',
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    }
    await client.create(doc)
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
