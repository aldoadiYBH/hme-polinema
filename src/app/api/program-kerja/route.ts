import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const data = await prisma.programKerja.findMany();
    return NextResponse.json({ success: true, data: data }, { status: 200 });

  } catch (error) {
    console.error("Error fetching data", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {

  const generateUniqueSlug = async (baseSlug: string): Promise<string> => {
    let slug = baseSlug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    let attempt = 1;

    while (true) {
      const checkRes = await prisma.programKerja.findUnique({ where: { slug: slug } });
      if (!checkRes) break;

      const randomSuffix = Math.random().toString(36).substring(2, 6);
      slug = `${baseSlug}-${randomSuffix}-${attempt}`;
      attempt++;
    }

    return slug;
  };

  try {
    const body = await req.json();
    const { title, content, thumbnail } = body

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }
    const slug = await generateUniqueSlug(title);
    // Check if slug exist or not
    if (await prisma.programKerja.findUnique({ where: { slug: slug } })) {

    }

    const newProgram = await prisma.programKerja.create({
      data: {
        title,
        slug,
        content,
        status: "Draft",
        thumbnail: thumbnail || null,
      },
    })

    return NextResponse.json({ success: true, data: newProgram })

  } catch (error) {
    console.error("Error saving data", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!["Draft", "Published"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const updated = await prisma.programKerja.update({
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

    await prisma.programKerja.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete program kerja:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, title, slug, content, thumbnail } = body

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 })
    }

    const updated = await prisma.programKerja.update({
      where: { id },
      data: { title, slug, content, thumbnail },
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (err) {
    console.error("Error updating program kerja:", err)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
