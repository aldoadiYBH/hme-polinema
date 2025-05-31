import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET single pengurus by ID
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const pengurus = await prisma.pengurus.findUnique({
            where: { id },
        });

        if (!pengurus) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: pengurus });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}

// UPDATE pengurus by ID
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await req.json();
        const { fullname, jabatan, ttl, nim, prodi, socialLink } = body;
        const {id} = await params;
        
        const updated = await prisma.pengurus.update({
            where: { id },
            data: { fullname, jabatan, ttl, nim, prodi, socialLink },
        });

        return NextResponse.json({ success: true, data: updated });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

// DELETE pengurus by ID
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const {id} = await params;
        await prisma.pengurus.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
