// app/api/pengurus/route.ts
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET all pengurus
export async function GET() {
  try {
    const data = await prisma.pengurus.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error("GET pengurus error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST new pengurus
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const newPengurus = await prisma.pengurus.create({
      data: body,
    })
    return NextResponse.json({ success: true, data: newPengurus })
  } catch (err) {
    console.error("POST pengurus error:", err)
    return NextResponse.json({ error: "Failed to create pengurus" }, { status: 500 })
  }
}
