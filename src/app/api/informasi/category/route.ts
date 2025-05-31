import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const categories = await prisma.category.findMany();

        return NextResponse.json({ success: true, data: categories }, { status: 200 });
    } catch (error) {
        console.error("Error saving category:", error)
        return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { name } = body

        if (!name || typeof name !== "string" || !name.trim()) {
            return NextResponse.json({ error: "Nama kategori tidak valid" }, { status: 400 })
        }

        const exists = await prisma.category.findFirst({
            where: { name: name.trim() }
        })

        if (exists) {
            return NextResponse.json({ error: "Kategori sudah ada" }, { status: 400 })
        }

        const newCategory = await prisma.category.create({
            data: {
                name: name.trim()
            }
        })

        return NextResponse.json({ success: true, data: newCategory })
    } catch (error) {
        console.error("Error saving category:", error)
        return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();
        const { id } = body;

        if (!id || typeof id !== "string") {
            return NextResponse.json({ error: "ID kategori tidak valid" }, { status: 400 });
        }

        // Delete informasi related to this category
        await prisma.informasi.deleteMany({
            where: { categoryId: id },
        });

        // Then delete the category
        await prisma.category.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting category:", error);
        return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
    }
}