
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const data = await prisma.database.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error("GET database error", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, link, description } = body

    if (!name || !link || !description) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 })
    }

    const newItem = await prisma.database.create({
      data: { name, link, description },
    })

    return NextResponse.json({ success: true, data: newItem })
  } catch (err) {
    console.error("POST database error", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
