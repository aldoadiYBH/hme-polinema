import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug")

    if (slug) {
      const data = await prisma.informasi.findUnique({ where: { slug } })
      if (!data) {
        return NextResponse.json({ error: "Not found", data: null }, { status: 404 })
      }
      return NextResponse.json({ success: true, data })
    }

    const data = await prisma.informasi.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true
      }
    })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error in GET /api/informasi:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, slug, content, thumbnail, categoryId } = body

    if (!title || !slug || !content || !categoryId) {
      return NextResponse.json(
        { error: "Title, slug, content, and categoryId are required" },
        { status: 400 }
      )
    }

    const exists = await prisma.informasi.findUnique({ where: { slug } })
    if (exists) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 })
    }

    const created = await prisma.informasi.create({
      data: {
        title,
        slug,
        content,
        thumbnail,
        categoryId,
      },
    })

    return NextResponse.json({ success: true, data: created })
  } catch (error) {
    console.error("Error in POST /api/informasi:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!["Draft", "Published"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const updated = await prisma.informasi.update({
      where: { id: String(id) },
      data: { status },
    })
    return NextResponse.json({ success: true, data: updated })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to update status" })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 })
    }

    await prisma.informasi.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete program kerja:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
