import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET single entry by ID
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await prisma.database.findUnique({
      where: { id: id },
    });

    if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

// UPDATE entry
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { name, link, description } = await req.json();
    const { id } = await params;
    const updated = await prisma.database.update({
      where: { id },
      data: { name, link, description },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update entry" }, { status: 500 });
  }
}

// DELETE entry
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.database.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete entry" }, { status: 500 });
  }
}
