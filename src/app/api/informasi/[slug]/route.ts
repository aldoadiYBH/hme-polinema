import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const post = await prisma.informasi.findUnique({
      where: { slug },
    })

    if (!post) {
      return NextResponse.json({ error: "Informasi not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: post })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { title, content, thumbnail, categoryId } = await req.json()
    const { slug } = await params;
    const updated = await prisma.informasi.update({
      where: { slug },
      data: {
        title,
        content,
        thumbnail,
        categoryId,
      },
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (err) {
    console.error("Update error:", err)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
